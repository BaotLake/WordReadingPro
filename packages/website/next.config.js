// const withPWA = require('next-pwa')

module.exports = {
    future: {
        webpack5: true,
    },
    pageExtensions: ['tsx', 'ts', 'mdx'],
    webpack: (config, options) => {
        config.module.rules.push({
            resourceQuery: /raw/,
            type: 'asset/source',
        })

        return config
    },
}
