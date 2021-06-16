import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import { restaurants } from '../data/DATA.json';
import Utils from '../scripts/utils';

document.getElementById("hero_search").focus();

const buttons = document.querySelectorAll(".nav_list_detil");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => {
        Utils.activeBtn(buttons[1]);
    });
}

const btn_drawer = document.querySelector("#btn_showdrawer");
const drop_drawer = document.querySelector("#mnav_drawer");
btn_drawer.addEventListener("click", event => {
    drop_drawer.classList.toggle("open");
    event.stopPropagation();
});

const hide_drawer = document.querySelectorAll(".hide_drawer");
for (var i = 0; i < hide_drawer.length; i++) {
    hide_drawer[i].addEventListener("click", event => {
        drop_drawer.classList.remove("open");
        event.stopPropagation();
    })
}

const btn_nav_drawer = document.querySelectorAll(".mnav_list_detil");
for (var i = 0; i < btn_nav_drawer.length; i++) {
    btn_nav_drawer[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("mbtn-active");
        current[0].className = current[0].className.replace(" mbtn-active", "");
        this.className += " mbtn-active";
    });
}

const makeListOutlet = (datas, key = '') => {
    let outletHtml = '';

    datas.map((resto) => {
        if(key == ''){
            outletHtml += Utils.makeOutlet(resto);
        }else{
            if(resto.name.toLowerCase().indexOf(key.toLowerCase()) != -1 || resto.city.toLowerCase().indexOf(key.toLowerCase()) != -1){
                outletHtml += Utils.makeOutlet(resto);
            }
        }
    });

    return outletHtml;
};

const box_outlet = document.getElementById('box_outlet_wrapper');

box_outlet.innerHTML = makeListOutlet(restaurants);

const inp_search = document.querySelector("#hero_search");
inp_search.addEventListener("keydown", () => {
    let keyword = inp_search.value;
    if(keyword.length > 2){
        box_outlet.innerHTML = makeListOutlet(restaurants, keyword);
    }else{
        box_outlet.innerHTML = makeListOutlet(restaurants);
    }
});

Utils.goUpBtn();