import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 使用 @use 代替 @import，这样就无需在每个文件中重复导入
        additionalData: '@use "@/styles/var.scss" as *;',
      },
    },
  },
});
