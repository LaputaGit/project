var path = require('path');
var webpack = require('webpack');
var publicPath = path.resolve(__dirname, 'public');

// css文件单独加载
// css文件全部被打包在bundle.js一个文件里面。这可不是一件好事，后续代码量一上来，文件越来越胖
// 所以，我们需要把css文件单独打包出来。
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// 引用这个plugin:将html也进行统一产出
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 区分环境的标识 definePlugin 会把定义的string 变量插入到Js代码中。
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
    entry: {
        main: [
            path.resolve(__dirname, 'app/main.js')
        ],

        // vendor: [
        //     'react', 
        //     'react-dom'
        // ]
    },
    output: {
        path: publicPath,
        // ?[hasn]我们的开发的产品最终是要上线的，添加文件hash可以解决由于缓存带来的问题，
        // 所以我们需要试着给文件加上hash。其实很简单，在文件的后面加上?[hash]就行，当然，这也是简单的写法。
        filename: '[name].js?[hash]',
        publicPath: "/assets/" // 你require的路径
    },
	resolve: {
	      extension: ['', '.js', '.jsx', '.json']
    },
    module: {
    	loaders: [
    		{
		 		test: /\.js$/,
          		loader: 'babel-loader'
    		},
    		{
			      test: /\.css/,
			      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		    },
    		{
    			test: /\.sass/,
	      		loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
    		},
    		{
			    test: /\.(png|jpg)$/,
			    loader: 'url-loader?limit=8192'
		  	}
    	]
    },

    postcss: [
        require('autoprefixer')//调用autoprefixer插件
    ],

    plugins: [
    	new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoErrorsPlugin(),


        // 修改webpack配置中的entry入口，并且添加CommonsChunkPlugin插件抽取出第三方资源
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js?[hash]'),

        new HtmlWebpackPlugin({
                title: 'pic-react',
                template: './app/index.html',
        }),

        definePlugin,

        // 优化插件
        // OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
        new webpack.optimize.OccurenceOrderPlugin(),

        // UglifyJsPlugin：压缩JS代码；
        new webpack.optimize.UglifyJsPlugin(),

    	// 分离CSS和JS文件 new ExtractTextPlugin("bundle.css"),
        new ExtractTextPlugin("[name].css?[hash]", {
             allChunks: true,
             disable: false
         }),
    ],

    devServer: {
	    contentBase: "./public",//本地服务器所加载的页面所在的目录
	    port: 3032,
	    hot:true,
	    progress:true,
	    colors: true,//终端中输出结果为彩色
	    historyApiFallback: true,//不跳转
	    inline: true//实时刷新
  	} 
};