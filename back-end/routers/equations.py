from fastapi import APIRouter
import sympy as sp
import numpy as np
from models.requests import EquationRequest, EquationListRequest
from utils.math_utils import normalize_equation, transformations, find_numeric_roots

router = APIRouter()

@router.post("/compute")
def compute_equation(req: EquationRequest):
    try:
        expr = sp.parse_expr(req.equation.replace("^", "**"), transformations=transformations)
        x = sp.symbols("x")
        f = sp.lambdify(x, expr, "math")

        xs = np.linspace(req.x_min, req.x_max, req.num_points).tolist()
        ys = [f(val) if np.isfinite(f(val)) else None for val in xs]

        return {"x": xs, "y": ys, "equation": req.equation}
    except Exception as e:
        return {"error": str(e)}

@router.post("/intersections")
def intersections(req: EquationListRequest):
    x, y = sp.symbols("x y")
    exprs = []
    for eq in req.equations:
        left, right = [normalize_equation(s.strip()) for s in eq.name.split("=")]
        expr = sp.Eq(sp.parse_expr(left, transformations=transformations),
                     sp.parse_expr(right, transformations=transformations))
        exprs.append((eq.id, expr, eq.name))

    intersections, seen = [], set()
    for i in range(len(exprs)):
        for j in range(i + 1, len(exprs)):
            id1, e1, name1 = exprs[i]
            id2, e2, name2 = exprs[j]

            try:
                sols = sp.solve([e1, e2], (x, y), dict=True)
            except Exception:
                sols = []
            for s in sols:
                try:
                    x_val, y_val = float(s[x]), float(s[y])
                    key = (round(x_val, 6), round(y_val, 6))
                    if req.x_min <= x_val <= req.x_max and key not in seen:
                        intersections.append({"x": x_val, "y": y_val, "from": [name1, name2]})
                        seen.add(key)
                except Exception:
                    continue

    return {"points": intersections}
