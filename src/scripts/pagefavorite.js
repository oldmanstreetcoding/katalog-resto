/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
import Favorite from '../templates/pages/favorite.html';
import INDB from './data/indb';
import Utils from './utils';
import { makeOutlet } from './pagehome';
import {
  makeDetailOutlet, btnBackPage, sendReview, deleteFavOneResto,
} from './pagedetail';

const getOneRestoINDB = () => {
  const btnResto = document.querySelectorAll('.box_outlet_item');
  for (let i = 0; i < btnResto.length; i++) {
    btnResto[i].addEventListener('click', () => {
      INDB.getOneData(btnResto[i].id)
        .then((resto) => {
          document.getElementById('body-content').innerHTML = makeDetailOutlet(resto, 'greyheart');
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;

          deleteFavOneResto();

          sendReview(resto.id);

          btnBackPage();
        })
        .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data IndexedDB !'));
    });
  }
};

const deleteFavRestoINDB = () => {
  const btn = document.getElementsByClassName('greyheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => {
      const strconfirm = confirm('Anda Yakin Ingin Menghapus Data ini Dari Favourite ?');
      if (strconfirm) {
        INDB.deleteData(btn[i].id)
          .then(() => {
            Utils.toggleToast('success', 'Sukses Hapus Data');
            getAllRestoINDB();
          })
          .catch(() => Utils.toggleToast('error', 'Gagal Hapus Data !'));
      }

      event.stopPropagation();
    });
  }
};

const getAllRestoINDB = () => {
  const box = document.getElementById('box_outlet_wrapper');
  box.innerHTML = '';

  Utils.toggleLoader(true);
  INDB.getAllData()
    .then((result) => {
      if (result.length === 0) {
        box.innerHTML += '<div id="text_info_favorite">Silahkan Kembali Ke Halaman Utama untuk Pilih Resto Favorite Terlebih Dahulu</div>';
        Utils.toggleToast('info', 'Resto Favorite Tidak Ditemukan');
      } else {
        result.map((resto) => {
          box.innerHTML += makeOutlet(resto, 'greyheart');

          deleteFavRestoINDB();

          getOneRestoINDB();
        });
      }
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data dari IndexedDB!'))
    .finally(() => Utils.toggleLoader(false));
};

const PageFavorite = () => {
  document.getElementById('body-content').innerHTML = Favorite;
  document.title = 'FoodStop : Favorite';

  getAllRestoINDB();
};

export default PageFavorite;
