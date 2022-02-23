module.exports = {
  platformName: '', // admin, tenant
  publicPath: '/',
  basePath: '/plugin-example',
  client: {
    documentTitle: '',
  },
  api: {
    basePath: '/apis',
  },
  // development
  server: {
    port: '3099',
  },
  builder: {
    generateSourcemap: false, // production
  },
  plugin: {
    identify: {
      plugin_id: 'console-plugin-example',
      entries: [
        {
          id: '',
          name: '',
          icon: '',
          path: '',
          entry: '',
        },
      ],
      dependence: [{ id: '', version: '' }],
    },
  },
};
