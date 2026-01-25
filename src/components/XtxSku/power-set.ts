/**
 * 生成数组的幂集（所有可能的子集组合）
 * @param originalSet 原始数组（输入集合）
 * @returns 幂集数组，包含所有子集
 */
export default function bwPowerSet<T>(originalSet: T[]): T[][] {
  // 用于存储所有子集的数组，类型为 T[][]
  const subSets: T[][] = [];

  // 一个包含 n 个元素的集合，共有 2^n 种可能的子集组合。
  // 这是因为对于原集合中的每一个元素，我们都有两种选择：包含它，或者不包含它（每个元素对应 2 种选择）。
  const numberOfCombinations = 2 ** originalSet.length;

  // 从 0 到 2^n 范围内的每个数字，其二进制表示恰好能满足我们的需求：
  // 它的每一位二进制位（0 或 1）决定了是否将原集合中对应的元素包含到当前子集中。
  // 例如，对于集合 {1, 2, 3}，二进制数 0b010 表示我们只需要将元素 "2" 加入到当前子集中。
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    // 单个子集，类型为 T[]
    const subSet: T[] = [];

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      // 判断是否需要将当前元素加入到当前子集中
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex]);
      }
    }

    // 将当前子集添加到所有子集的列表中
    subSets.push(subSet);
  }

  return subSets;
}
