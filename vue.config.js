process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          swSrc: './public/service-worker.js'
        },
      }
}