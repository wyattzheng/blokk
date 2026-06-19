# Blokk

类似 Minecraft 的 3D 体素游戏，纯 Web 技术实现。

## 技术栈

- 渲染：WebGPU（原生，不用 Three.js）
- 语言：TypeScript
- 构建：Vite
- 包管理：pnpm workspace (monorepo)
- 服务端：Node.js

## 项目结构

- `packages/blokk-client` — 浏览器客户端，WebGPU 渲染 + 游戏逻辑
- `packages/blokk-server` — Node.js 服务端，WebSocket + 状态管理

## 开发

```bash
npx pnpm@9 install
npx pnpm@9 dev
```

## 约定

- commit 消息使用中文
- commit 格式遵循 Conventional Commits（feat/fix/refactor/chore/docs/perf/test）
- commit 后自动 push 到远程

## 设计原则

- 核心数据用 TypedArray，不用对象数组，逼近 C 的内存布局
- 渲染层自己写，不依赖第三方 3D 库，完全掌控每一帧
- shader 保持极简，体素风格不需要复杂光照
