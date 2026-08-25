import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
  title: 'OreUI VitePress',
  description: 'A theme inspired by Spectrollay Ore UI & Minecraft Bedrock design system',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3C8527' }]
  ],

  vite: {
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, '../../theme')
      }
    }
  },

  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'OreUI',

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Components', link: '/components/buttons' },
      { text: 'Sounds', link: '/components/sound-effects' },
      { text: 'Changelog', link: '/changelog/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is OreUI?', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Typography', link: '/guide/typography' },
            { text: 'Color System', link: '/guide/colors' }
          ]
        }
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Buttons', link: '/components/buttons' },
            { text: 'Form Controls', link: '/components/controls' },
            { text: 'Messages & Modals', link: '/components/messages' },
            { text: 'Containers & Cards', link: '/components/containers' },
            { text: 'Badges & Tags', link: '/components/badges-tags' },
            { text: 'Sound Effects', link: '/components/sound-effects' }
          ]
        }
      ],
      '/changelog/': [
        {
          text: 'Version History',
          items: [
            { text: 'Changelog', link: '/changelog/' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Spectrollay-OreUI/OreUI' }
    ],

    footer: {
      message: 'Based on Spectrollay OreUI & Mojang Bedrock UI Design Language',
      copyright: '© 2026 Spectrollay & OrePress Project'
    },

    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },

    darkModeSwitchLabel: 'Appearance',
    lightModeSwitchTitle: 'Switch to light mode',
    darkModeSwitchTitle: 'Switch to dark mode',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top'
  }
})
