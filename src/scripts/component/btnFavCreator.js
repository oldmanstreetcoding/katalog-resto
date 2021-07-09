const BtnFavCreator = (type, id) => `<button aria-label="${type}" class="btnSaveFavorite ${type}" id="${id}">
                                        <img class="tombol" src="./icons/${type}.png" alt="Heart" width="44" height="44">
                                    </button>`;

export default BtnFavCreator;
