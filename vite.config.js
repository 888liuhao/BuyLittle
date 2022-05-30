import { createVuePlugin } from 'vite-plugin-vue2';
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from 'rollup-plugin-external-globals';

export default {
  plugins: [createVuePlugin()],
  //前端用于跨域
  // server:{
  //   proxy:{
  //     '/myapi':{
  //       target:'http://localhost:4000', //代理域名网址
  //       changeOrigin:true,  //默认设置为true，保留请求头
  //       rewrite:(path) => path.replace(/^\/myapi/,'') //重写url路径，设置为空
  //     },
  //   }
  // },
  resolve: {
    // 设置路径别名
    alias: {
      '@': '/src',
      '@api': '/src/api'
    },
    // 省略扩展名
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  //生产环境去除console.log（）
  build:{
    minify: "esbuild",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
  //把小于8k的图片转换成base64形式，减少服务器解码压力，默认是4kb，*2则8kb
  assetsInlineLimit: 4096 * 2,
  //配置cdn加速，但是cdn必须要稳定的网站，不然会出现请求不到数据
  rollupOptions: {
    external: ["axios", "moment"],
    plugins: [
      commonjs(),
      externalGlobals({
        axios: "axios",
        moment: "moment",
      }),
    ],
  },
}