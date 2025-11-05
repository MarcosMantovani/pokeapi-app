/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const webpack = require("webpack");

module.exports = function override(config, env) {
  // Configurações de fallback para Node.js polyfills
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    util: require.resolve("util"),
    fs: false,
    path: false,
    zlib: false,
    "process/browser": require.resolve("process/browser"),
  });

  config.resolve.fallback = fallback;

  
  // Plugins para polyfills
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  // Configurações para melhorar o hot reload no desenvolvimento
  if (env === "development") {
    // Garantir que o hot reload funcione corretamente
    config.watchOptions = {
      poll: 1000, // Poll a cada 1 segundo
      aggregateTimeout: 300, // Delay before rebuilding
      ignored: /node_modules/,
    };

    // Configurações do devServer para hot reload
    config.devServer = {
      ...config.devServer,
      hot: true,
      liveReload: true,
      watchFiles: ["src/**/*"],
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        webSocketURL: {
          hostname: "localhost",
          pathname: "/ws",
          port: 3000,
        },
      },
      // Configurações específicas para WebSocket
      webSocketServer: "ws",
      allowedHosts: "all",
    };

    // Configurar cache para desenvolvimento mais rápido
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
    };
  }

  return config;
};
