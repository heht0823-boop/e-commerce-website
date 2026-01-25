import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
// 导入 TypeScript ESLint 插件和解析器
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";

export default defineConfig([
  // 1. 忽略文件配置（保留你原有的）
  {
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },
  // 2. 对 JS/Vue 文件的配置（保留你原有的）
  {
    files: ["**/*.{js,mjs,jsx,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "vue/multi-word-component-names": 0,
    },
    extends: [js.configs.recommended, ...pluginVue.configs["flat/essential"]],
  },
  // 3. 新增：对 TypeScript/Vue TS 文件的配置
  {
    files: ["**/*.{ts,tsx,vue}"], // 匹配 TS 文件和包含 TS 的 Vue 文件
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: pluginVue.parser, // 先让 vue-eslint-parser 解析 .vue 文件
      parserOptions: {
        parser: typescriptEslintParser, // 再用 TS 解析器解析 .vue 中的 script lang="ts" 内容
        sourceType: "module", // 支持 ES 模块
        ecmaVersion: "latest", // 支持最新 ES 语法
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin, // 注册 TS ESLint 插件
    },
    rules: {
      "vue/multi-word-component-names": 0, // 保留你关闭的组件名检查规则
      // 可选：添加 TS 推荐的基础规则（可根据项目需求调整）
      ...typescriptEslintPlugin.configs.recommended.rules,
    },
    extends: [
      js.configs.recommended,
      ...pluginVue.configs["flat/essential"],
      ...pluginVue.configs["flat/typescript"], // 继承 Vue 的 TS 相关配置
      typescriptEslintPlugin.configs.recommended, // 继承 TS ESLint 推荐配置
    ],
  },
]);
