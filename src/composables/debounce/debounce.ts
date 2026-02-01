/**
 * 防抖函数（适配电商搜索/提交按钮场景）
 * @param func 原函数（如搜索接口、提交逻辑）
 * @param delay 延迟时间（默认500ms，搜索场景常用）
 * @param leading 是否立即执行（true=提交按钮，false=搜索框）
 * @returns 防抖后的函数（返回Promise，传递原函数返回值）
 */
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  delay: number,
  leading = false,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timerId: NodeJS.Timeout | null = null;

  return function (this: ThisParameterType<T>, ...args) {
    // 用Promise封装，解决返回值丢失问题
    return new Promise((resolve, reject) => {
      // 每次触发先清除旧定时器（核心防抖逻辑）
      if (timerId) clearTimeout(timerId);

      // 1. leading=true：提交按钮场景，立即执行
      if (leading && !timerId) {
        try {
          const result = func.apply(this, args) as ReturnType<T>;
          resolve(result); // 立即返回执行结果
        } catch (err) {
          reject(err); // 捕获错误，避免程序崩掉
        }
      }

      // 2. 重置定时器：延迟执行（搜索场景）或屏蔽重复触发（提交场景）
      timerId = setTimeout(() => {
        // leading=false：搜索场景，延迟执行
        if (!leading) {
          try {
            const result = func.apply(this, args) as ReturnType<T>;
            resolve(result); // 延迟后返回搜索结果
          } catch (err) {
            reject(err);
          }
        }
        timerId = null; // 重置定时器，允许下一次触发
      }, delay);
    });
  };
}
