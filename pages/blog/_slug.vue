<template>
  <div>
    <div class="mt-10 px-6 sm:px-10 lg:px-20 xl:px-32 min-h-screen">
      <div>
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl md:text-3xl lg:text-4xl text-white font-semibold">{{ post.title }}</h2>
          <div class="flex items-center mt-3 mb-6 lg:mb-5">
            <svg class="text-light-purple stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="text-light-purple ml-2">{{ post.createdAt | toDate }}</p>
          </div>
          <div class="markdown py-5">
            <nuxt-content :document="post" />
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-3xl mx-auto pt-5 pb-8 px-6 sm:px-0">
      <div id="disqus_thread"></div>
    </div>
    <div class="max-w-3xl mx-auto pt-10 pb-8 md:pb-16">
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
          { hid: 'description', name: 'description', content: this.post.description.substring(0, 100) },
          { name: 'keywords', content: ['Oke Michael','Mykelcodex','Michael Oke','Software Engineer in Nigeria','Software','Laravel Developer','Vuejs Developer','Open Source','Develop Community','PHP','Javascript'] },
          { name: 'robots', content: 'all' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: this.post.title },
          { name: 'twitter:description', content: this.post.description.substring(0, 100) + '...' },
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
    mounted(){
      var disqus_config = function () {
        this.page.url = this.window.location.href;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = this.post.title; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
      };
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://portfolio-0co0yvrx0g.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    }

  }
</script>

<style lang="scss" scoped>

</style>