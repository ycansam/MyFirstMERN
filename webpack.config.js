// que archivo ha de convertir
module.exports = {
    entry: './src/app/index.js', // entrada a convertir
    output: {
        path: __dirname + '/src/public', // ruta
        filename: 'bundle.js' // codigo convertido
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};