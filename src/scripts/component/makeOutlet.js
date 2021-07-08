import CONFIG from '../config/config';
import Utils from '../utils/utils';

const makeOutlet = (resto, btnLike) => `
        <div id="${resto.id}" tabindex="0" class="box_outlet_item">
            <div class="card_outlet_header">
                <img class="card_outlet_picture" src="${CONFIG.BASE_IMAGE_URL}small/${resto.pictureId}" alt="Restaurant ${resto.name}">
                <div class="outlet_text_kota">
                    ${resto.city}
                </div>
            </div>
            <div class="card_outlet_body">
                <div>
                  Rating: ${resto.rating}
                  <h3 class="outlet_text_name">${resto.name}</h3>
                </div>
                <div>
                  ${btnLike}
                </div>
            </div>
            <div class="card_outlet_footer">
              <span class="outlet_text_desc">${Utils.textShorten(resto.description, 200)} ...</span>
            </div>
        </div>`;

export default makeOutlet;
