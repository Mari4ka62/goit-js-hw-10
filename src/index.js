import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInformation = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 700;


searchInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));


function onInputSearch(e) {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        fetchCountries(searchValue).then(response => {
        clearInput(); 
        chekInfo(response);
    }).catch(() => {
        alert('Oops, there is no country with that name');
        clearInput();
    });
    }
    
}
function renderCounrtyList(countries) {
    return countries.map(({ name, flags })=> {
        return `<li class='country-list_item'>
        <img class='country-list_flag' src='${flags.svg}' alt='${name.official}'
        <h2 class='country-list_name'>${name.official}</h2></li>`
    }).join('')
}

function renderCountriesInfo(counrties){
  return counrties.map(({capital, population, languages})=>{
return ` 
<div class='country-list-info__item'>Capital: ${capital}</div>
<div class='country-list-info__item'>Population: ${population}</div>
<div class='country-list-info__item'>Languages: ${Object.values(languages).join(', ')}</div>`
  }).join('')
}

function chekInfo(array) {
    if (array.length>10) {
        alert ("Too many matches found. Please enter a more specific name.")
    }
     else if (array.length>2 && array.length<=10) {
        countryList.insertAdjacentElement('beforeend', renderCounrtyList(array))
    }
    else if (array.length===1) {
        countryList.insertAdjacentElement('beforeend', renderCounrtyList(array));
        countryInformation.insertAdjacentElement('beforeend', renderCountriesInfo(array));
    }
}

function clearInput() {
    countryList.innerHTML = '';
    countryInformation.innerHTML = '';
}



