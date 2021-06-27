import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import Utils from './utils';
import Routing from './routing.js';

document.addEventListener('DOMContentLoaded', () => {
    
    Routing.activePage();

    Routing.navigateBtn();

    Utils.toggleDrawer()

    Utils.goUpBtn();

});