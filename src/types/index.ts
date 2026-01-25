// 通用响应类型
export interface Data<T = any> {
  code: number;
  msg: string;
  result: T;
}
export interface ApiResponse<T = any> {
  data: Data<T>;
}
