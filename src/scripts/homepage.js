import Home from '../templates/pages/home.html'
import SumberData from './data';
import Utils from './utils';

const makeListOutlet = (datas, key = '') => {
    let outletHtml = '';

    datas.map((resto) => {
        if(key === ''){
            outletHtml += Utils.makeOutlet(resto);
        }else{
            if(resto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || resto.city.toLowerCase().indexOf(key.toLowerCase()) !== -1){
                outletHtml += Utils.makeOutlet(resto);
            }
        }
    });

    return outletHtml;
};

const getResto = (box_outlet, query = null) => {
    
    let apis = ''
    if(query === null){
        apis = 'list'
    }else{
        apis = `/search?q=${query}`
    }

    Utils.toggleLoader(true);
    SumberData.getAllData(apis)
        .then(result => {
            box_outlet.innerHTML = makeListOutlet(result.restaurants);
        })
        .catch(error=>console.log(error))
        .finally(() => Utils.toggleLoader(false))
        
}

const HomePage = () => {

    document.getElementById('body-content').innerHTML = Home;
    document.getElementById('hero_search').focus();
    const box_outlet = document.getElementById('box_outlet_wrapper');
    const inp_search = document.querySelector('#hero_search');

    getResto(box_outlet)

    inp_search.addEventListener('keydown', () => {
        let keyword = inp_search.value;
        if(keyword.length > 2){
            getResto(box_outlet, keyword)
        }else{
            getResto(box_outlet)
        }
    });

}

export default HomePage