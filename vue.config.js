// Inside vue.config.js
const AppData = require("./src/assets/app.json");

module.exports = {
  // ...other vue-cli plugin options...
  // chainWebpack(config) {
  //   config.module
  //     .rule("md")
  //     .test(/\.md/)
  //     .use("vue-loader")
  //     .loader("vue-loader")
  //     .end()
  //     .use("vue-markdown-loader")
  //     .loader("vue-markdown-loader/lib/markdown-compiler")
  //     .options({
  //       raw: true
  //     });
  // },
  productionSourceMap: process.env.NODE_ENV == 'production',
  pwa: {
    name: AppData.longName,
    themeColor: AppData.theme_color,
    msTileColor: AppData.theme_color,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      short_name: AppData.shortName,
      description: AppData.description,
      lang: AppData.lang,
      categories: AppData.tags,
      display: AppData.display,
      orientation: AppData.orientation,
      backgroundColor: AppData.background_color,
      icons: [
        {
          src: "./img/icons/manifest-icon-192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/icons/manifest-icon-512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    },

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js"
      // runtimeCaching: [
      //   {
      //     // Match any request that ends with .png, .jpg, .jpeg or .svg.
      //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

      //     // Apply a cache-first strategy.
      //     handler: "CacheFirst",

      //     options: {
      //       // Use a custom cache name.
      //       cacheName: "images",

      //       // Only cache 10 images.
      //       expiration: {
      //         maxEntries: 100
      //       }
      //     }
      //   }
      // ]
    }
  }
  // chainWebpack: config => {
  //   config.module
  //     .rule("markdown")
  //     .test(/\.md$/)
  //     .use(require.resolve("markdown-loader"))
  //     .loader("markdown-loader")
  //     .end()
  //     .rule("html")
  //     .test(/\.html$/)
  //     .after("markdown")
  //     .use(require.resolve("html-loader"))
  //     .loader("html-loader")
  // },
  // chainWebpack: config => {
  //   config.plugin("html").tap(args => {
  //     return [args,
  //       {
  //         "meta": {
  //           "description": AppData.description
  //         }
  //       },
  //       {
  //         "title": AppData.shortName
  //       },
  //     ];
  //   });
  // }
  // configureWebpack: {
  //   plugins: [
  //     new webpack.LoaderOptionsPlugin({
  //       test: /\.md$/,
  //       options: {
  //         use: [
  //           {
  //             loader: "html-loader"
  //           },
  //           {
  //             loader: "markdown-loader"
  //           }
  //         ]
  //       }
  //     })]
  // }
};
