/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import CONFIG from './config';
import API from './data/api';
import INDB from './data/indb';
import Routing from './routing';
import Utils from './utils';

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

export const makeDetailOutlet = (resto, typeheart) => {
  let textCategory = '';

  resto.categories.map((text, index) => {
    let separator = '';
    if (index < resto.categories.length - 1) {
      separator = ', ';
    }

    textCategory += text.name + separator;
  });

  let textMenuFood = '<ul class="menu_list">';

  resto.menus.foods.map((menu) => {
    textMenuFood += `<li>${menu.name}</li>`;
  });

  textMenuFood += '</ul>';

  let textMenuDrink = '<ul class="menu_list">';

  resto.menus.drinks.map((menu) => {
    textMenuDrink += `<li>${menu.name}</li>`;
  });

  textMenuDrink += '</ul>';

  let textUserReview = '<ul class="review_list">';

  resto.customerReviews.map((review) => {
    textUserReview += `<li>
            <div class="review_wrapper">
                <div style="text-align: right; margin-right: 10px">
                    <img class="imgmenu" src="../icons/profile.png" alt="avatar"/>
                </div>
                <div>
                    <p style="font-weight: bold">${review.name}</p>
                    <small><i>${review.date}</i></small>
                    <p style="color: tomato">${review.review}</p>
                </div>
            </div>
        </li>`;
  });

  textUserReview += '</ul>';

  const detilOutletHTML = `
        <article class="box_card_resto">

            <div class="box_hero_resto" style="background-image: url('${CONFIG.BASE_IMAGE_URL}large/${resto.pictureId}');">
              <button class="tombol" id="btnBackArrow">
                <img class="imgbackarrow" src="../icons/arrow.png" alt="back"/>
              </button>
            </div>

            <div class="card_resto_wrapper">
                <div class="card_resto">
                    <div class="card_resto_brand">
                        <h1>${resto.name}</h1>
                        <p class="text_resto_category">Category : ${textCategory}</p>
                        <p>${resto.address}, ${resto.city}</p>
                    </div>
                    <div class="card_resto_rating">
                        <button class="btnSaveFavorite ${typeheart}" id="${resto.id}">
                          <img class="tombol" src="./icons/${typeheart}.png" alt="Heart">
                        </button>
                        <p>Rating : ${resto.rating}</p>
                        <small>${resto.customerReviews.length} Reviews</small>
                    </div>
                </div>
                <div class="card_resto_description">
                    ${resto.description}
                </div>
                <div class="box_menu_wrapper">
                    <p class="text_resto_subtitle"> - The Menu -</p>
                    <div class="card_menu">
                        <div class="card_menu_food">
                            <img class="imgmenu" src="../icons/breakfast.png" alt="food"/>
                            ${textMenuFood}
                        </div>
                        <div class="card_menu_drink">
                            <img class="imgmenu" src="../icons/cocktail.png" alt="drink"/>
                            ${textMenuDrink}
                        </div>
                    </div>
                </div>
                <div class="card_resto_review">
                    <label style="display:none" id="label_name_user_review" for="name_user_review">Masukkan Nama Anda</label>
                    <input type="text" id="name_user_review" name="name_user_review" placeholder="Masukkan Nama Anda"/>
                    <label style="display:none" id="label_text_user_review" for="text_user_review">Tuliskan Review Anda Tentang Resto ini</label>
                    <textarea id="text_user_review" name="text_user_review" rows="3" placeholder="Tuliskan Review Anda Tentang Resto ini"></textarea>
                    <button id="btn_user_review">Submit</button>
                    ${textUserReview}
                </div>
            </div>
        </article>`;

  return detilOutletHTML;
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
