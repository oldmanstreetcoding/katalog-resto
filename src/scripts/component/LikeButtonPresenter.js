/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
// import API from '../data/api';
import INDB from '../data/indb';
import BtnFavCreator from './btnFavCreator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await INDB.getOneData(id);
    return !!restaurant;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = BtnFavCreator('unlike', 'likeButton');

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await INDB.saveData(this._restaurant);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = BtnFavCreator('like', 'likeButton');

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await INDB.deleteData(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
