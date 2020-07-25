<template>
  <div>
    <div class="mt-10 px-6 sm:px-10 lg:px-20 xl:px-32 min-h-screen">
      <div>
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">{{ post.title }}</h2>
          <p class="mt-3 mb-6 lg:mb-10 text-light-purple">{{ post.createdAt | toDate }}</p>
          <div class="markdown py-10">
            <nuxt-content :document="post" />
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-3xl mx-auto pt-10 pb-20">
      <PrevNext :surround="surround" />
    </div>
  </div>
</template>

<script>
  import PrevNext from '~/components/PrevNext'

  export default {
  components: {
    PrevNext
  },
  async asyncData ({ $content, params }) {
    const post = await $content('blog', params.slug).fetch()
    const surround = await $content('blog')
      .sortBy('createdAt', 'asc')
      .only(['title', 'path', 'createdAt'])
      .surround(post.slug).fetch()
          console.log(post)

    return { post, surround }
  },
  head(){
      return{
        title: 'Oke Michael - ' + this.post.title,
        meta : [
          { hid: 'description', name: 'description', content: this.post.body.children[0].children[0].value.substring(0, 100) },
          { name: 'keywords', content: ['Oke Michael','Mykelcodex','Michael Oke','Software Engineer in Nigeria','Software','Laravel Developer','Vuejs Developer','Open Source','Develop Community','PHP','Javascript'] },
          { name: 'robots', content: 'all' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: this.post.title },
          { name: 'twitter:description', content: this.post.body.children[0].children[0].value.substring(0, 100) + '...' },
          { name: 'twitter:site', content: '@mykelcodex' },
          { name: 'twitter:creator', content: '@mykelcodex' },
        ],
        link:[
          {
            rel: 'canonical',
            href: 'https://mykeel.dev' + this.post.path
          }
        ]
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>