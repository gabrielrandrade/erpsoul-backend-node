const
    path =
    require(
        'path'
    );
module.exports = {
    // O arquivo de entrada (principal)
    entry: './src/index.js',
    // A pasta e o nome do arquivo de saída (bundle)
    output: {
        filename: 'bundle.js',
        path: path.
        resolve(__dirname,
            'dist'
        ),
    },
    // Definir o modo de produção ou desenvolvimento
    mode: 'production',
    // ou 'development' para modo de desenvolvimento// Módulos de regras (opcional)
    module: {
        rules: [{
            test: /\.js$/,
            // Todos os arquivos .js
            exclude: /node_modules/,
            // Excluindo a pasta node_modules
            use: {
                loader: 'babel-loader',
                // Usando Babel para transpilar o código
            },
        }, ],
    },
};