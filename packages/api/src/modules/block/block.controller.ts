import { Block, BlockModel } from './block.model';
import {
  adjustEndTimestamp,
  randomBreakLength,
  randomDateWithinLast60Days,
} from './block.utils';

export default class BlockController {
  public static async createBlocks(
    userId: string,
    count = 100,
  ): Promise<BlockModel[]> {
    const blocks: BlockModel[] = [];

    for (let i = 0; i < count; i++) {
      const start = randomDateWithinLast60Days();
      const end = adjustEndTimestamp(start);
      const breakLength = randomBreakLength(end - start);

      const block: BlockModel = new Block({
        userId,
        start,
        end,
        breakLength,
      });

      blocks.push(block);
    }

    const savedBlocks = await Block.insertMany(blocks);
    return savedBlocks;
  }
}
