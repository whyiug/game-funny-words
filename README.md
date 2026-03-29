# 鼻尖碰碰词

一个适合小朋友体验的英语识词小游戏。游戏会调用摄像头识别玩家鼻尖位置，通过移动头部去碰撞掉落的单词，边玩边学。

线上体验地址：

`https://www.haoqi.xin`

## 环境要求

- Node.js
- npm

## 安装

```bash
npm install
```

## 本地启动

```bash
npm run dev
```

启动后按终端输出打开本地地址即可。

如果要固定本地访问地址，也可以这样启动：

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

然后打开：

`http://127.0.0.1:4173`

## 构建生产版本

```bash
npm run build
```

## 运行测试

```bash
npm test
```

## 使用说明

- 点击“开始游戏”后，浏览器会请求摄像头权限
- 允许摄像头权限后，移动头部控制鼻尖位置
- 用鼻尖去碰撞掉落的英文单词
- 碰到单词后会弹出单词卡，并播放英文读音

## 技术栈

- Vite
- Vanilla JavaScript
- Vitest
- MediaPipe Pose
