const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = {
    title: 'Hurley\'s 校招面经',
    description: 'Campus Recruitment Interview Experience',
    keywords: 'interview, campus recruitment, java',
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
            { text: 'Java', link: '/java/关键字' },
            { text: 'Android', link: '/android/Activity' },
            { text: '操作系统', link: '/os/' },
            { text: '计算机网络', link: '/network/' },
            { text: '数据库', link: '/sql/' },
            {
                text: '关于我',
                items: [
                    { text: 'Blog', link: 'https://blog.hurley.fun' },
                    { text: 'Tech Site', link: 'https://tech.hurley.fun' },
                    { text: 'Portfolio', link: 'https://hurley.fun' }
                ]
            }
        ],
        docsDir: 'docs',
        docsBranch: 'master',
        lastUpdated: '上次更新',
        repo: 'HurleyJames/interview-vuepress',
        repoLabel: 'Github',
        editLinks: true,
        editLinkText: '在Github上编辑此页',
        smoothScroll: true,
        // sidebar: loadSidebarContents(),
        sidebar: {
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