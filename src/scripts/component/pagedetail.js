/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import API from '../data/api';
import INDB from '../data/indb';
import Routing from '../routing/routing';
import Utils from '../utils/utils';
import makeDetailOutlet from './detiloutlet';

export const btnBackPage = () => {
  const btnBack = document.getElementById('btnBackArrow');
  btnBack.addEventListener('click', () => {
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
    }
  });
};

export const saveFavOneResto = (resto) => {
  const btn = document.getElementsByClassName('redheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => {
      INDB.saveData(resto)
        .then(() => {
          Utils.toggleToast('success', 'Sukses Simpan Data');
          PageDetail(resto.id);
        })
        .catch(() => Utils.toggleToast('error', 'Gagal Simpan Data !'));

      event.stopPropagation();
    });
  }
};

export const deleteFavOneResto = () => {
  const btn = document.getElementsByClassName('greyheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => {
      const strconfirm = confirm('Anda Yakin Ingin Menghapus Data ini Dari Favourite ?');
      if (strconfirm) {
        INDB.deleteData(btn[i].id)
          .then(() => {
            Utils.toggleToast('success', 'Sukses Hapus Data');
            PageDetail(btn[i].id);
          })
          .catch(() => Utils.toggleToast('error', 'Gagal Hapus Data !'));
      }

      event.stopPropagation();
    });
  }
};

const checkDataOneINDB = (resto) => {
  INDB.getOneData(resto.id)
    .then((restoINDB) => {
      let typeheart = '';
      if (restoINDB === undefined) {
        typeheart = 'redheart';
      } else {
        typeheart = 'greyheart';
      }

      document.getElementById('body-content').innerHTML = makeDetailOutlet(resto, typeheart);

      saveFavOneResto(resto);

      deleteFavOneResto();

      sendReview(resto.id);

      btnBackPage();
    })
    .catch(() => Utils.toggleToast('error', 'Error Check IndexedDB !'));
};

const PageDetail = (id) => {
  Utils.toggleLoader(true);
  API.getOneData(id)
    .then((result) => {
      checkDataOneINDB(result.restaurant);
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data !'))
    .finally(() => Utils.toggleLoader(false));
};

export default PageDetail;
