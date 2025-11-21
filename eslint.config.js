import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default defineConfig([
  // 1. 忽略文件配置
  {
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },
  // 2. 指定检查文件
  {
    files: ["**/*.{js,mjs,jsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    // 3. 规则配置（关闭组件名检查）
    rules: {
      "vue/multi-word-component-names": 0,
    },
    // 4. 继承推荐配置
    extends: [js.configs.recommended, ...pluginVue.configs["flat/essential"]],
  },
]);
