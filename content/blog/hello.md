---
title: Build a JAMStack website with Nuxt, Nuxt Content Module ans Forestry
description: A step by step guide to build a static site with Nuxt, the Nuxt Content
  module and Forestry as a headless CMS. JAMstack ready!

---
Static website with Nuxt & Forestry as a headless CMS

```js
head () {
    return {
      title: 'Oke Michael | Software Engineer',
      meta: [
        { hid: 'description', name: 'description', content: 'Hello! My name is Oke Michael, i am a software engineer based in Nigeria. I spend most of time on the web which means i focus majorly on the web.' },
        { name: 'keywords', content: ['Oke Michael','Mykelcodex','Michael Oke','Software Engineer in Nigeria','Software','Laravel Developer','Vuejs Developer','Open Source','Develop Community','PHP','Javascript'] },
        { name: 'robots', content: 'all' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Oke Michael - Software Engineer' },
        { name: 'twitter:description', content: 'Hello! My name is Oke Michael, i am a software engineer based in Nigeria. I focus majorly on the web..' },
        { name: 'twitter:site', content: '@mykelcodex' },
        { name: 'twitter:image', content: 'https://competent-dijkstra-85c176.netlify.app/images/homepage.png' },
        { name: 'twitter:creator', content: '@mykelcodex' },
      ],
    }
  }
}
```