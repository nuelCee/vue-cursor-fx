const IS_DEV = process.env.NODE_ENV !== 'production'
    , BASE_URL = (
        ! IS_DEV
            ? process.env.BASE_URL
            : '/'
    )
;

module.exports = {
    publicPath: BASE_URL,
    lintOnSave: IS_DEV,
    productionSourceMap: false,
    configureWebpack: {
        output: {
            libraryExport: 'default',
        },
    },
    chainWebpack(
        config,
    ) {

        config.resolve.symlinks(
            false,
        );

        config
            .module
            .rule(
                'vue',
            )
            .use(
                'vue-loader',
            )
            .loader(
                'vue-loader',
            )
            .tap(
                options => {

                    options.compilerOptions.preserveWhitespace = false;
                    options.compilerOptions.whitespace = 'condense';

                    return options;

                },
            )
        ;

        config.module
            .rule(
                'md',
            )
            .test(
                /\.md/,
            )
            .use(
                'vue-loader',
            )
            .loader(
                'vue-loader',
            )
            .end()
            .use(
                'vue-markdown-loader',
            )
            .loader(
                'vue-markdown-loader/lib/markdown-compiler',
            )
            .options(
                {
                    wrapper: 'article',
                    raw: true,
                    breaks: true,
                    typographer: true,
                    preventExtract: true,
                },
            )
        ;

    },
};
