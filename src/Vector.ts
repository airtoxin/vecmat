export interface Vector {
  x: number;
  y: number;
}

export const vector = (x: number, y: number): Vector => ({ x, y });

export const isVector = (a: any): a is Vector => a != null && typeof a.x === "number" && typeof a.y === "number";

export const isEqual = (a: Vector, b: Vector): boolean => a.x === b.x && a.y === b.y;

export const vectorFromRadian = (rad: number): Vector => vector(Math.cos(rad), Math.sin(rad));

export const vectorFromDegree = (deg: number): Vector => vectorFromRadian(deg * Math.PI / 180);

export const add = (a: Vector, b: Vector): Vector => vector(a.x + b.x, a.y + b.y);

export const sub = (a: Vector, b: Vector): Vector => vector(a.x - b.x, a.y - b.y);

export const mul = (a: Vector, multiplier: number | Vector): Vector => {
  if (isVector(multiplier)) {
    return vector(a.x * multiplier.x, a.y * multiplier.y);
  } else {
    return vector(a.x * multiplier, a.y * multiplier);
  }
}

export const dot = (a: Vector, b: Vector): number => {
  const m = mul(a, b);
  return m.x + m.y;
}
