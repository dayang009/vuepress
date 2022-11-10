import { defineUserConfig } from 'vuepress'
import { defaultTheme } from 'vuepress'

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'Dayang\'s Blog',
  description: '每天进步一点点',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  theme: defaultTheme({
    colorMode: 'auto',
    colorModeSwitch: true,
    home: '/',
    navbar: [
      // NavbarItem
      {
          text: '首页',
          link: '/',
      },
      // NavbarGroup
      {
          text: 'Spring',
          children: [
              '/spring/spring5.md',
              '/spring/spring-boot.md',
              '/spring/spring-mvc.md',
              ],
      },
      // 嵌套 Group - 最大深度为 2
      {
          text: 'Java',
          children: [
              {
                  text: 'JavaSE',
                  children: ['Lambda', '初级', '中级', '高级', ],
              },
              {
                  text: 'JavaWeb',
                  children: ['Html', 'CSS', 'Js', 'Servlet'],
              },
          ],
      },
      {
          text: '工具',
          children: [
              '/tool/git.md',
              '/tool/linux.md',
              '/tool/chfs.md'
          ],
      },
      // 控制元素何时被激活
      {
          text: 'Java 2',
          children: [
              {
                  text: 'Always active',
                  link: '/',
                  // 该元素将一直处于激活状态
                  activeMatch: '/',
              },
              {
                  text: 'Active on /foo/',
                  link: '/not-foo/',
                  // 该元素在当前路由路径是 /foo/ 开头时激活
                  // 支持正则表达式
                  activeMatch: '^/foo/',
              },
          ],
      },



  ],
    // Public文件路径
    logo: '/images/hero.png',
    logoDark: '',
    repo: 'https://gitee.com',
    
  }),
})