// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 创建并导出 Mock 服务
export const worker = setupWorker(...handlers);
