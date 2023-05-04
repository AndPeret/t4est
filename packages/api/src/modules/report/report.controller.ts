import { Block } from '../block/block.model';

type ThisMonthReport = {
  length: number;
  maxLength: number;
  blockCount: number;
  avgLength: number;
};

export default class ReportController {
  public static async thisMonthReport(
    userId: string,
  ): Promise<ThisMonthReport> {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const blocks = await Block.find({
      userId: userId,
      start: { $gte: startOfMonth.getTime() },
      end: { $lt: endOfMonth.getTime() },
    }).exec();

    const blockStats = blocks.reduce(
      (stats, block) => {
        const length = block.end - block.start - block.breakLength;
        stats.length += length;
        stats.maxLength = Math.max(stats.maxLength, length);
        stats.blockCount += 1;
        return stats;
      },
      { length: 0, maxLength: 0, blockCount: 0 },
    );

    return {
      ...blockStats,
      avgLength:
        blockStats.blockCount > 0
          ? blockStats.length / blockStats.blockCount
          : 0,
    };
  }
}
