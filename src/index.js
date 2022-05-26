import './styles/theme.scss';

import App from './components/App.vue';
import { createApp } from 'vue';

const body = document.getElementsByTagName('body')[0];
const app = document.createElement('div');
app.setAttribute('id', 'app');
body.insertBefore(app, body.firstChild);

createApp(App).mount('#app');
