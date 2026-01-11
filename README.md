# e-commerce-website
一个基于 Vue 3 的现代化电商平台前端项目

## 项目简介
e-commerce-website 是一个完整的电商平台前端项目，采用 Vue 3 + Vite + Pinia 等现代技术栈开发。项目实现了电商网站的核心功能，包括商品展示、分类浏览、购物车管理、订单处理、用户登录等。

## 功能特性
### 🛍️ 商品模块
- 首页商品展示（新鲜好物、人气推荐、商品分类等）
- 商品详情页（图片预览、规格选择、商品描述）
- 分类浏览（一级分类、二级分类）
- 商品搜索与筛选

### 👤 用户模块
- 用户登录/注册
- 个人信息管理
- 订单管理（查看、跟踪、评价）
- 地址管理
- 猜你喜欢推荐

### 🛒 购物模块
- 购物车管理（增删改查、批量操作）
- 商品规格选择
- 结算流程（地址选择、支付方式）
- 订单创建与支付

### 💳 支付模块
- 订单支付（支付宝、微信等支付方式）
- 支付结果回调
- 订单状态跟踪

## 技术栈
| 类别 | 技术选型 |
|------|----------|
| 框架 | Vue 3 (Composition API) |
| 构建工具 | Vite |
| 状态管理 | Pinia |
| 路由 | Vue Router 4 |
| UI 框架 | Element Plus |
| HTTP 请求 | Axios |
| 样式 | SCSS |
| 图标 | 字体图标 |

## 项目结构
```
src/
├── apis/                 # API 接口封装
├── assets/               # 静态资源
├── components/           # 公共组件
├── directives/           # 自定义指令
├── router/               # 路由配置
├── stores/               # Pinia 状态管理
├── styles/               # 全局样式
├── utils/                # 工具函数
└── views/                # 页面组件
    ├── CartList/         # 购物车页面
    ├── Category/         # 分类页面
    ├── Checkout/         # 结算页面
    ├── Detail/           # 商品详情页
    ├── Layout/           # 布局组件
    ├── Login/            # 登录页面
    ├── Member/           # 会员中心
    ├── Pay/              # 支付页面
    ├── SubCategory/      # 子分类页面
    └── home/             # 首页相关组件
```

## 核心功能模块
### 组合式函数 (Composables)
- `useCategory`: 分类数据获取
- `useSubCategory`: 子分类数据获取
- `useCategoryFilter`: 分类筛选
- `useBanner`: 轮播图数据

### 状态管理 (Pinia Stores)
- `cartStore`: 购物车状态管理
- `categoryStore`: 分类数据管理
- `userStore`: 用户信息管理

### 公共组件
- `XtxImageView`: 图片预览组件（带放大镜效果）
- `XtxSku`: SKU 规格选择组件
- `GoodsItem`: 商品展示组件

## 安装与运行
```bash
# 克隆项目
git clone https://github.com/yourusername/e-commerce-website.git

# 进入项目目录
cd e-commerce-website

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 环境配置
项目使用 `.env` 文件进行环境配置，创建 `.env` 文件并添加以下配置：
```env
VITE_API_BASE_URL=your-api-base-url
```

## API 接口说明
项目集成了以下主要 API 模块：
- 商品相关: 商品详情、热门商品、新品推荐
- 分类相关: 顶部分类、子分类、筛选条件
- 用户相关: 登录、个人信息、收藏
- 购物车: 添加、删除、更新购物车
- 订单相关: 订单创建、查询、支付
- 支付相关: 订单支付、支付结果查询

## 主要页面
1.  首页 - 展示各类商品推荐
2.  分类页 - 商品分类浏览
3.  商品详情页 - 商品详细信息及购买
4.  购物车页 - 购物车管理
5.  结算页 - 订单结算流程
6.  支付页 - 订单支付处理
7.  会员中心 - 用户个人信息及订单管理

## 浏览器支持
- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 87

## 开发规范
- 使用 ESLint 和 Prettier 保持代码风格一致
- 组件命名采用 PascalCase
- 使用 Composition API 进行逻辑组织
- 响应式设计，适配移动端和桌面端

## 部署
```bash
# 构建项目
npm run build

# 构建完成后，dist 目录下的文件可部署到任意静态服务器
```

## 贡献指南
1.  Fork 本仓库
2.  创建功能分支 (`git checkout -b feature/AmazingFeature`)
3.  提交更改 (`git commit -m 'Add some AmazingFeature'`)
4.  推送到分支 (`git push origin feature/AmazingFeature`)
5.  开启 Pull Request

## 许可证
本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 致谢
- Vue.js 团队
- Element Plus 团队
- 所有开源库的贡献者们

> 该项目仅供学习交流使用，不得用于商业用途。如有问题或建议，欢迎提交 Issue 或 Pull Request。
