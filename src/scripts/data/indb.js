/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { openDB } from 'idb';
import CONFIG from '../config/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const getAllData = async () => (await dbPromise).getAll(OBJECT_STORE_NAME);

const getOneData = async (id) => (await dbPromise).get(OBJECT_STORE_NAME, id);

const saveData = async (resto) => (await dbPromise).put(OBJECT_STORE_NAME, resto);

const deleteData = async (id) => (await dbPromise).delete(OBJECT_STORE_NAME, id);

const INDB = {
  getAllData,
  getOneData,
  saveData,
  deleteData,
};

export default INDB;
