import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// Call the checkAuth action to set the initial authentication status
store.dispatch('checkAuth').then(() => {
    // Create the Vue app instance after checking the authentication status
    const app = createApp(App);
    app.use(store);
    app.use(router);
    app.mount('#app');
  });
