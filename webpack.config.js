const nodeExternals = require("webpack-node-externals")

module.exports = [{
    mode:"development",
    entry:"./src/server.js",//打包入口文件用相对路径
    output:{//输出
        path:`${__dirname}/build/`,
        filename:"server.js"
    },
    devtool:"source-map",//为了开发是更方便
    externals:nodeExternals(),
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[{
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            loader:"babel-loader",
            options:{
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties'],
                
            }
        }]
    }
},{
    mode:"development",
    entry:"./src/client.js",//打包入口文件用相对路径
    output:{//输出
        path:`${__dirname}/static/js/`,
        filename:"client.js"
    },
    devtool:"source-map",//为了开发是更方便
    resolve:{
        extensions:['.js','.jsx']
    },
    module:{
        rules:[{
            test:/\.(js|jsx)$/,
            exclude:/node_modules/,
            loader:"babel-loader",
            options:{
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:['@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties'],
                
            }
        }]
    }

}]