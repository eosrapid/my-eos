const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const curDir = __dirname;
const path = require('path');
const allowedBuildTypes = ['commonjs', 'umd'];
function findAndFixCSSPath(config, newCssFilePath) {
  const cssPlugin = config.plugins.filter(o=>o&&o.options&&typeof o.options==='object'&&typeof o.options.filename==='string'&&o.options.filename.indexOf(".css")&&o.options.chunkFilename)[0];
  if(cssPlugin){
    cssPlugin.options.filename = newCssFilePath;
  }
}
function override(config, env) {
  config.resolve.alias["react"] = "preact/compat";
  config.resolve.alias["react-dom/test-utils"] = "preact/test-utils";
  config.resolve.alias["react-dom"] = "preact/compat";
  config.resolve.alias['@'] = path.resolve(__dirname, 'src');

  //config.output.chunkFilename = '[chunkhash].[name].js';
  config.optimization.minimizer = [
    // Prevent function reduction in preact for preact-compat to work.
    new UglifyJsPlugin({
      include: /preact\.js$/,
      uglifyOptions: {
        compress: {
          reduce_funcs: false,
        },
      },
    }),
    // Normal uglifying for everything else.
    new UglifyJsPlugin({
      exclude: /preact\.js$/,
      cache: true,
      parallel: true,
    }),
  ];
  if(env!=="production") {
    return config;
  }else{
    const envBuildType = process.env.BUILD_TYPE;
    if(envBuildType==="demo") {
      return config;
    }

    const buildType = allowedBuildTypes.indexOf(envBuildType)!==-1?envBuildType:"commonjs";

    return overrideGen(config, env, buildType, "my-eos."+buildType+".js");

  }

}
function overrideGen(config, env, libraryTarget, outFile) {
  config =  Object.assign(config, {}, {output: Object.assign({}, config.output,{})});
  findAndFixCSSPath(config, "my-eos.css");
  
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
      },
    };

    const libraryName = "MyEOS"
    const outDir = "./build";
    /**
     * add library configurations to webpack config
     */
    config.output.library = libraryName;
    config.output.libraryTarget = libraryTarget;
    /**
     * Change the webpack entry and output path
     */
    //config.entry = { [libraryName]: path.resolve(__dirname,entryFile) };
    
    config.entry = [
      path.resolve(curDir, "./src/libEntryPoint.js"),
    ]
    config.output.filename = outFile;
    config.output.path = path.resolve(__dirname, outDir);
    
  return config;
}
module.exports = override;