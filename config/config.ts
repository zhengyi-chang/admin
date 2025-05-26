// https://umijs.org/config/
import CompressionPlugin from 'compression-webpack-plugin';
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import routes from './routes';

// 获取环境变量
const { API_ENV } = process.env;

export default defineConfig({
  chunks: ['vendors', 'umi'],
  chainWebpack: function (config, { webpack }) {
    if (process.env.NODE_ENV === 'production') {
      config.merge({
        optimization: {
          splitChunks: {
            chunks: 'all',
            minSize: 1000,
            minChunks: 2,
            automaticNameDelimiter: '.',
            cacheGroups: {
              react: {
                name: 'react',
                priority: 20,
                test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
              },
              vendor: {
                name: 'vendors',
                test({ resource }: { resource: string }) {
                  return /[\\/]node_modules[\\/]/.test(resource);
                },
                priority: 6,
              },
              antd: {
                name: 'antd',
                test: /[\\/]node_modules[\\/]antd[\\/]/,
                chunks: 'all',
                priority: 10,
              },
              wangeditor: {
                name: 'wangeditor',
                priority: 21,
                test: /[\\/]node_modules[\\/](wangeditor|@wangeditor|@wangeditor\/editor|@wangeditor\/editor-for-react)[\\/]/,
              },
              charts: {
                name: 'charts',
                priority: 20,
                test: /[\\/]node_modules[\\/](@ant-design\/charts)[\\/]/,
              },
              async: {
                chunks: 'async',
                minChunks: 2,
                name: 'async',
                maxInitialRequests: 1,
                minSize: 0,
                priority: 5,
                reuseExistingChunk: true,
              },
            },
          },
        },
      });
      // Gzip压缩
      config.plugin('compression-webpack-plugin').use(CompressionPlugin, [
        {
          test: /\.js$|\.html$|\.css$/, //匹配文件名
          threshold: 10240, //对超过10k的数据压缩
          deleteOriginalAssets: false, //不删除源文件
          algorithm: 'gzip', // 使用gzip压缩
        },
      ]);
      config
        .plugin('replace')
        .use(require('webpack').ContextReplacementPlugin)
        .tap(() => {
          return [/moment[/\\]locale$/, /zh-cn/];
        });
    }
  },
  // publicPath: "/ant/",
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default: 'zh-CN',
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  define: {
    'process.env.API_ENV': API_ENV || undefined,
  },
});
