import 'jest'
import '../test/vec-helper'
import { add, dot, mul, sub, vector } from './Vector'
import { calc } from './calc'

describe('calc', () => {
  const v1 = vector(1, 2)
  const v2 = vector(3, 4)
  const v3 = vector(5, 6)

  it('should ignore spaces', () => {
    expect(calc`        ${v1}          `).toBeVecOf(v1)
  })

  it('should throw error when unknown operator used', () => {
    expect(() => calc`${v1} ~ ${v2}`).toThrow()
  })

  describe('+ operator', () => {
    it('should calculate vector + vector', () => {
      expect(calc`${v1} + ${v2}`).toBeVecOf(add(v1, v2))
    })

    it('should calculate vector + vector + vector', () => {
      expect(calc`${v1} + ${v2} + ${v3}`).toBeVecOf(add(add(v1, v2), v3))
    })

    it("should throw error when vector + non-vector", () => {
      expect(() => calc`${v1} + ${2}`).toThrow()
    })

    it("should throw error when non-vector + non-vector", () => {
      expect(() => calc`${1} + ${2}`).toThrow()
    })
  })

  describe('- operator', () => {
    it('should calculate vector - vector', () => {
      expect(calc`${v1} - ${v2}`).toBeVecOf(sub(v1, v2))
    })

    it('should calculate vector - vector - vector', () => {
      expect(calc`${v1} - ${v2} - ${v3}`).toBeVecOf(sub(sub(v1, v2), v3))
    })

    it("should throw error when vector - non-vector", () => {
      expect(() => calc`${v1} - ${2}`).toThrow()
    })

    it("should throw error when non-vector - non-vector", () => {
      expect(() => calc`${1} - ${2}`).toThrow()
    })
  })

  describe('* operator', () => {
    it('should calculate vector * vector', () => {
      expect(calc`${v1} * ${v2}`).toBeVecOf(mul(v1, v2))
    })

    it('should calculate vector * vector * vector', () => {
      expect(calc`${v1} * ${v2} * ${v3}`).toBeVecOf(mul(mul(v1, v2), v3))
    })

    it('should calculate vector * number', () => {
      expect(calc`${v1} * ${2}`).toBeVecOf(mul(v1, 2))
    })

    it('should calculate vector * number * vector * number', () => {
      expect(calc`${v1} * ${2} * ${v3} * ${4}`).toBeVecOf(mul(mul(mul(v1, 2), v3), 4))
    })

    it("should throw error when vector * non-vector", () => {
      expect(() => calc`${v1} * ${"hoge"}`).toThrow()
    })

    it("should throw error when non-vector * non-vector", () => {
      expect(() => calc`${1} * ${2}`).toThrow();
    });
  })

  describe('@ operator', () => {
    it('should calculate vector @ vector', () => {
      expect(calc`${v1} @ ${v2}`).toBe(dot(v1, v2))
    })

    it('should throw error when non-vector @ vector', () => {
      expect(() => calc`${1} @ ${v2}`).toThrow();
    })

    it('should throw error when vector @ non-vector', () => {
      expect(() => calc`${v1} @ ${1}`).toThrow();
    })
  })
})
