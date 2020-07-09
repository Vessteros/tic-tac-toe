window.Vue = require('vue');

/** Библиотеки */
Vue.use(
    require('element-ui'),
    require('element-ui/lib/locale/lang/en')
);
Vue.use(require('element-ui/lib/theme-chalk/index.css'));
/** /Библиотеки */

/** Кастомные */
import Cell from "./classes/cell";
Vue.prototype.Cell = Cell;

import CellGrid from "./classes/cell-grid";
Vue.prototype.CellGrid = CellGrid;

import CellLinksList from "./classes/cell-links-list";
Vue.prototype.CellLinksList = CellLinksList;

import {config} from "./helpers/config";
Vue.prototype.$config   = config;

import {eventbus} from "./helpers/eventbus";
Vue.prototype.$eventBus = eventbus;
/** /Кастомные */

Vue.component('tic-tac-toe', require('./components/game.vue').default);
Vue.component('player', require('./components/player.vue').default);
Vue.component('cell', require('./components/cell.vue').default);

const app = new Vue({
    el: '#game',
});