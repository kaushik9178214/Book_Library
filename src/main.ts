import { createApp } from "vue";
import "mdb-vue-ui-kit/css/mdb.min.css";
import App from "./App.vue";
import { createPinia } from "pinia";
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.mount("#app");
