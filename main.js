// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "./uni_modules/uview-ui";
import {
	serverUrl,
	sendRequest
} from "./common/js/utils.js"
import iconfont from '@/components/zgwit-iconfont/iconfont.vue'
import '@/components/zgwit-iconfont/iconfont.css'
Vue.use(uView);

Vue.config.productionTip = false;
Vue.prototype.serverUrl = serverUrl;
Vue.prototype.sendRequest = sendRequest;

App.mpType = 'app';

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'

export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
