module.exports = {
  filenameHashing: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    list: {
      entry: 'src/pages/list/main.js',
      template: 'public/index.html',
      filename: 'list.html',
      title: 'List Page',
      chunks: ['chunk-vendors', 'chunk-common', 'list'],
    },
    success: {
      entry: 'src/pages/success/main.js',
      template: 'public/index.html',
      filename: 'success.html',
      title: 'Success Page',
      chunks: ['chunk-vendors', 'chunk-common', 'success'],
    },
  },
};
