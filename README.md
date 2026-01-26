# 电商网站 - 小兔鲜儿

这是一个基于 Vue 3、TypeScript 和 Element Plus 构建的现代化电商网站项目，实现了完整的购物流程和用户交互功能。

## 🌟 功能特性

### 用户功能

- **用户认证**：登录/注册、退出登录
- **个人中心**：个人信息管理、订单历史、地址管理
- **商品浏览**：分类浏览、商品搜索、商品详情

### 购物功能

- **购物车管理**：添加/删除商品、数量调整、商品筛选
- **订单流程**：结算页面、收货地址选择、订单确认
- **支付系统**：在线支付、支付状态跟踪

### 技术特性

- **响应式设计**：适配各种屏幕尺寸
- **状态管理**：使用 Pinia 进行全局状态管理
- **数据持久化**：支持本地存储购物车数据
- **路由守卫**：权限验证和页面保护
- **懒加载**：图片懒加载提升性能

## 🛠 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/) (Composition API)
- **语言**: TypeScript
- **状态管理**: Pinia
- **UI 组件库**: Element Plus
- **HTTP 客户端**: Axios
- **构建工具**: Vite
- **样式**: SCSS
- **路由**: Vue Router
- **工具库**: VueUse

## 📁 项目结构

src/ ├── apis/ # API 接口封装 ├── assets/ # 静态资源 ├── components/ # 全局组件 ├── directives/ # 自定义指令 ├── router/ # 路由配置 ├── stores/ # Pinia 状态管理 ├── styles/ # 全局样式 ├── types/ # TypeScript 类型定义 ├── utils/ # 工具函数 ├── views/ # 页面组件 └── main.ts # 应用入口

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd e-commerce-website
   安装依赖
   ```

bash
npm install

# 或

yarn install
启动开发服务器

bash
npm run dev

# 或

yarn dev
构建生产版本

bash
npm run build

# 或

yarn build
环境配置
在项目根目录创建 .env 文件：

env
VITE_API_BASE_URL=your-api-base-url
VITE_APP_TITLE=小兔鲜儿
🔧 主要功能模块

1. 商品展示
   首页轮播图和商品推荐
   商品分类浏览
   二级分类页面
   商品详情页（支持 SKU 选择）
2. 用户系统
   用户登录/注册
   个人资料管理
   订单历史查询
   地址管理
3. 购物车系统
   添加/删除商品
   商品数量调整
   商品选择/取消选择
   价格计算
4. 订单系统
   订单确认页面
   收货地址选择
   订单创建
   支付流程
   🎨 设计特色
   现代化 UI：采用 Element Plus 组件库，界面美观
   响应式布局：适配桌面端和移动端
   流畅动画：使用 CSS3 过渡效果提升用户体验
   优雅交互：符合用户习惯的操作流程
   📝 API 接口说明
   项目使用模拟 API 接口，主要包含：

用户相关：登录、注册、个人信息
商品相关：商品列表、商品详情、分类信息
购物车相关：增删改查购物车商品
订单相关：订单创建、订单查询
支付相关：支付接口、支付回调
🧪 测试
运行单元测试：

bash
npm run test

# 或

yarn test
🚢 部署
静态部署
构建完成后，将 dist 目录部署到静态服务器即可。

Docker 部署
bash

# 构建镜像

docker build -t e-commerce-website .

# 运行容器

docker run -d -p 80:80 e-commerce-website
🤝 贡献指南
Fork 项目
创建功能分支 (git checkout -b feature/AmazingFeature)
提交更改 (git commit -m 'Add some AmazingFeature')
推送到分支 (git push origin feature/AmazingFeature)
创建 Pull Request
📄 许可证
本项目采用 MIT 许可证 - 查看 LICENSE 文件了解详情。

📞 联系方式
如有问题或建议，请通过以下方式联系：

提交 Issue
发送邮件至 [your-email@example.com]
💡 致谢
Vue.js
Element Plus
Pinia
Vite
⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
