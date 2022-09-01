const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withTM = require("next-transpile-modules")(["services"]);
const PACKAGE_JSON = require("./package.json");

const isAssetPrefix = process.env.BASE_PATH || "";


module.exports = withBundleAnalyzer(
  withTM({
    distDir: "build",
    assetPrefix: isAssetPrefix,
    basePath: isAssetPrefix,
    // env: {
    //   BASE_PATH: isAssetPrefix,
    //   remotes:{
    //     "remote1":"http://localhost:4000/remoteEntry.js",
    //     // "remote2":"http://localhost:4001/remoteEntry.js"
    //   }
    // },


  

    webpack: (config, options) => {
      const { ModuleFederationPlugin } = options.webpack.container;
  

      config.plugins.push(
        new ModuleFederationPlugin({
        

          shared: {
            ...PACKAGE_JSON.dependencies,
            react: {
              eager: true,
              requiredVersion: PACKAGE_JSON.dependencies["react"],
              singleton: true,
            },
            "react-dom": {
              eager: true,
              requiredVersion: PACKAGE_JSON.dependencies["react-dom"],
              singleton: true,
            }
          },
        })
      );
    
    
      return config;
    },
  })
);
