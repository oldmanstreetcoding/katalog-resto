const textShorten = (str, maxLen, separator = ' ') => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

const activeBtn = (btnClass) => {
  const current = document.getElementsByClassName('btn-active');
  current[0].className = current[0].className.replace(' btn-active', '');
  // eslint-disable-next-line no-param-reassign
  btnClass.className += ' btn-active';
};

const toggleDrawer = () => {
  const btnDrawer = document.querySelector('#btn_showdrawer');
  const dropDrawer = document.querySelector('#mnav_drawer');
  btnDrawer.addEventListener('click', (event) => {
    dropDrawer.classList.toggle('open');
    event.stopPropagation();
  });

  const hideDrawer = document.querySelectorAll('.hide_drawer');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < hideDrawer.length; i++) {
    hideDrawer[i].addEventListener('click', (event) => {
      dropDrawer.classList.remove('open');
      event.stopPropagation();
    });
  }
};

const goUpBtn = () => {
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

const toggleLoader = (status) => {
  let display = '';
  // eslint-disable-next-line no-unused-expressions
  status ? display = 'block' : display = 'none';

  document.getElementById('linier-loader').style.display = display;
};

const Utils = {
  goUpBtn,
  toggleDrawer,
  activeBtn,
  toggleLoader,
  textShorten,
};

export default Utils;
