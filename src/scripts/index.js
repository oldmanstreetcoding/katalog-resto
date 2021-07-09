import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main-minify.css';
import Utils from './utils/utils';
import Routing from './routing/routing';
import swRegister from './utils/sw-register';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

document.addEventListener('DOMContentLoaded', () => {
  Routing.pageActive();

  Routing.btnNavigate();

  Routing.btnBrand();

  Utils.toggleDrawer();

  Utils.btnGoUp();

  swRegister();
});
