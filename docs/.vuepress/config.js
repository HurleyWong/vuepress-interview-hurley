const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = {
    title: 'Hurley\'s 校招面经',
    description: 'Campus Recruitment Interview Experience',
    keywords: 'interview, campus recruitment, java, android',
    markdown: {
        // 代码显示行号
        // lineNumbers: true,
    },
    author: 'Hurley Huang',
    head: [
        ['link', { rel: 'icon', href: '/icon.png' }]
    ],
    plugins: [
        ['@vuepress/back-to-top'],
        ['@vuepress/medium-zoom'],
        ['@maginapp/vuepress-plugin-katex', {
            delimiters: 'dollars'
        }],
        // ['vuepress-plugin-mathjax', {
        //     target: 'svg',
        //     macros: {
        //         '*': '\\times',
        //     },
        // }],
        [
            'vuepress-plugin-container',
            {
                type: 'callout',
                before: info => `<div class="callout"><p class="title">${info}</p>`,
                after: '</div>',
            },
        ],
        [
            'vuepress-plugin-container',
            {
                type: 'tree',
                before: `<pre class="tree"><code>`,
                after: `</code></pre>`,
            },
        ],
        ['vuepress-plugin-code-copy', {
            color: "#737378",
            backgroundTransition: false,
        }]
    ],
    theme: 'book',
    themeConfig: {
        search: true, //搜索
        searchMaxSuggestions: 10,
        // sidebarDepth: 2,
        nav: [ // 导航栏配置
            { text: '文档首页', link: '/index/' },
            { text: '面经', link: '/interview/Offer' },
            { text: 'Java', link: '/java/关键字' },
            { text: 'JVM', link: '/jvm/运行时数据区域' },
            { text: 'Android', link: '/android/Activity' },
            { text: '操作系统', link: '/os/' },
            { text: '计算机网络', link: '/network/' },
            { text: '数据库', link: '/database/数据库类型' },
            { text: '数据结构', link: '/datastructure/基本概念' },
            { text: '算法（LeetCode）', link: '/algo/Easy' },
            {
                text: '关于我',
                items: [
                    { text: 'Homepage', link: 'https://hurleywong.com'},
                    { text: 'Blog', link: 'https://blog.hurleywong.com' },
                    { text: 'Portfolio', link: 'https://portfolio.hurleywong.com' },
                    { text: 'Soul', link: 'https://soul.hurleywong.com' },
                    { text: 'Notes', link: 'https://notes.hurleywong.com' },
                    { text: 'Article', link: 'https://article.hurleywong.com' },
                ]
            }
        ],
        docsDir: 'docs',
        docsBranch: 'master',
        lastUpdated: '上次更新',
        repo: 'HurleyWong/vuepress-interview-hurley',
        repoLabel: 'Github',
        editLinks: true,
        editLinkText: '在Github上编辑此页',
        smoothScroll: true,
        // sidebar: loadSidebarContents(),
        sidebar: {
            '/interview/': [
                'Offer',
                '微博',
                '海康威视',
                '中信银行信用卡中心',
                '交行软开',
                '小米',
                '永辉',
                '浙商银行',
                '格力',
                '金山WPS',
                '农行数据中心',
                '58同城',
                '多益网络',
                '墨迹天气',
                '新浪',
                '字节跳动',
                '微信读书',
                '阿里飞猪',
                '三七互娱',
                'Taptap'
            ],
            '/java/': [
                '关键字',
                'Objects通用方法',
                'String',
                '类型',
                '反射',
                '序列化',
                '异常',
                '泛型',
                '注解',
                '特性',
                'IO流',
                '集合框架',
                '线程',
                '23种设计模式'
            ],
            '/jvm/': [
                '运行时数据区域',
                'HotSpot虚拟机对象',
                '垃圾回收算法',
                '垃圾收集器'
            ],
            '/android/': [
                'Activity',
                'Fragment',
                'Service',
                'BroadcastReceiver',
                'ContentProvider',
                '数据存储',
                'Bitmap',
                'Handler',
                'AsyncTask',
                '线程',
                '网络框架',
                'View',
                'Animation',
                'Window',
                'Layout',
                '事件',
                '设计模式'
            ],
            '/database/': [
                '数据库类型',
                '存储过程',
                '触发器',
                '三个范式',
                '视图',
                'SQL语句种类',
                '索引',
                '事务',
                '数据库的乐观锁和悲观锁',
                '超键、候选键、主键、外键',
                'SQL约束',
                '内连接、外连接、全连接',
                '分片、分区、分表、分库',
                '游标',
                '常用SQL语句',
                'ORM',
                '数据库连接池',
                'B树和B+树',
                'MySQL',
                'SQL优化'
            ],
            '/datastructure/': [
                '基本概念',
                '哈希表',
                '栈',
                '队列',
                '堆',
                '数组和链表',
                '树',
                '图',
                '排序',
                '查找',
                '动态规划'
            ],
            '/algo/': [
                'Easy',
                'Medium',
                'Hard',
                '非互联网企业'
            ]
        }
    }
}

function loadSidebarContents() {
    const sidebarMap = {};
    const set = new Set();
    glob.sync(`docs/**`)
        .map(dir => dir.replace('docs', ''))
        .filter(dir => path.dirname(dir) !== '.')
        .forEach(dir => set.add(path.dirname(dir)));
    Array.from(set)
        .sort((a, b) => a === b ? 0 : a > b ? -1 : 1)
        .forEach(dir => {
            const filePath = path.resolve(__dirname, `../${dir}/manifest`);
            const manifest = fs.existsSync(`${filePath}.js`) ? require(filePath) : {};
            const sidebarList = loadDirContents(dir.substring(1));
            const sortFn = manifest.sort ? sidebarList.sort : el => el;
            sidebarMap[`${dir}/`] = sortWrapper(sidebarList, sortFn, manifest.sortFn);
        });
    return sidebarMap
}

function loadDirContents(dir) {
    return ['', ...glob.sync(`docs/${dir}/*.md`)
        .map(f => f.replace('docs/', '')
            .replace(dir + '/', '')
            .replace('\.md', ''))
        .filter(e => e !== 'index')
    ];
}

function sortWrapper(iterableObject, sortFn, compareFn) {
    sortFn.call(iterableObject, compareFn);
    return iterableObject;
}