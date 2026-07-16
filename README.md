# 备考笔记

基于 [VitePress](https://vitepress.dev/) 构建的个人备考知识库，覆盖 **大学语文 + 思政四门公共课**。

## 📚 科目

| 科目 | 目录 | 说明 |
| --- | --- | --- |
| 📚 大学语文 | `chinese/` | 古代文学、现代文阅读、写作 |
| 🔴 思修 | `sixiu/` | 思想道德与法治 |
| 🟡 马原 | `mayuan/` | 马克思主义基本原理 |
| 🔵 毛中特 | `maozhongte/` | 毛泽东思想与中国特色社会主义 |
| 🟢 史纲 | `shigang/` | 中国近现代史纲要 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动本地开发服务器（默认 http://localhost:5173）
npm run dev

# 构建静态站点（输出到 .vitepress/dist）
npm run build

# 本地预览构建产物
npm run preview
```

## ✏️ 如何添加学习资料

1. 把整理好的 `.md` 文件放进对应科目目录（如 `chinese/唐诗宋词.md`）
2. 打开 `.vitepress/config.mts`，在对应科目的 `sidebarGroup` 里补一行：
   ```ts
   { text: '唐诗宋词', link: '/chinese/唐诗宋词' }
   ```
3. 保存后 VitePress 会热更新，左侧目录即可看到新条目

> 笔记内可用 `<MarkRead />` 嵌入「标记为已掌握」按钮，标记结果汇总在 [进度看板](/progress)。

## 🧩 内置学习功能

- **本地搜索**：顶部搜索框，基于 miniSearch 的中文全文检索
- **学习进度看板**：`/progress`，按科目分组统计已掌握内容（数据存浏览器 localStorage）
- **默写自测模式（占位）**：`/self-test`，题库整理好后接入交互组件

## 📂 目录结构

```
备考/
├── .vitepress/
│   ├── config.mts                # 站点配置
│   └── theme/                    # 自定义主题
│       ├── index.ts
│       ├── progress.ts           # 进度数据层
│       └── components/
│           ├── MarkRead.vue      # 标记已掌握按钮
│           └── ProgressBoard.vue # 进度看板组件
├── chinese/        sixiu/   mayuan/   maozhongte/   shigang/
├── index.md                     # 首页
├── progress.md                  # 进度看板页
├── self-test.md                 # 默写模式占位页
└── package.json
```

## 🌐 部署到 GitHub Pages（后续启用）

当前未配置部署。需要上线时：

1. 在 `.vitepress/config.mts` 中把 `base` 改为 `'/你的仓库名/'`（首尾带斜杠）
2. 推送到 GitHub 仓库
3. 添加 GitHub Actions workflow，构建后将 `.vitepress/dist` 发布到 Pages

详见 [VitePress 部署文档](https://vitepress.dev/guide/deploy#github-pages)。

## 📝 说明

- 进度数据保存在浏览器本地，换设备不同步
- md 文件名建议用中文或英文短横线，避免特殊符号
