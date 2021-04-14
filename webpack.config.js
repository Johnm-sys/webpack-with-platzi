const path = require('path');   
const htmlWebpackPlugin = require('html-webpack-plugin');   // plugin para utilizar html en webpack
const MiniCssExtracPlugin = require('mini-css-extract-plugin'); //Plugin para manejar css
const CopyPlugin = require('copy-webpack-plugin');       //Plugin para copiar archivos 
const TercerPlugin = require('terser-webpack-plugin');      // plugin de optimizacion javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //plugin de optimizacion Css
const DotEnv = require('dotenv-webpack');               //Manejo de variables de entorno con webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin');     //Limpieza de codigo al ejecutarse

module.exports = {
    entry: './src/index.js',    // entrada del proyecto
    output: {
        path: path.resolve(__dirname, 'dist'),  // carpeta de salida
        filename: '[name].[contenthash].js',                    // nombre del proyecto de salida
        assetModuleFilename: "images/[hash][ext][query]",
    },  
    resolve:{
        extensions:['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@style': path.resolve(__dirname, 'src/styles/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
             {
                test: /\.m?js$/, //nos leerá los archivos .mjs o js
                exclude: /node_modules/,    //excluira la carpeta node modules
                use: {
                    loader: 'babel-loader'  // lo que usa para leer estos archivos
                }
            },
            {
                test: /\.s?css/i,
                use: [MiniCssExtracPlugin.loader,
                'css-loader',
                'sass-loader']
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        minetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./asset/fonts/",
                        publicPath: "../asset/fonts/",
                        esModule: false,
                    }
                }
            }
        ],
    },
    plugins: [      // se agrega la seccion de plugins
        new htmlWebpackPlugin({     // se envia la configuracion que va a utilizar
            inject: true,           // hace la inserción de los elementos
            template: './public/index.html',     // el template que va a complilar
            filename: 'index.html',     // nombre estandar de salida
        }),
        new MiniCssExtracPlugin(      //Para usar el css
            {
                filename: 'asset/[name].[contenthash].css'
            }
        ),
        new CopyPlugin({                // para copiar imagenes
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),  // donde buscara la imagen
                    to: "asset/images"                                  // donde guarda la imagenes
                }
            ]
        }),
        new DotEnv(),
        new CleanWebpackPlugin()
        
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TercerPlugin()
        ]
    }
}