import HomePage from './homepage';
import Utils from './utils';

// Router navigasi aplikasi
const Router = (page) => {
    if (page === 'favorite') {
        console.log('open favorite page');
    } else {
        HomePage()
    }
};

// Navigasi sesuai hash URL
const activePage = () => Router(window.location.hash.split('#')[1]);

const navigateBtn = () => {
    const btnav = document.querySelectorAll('.btn-nav');
    for (let i = 0; i < btnav.length; i++) {
        btnav[i].addEventListener('click', () => {
            Utils.activeBtn(btnav[i]);
            const href = btnav[i].getAttribute('href').split('#')[1];
            Router(href);
        });
    }
};

const Routing = {
    activePage,
    navigateBtn,
};

export default Routing