import sympy as sp
import numpy as np
from sympy.parsing.sympy_parser import (
    parse_expr, standard_transformations, implicit_multiplication_application
)

SUPERSCRIPTS = {
    "²": "**2", "³": "**3", "⁴": "**4", "⁵": "**5",
    "⁶": "**6", "⁷": "**7", "⁸": "**8", "⁹": "**9", "⁰": "**0",
}

def normalize_equation(eq: str) -> str:
    for sup, repl in SUPERSCRIPTS.items():
        eq = eq.replace(sup, repl)
    return eq

transformations = standard_transformations + (implicit_multiplication_application,)

def find_numeric_roots(f_expr, x_min=-10, x_max=10, num_points=5000, tol=1e-8):
    x = sp.symbols("x")
    f_func = sp.lambdify(x, f_expr, "numpy")

    xs = np.linspace(x_min, x_max, num_points)
    ys = f_func(xs)

    roots = []
    for i in range(len(xs) - 1):
        y1, y2 = ys[i], ys[i + 1]
        if not (np.isfinite(y1) and np.isfinite(y2)):
            continue
        if abs(y1) < tol:
            r = xs[i]
            if not any(abs(r - rr) < tol for rr in roots):
                roots.append(r)
        elif y1 * y2 < 0:
            try:
                root = sp.nsolve(f_expr, (xs[i], xs[i + 1]))
                r = float(root)
                if x_min <= r <= x_max and not any(abs(r - rr) < tol for rr in roots):
                    roots.append(r)
            except Exception:
                continue
    return sorted(roots)
