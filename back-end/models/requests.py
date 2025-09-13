from pydantic import BaseModel
from typing import List, Tuple

class EquationRequest(BaseModel):
    equation: str
    x_min: float = -10
    x_max: float = 10
    num_points: int = 200

class PointsRequest(BaseModel):
    points: List[Tuple[float, float]]

class Equation(BaseModel):
    id: str
    name: str

class EquationListRequest(BaseModel):
    equations: List[Equation]
    x_min: float = -10
    x_max: float = 10
    num_points: int = 5000
