import Vue from "vue";
//import store from "@/store";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "application-title",
      description: "application description"
    }
  },
  // {
  //   path: "/choose-your-story",
  //   name: "menu",
  //   component: StoryMenu
  // },
  {
    path: "/story",
    name: "story",
    meta: {
      title: "story title",
      description: "story description"
    },
    component: () =>
      import(/* webpackChunkName: "story" */ "../views/Story.vue"),
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
    }
  },
  { path: "*", redirect: "/" }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
/* eslint-disable no-unused-vars */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", to.meta.description);
  next();
});

export default router;
