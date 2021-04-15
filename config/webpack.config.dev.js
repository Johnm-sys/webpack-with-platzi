const path = require('path');       //0°
const HtmlWebpackPlugin = require('html-webpack-plugin'); //16° para trabajar con html 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');   //25° se trae el plugin para trabaar con css

module.exports = {
    entry: './src/index.js',       //1° donde esta la entrada
    output: {                       //2° como va a salir el recurso ya preparado
        path: path.resolve(__dirname, 'build'),  //3° __dirname donde estamos ubicados
        filename: 'bundle.js',          //4° nombre del resultado
    },
    mode: 'development',
    // devtool: 'source-map',
    resolve:{                       //5° que se va a resolver, las extensiones
        extensions: ['.js', '.jsx'] //6° se agregan las extenciones a utilizar
    },
    module: {                       //7° se agregaran las reglas 
        rules:[
            {
                test: /\.(js|jsx)$/,    //8° llamado a estas dos extensiones
                exclude: /node_modules/,        //9° excluir la carperta
                use: {                          //10° que va a usar
                    loader: 'babel-loader',     //11° colocar a babel como loader
                }
            },
            {
                test: /\.html$/,            //17° se crea la regla para las extensiones .html
                use:[                       //18° se indica con que lo va a usar
                    {
                        loader: 'html-loader'       //19° se usa html-loader
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,                 //26° se crea una nueva regla para leer estensiones sass
                use: [
                    MiniCssExtractPlugin.loader , 'css-loader', 'sass-loader'
                ]
                
            }
        ]
    },
    plugins:[                               //20° se agrega el arreglo de plugins
        new HtmlWebpackPlugin({            //21° nueva instancia o nuevo plugin con la configuracion
            template: './public/index.html',   //22° de donde los va a sacar
            filename: './index.html',             //23° lo que va a resultar
        }),                                 //24° se procede crear scripts y provar que funcione
        new MiniCssExtractPlugin({         //28° nombre del resultado
            filename: './[name].css'
        }) 
    ],
    devServer: {                        //12° crear el servedidor 
        contentBase: path.join(__dirname, 'build'),  //13° donde va a buscar
        compress: true,                     //14° si compirme o no
        port: 3004,                          //15° en que puerto va a correr
        open: true,                           //15°A hacerlo que se habra solo
        historyApiFallback: true                //15°B que traiga historias desde el navegador
    }
}