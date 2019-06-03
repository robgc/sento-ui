/*
Copyright (C) 2019 Roberto García Calero (garcalrob@gmail.com)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import Vue from 'vue';
import {
  MdApp, MdDrawer, MdContent, MdIcon, MdCard, MdDivider, MdButton,
  MdEmptyState, MdToolbar, MdList, MdDialog, MdProgress, MdTooltip, MdTable,
  MdTabs, MdAutocomplete, MdField, MdMenu, MdRipple,
}
  from 'vue-material/dist/components/';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(MdApp);
Vue.use(MdDrawer);
Vue.use(MdProgress);
Vue.use(MdContent);
Vue.use(MdIcon);
Vue.use(MdCard);
Vue.use(MdDivider);
Vue.use(MdButton);
Vue.use(MdEmptyState);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdDialog);
Vue.use(MdTooltip);
Vue.use(MdTable);
Vue.use(MdTabs);
Vue.use(MdAutocomplete);
Vue.use(MdField);
Vue.use(MdMenu);
Vue.use(MdRipple);

new Vue({
  render: h => h(App),
}).$mount('#app');
