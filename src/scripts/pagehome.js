/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
import Home from '../templates/pages/home.html';
import CONFIG from './config';
import API from './data/api';
import INDB from './data/indb';
import Utils from './utils';
import PageDetail from './pagedetail';

export const makeOutlet = (resto, typeheart) => `
        <div id="${resto.id}" tabindex="0" class="box_outlet_item">
            <div class="card_outlet_header">
                <img class="card_outlet_picture" src="${CONFIG.BASE_IMAGE_URL}small/${resto.pictureId}" alt="Restaurant ${resto.name}">
                <div class="outlet_text_kota">
                    ${resto.city}
                </div>
            </div>
            <div class="card_outlet_body">
                <div>
                  Rating: ${resto.rating}
                  <h3 class="outlet_text_name">${resto.name}</h3>
                </div>
                <div>
                  <button class="btnSaveFavorite ${typeheart}" id="${resto.id}">
                    <img class="tombol" src="./icons/${typeheart}.png" alt="Heart">
                  </button>
                </div>
            </div>
            <div class="card_outlet_footer">
              <span class="outlet_text_desc">${Utils.textShorten(resto.description, 200)} ...</span>
            </div>
        </div>`;

export const getOneResto = () => {
  const btnResto = document.querySelectorAll('.box_outlet_item');
  for (let i = 0; i < btnResto.length; i++) {
    btnResto[i].addEventListener('click', () => {
      PageDetail(btnResto[i].id);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
};

const saveFavResto = () => {
  const btn = document.getElementsByClassName('redheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => {
      Utils.toggleLoader(true);
      API.getOneData(btn[i].id)
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
    });
  }
};

const deleteFavResto = () => {
  const btn = document.getElementsByClassName('greyheart');
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', (event) => {
      const strconfirm = confirm('Anda Yakin Ingin Menghapus Data ini Dari Favourite ?');
      if (strconfirm) {
        INDB.deleteData(btn[i].id)
          .then(() => {
            Utils.toggleToast('success', 'Sukses Hapus Data');
            getAllResto();
          })
          .catch(() => Utils.toggleToast('error', 'Gagal Hapus Data !'));
      }

      event.stopPropagation();
    });
  }
};

const checkDataINDB = (resto) => {
  const box = document.getElementById('box_outlet_wrapper');

  box.innerHTML = '';
  INDB.getOneData(resto.id)
    .then((detilResto) => {
      if (detilResto !== undefined) {
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
