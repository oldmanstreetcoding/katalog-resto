import Home from '../templates/pages/home.html';
import SumberData from './data';
import DetailResto from './detailresto';
import Utils from './utils';

const getOneResto = () => {
  const btResto = document.querySelectorAll('.box_outlet_item');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < btResto.length; i++) {
    btResto[i].addEventListener('click', () => {
      DetailResto(btResto[i].id);
    });
  }
};

const makeOutlet = (resto) => `
        <div id="${resto.id}" tabindex="0" class="box_outlet_item">
            <div class="card_outlet_header">
                <img class="card_outlet_picture" src="https://restaurant-api.dicoding.dev/images/small/${resto.pictureId}" alt="Restaurant ${resto.name}">
                <div class="outlet_text_kota">
                    ${resto.city}
                </div>
            </div>
            <div class="card_outlet_body">
                Rating: ${resto.rating}
                <h3 class="outlet_text_name">${resto.name}</h3>
                <span class="outlet_text_desc">${Utils.textShorten(resto.description, 200)} ...</span>
            </div>
        </div>`;

const makeListOutlet = (datas, key = '') => {
  let outletHtml = '';

  // eslint-disable-next-line array-callback-return
  datas.map((resto) => {
    if (key === '') {
      outletHtml += makeOutlet(resto);
    } else if (
      resto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || resto.city.toLowerCase().indexOf(key.toLowerCase()) !== -1
    ) {
      outletHtml += makeOutlet(resto);
    }
  });

  return outletHtml;
};

const getResto = (boxOutlet, query = null) => {
  let apis = '';
  if (query === null) {
    apis = 'list';
  } else {
    apis = `/search?q=${query}`;
  }

  Utils.toggleLoader(true);
  SumberData.getAllData(apis)
    .then((result) => {
      // eslint-disable-next-line no-param-reassign
      boxOutlet.innerHTML = makeListOutlet(result.restaurants);

      getOneResto();
    })
    .catch((error) => console.log(error))
    .finally(() => Utils.toggleLoader(false));
};

const HomePage = () => {
  document.getElementById('body-content').innerHTML = Home;
  document.getElementById('hero_search').focus();
  const boxOutlet = document.getElementById('box_outlet_wrapper');
  const inputSearch = document.querySelector('#hero_search');

  getResto(boxOutlet);

  inputSearch.addEventListener('keydown', () => {
    const query = inputSearch.value;
    if (query.length > 2) {
      getResto(boxOutlet, query);
    } else {
      getResto(boxOutlet);
    }
  });
};

export default HomePage;
