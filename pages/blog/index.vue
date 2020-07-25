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
        <div class="bg-purple-dark rounded overflow-hidden shadow-xl flex" v-for="(post, index) in posts" :key="index">
          <div class="flex-1 flex flex-col justify-between">
            <div class="text-white mt-2 p-3">
              <nuxt-link :to="post.path"><h2 class="text-xl xl:text-2xl font-bold">{{ post.title }}</h2></nuxt-link>
              <nuxt-link :to="post.path"><div class="mt-2 font-light text-light-purple">{{ post.body.children[0].children[0].value.substring(0, 150) + '...' }}</div></nuxt-link>
            </div>
            <div class="inline-flex items-center border-t border-yellow py-2">
              <p class="px-3 text-light-purple text-sm">{{ post.createdAt | toDate }}</p>
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
    const posts = await $content('blog').sortBy('createdAt').fetch()
    const [prev, next] = await $content('blog')
      .only(['title', 'slug','createdAt','description'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()
    return { posts,prev, next }
  },
  head(){
      return{
        title: 'Oke Michael - Software Engineer',
        meta: [
          { hid: 'description', name: 'description', content: 'Blog posts' },
          { name: 'keywords', content: ['PHP','Javascript','VueJS','Laravel','ReactJS','Lodash','NuxtJS','WebSocket','InertiaJS'] },
          { name: 'robots', content: 'all' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: 'Oke Michael - Software Engineer' },
          { name: 'twitter:description', content: 'Hello! My name is Oke Michael, i am a software engineer based in Nigeria. I focus majorly on the web..' },
          { name: 'twitter:site', content: '@mykelcodex' },
          { name: 'twitter:image', content: 'https://mykeel.dev/images/homepage.png' },
          { name: 'twitter:creator', content: '@mykelcodex' },
        ],
        link:[
          {
            rel: 'canonical',
            href: 'https://omike.me'
          }
        ]
      }
    },
}
</script>

<style lang="scss" scoped>

</style>