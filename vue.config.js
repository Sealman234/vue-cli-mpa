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
    product: {
      entry: 'src/pages/product/main.js',
      template: 'public/index.html',
      filename: 'product.html',
      title: 'Product Page',
      chunks: ['chunk-vendors', 'chunk-common', 'product'],
    },
  },
};
