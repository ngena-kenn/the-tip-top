module.exports = {
    // ... autres configurations
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    module: {
        rules: [
            // ... autres règles
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: /node_modules\/stylis-plugin-rtl/, // Excluez le module problématique
            },
        ],
    },
    ignoreWarnings: [/Failed to parse source map/], // Ignorez les avertissements de source map
};


