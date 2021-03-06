const moment = require('moment')
const langMap = {
  "zh-Hans": "zh-cn",
  "zh-Hant": "zh-tw"
}

var timestampCache = {}

module.exports = {
  base: '/',
  title: 'Shizuku',
  head: [
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,500,700&display=swap'
    }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,500,700&display=swap'
    }],
    ['link', { rel: 'apple-touch-icon', size: '57x57', href: '/icon/apple-icon-57x57.png' }],
    ['link', { rel: 'apple-touch-icon', size: '60x60', href: '/icon/apple-icon-60x60.png' }],
    ['link', { rel: 'apple-touch-icon', size: '72x72', href: '/icon/apple-icon-72x72.png' }],
    ['link', { rel: 'apple-touch-icon', size: '76x76', href: '/icon/apple-icon-76x76.png' }],
    ['link', { rel: 'apple-touch-icon', size: '114x114', href: '/icon/apple-icon-114x114.png' }],
    ['link', { rel: 'apple-touch-icon', size: '120x120', href: '/icon/apple-icon-120x120.png' }],
    ['link', { rel: 'apple-touch-icon', size: '144x144', href: '/icon/apple-icon-144x144.png' }],
    ['link', { rel: 'apple-touch-icon', size: '152x152', href: '/icon/apple-icon-152x152.png' }],
    ['link', { rel: 'apple-touch-icon', size: '180x180', href: '/icon/apple-icon-180x180.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '192x192', href: '/icon/android-icon-192x192.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '32x32', href: '/icon/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '96x96', href: '/icon/favicon-96x96.png' }],
    ['link', { rel: 'icon', type: 'image/png', size: '16x16', href: '/icon/favicon-16x16.png' }]
  ],
  locales: {
    '/': {
      lang: 'en',
      description: 'Let your app use system APIs directly'
    },
    '/zh-hans/': {
      lang: 'zh-Hans',
      description: '????????????????????????????????? API'
    },
    '/zh-hant/': {
      lang: 'zh-Hant',
      description: '??????????????????????????????????????? API'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        sidebar: {
        },
        nav: getNavbar('/', 'Introduction', 'User guide', 'Apps using Shizuku', 'Download', 'Developer guide'),
        lastUpdated: 'Last Updated'
      }
      ,
      '/zh-hans/': {
        selectText: '??????',
        label: '????????????',
        editLinkText: '??? GitHub ???????????????',
        serviceWorker: {
          updatePopup: {
            message: "?????????????????????.",
            buttonText: "??????"
          }
        },
        sidebar: {
        },
        nav: getNavbar('/zh-hans/', '??????', '????????????', '?????? Shizuku ?????????', '??????', '???????????????'),
        lastUpdated: '????????????'
      },
      '/zh-hant/': {
        selectText: '??????',
        label: '????????????',
        editLinkText: '??? GitHub ???????????????',
        serviceWorker: {
          updatePopup: {
            message: "?????????????????????.",
            buttonText: "????????????"
          }
        },
        sidebar: {
        },
        nav: getNavbar('/zh-hant/', '??????', '???????????????', '?????? Shizuku ???????????????', '??????', '???????????????'),
        lastUpdated: '????????????'
      }
    },
    displayAllHeaders: true,
    sidebarDepth: 2,
    serviceWorker: {
      updatePopup: true
    },
    repo: 'https://github.com/RikkaApps/Shizuku',
    docsRepo: 'https://github.com/RikkaApps/websites',
    docsDir: 'shizuku',
    editLinks: true
  },
  plugins: [
    [
      'sitemap',
      {
        hostname: 'https://shizuku.rikka.app',
        exclude: ['/404.html'],
        dateFormatter: (time) => {
          timestampCache[time]
        }
      }
    ],
    [
      'clean-urls',
      {
        normalSuffix: '/',
        indexSuffix: '/',
        notFoundPath: '/404.html'
      }
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          var original = timestamp

          moment.locale(langMap[lang])
          var localized = moment(original).format('lll')
          
          moment.locale('en')
          var iso = moment(original).toISOString()
          timestampCache[localized] = iso

          return localized
        }
      }
    ]
  ]
}

function getNavbar(prefix, introduction, guide, apps, download, dev) {
  return [
    { text: introduction, link: `${prefix}introduction` },
    { text: guide, link: `${prefix}guide/setup.html` },
    { text: dev, link: `https://github.com/RikkaApps/Shizuku/blob/master/README.md` },
    { text: download, link: `${prefix}download.html` },
    { text: apps, link: `${prefix}apps.html` },
  ]
}