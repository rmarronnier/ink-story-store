import Vue from "vue";
//import store from "@/store";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/choose-your-story",
  //   name: "menu",
  //   component: StoryMenu
  // },
  {
    path: "/story",
    name: "story",
    // beforeRouteEnter(to, from, next) {
    //   if (store.getters.currentStory == null) {
    //     console.log("I should go home");
    //     next({ name: 'home' });
    //   }
    // },
    // beforeRouteUpdate(to, from, next) {
    //   if (store.getters.currentStory == null) {
    //     console.log("I should go home");
    //     next({ name: 'home' });
    //   }
    // },
    beforeRouteLeave() {
      //this.$store.dispatch("saveCurrentStoryState");
      this.$modal.hide("ask-for-payment");
    },
    component: () =>
      import(/* webpackChunkName: "story" */ "../views/Story.vue")
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
