// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  chainWebpack(config) {
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true
      });
  },
  pwa: {
    // name: 'My App',
    // themeColor: '#4DBA87',
    // msTileColor: '#000000',
    // appleMobileWebAppCapable: 'yes',
    // appleMobileWebAppStatusBarStyle: 'black',

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
