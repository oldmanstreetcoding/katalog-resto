/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#favorite');
});

Scenario('Unliking one restaurant', async ({ I }) => {
  /** 1. Memastikan belum ada restaurant yang difavoritkan sebelumnya */
  I.see('Silahkan Kembali Ke Halaman Utama untuk Pilih Resto Favorite Terlebih Dahulu', '.resto-item__not__found');

  /** 2. Masuk ke halaman utama */
  I.amOnPage('/');

  /** 3. Pastikan daftar restaurant dari API tampil */
  I.seeElement('.outlet_text_name');

  /** 4. Ambil judul restaurant pertama */
  const firstResto = locate('.outlet_text_name').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);

  /** 5. Pada web app ini untuk masuk ke halaman detil restaurant cukup klik card restaurant */
  I.seeElement('.box_outlet_item');
  I.click(locate('.box_outlet_item').first());

  /** 6. Jika tombol likebutton ada, maka berhasil masuk halaman detil */
  I.seeElement('#likeButton');

  /** 7. Klik untuk menyukai */
  I.click('#likeButton');

  /** 8. Untuk keluar dari halaman detil harus klik backarrow button sebelah kanan */
  I.seeElement('#btnBackArrow');
  I.click('#btnBackArrow');

  /** 9. Masuk ke halaman favorite melihat apakah restaurant berhasil disimpan */
  I.click('Favorite');

  /** 10. Jika ditemukan, maka cek nama resto yang ada di halaman favorite */
  I.seeElement('.outlet_text_name');
  const likedRestoTitle = await I.grabTextFrom('.outlet_text_name');

  /** 11. Bandingkan nama restaurant yang disimpan */
  assert.strictEqual(firstRestoTitle, likedRestoTitle);

  /** 12. klik card restaurant favorite untuk masuk ke halaman detil */
  I.seeElement('.box_outlet_item');
  I.click(locate('.box_outlet_item').first());

  /** 13. Jika tombol likebutton ada, maka berhasil masuk halaman detil */
  I.seeElement('#likeButton');

  /** 14. klik kembali tombol ini untuk membatalkan favorite */
  I.click('#likeButton');

  /** 15. Untuk keluar dari halaman detil harus klik backarrow button sebelah kanan */
  I.seeElement('#btnBackArrow');
  I.click('#btnBackArrow');

  /** 16. Memastikan tidak ada restaurant yang difavoritkan sebelumnya */
  I.see('Silahkan Kembali Ke Halaman Utama untuk Pilih Resto Favorite Terlebih Dahulu', '.resto-item__not__found');

  /** 17. Kembali ke halaman utama */
  I.amOnPage('/');
});
