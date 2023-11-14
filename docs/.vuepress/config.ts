import {defineUserConfig} from 'vuepress'
import {defaultTheme} from 'vuepress'


// https://v2.vuepress.vuejs.org/zh/reference/default-theme/config.html
export default defineUserConfig({
    base: '/',
    lang: 'zh-CN',
    title: 'Dayang\'s Blog',
    description: '每天进步一点点',
    head: [['link', {rel: 'icon', href: '/images/logo.png'}]],
    theme: defaultTheme({
        // 导航栏中 Logo 的链接，404 页面的 返回首页 链接
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
            {
                text: '文章',
                children:[
                    '/blog/design.md',
                    '/blog/banner.md'
                ]
            },
            // 嵌套 Group - 最大深度为 2
            {
                text: 'Java',
                children: [
                    {
                        text: 'JavaSE',
                        children: ['Lambda', '初级', '中级', '高级',],
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
                    '/tool/chfs.md',
                    '/tool/nginx.md',
                    '/tool/nexus.md',
                    '/tool/docker.md'
                ],
            },
            {
                text: '小抄',
                link: '/guide/xiaochao.md'
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
        // Public文件路径 Logo 图片将会显示在导航栏的左端
        logo: '/images/hero.jpg',
        logoDark: '',
        repo: 'https://gitee.com/qs23/vuepress',
        // 如果你设置为 'auto'，侧边栏会根据页面标题自动生成。
        sidebar: 'auto',
        sidebarDepth: 1,
        editLinkText: '在 Gitee 上编辑此页',
        docsRepo: 'https://gitee.com/qs23/vuepress',
        docsBranch: 'main',
        docsDir: 'docs',
        editLinkPattern: ':repo/blob/:branch/:path',
        lastUpdated: true,
        lastUpdatedText: '上次更新',
        contributors: true,
        contributorsText: '贡献者',
        notFound: [
            '这里什么都没有',
            '我们怎么到这来了？',
            '这是一个 404 页面',
            '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',



    }),
})