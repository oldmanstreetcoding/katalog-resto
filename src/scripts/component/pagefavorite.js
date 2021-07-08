/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
import Favorite from '../../templates/pages/favorite.html';
import INDB from '../data/indb';
import Utils from '../utils/utils';
import makeOutlet from './makeOutlet';
import makeDetailOutlet from './makeDetailOutlet';
import { btnBackPage, sendReview } from './pagedetail';
import BtnFavCreator from './btnFavCreator';
import LikeButtonPresenter from './LikeButtonPresenter';

const openDetilINDB = (id) => {
  INDB.getOneData(id)
    .then((resto) => {
      document.getElementById('body-content').innerHTML = makeDetailOutlet(resto);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      localStorage.setItem('showPage', id);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: resto,
      });

      sendReview(resto.id);

      btnBackPage();
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data IndexedDB !'));
};

const getOneRestoINDB = () => {
  const btnResto = document.querySelectorAll('.box_outlet_item');
  for (let i = 0; i < btnResto.length; i++) {
    btnResto[i].addEventListener('click', () => openDetilINDB(btnResto[i].id));

    btnResto[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        openDetilINDB(btnResto[i].id);
      }
    });
  }
};

const deleteRestoINDB = (id, event) => {
  const strconfirm = confirm('Anda Yakin Ingin Menghapus Data ini Dari Favourite ?');
  if (strconfirm) {
    INDB.deleteData(id)
      .then(() => {
        Utils.toggleToast('success', 'Sukses Hapus Data');
        getAllRestoINDB();
      })
      .catch(() => Utils.toggleToast('error', 'Gagal Hapus Data !'));
  }

  event.stopPropagation();
  event.preventDefault();
};

const deleteFavRestoINDB = () => {
  const btn = document.getElementsByClassName('like');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => deleteRestoINDB(btn[i].id, event));

    btn[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        deleteRestoINDB(btn[i].id, event);
      }
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
          box.innerHTML += makeOutlet(resto, BtnFavCreator('like', resto.id));

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
