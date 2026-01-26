// 适配 ES 模块（ESM）的 postcss 配置，兼容 package.json 中的 "type": "module"
export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16, // 设计稿基准字体大小
      unitPrecision: 5, // 保留小数位
      propList: ["*"], // 需要转化的属性
      selectorBlackList: [".no-rem"], // 排除不需要转换的类
      replace: true, // 转换时，是否直接替换，默认为true
      mediaQuery: false, // 转换媒体查询属性不转化
      minPixelValue: 0, // 转换的最小像素值
    },
  },
};
