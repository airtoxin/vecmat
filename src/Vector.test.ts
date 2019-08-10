import "jest";
import {
  add, dot,
  isEqual,
  isVector, mul, sub,
  Vector,
  vector,
  vectorFromDegree,
  vectorFromRadian
} from './Vector'
import "../test/vec-helper";

describe("vector", () => {
  it("should return vector object", () => {
    expect(vector(1, 2)).toBeVecOf({ x: 1, y: 2 });
  });
});

describe("isVector", () => {
  it("should return true when argument is object and that has number attributes of x and y", () => {
    expect(isVector({x: 1, y: 2})).toBe(true);
  });

  it("should return false when argument is not object", () => {
    expect(isVector("")).toBe(false);
  });

  it("should return false when argument object hasn't x and y", () => {
    expect(isVector({ x: 1, a: 2 })).toBe(false);
  });

  it("should return false when argument object has non-number typed x or y attributes", () => {
    expect(isVector({ x: "1", y: 2 })).toBe(false);
  });
});

describe("isEqual", () => {
  it("should return true when two vector has same attributes", () => {
    expect(isEqual({x: 1, y: 2}, {x: 1, y: 2})).toBe(true);
  });
});

describe("vectorFromRadian", () => {
  it("should return vector", () => {
    expect(vectorFromRadian(0)).toBeVecOf({ x: 1, y: 0 });
    expect(vectorFromRadian(0)).toBeVecOf({ x: 1, y: 0 });
    expect(vectorFromRadian(Math.PI / 2)).toBeVecOf({ x: 0, y: 1 });
    expect(vectorFromRadian(Math.PI)).toBeVecOf({ x: -1, y: 0 });
    expect(vectorFromRadian((Math.PI / 2) * 3)).toBeVecOf({ x: 0, y: -1 });
    expect(vectorFromRadian(Math.PI * 2)).toBeVecOf({ x: 1, y: 0 });
    expect(vectorFromRadian(Math.PI / 3)).toBeVecOf({
      x: 1 / 2,
      y: Math.sqrt(3) / 2
    });
    expect(vectorFromRadian(Math.PI / 6)).toBeVecOf({
      x: Math.sqrt(3) / 2,
      y: 1 / 2
    });
  });
});

describe("vectorFromDegree", () => {
  it("should return vector", () => {
    expect(vectorFromDegree(0)).toBeVecOf({ x: 1, y: 0 });
    expect(vectorFromDegree(90)).toBeVecOf({ x: 0, y: 1 });
    expect(vectorFromDegree(180)).toBeVecOf({ x: -1, y: 0 });
    expect(vectorFromDegree(270)).toBeVecOf({ x: 0, y: -1 });
    expect(vectorFromDegree(360)).toBeVecOf({ x: 1, y: 0 });
    expect(vectorFromDegree(60)).toBeVecOf({ x: 1 / 2, y: Math.sqrt(3) / 2 });
    expect(vectorFromDegree(30)).toBeVecOf({ x: Math.sqrt(3) / 2, y: 1 / 2 });
  });
});

describe("add", () => {
  it("should return vector", () => {
    expect(add(vector(1, 1), vector(2, 2))).toBeVecOf(vector(3, 3));
    expect(add(vector(1, 1), vector(0, 0))).toBeVecOf(vector(1, 1));
    expect(add(vector(0, 0), vector(0, 0))).toBeVecOf(vector(0, 0));
  });
});

describe("sub", () => {
  it("should return vector", () => {
    expect(sub(vector(1, 1), vector(1, 1))).toBeVecOf(vector(0, 0));
    expect(sub(vector(1, 1), vector(0, 0))).toBeVecOf(vector(1, 1));
    expect(sub(vector(1, 1), vector(10, 10))).toBeVecOf(vector(-9, -9));
  });
});

describe("mul", () => {
  it("should return multiplied vector when multiplier is number", () => {
    expect(mul(vector(1, 1), 10)).toBeVecOf(vector(10, 10));
    expect(mul(vector(1, 0), 10)).toBeVecOf(vector(10, 0));
  });

  it("should return multiplied vector when multiplier is vector", () => {
    expect(mul(vector(1, 1), vector(3, 5))).toBeVecOf(vector(3, 5));
    expect(mul(vector(1, 0), vector(10, 10))).toBeVecOf(vector(10, 0));
  });
});

describe("dot", () => {
  it("should calculate dot product", () => {
    expect(dot(vector(3, 5), vector(2, 4))).toBe(3 * 2 + 5 * 4);
  });
});
