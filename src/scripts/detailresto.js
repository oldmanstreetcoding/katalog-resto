/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import SumberData from './data';
import Utils from './utils';

const sentReview = (id) => {
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
      SumberData.sentData('review', comment)
        .then((r) => {
          console.log(r);
          // eslint-disable-next-line no-use-before-define
          DetailResto(id);
        })
        .catch((e) => console.log(e))
        .finally(() => Utils.toggleLoader(false));
    }
  });
};

const makeDetilOutlet = (resto) => {
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

  // eslint-disable-next-line array-callback-return
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
            
            <div class="box_hero_resto" style="background-image: url('https://restaurant-api.dicoding.dev/images/large/${resto.pictureId}');"></div>
            
            <div class="card_resto_wrapper">
                <div class="card_resto">
                    <div class="card_resto_brand">
                        <h1>${resto.name}</h1>
                        <p class="text_resto_category">Category : ${textCategory}</p>
                        <p>${resto.address}, ${resto.city}</p>
                    </div>
                    <div class="card_resto_rating">
                        <img class="imglovenam" src="../icons/heart.png" alt="heart"/>
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
                    <input type="text" id="name_user_review" name="name_user_review" placeholder="Masukkan Nama Anda"/>
                    <textarea id="text_user_review" name="text_user_review" rows="3" placeholder="Tuliskan Review Anda Tentang Resto ini"></textarea>
                    <button id="btn_user_review">Submit</button>
                    ${textUserReview}
                </div>
            </div>
        </article>`;

  return detilOutletHTML;
};

const DetailResto = (id) => {
  Utils.toggleLoader(true);
  SumberData.getAllData(`detail/${id}`)
    .then((result) => {
      console.log(result.restaurant);
      document.getElementById('body-content').innerHTML = makeDetilOutlet(result.restaurant);

      sentReview(id);
    })
    .catch((error) => console.log(error))
    .finally(() => Utils.toggleLoader(false));
};

export default DetailResto;
