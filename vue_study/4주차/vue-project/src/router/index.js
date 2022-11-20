import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/databinding/string",
      name: "DataBindingStringView",
      component: () =>
        import("../views/1_databinding/DataBindingStringView.vue"),
    },
    {
      path: "/databinding/html",
      name: "DataBindingHtmlView",
      component: () => import("../views/1_databinding/DataBindingHtmlView.vue"),
    },
    {
      path: "/databinding/input",
      name: "DataBindingInputView",
      component: () =>
        import("../views/1_databinding/DataBindingInputView.vue"),
    },
    {
      path: "/databinding/select",
      name: "DataBindingSelectView",
      component: () =>
        import("../views/1_databinding/DataBindingSelectView.vue"),
    },
    {
      path: "/databinding/checkbox",
      name: "DataBindingCheckboxView",
      component: () =>
        import("../views/1_databinding/DataBindingCheckboxView.vue"),
    },
    {
      path: "/databinding/radio",
      name: "DataBindingRadioView",
      component: () =>
        import("../views/1_databinding/DataBindingRadioView.vue"),
    },
    {
      path: "/databinding/attr",
      name: "DataBindingAttributeView",
      component: () =>
        import("../views/1_databinding/DataBindingAttributeView.vue"),
    },
    {
      path: "/databinding/list",
      name: "DataBindingListView",
      component: () => import("../views/1_databinding/DataBindingListView.vue"),
    },
    {
      path: "/databinding/class",
      name: "DataBindingClassView",
      component: () =>
        import("../views/1_databinding/DataBindingClassView.vue"),
    },
    {
      path: "/databinding/style",
      name: "DataBindingStyleView",
      component: () =>
        import("../views/1_databinding/DataBindingStyleView.vue"),
    },
    {
      path: "/event/click",
      name: "EventClickView",
      component: () => import("../views/2_event/EventClickView.vue"),
    },
    {
      path: "/event/change",
      name: "EventChangeView",
      component: () => import("../views/2_event/EventChangeView.vue"),
    },
    {
      path: "/event/key",
      name: "EventKeyView",
      component: () => import("../views/2_event/EventKeyView.vue"),
    },
  ],
});

export default router;
