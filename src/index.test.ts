import { Elo } from ".";

describe("elo-rating", () => {
  describe("k", () => {
    test("default", () => {
      const elo = new Elo();
      expect(elo.k).toBe(32);
    });

    test("set 16", () => {
      const elo = new Elo(16);
      expect(elo.k).toBe(16);
    });

    test("set 0", () => {
      expect(() => {
        new Elo(0);
      }).toThrowError(
        new Error("K-factor must be an integer greater than or equal to zero")
      );
    });

    test("set -1", () => {
      expect(() => {
        new Elo(-1);
      }).toThrowError(
        new Error("K-factor must be an integer greater than or equal to zero")
      );
    });
  });

  describe("winningPercentage", () => {
    test("1200 vs 1400", () => {
      const elo = new Elo();
      const percentage = elo.winningPercentage(1200, 1400);
      expect(percentage).toBeCloseTo(0.24025, 4);
    });

    test("1500 vs 1500", () => {
      const elo = new Elo();
      expect(elo.winningPercentage(1500, 1500)).toBe(0.5);
    });

    test("1000 vs 0", () => {
      const elo = new Elo();
      const percentage = elo.winningPercentage(1000, 0);
      expect(percentage).toBeCloseTo(0.99684, 4);
    });
  });

  describe("updateRate", () => {
    test("case 1", () => {
      const elo = new Elo();
      const [Ra, Rb] = [1200, 1400];
      const [newRa, newRb] = elo.updateRate(Ra, Rb);
      expect(newRa).toBe(1224);
      expect(newRb).toBe(1376);
    });

    test("case 2", () => {
      const elo = new Elo();
      const [Ra, Rb] = [1802, 1186];
      const [newRa, newRb] = elo.updateRate(Ra, Rb);
      expect(newRa).toBe(1803);
      expect(newRb).toBe(1185);
    });
  });
});
