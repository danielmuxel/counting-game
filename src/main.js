import { createApp } from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";
import './assets/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);
app.use(VueKonva);
app.mount("#app");
