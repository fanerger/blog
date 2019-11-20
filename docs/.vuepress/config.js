// dcos/.vuepress/config.js
module.exports = {
  title: "van blog",
  description: "van的个人博客",
  base: '/blog/',
  themeConfig: {
    // 添加导航栏
    nav: [
      { text: '文档', link: 'https://vuepress.vuejs.org/zh/' },
      // { text: 'react', link: '/react/' },
      {
        text: 'github',
        // 这里是下拉列表展现形式。
        items: [
          { text: 'focus-outside', link: 'https://github.com/txs1992/focus-outside' },
          { text: 'stylus-converter', link: 'https://github.com/txs1992/stylus-converter' }
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar: [
      {
        title: 'vue',
        children: [
          '/vue/'
        ]
      },
      {
        title: 'react',
        children: [ '/react/redux' ]
      },
      {
        title: 'node.js',
        children: [ '/nodeJs/node.js操作git' ]
      },
      {
        title: 'nest+ts',
        children: [ '/nest/typescript' ]
      }
    ]
  }
}
