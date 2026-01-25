// 通用响应类型
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  result: T | boolean;
}
