import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from "postcss-pxtorem"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  /*主要看下面这段*/
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.2, // 设计稿尺寸 1rem大小,根据ui尺寸动态调整 这个是 37.4px
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  base: "./", // 打包路径
  server: {
    port: 4999, // 服务端口号
    // open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "",
        ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
