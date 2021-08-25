export class Elo {
  constructor(private _k = 32) {
    if (_k <= 0)
      throw new Error(
        "K-factor must be an integer greater than or equal to zero"
      );
  }

  public get k(): number {
    return this._k;
  }

  /**
   * @param {number} Ra Player A's Elo rate score
   * @param {number} Rb Player B's Elo rate score
   * @returns {number} Probability that Player A will win against Player B: (A win, B lose)
   */
  public winningPercentage(Ra: number, Rb: number): number {
    return 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
  }

  /**
   * @param winnerRate
   * @param loserRate
   * @returns  {[number, number]} [newWinnerRate, newLoserRate]
   */
  public updateRate(winnerRate: number, loserRate: number): [number, number] {
    const w = this.winningPercentage(loserRate, winnerRate);
    const newWinnerRate = Math.round(winnerRate + this.k * w);
    const newLoserRate = Math.round(loserRate - this.k * w);

    return [newWinnerRate, newLoserRate];
  }
}
