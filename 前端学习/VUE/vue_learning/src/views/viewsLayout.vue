<template>
  <div class="us">
    <h1>User Setting</h1>
    <user-setting-nav></user-setting-nav>
    <a href="" type="button" @click.prevent="setSession">SetSession</a>
    <router-view class="us__content"></router-view>
    <router-view
      name="helper"
      class="us__content us__content--helper"
    ></router-view>
  </div>
</template>

<script>
import UserSettingNav from "../components/layout/UserSettingsNav.vue";
export default {
  name: "UserSetting",
  components: {
    UserSettingNav,
  },
  methods: {
    setSession(){
      sessionStorage.setItem('user',JSON.stringify({id:'123'}))
    }
    }
};
</script>

<style>
.us{
  display: grid;
  grid-template-columns:auto 1fr;
  grid-template-rows:auto;
  grid-template-areas: "header header" "nav content" "nav helper";
}
.us__content {
  grid-area: content;
}
.us__content--helper {
  grid-area: helper;
}
</style>