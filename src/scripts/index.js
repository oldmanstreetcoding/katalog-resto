import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import Utils from './utils/utils';
import Routing from './routing/routing';
import swRegister from './utils/sw-register';

document.addEventListener('DOMContentLoaded', () => {
  Routing.pageActive();

  Routing.btnNavigate();

  Routing.btnBrand();

  Utils.toggleDrawer();

  Utils.btnGoUp();

  swRegister();
});
