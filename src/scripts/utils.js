/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const btnActive = (btnClass) => {
  const current = document.getElementsByClassName('btn-active');
  current[0].className = current[0].className.replace(' btn-active', '');
  btnClass.className += ' btn-active';
};

const btnGoUp = () => {
  const btnGoTop = document.querySelector('#goTop');
  window.onscroll = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btnGoTop.style.display = 'block';
    } else {
      btnGoTop.style.display = 'none';
    }
  };

  btnGoTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
};

const toggleDrawer = () => {
  const btnDrawer = document.querySelector('#btn_showdrawer');
  const dropDrawer = document.querySelector('#mnav_drawer');
  btnDrawer.addEventListener('click', (event) => {
    dropDrawer.classList.toggle('open');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    event.stopPropagation();
  });

  const hideDrawer = document.querySelectorAll('.hide_drawer');
  for (let i = 0; i < hideDrawer.length; i++) {
    hideDrawer[i].addEventListener('click', (event) => {
      dropDrawer.classList.remove('open');
      event.stopPropagation();
    });
  }
};

const toggleLoader = (status) => {
  let display = '';
  status ? display = 'block' : display = 'none';

  document.getElementById('linier-loader').style.display = display;
};

const toggleToast = (type, text) => {
  const toast = document.getElementById('toast-message');

  const toastType = {
    success: 'green',
    error: 'tomato',
    info: 'teal',
    warning: 'orange',
  };

  toast.style.backgroundColor = toastType[type];
  toast.innerHTML = text;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 5000);
};

const textShorten = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

const Utils = {
  btnActive,
  btnGoUp,
  toggleDrawer,
  toggleLoader,
  toggleToast,
  textShorten,
};

export default Utils;
