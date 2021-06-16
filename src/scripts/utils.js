const activeBtn = (btnClass) => {
    const current = document.getElementsByClassName("btn-active");
    current[0].className = current[0].className.replace(" btn-active", "");
    btnClass.className += " btn-active";
};

const goUpBtn = () => {
    const btn_gotop = document.querySelector("#goTop");
    window.onscroll = () => {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
            btn_gotop.style.display = "block";
        }else{
            btn_gotop.style.display = "none";
        }
    }

    btn_gotop.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

const textShorten = (str, maxLen, separator = ' ') => {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
}

const makeOutlet = (resto) => `
        <div id="${resto.id}" tabindex="0" class="box_outlet_item">
            <div class="card_outlet_header">
                <img class="card_outlet_picture" src="${resto.pictureId}" alt="Restaurant ${resto.name}">
                <div class="outlet_text_kota">
                    ${resto.city}
                </div>
            </div>
            <div class="card_outlet_body">
                Rating: ${resto.rating}
                <h3 class="outlet_text_name">${resto.name}</h3>
                <span class="outlet_text_desc">${textShorten(resto.description, 200)} ...</span>
            </div>
        </div>`;

const Utils = {
    activeBtn,
    goUpBtn,
    textShorten,
    makeOutlet,
}

export default Utils;