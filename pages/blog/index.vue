<template>
  <div>
    <div class="mt-8 lg:mt-10 px-6 sm:px-10 lg:px-20 xl:px-32">
      <div class="lg:mt-10">
        <div class="text-white">
          <h2 class="text-2xl lg:text-4xl font-bold">Posts</h2>
          <div class="border-2 border-yellow w-12"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 mb-56">
        <div class="bg-purple-dark rounded overflow-hidden shadow-xl flex " v-for="(post, index) in posts" :key="index">
          <div class="flex-1 flex flex-col justify-between">
            <div class="text-white mt-2 p-3">
              <nuxt-link :to="post.path"><h2 class="text-xl xl:text-2xl font-bold">{{ post.title }}</h2></nuxt-link>
              <nuxt-link :to="post.path"><div class="mt-2 font-light text-light-purple">{{ post.description.substring(0, 170) + '...' }}</div></nuxt-link>
            </div>
            <div class="flex items-center border-t border-yellow py-2 px-3">
              <svg class="text-light-purple stroke-current" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="ml-2 text-light-purple text-sm">{{ post.createdAt | toDate }}</p>
            </div>
          </div>
        </div>
      </div>  
    </div>
    <div>
    <NuxtLink v-if="prev" :to="`blog/${prev.slug}`">
      {{ prev.title }}
    </NuxtLink>

    <NuxtLink v-if="next" :to="`blog/${next.slug}`">
      {{ next.title }}
    </NuxtLink>
  </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $content,params }) {
    const posts = await $content('blog').sortBy('createdAt','desc').fetch()
    const [prev, next] = await $content('blog')
      .only(['title', 'slug','createdAt','description'])
      .surround(params.slug)
      .fetch()
    return { posts,prev, next }
  },
  head(){
      return{
        title: 'Oke Michael - Software Engineer',
        meta: [
          { hid: 'description', name: 'description', content: 'Blog posts' },
          { hid: 'keywords', name: 'keywords', content: ['PHP','Javascript','VueJS','Laravel','ReactJS','Lodash','NuxtJS','WebSocket','InertiaJS'] },
          { hid: 'robots', name: 'robots', content: 'all' },
          { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
          { hid: 'twitter:title', name: 'twitter:title', content: 'Oke Michael - Software Engineer' },
          { hid: 'twitter:description', name: 'twitter:description', content: 'Hello! My name is Oke Michael, i am a software engineer based in Nigeria. I focus majorly on the web..' },
          { hid: 'twitter:site', name: 'twitter:site', content: '@mykelcodex' },
          { hid: 'twitter:image', name: 'twitter:image', content: 'https://mykeel.dev/images/homepage.jpg' },
          { hid: 'twitter:creator', name: 'twitter:creator', content: '@mykelcodex' },
        ],
        link:[
          {
            rel: 'canonical',
            href: 'https://mykeel.dev'
          }
        ]
      }
    },
}
</script>

<style lang="scss" scoped>

</style>