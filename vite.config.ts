import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 保持与 tsconfig.json 完全一致
      "@": resolve(__dirname, "src"),
      "@types": resolve(__dirname, "src/types"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/var.scss" as *;',
      },
    },
  },
});
