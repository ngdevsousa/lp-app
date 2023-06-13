import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Router } from 'vue-router';

declare module 'pinia' {
    export interface PiniaCustomProperties {
        router: Router;
    }
}

const pinia = createPinia().use(({ store }) => {
    store.router = markRaw(router);
});

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
