module.exports = {
  filenameHashing: false,
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
    },
    list: {
      entry: 'src/pages/list/main.js',
      template: 'public/index.html',
      filename: 'list.html',
      title: 'List Page',
    },
    success: {
      entry: 'src/pages/success/main.js',
      template: 'public/index.html',
      filename: 'success.html',
      title: 'Success Page',
    },
  },
};
