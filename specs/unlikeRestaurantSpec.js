/* eslint-disable no-undef */
import INDB from '../src/scripts/data/indb';
import LikeButtonPresenter from '../src/scripts/component/LikeButtonPresenter';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

const testData = { id: 's1knt6za9kkfw1e867' };

describe('Unliking A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await INDB.saveData(testData);
  });

  afterEach(async () => {
    await INDB.deleteData(testData.id);
  });

  it('should display unlike widget when the restaurant has been liked', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    expect(document.querySelector('[aria-label="like"]')).toBeTruthy();
  });

  it('should not display like widget when the restaurant has been liked', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    expect(document.querySelector('[aria-label="unlike"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    document.querySelector('[aria-label="like"]').dispatchEvent(new Event('click'));

    expect(await INDB.getAllData()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: testData,
    });

    await INDB.deleteData(testData.id);

    document.querySelector('[aria-label="like"]').dispatchEvent(new Event('click'));

    expect(await INDB.getAllData()).toEqual([]);
  });
});
