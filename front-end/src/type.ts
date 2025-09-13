export interface Point {
  x: number;
  y: number;
}

export interface Equation {
  id: string;
  name: string;
  x?: number[];
  y?: (number | null)[]; // allow null for missing points
  coeffs?: {a?: number, b?: number, c?:number, h?: number, k?: number, r?:number}
}

export interface IntersectionPoint {
  x: number;
  y: number;
  from: string[];
}
