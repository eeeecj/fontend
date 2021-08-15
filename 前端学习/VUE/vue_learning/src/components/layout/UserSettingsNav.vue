<template>
  <div class="us_nav">
      <router-link to="/setting/emails">emails</router-link>
      <router-link to="/setting/profile">profile</router-link>
  </div>
</template>

<script>
export default {
name:"UserSettingNav",

}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))
wait(1000).then(()=>console.log('a'))
const wait2=ms=>new Promise((resolve,reject)=>setTimeout(resolve(),ms))
</script>
<style>
.us__nav {
  grid-area: nav;
  border: 1px dotted;
  margin-right: .75rem;
  padding: .3rem;
}
</style>