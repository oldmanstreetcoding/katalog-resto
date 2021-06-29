const baseURL = 'https://restaurant-api.dicoding.dev/';

const cekStatus = (response) => {
  if (response.status !== 200) {
    return Promise.reject(new Error(response.statusText));
  }
  return Promise.resolve(response);
};

const responseJson = (response) => response.json();

const getAllData = (api) => new Promise((resolve, reject) => {
  fetch(`${baseURL}${api}`)
    .then(cekStatus)
    .then(responseJson)
    .then((result) => resolve(result))
    .catch((error) => reject(error));
});

const sentData = (api, data) => new Promise((resolve, reject) => {
  fetch(`${baseURL}${api}`, {
    method: 'POST',
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': '12345',
    },
  })
    .then(cekStatus)
    .then(responseJson)
    .then((result) => resolve(result))
    .catch((error) => reject(error));
});

const SumberData = {
  getAllData,
  sentData,
};

export default SumberData;
