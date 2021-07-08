/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import API from '../data/api';
import Routing from '../routing/routing';
import Utils from '../utils/utils';
import LikeButtonPresenter from './LikeButtonPresenter';
import makeDetailOutlet from './makeDetailOutlet';

export const btnBackPage = () => {
  const btnBack = document.getElementById('btnBackArrow');
  btnBack.addEventListener('click', () => {
    localStorage.removeItem('showPage');
    Routing.pageActive();
  });
};

export const sendReview = (id) => {
  const btnReview = document.getElementById('btn_user_review');

  btnReview.addEventListener('click', () => {
    const nameReview = document.getElementById('name_user_review').value;
    const textReview = document.getElementById('text_user_review').value;

    if (textReview.length > 3 && nameReview.length > 3) {
      const comment = {
        id,
        name: nameReview,
        review: textReview,
      };

      Utils.toggleLoader(true);
      API.sendData(comment)
        .then(() => {
          Utils.toggleToast('success', 'Komentar Anda Telah Terkirim');
          PageDetail(id);
        })
        .catch(() => Utils.toggleToast('error', 'Gagal Kirim Komentar !'))
        .finally(() => Utils.toggleLoader(false));
    } else {
      alert('Silahkan lengkapi form pengisian terlebih dahulu !');
    }
  });
};

const PageDetail = (id) => {
  Utils.toggleLoader(true);
  API.getOneData(id)
    .then((result) => {
      document.getElementById('body-content').innerHTML = makeDetailOutlet(result.restaurant);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: result.restaurant,
      });

      sendReview(result.restaurant.id);

      btnBackPage();
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data !'))
    .finally(() => Utils.toggleLoader(false));
};

export default PageDetail;
