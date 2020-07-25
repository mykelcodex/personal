<template>
  <div class="PrevNext flex justify-between">
    <div>
      <nuxt-link v-if="surround[0]" :to="surround[0].path" class="PrevNext-prev">
        <div class="flex max-w-xs px-4 py-4 rounded-md hover:shadow text-light-purple hover:bg-yellow hover:text-white border-2 border-yellow transition ease-out duration-700">
          <div>
            <svg width="24" class="stroke-current" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 16L3 12M3 12L7 8M3 12L21 12" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="ml-3 hidden md:block">
            <p>{{ surround[0].title.substring(0, 30) + '...' }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div>
      <nuxt-link v-if="surround[1]" :to="surround[1].path" class="PrevNext-next">
        <div class="flex max-w-xs px-4 py-4 rounded-md hover:shadow text-light-purple hover:bg-yellow hover:text-white border-2 border-yellow transition ease-out duration-700">
          <div class="mr-3 hidden md:block">
            <p>{{ surround[1].title.substring(0, 30) }}</p>
          </div>
          <div>
            <svg width="24" class="stroke-current" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 8L21 12M21 12L17 16M21 12L3 12" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    surround: {
      type: Array,
      default () { return [] }
    }
  }
}
</script>