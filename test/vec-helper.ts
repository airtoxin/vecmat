import { Vector } from '../src/Vector'

expect.extend({
  toBeVecOf(received: any, vec: Vector) {
    if (received && received.x != null && received.y != null) {
      expect(received.x).toBeCloseTo(vec.x, 10);
      expect(received.y).toBeCloseTo(vec.y, 10);
      return { pass: true, message: () => "" };
    } else {
      return {
        pass: false,
        message: () =>
          `expected ${JSON.stringify(
            received
          )} to be a Vector of ${JSON.stringify(vec)}`
      };
    }
  }
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeVecOf(vec: Vector): R;
    }
  }
}

