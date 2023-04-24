# 股票交易系统前端

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## CSS命名规范

由于CSS存在奇奇怪怪的覆盖问题，因此希望大家可以遵守一下该命名规范。

- 采用全小写+下划线的组合
- 前缀为该css从属page的名称，如AdminPage的CSS均以```admin_```为前缀

示例：

```css
/* Admin_page */
.admin_table{
    border:0.1em solid rgba(192, 187, 187, 0.5);
    height: auto;
    margin-left: 0.1%;
    margin-right: 0.1%;
    margin-top: 1%;
}

.admin_table_back{
    background-color: rgba(255, 255, 255, 0.5);
    margin-left: 3%;
    margin-right: 3%;
}

.admin_header {
    border:0.3em groove rgba(150, 150, 150, 0.233);
    text-align: left;
    font-size: 20px;
    font-weight: bolder;
    padding: 20px;
    background-color: rgba(168, 211, 242, 0.5);
    display: flex;
    justify-content:space-between;
}
```



## 环境配置

安装一个比较新的 nodejs 和 npm，Linux/WSL 可以参考[如何在 Ubuntu 20.04 上安装 Node.js 和 npm - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/140961618)。但是不要直接使用 apt install，apt 中的版本非常古老，参考文章中的从 NVM 安装。

Windows 安装方法自行上网搜索。或者从微软商店安装一个 WSL，开始你的 Linux 之旅（x），后续数据库课 MiniSQL 也对此有要求。

### 依赖

除 react 基本包以外，你还需要 react-router-dom 和 antd，（更新2022.6.2：A4加入组绘图组件库echarts），在项目根目录运行如下命令：

```shell
npm add react-router-dom
npm add antd
npm install @ant-design/pro-table
// 新增于2022.05.23 建议大家直接用原生的fetch发送http请求，减少安装不必要的依赖
npm install jquery
// 如果你启动时遇到Error: Package path ./helpers/esm/regeneratorRuntime is not exported，请安装如下依赖
npm add @babel/runtime@^7.18.0
npm install echarts
//（更新2022.6.2：A4加入组绘图组件库echarts）
```

依赖配置完毕后，在根目录运行`npm start`，访问 localhost:3000 即可。
