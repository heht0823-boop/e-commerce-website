# E-commerce-website - 电商平台

这是一个现代化的电商网站前端项目，采用 Vue 3 + Vite + Pinia 技术栈开发。项目实现了完整的电商功能，包括商品展示、购物车、订单管理、用户认证等核心功能。

## ✨ 项目特色

- **现代化技术栈**: Vue 3 Composition API + Vite 构建工具
- **状态管理**: 使用 Pinia 进行全局状态管理
- **路由管理**: Vue Router 4 实现页面导航和权限控制
- **响应式设计**: 适配多种屏幕尺寸
- **组件化开发**: 高度可复用的组件库
- **API 集成**: 与后端 API 无缝集成
- **权限控制**: 用户认证和路由守卫

## 🛠️ 技术栈

- **前端框架**: [Vue 3](https://vuejs.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **路由管理**: [Vue Router 4](https://router.vuejs.org/)
- **UI 组件库**: [Element Plus](https://element-plus.org/)
- **HTTP 请求**: [Axios](https://axios-http.com/)
- **CSS 预处理器**: [Sass/SCSS](https://sass-lang.com/)
- **图标库**: [Iconfont](https://www.iconfont.cn/)

## 📋 功能模块

### 🏠 首页模块

- 轮播图展示
- 分类导航
- 新鲜好物推荐
- 人气商品推荐
- 商品分类展示

### 🔍 商品模块

- 商品分类页面
- 二级分类页面
- 商品详情页
- 商品筛选和排序
- SKU 规格选择
- 图片放大镜效果

### 🛒 购物车模块

- 添加/删除商品
- 修改商品数量
- 商品选中/取消选中
- 全选/取消全选
- 价格计算

### 💰 订单模块

- 订单确认页面
- 地址管理
- 支付流程
- 订单列表管理

### 👤 用户模块

- 用户登录/注册
- 个人中心
- 订单管理
- 地址管理
- 商品收藏

### 🔐 权限控制

- 路由守卫
- 登录状态管理
- 权限验证

## 📁 项目结构

src/ ├── apis/ # API 接口封装 ├── assets/ # 静态资源 ├── components/ # 全局组件 ├── directives/ # 自定义指令 ├── router/ # 路由配置 ├── stores/ # Pinia 状态管理 ├── styles/ # 全局样式 ├── utils/ # 工具函数 └── views/ # 页面组件 ├── CartList/ # 购物车页面 ├── Category/ # 分类页面 ├── Checkout/ # 结算页面 ├── Detail/ # 商品详情页 ├── Layout/ # 布局组件 ├── Login/ # 登录页面 ├── Member/ # 会员中心 ├── Pay/ # 支付页面 └── SubCategory/ # 二级分类页面

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装步骤

1. **克隆项目**

```bash
git clone <your-repository-url>
cd e-commerce-website

安装依赖
bash
npm install
启动开发服务器
bash
npm run dev
构建生产版本
bash
npm run build
代码检查
bash
npm run lint
环境配置
项目使用 .env 文件管理环境变量：

env
# 开发环境
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_TITLE=小兔鲜儿电商

# 生产环境
VITE_API_BASE_URL=https://api.yourdomain.com
🧪 API 接口说明
项目通过 src/apis/ 目录下的文件与后端 API 进行交互：

category.js: 商品分类相关接口
home.js: 首页相关接口
detail.js: 商品详情相关接口
cart.js: 购物车相关接口
user.js: 用户相关接口
checkout.js: 订单相关接口
pay.js: 支付相关接口
order.js: 订单管理相关接口
🔧 配置说明
Axios 拦截器
请求拦截器: 自动添加认证 token
响应拦截器: 统一处理错误和 401 认证失效
路由守卫
全局前置守卫: 验证用户登录状态
权限控制: 保护需要认证的页面
状态持久化
使用 Pinia 的持久化插件保存用户信息和购物车数据
📱 响应式设计
项目支持多种设备尺寸：

桌面端（≥1240px）
平板端（768px - 1239px）
移动端（<768px）
🧪 测试
bash
# 运行测试
npm run test

# 运行测试并监听文件变化
npm run test:watch
🚀 部署
静态部署
构建完成后，将 dist/ 目录下的文件部署到静态服务器即可。

Nginx 配置示例
nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
🤝 贡献指南
Fork 项目
创建特性分支 (git checkout -b feature/AmazingFeature)
提交更改 (git commit -m 'Add some AmazingFeature')
推送到分支 (git push origin feature/AmazingFeature)
开启 Pull Request
📄 许可证
本项目采用 MIT 许可证，详情请参阅 LICENSE 文件。

📞 联系方式
如有问题或建议，请通过以下方式联系：

邮箱: your-email@example.com
GitHub Issues: Issues
🙏 致谢
感谢以下开源项目的支持：

Vue.js
Vite
Element Plus
Axios
⭐ 如果这个项目对你有帮助，请给我们一个 Star！
```
