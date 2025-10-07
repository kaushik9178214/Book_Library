import { createMemoryHistory, createRouter } from "vue-router";

import HomePageScreen from "../screens/HomePageScreen.vue";

const routes = [{ path: "/", name: "HomePage", component: HomePageScreen }];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
