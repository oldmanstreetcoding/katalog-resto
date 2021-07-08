const BtnFavCreator = (type, id) => `<button aria-label="${type}" class="btnSaveFavorite ${type}" id="${id}">
                                        <img class="tombol" src="./icons/${type}.png" alt="Heart">
                                    </button>`;

export default BtnFavCreator;
