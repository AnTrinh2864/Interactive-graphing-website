from fastapi import APIRouter
import sympy as sp
import numpy as np
from models.requests import EquationRequest, EquationListRequest
from utils.math_utils import find_numeric_roots, normalize_equation, transformations

router = APIRouter()

@router.post("/compute")
def compute_equation(req: EquationRequest):
    """
    Compute y-values for a given equation within the range [x_min, x_max].
    """
    try:
        expr = sp.parse_expr(req.equation.replace("^", "**"), transformations=transformations)
        x = sp.symbols("x")
        f = sp.lambdify(x, expr, "math")

        xs = np.linspace(req.x_min, req.x_max, req.num_points)
        ys = []
        for val in xs:
            try:
                y_val = f(val)
                ys.append(y_val if np.isfinite(y_val) else None)
            except Exception:
                ys.append(None)

        return {"x": xs.tolist(), "y": ys, "equation": req.equation}
    except Exception as e:
        return {"error": str(e)}

@router.post("/intersections")
def intersections(req: EquationListRequest):
    x, y = sp.symbols("x y")
    exprs = []

    # Parse all equations
    for eq in req.equations:
        if "=" not in eq.name:
            return {"error": f"Equation {eq.name} must contain '='"}
        
        left, right = eq.name.split("=", 1)
        left = normalize_equation(left.strip())
        right = normalize_equation(right.strip())

        expr = sp.Eq(
            sp.parse_expr(left, transformations=transformations),
            sp.parse_expr(right, transformations=transformations)
        )
        exprs.append((eq.id, expr, eq.name))

    intersections = []
    seen = set()  # to deduplicate results

    for i in range(len(exprs)):
        for j in range(i + 1, len(exprs)):
            id1, e1, name1 = exprs[i]
            id2, e2, name2 = exprs[j]

            # --- 1. Symbolic solve (exact seeds) ---
            try:
                sols = sp.solve([e1, e2], (x, y), dict=True)
            except Exception:
                sols = []

            for s in sols:
                try:
                    x_val = float(s[x].evalf())
                    y_val = float(s[y].evalf())
                    key = (round(x_val, 6), round(y_val, 6))
                    if x_val >= req.x_min and x_val <= req.x_max and key not in seen:
                        intersections.append({
                            "x": x_val,
                            "y": y_val,
                            "from": [name1, name2]
                        })
                        seen.add(key)
                except Exception:
                    continue

            # --- 2. Numeric scan in domain ---
            try:
                f1y = sp.solve(e1, y)
                f2y = sp.solve(e2, y)
                if f1y and f2y:
                    for sol1 in f1y:
                        for sol2 in f2y:
                            diff_expr = sp.simplify(sol1 - sol2)
                            roots = find_numeric_roots(
                                diff_expr,
                                x_min=req.x_min,
                                x_max=req.x_max,
                                num_points=req.num_points
                            )
                            for r in roots:
                                try:
                                    y_val = float(sol1.subs(x, r).evalf())
                                    key = (round(r, 6), round(y_val, 6))
                                    if key not in seen:
                                        intersections.append({
                                            "x": r,
                                            "y": y_val,
                                            "from": [name1, name2]
                                        })
                                        seen.add(key)
                                except Exception:
                                    continue
            except Exception as e:
                print(f"Numeric scan failed for {id1} & {id2}: {e}")
                continue

    return {"points": intersections}