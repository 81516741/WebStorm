const path = require('path');

module.exports = {
    entry: './src/lib/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Toast.js'
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader: "vue-loader "
            }
        ]
    },
    plugins: []

};