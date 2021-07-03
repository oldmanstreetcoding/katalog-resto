/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import Home from '../../templates/pages/home.html';
import API from '../data/api';
import INDB from '../data/indb';
import Utils from '../utils/utils';
import PageDetail from './pagedetail';
import makeOutlet from './outlet';

const openPageDetail = (id) => {
  PageDetail(id);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  localStorage.setItem('showPage', id);
};

export const getOneResto = () => {
  const btnResto = document.querySelectorAll('.box_outlet_item');
  for (let i = 0; i < btnResto.length; i++) {
    btnResto[i].addEventListener('click', () => openPageDetail(btnResto[i].id));

    btnResto[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        openPageDetail(btnResto[i].id);
      }
    });
  }
};

const saveResto = (id, event) => {
  Utils.toggleLoader(true);
  API.getOneData(id)
    .then((result) => {
      INDB.saveData(result.restaurant)
        .then(() => {
          Utils.toggleToast('success', 'Sukses Simpan Data');
          getAllResto();
        })
        .catch(() => Utils.toggleToast('error', 'Gagal Simpan Data !'));
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data !'))
    .finally(() => Utils.toggleLoader(false));

  event.stopPropagation();
  event.preventDefault();
};

const saveFavResto = () => {
  const btn = document.getElementsByClassName('greyheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => saveResto(btn[i].id, event));

    btn[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        saveResto(btn[i].id, event);
      }
    });
  }
};

const deleteResto = (id, event) => {
  const strconfirm = confirm('Anda Yakin Ingin Menghapus Data ini Dari Favourite ?');
  if (strconfirm) {
    INDB.deleteData(id)
      .then(() => {
        Utils.toggleToast('success', 'Sukses Hapus Data');
        getAllResto();
      })
      .catch(() => Utils.toggleToast('error', 'Gagal Hapus Data !'));
  }

  event.stopPropagation();
  event.preventDefault();
};

const deleteFavResto = () => {
  const btn = document.getElementsByClassName('redheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => deleteResto(btn[i].id, event));

    btn[i].addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        deleteResto(btn[i].id, event);
      }
    });
  }
};

const checkDataINDB = (resto) => {
  const box = document.getElementById('box_outlet_wrapper');

  box.innerHTML = '';
  INDB.getOneData(resto.id)
    .then((detilResto) => {
      if (detilResto === undefined) {
        box.innerHTML += makeOutlet(resto, 'greyheart');
      } else {
        box.innerHTML += makeOutlet(resto, 'redheart');
      }

      saveFavResto();

      deleteFavResto();

      getOneResto();
    })
    .catch(() => Utils.toggleToast('error', 'Error Check IndexedDB !'));
};

const searchResto = (query) => {
  Utils.toggleLoader(true);
  API.searchData(query)
    .then((result) => {
      result.restaurants.map((resto) => {
        checkDataINDB(resto);
      });
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data !'))
    .finally(() => Utils.toggleLoader(false));
};

const getAllResto = () => {
  Utils.toggleLoader(true);
  API.getAllData()
    .then((result) => {
      result.restaurants.map((resto) => {
        checkDataINDB(resto);
      });
    })
    .catch(() => Utils.toggleToast('error', 'Gagal Tarik Data !'))
    .finally(() => Utils.toggleLoader(false));
};

const PageHome = () => {
  document.getElementById('body-content').innerHTML = Home;
  document.title = 'FoodStop : Beranda';
  document.getElementById('hero_search').focus();
  const inputSearch = document.querySelector('#hero_search');

  getAllResto();

  inputSearch.addEventListener('keydown', () => {
    const query = inputSearch.value;

    if (query.length > 3) {
      searchResto(query);
    }

    if (query.length <= 1) {
      getAllResto();
    }
  });
};

export default PageHome;
