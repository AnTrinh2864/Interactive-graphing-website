import api from "./client";
import type { Point, Equation, IntersectionPoint } from "../type";

export async function pingBackend(): Promise<string> {
  const res = await api.get("/ping");
  return res.data.message;
}

export async function computeEquation(equation: string) {
  const res = await api.post("/compute", { equation });
  return res.data;
}

export interface EquationData {
  x: number[];
  y: (number | null)[];
  equation: string;
}

export const plotEquationAPI = async (
  equation: string,
  x_min = -10,
  x_max = 10,
  num_points = 200
) => {
  try {
    const response = await api.post<EquationData | { error: string }>("/compute", {
      equation,
      x_min,
      x_max,
      num_points,
    });

    const data = response.data;

    if ("error" in data) {
      throw new Error(data.error);
    }

    return [
      {
        x: data.x,
        y: data.y,
        type: "scatter",
        mode: "lines",
        name: data.equation,
        line: { color: "blue" },
      },
    ];
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch equation data");
  }
};

function formatCoeff(value: number): string {
  const pi = Math.PI;
  const ratio = value / pi;

  // Approx multiples of π
  if (Math.abs(ratio - Math.round(ratio)) < 1e-3) {
    const k = Math.round(ratio);
    if (k === 0) return "0";
    if (k === 1) return "π";
    if (k === -1) return "-π";
    return `${k}π`;
  }

  // Simple fractions (denominators up to 10)
  for (let denom = 1; denom <= 10; denom++) {
    const num = Math.round(value * denom);
    if (Math.abs(value - num / denom) < 1e-6) {
      if (denom === 1) return `${num}`;
      // normalize sign (keep it in numerator only)
      const sign = num < 0 ? "-" : "";
      return `${sign}${Math.abs(num)}/${denom}`;
    }
  }

  // ✅ Smarter fallback: trim trailing zeros
  if (Number.isInteger(value)) {
    return value.toString();
  } else {
    return parseFloat(value.toFixed(2)).toString();
  }
}


export const fitLine = async (points: Point[]): Promise<Equation> => {
  const formatted = points.map(p => [p.x, p.y]);
  const res = await api.post(`/fit-line`, { points: formatted });

  const a = res.data.a;
  const b = res.data.b;

  const aStr = formatCoeff(a);
  const bStr = formatCoeff(b);

  let eqString = `y = ${aStr}x`;
  if (b !== 0) eqString += b > 0 ? ` + ${bStr}` : ` - ${formatCoeff(Math.abs(b))}`;

  return {
    id: eqString, // ✅ use equation string as id
    name: eqString,
    x: res.data.x,
    y: res.data.y,
    coeffs: { a, b },
  };
};

export const fitQuadratic = async (points: Point[]): Promise<Equation> => {
  const formatted = points.map(p => [p.x, p.y]);
  const res = await api.post(`/fit-quadratic`, { points: formatted });

  const a = res.data.a;
  const b = res.data.b;
  const c = res.data.c;

  const aStr = formatCoeff(a);
  const bStr = formatCoeff(b);
  const cStr = formatCoeff(c);

  let eqString = `y = ${aStr}x²`;
  if (b !== 0) eqString += b > 0 ? ` + ${bStr}x` : ` - ${formatCoeff(Math.abs(b))}x`;
  if (c !== 0) eqString += c > 0 ? ` + ${cStr}` : ` - ${formatCoeff(Math.abs(c))}`;

  return {
    id: eqString, // ✅ use equation string as id
    name: eqString,
    x: res.data.x,
    y: res.data.y,
    coeffs: { a, b, c },
  };
};
export const fitCircle = async (points: Point[]): Promise<Equation> => {
  const formatted = points.map(p => [p.x, p.y]);
  const res = await api.post(`/fit-circle`, { points: formatted });

  const h = res.data.h;
  const k = res.data.k;
  const r = res.data.r;

  const hStr = formatCoeff(Math.abs(h));
  const kStr = formatCoeff(Math.abs(k));
  const rStr = formatCoeff(r);

  // Handle signs cleanly
  const hPart = h >= 0 ? `(x - ${hStr})²` : `(x + ${hStr})²`;
  const kPart = k >= 0 ? `(y - ${kStr})²` : `(y + ${kStr})²`;

  const eqString = `${hPart} + ${kPart} = ${rStr}²`;

  return {
    id: eqString,
    name: eqString,
    x: res.data.x,
    y: res.data.y,
    coeffs: { h, k, r },
  };
};


interface IntersectionsRequest {
  equations: Equation[];
  x_min: number;
  x_max: number;
  num_points: number;
}

export const fetchIntersections = async (
  payload: IntersectionsRequest
): Promise<IntersectionPoint[]> => {
  try {
    const res = await api.post("/intersections", payload);
    return res.data.points;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch intersections");
  }
};
