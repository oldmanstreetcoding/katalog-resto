/* eslint-disable no-undef */
Feature('Review Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('Review one restaurant', async ({ I }) => {
  /** 1. Pastikan daftar restaurant dari API tampil */
  I.seeElement('.outlet_text_name');

  /** 2. Pada web app ini untuk masuk ke halaman detil restaurant cukup klik card restaurant */
  I.seeElement('.box_outlet_item');
  I.click(locate('.box_outlet_item').first());

  /** 3. cari form isian nama review */
  I.seeElement('#name_user_review');

  /** 4. menuliskan nama review */
  I.fillField('name_user_review', 'My Name Puppeter');

  /** 5. cari dan klik form isian pesan review */
  I.seeElement('#text_user_review');

  /** 6. menuliskan pesan review */
  I.fillField('text_user_review', 'Automatic Test Review Restaurant With Puppeter');

  /** 7. submit pesan */
  I.seeElement('#btn_user_review');
  I.forceClick('Submit');
});
