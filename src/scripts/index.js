import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import Utils from './utils';
import Routing from './routing';

document.addEventListener('DOMContentLoaded', () => {
  Routing.pageActive();

  Routing.btnNavigate();

  Utils.toggleDrawer();

  Utils.btnGoUp();
});
