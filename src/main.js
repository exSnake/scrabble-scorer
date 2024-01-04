import { createApp } from "vue";
import { createPinia } from "pinia";
import { variantJS } from "@variantjs/vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
import Vue3Toasity from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  MdPauseRound,
  MdPlayarrowRound,
  MdRestartaltRound,
} from "oh-vue-icons/icons";

addIcons(MdRestartaltRound, MdPauseRound, MdPlayarrowRound);
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "flowbite";

const app = createApp(App);
const configuration = {
  //...
};

app.component(VueCountdown.name, VueCountdown);
app.component("v-icon", OhVueIcon);
app.use(variantJS, configuration);
app.use(Vue3Toasity, { autoClose: 3000 });
app.use(createPinia());
app.use(router);

app.mount("#app");
