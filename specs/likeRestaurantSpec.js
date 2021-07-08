/* eslint-disable no-undef */
import INDB from '../src/scripts/data/indb';
import LikeButtonPresenter from '../src/scripts/component/LikeButtonPresenter';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

const testData = { id: 's1knt6za9kkfw1e867' };

describe('Liking A Restaurant', () => {
  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    expect(document.querySelector('[aria-label="unlike"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    expect(document.querySelector('[aria-label="like"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await INDB.getOneData(testData.id);

    expect(restaurant).toEqual(testData);

    INDB.deleteData(testData.id);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    await INDB.saveData(testData);
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await INDB.getAllData()).toEqual([testData]);

    INDB.deleteData(testData.id);
  });

  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await INDB.getAllData()).toEqual([]);
  });
});
