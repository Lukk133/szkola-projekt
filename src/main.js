import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import axios from "axios";

axios.defaults.baseURL = "http://api.oskmanager.pl/api";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount("#app");
