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

const SumberData = {
    getAllData,
};

export default SumberData;