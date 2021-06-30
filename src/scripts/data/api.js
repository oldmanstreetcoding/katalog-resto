/* eslint-disable array-callback-return */
import CONFIG from '../config';

const chekStatus = (response) => {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

const responseJson = (response) => response.json();

const getAllData = () => new Promise((resolve, reject) => {
  fetch(`${CONFIG.BASE_URL}list`)
    .then(chekStatus)
    .then(responseJson)
    .then((result) => resolve(result))
    .catch((error) => reject(error));
});

const getOneData = (id) => new Promise((resolve, reject) => {
  fetch(`${CONFIG.BASE_URL}detail/${id}`)
    .then(chekStatus)
    .then(responseJson)
    .then((result) => resolve(result))
    .catch((error) => reject(error));
});

const searchData = (query) => new Promise((resolve, reject) => {
  fetch(`${CONFIG.BASE_URL}search?q=${query}`)
    .then(chekStatus)
    .then(responseJson)
    .then((result) => resolve(result))
    .catch((error) => reject(error));
});

const sendData = (data) => new Promise((resolve, reject) => {
  fetch(`${CONFIG.BASE_URL}review`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': CONFIG.KEY,
    },
  })
    .then(chekStatus)
    .then(responseJson)
    .then((result) => resolve(result))
    .catch((error) => reject(error));
});

const API = {
  getAllData,
  getOneData,
  searchData,
  sendData,
};

export default API;
