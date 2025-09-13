from fastapi import APIRouter
import numpy as np
from models.requests import PointsRequest

router = APIRouter()

@router.post("/fit-line")
def fit_line(req: PointsRequest):
    points = np.array(req.points)
    if len(points) != 2:
        return {"error": "Line requires exactly 2 points"}
    (x1, y1), (x2, y2) = points
    if x1 == x2:
        return {"error": "Vertical line not supported"}
    a = (y2 - y1) / (x2 - x1)
    b = y1 - a * x1
    x_vals = np.linspace(min(x1, x2) - 1, max(x1, x2) + 1, 500).tolist()
    y_vals = [(a * x + b) for x in x_vals]
    return {"a": a, "b": b, "x": x_vals, "y": y_vals}

@router.post("/fit-quadratic")
def fit_quadratic(req: PointsRequest):
    points = np.array(req.points)
    if len(points) != 3:
        return {"error": "Quadratic requires exactly 3 points"}
    X = np.array([[x**2, x, 1] for x, _ in points])
    y = np.array([y for _, y in points])
    a, b, c = np.linalg.solve(X, y)
    x_vals = np.linspace(min(points[:,0]) - 1, max(points[:,0]) + 1, 500).tolist()
    y_vals = [(a * x**2 + b * x + c) for x in x_vals]
    return {"a": a, "b": b, "c": c, "x": x_vals, "y": y_vals}

@router.post("/fit-circle")
def fit_circle(req: PointsRequest):
    points = np.array(req.points)
    if len(points) != 2:
        return {"error": "Circle requires exactly 2 points (center, edge)"}
    (x1, y1), (x2, y2) = points
    r = float(np.sqrt((x2 - x1)**2 + (y2 - y1)**2))
    theta = np.linspace(0, 2 * np.pi, 500)
    x_vals = (x1 + r * np.cos(theta)).tolist()
    y_vals = (y1 + r * np.sin(theta)).tolist()
    return {"h": float(x1), "k": float(y1), "r": r, "x": x_vals, "y": y_vals}
