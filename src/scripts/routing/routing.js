/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import PageHome from '../component/pagehome';
import PageFavorite from '../component/pagefavorite';
import PageDetail from '../component/pagedetail';
import Utils from '../utils/utils';

const Router = (page) => {
  if (page === 'favorite') {
    PageFavorite();
  } else {
    PageHome();
  }
};

const pageActive = () => {
  const pageId = localStorage.getItem('showPage');
  if (pageId !== null) {
    PageDetail(pageId);
  } else {
    Router(window.location.hash.split('#')[1]);
  }
};

const btnNavigate = () => {
  const btnNav = document.querySelectorAll('.btn-nav');
  for (let i = 0; i < btnNav.length; i++) {
    btnNav[i].addEventListener('click', () => {
      localStorage.removeItem('showPage');
      Utils.btnActive(btnNav[i]);
      const href = btnNav[i].getAttribute('href').split('#')[1];
      Router(href);
    });
  }
};

const btnBrand = () => {
  const btn = document.getElementById('btn-brand');
  btn.addEventListener('click', () => {
    localStorage.removeItem('showPage');
  });
};

const Routing = {
  pageActive,
  btnNavigate,
  btnBrand,
};

export default Routing;
