// Node modules
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PACKAGE_JSON = require('./package.json');

const WP = require('webpack');
const path = require('path');

/**
 * HTMLTemplate: Used to run dev build
 * ENTRY_PATH: index file
 * APP_NAME: Library name to access render
 */
const ENTRY_PATH = './src/index.js';
const HTMLTemplate = './public/index.html';
const APP_NAME = PACKAGE_JSON.name.toLowerCase();

/**
 * Module federation config
 * By default all dependencies are added to shared
 */
const MF_CONFIG = {
  name: `${APP_NAME}`,
  remotes: {},
  exposes: {
    './widget': './src/App.jsx',
    './child':'./src/Child.jsx'
  }
};

/**
 * ****** WEBPACK CONFIG STARTS HERE *****
 * @param {*} env process var
 * @param {*} argv cmd args
 * @returns webpack config object
 */
module.exports = (env, argv) => {
  const { mode } = argv;
  const isDev = mode === 'development';

  const addDefinePlugin = () => {
    const instance = new WP.DefinePlugin({
        APPTYPE:JSON.stringify("react"),
      __IS_DEV__: isDev,
      __APP_NAME__: APP_NAME
    });

    return instance;
  };

  const addModuleFederation = () => {
    const instance = new ModuleFederationPlugin({
      ...MF_CONFIG,
      filename: 'remoteEntry.js',
      shared: {
        // ...PACKAGE_JSON.dependencies,
        'react': {
          eager:true,
          requiredVersion: PACKAGE_JSON.dependencies['react'],
          singleton: true
        },
        'react-dom': {
          eager:true,
          requiredVersion: PACKAGE_JSON.dependencies['react-dom'],
          singleton: true
        }
      }
    
    });

    return instance;
  };

 
  
  const addHTMLTemplate = () => {
    const instance = new HtmlWebPackPlugin({
      template: HTMLTemplate
    });

    return instance;
  };
  const cleanupDist = () => {
    const instance = new CleanWebpackPlugin();
    return instance;
  };

  /** Add styles to custom object instead of adding to Head */
  function addStylesToWindow(el) {
    const _window = typeof window !== 'undefined' ? window : {};
    if (!_window.customElStyles) {
      _window.customElStyles = [];
    }
    _window.customElStyles.push(el);
  }

  const config = {
    entry: ENTRY_PATH,

    output: {
      path: path.join(__dirname, '/dist'),
      filename: '[name]-[hash].js',
      publicPath:'auto',
      library: APP_NAME
    },
 

    resolve: {
      extensions: ['.tsx', '.jsx', '.js']
    },

    devServer: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
      }
    },

    devtool: isDev ? 'inline-source-map' : undefined,

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.jsx?$/,
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("@babel/preset-react")],
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        }
      ]
    },

    plugins: [
      cleanupDist(),
      addDefinePlugin(),
      addModuleFederation(),
      addHTMLTemplate()
    ]
  };

  return config;
};
