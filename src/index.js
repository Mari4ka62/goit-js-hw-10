import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInformation = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;


searchInput.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
    const searchValue = e.target.value.trim();
    if (!searchValue) {
       return clearInfo();
    }
    fetchCountries(searchValue)
        .then(data=>checkInfo(data))
        .catch(() => Notify.failure("Oops, there is no country with that name"))
}

function checkInfo(countries) {
    if (countries.length>10) {
       return Notify.info("Too many matches found. Please enter a more specific name.")
    }
    else if (countries.length >= 2 && countries.length <= 10) {
        clearInfo();
        countryList.insertAdjacentHTML('beforeend', renderCounrtyList(countries))
    }
    else if (countries.length === 1) {
        clearInfo();
        countryInformation.insertAdjacentHTML('beforeend',renderCountryInfo(countries))
        
    }
}
function renderCounrtyList(counrties) {
    return counrties.map(({ flags, name }) => {
        return `<li class="country-list_item"><img class="country-list_img" src="${flags.svg}"alt="${name}" width='30' height='20'>${name.official}</li>`
    }).join('');


}
function renderCountryInfo(countries) {
    return countries.map(({ name, capital, population, flags, languages }) => {
        return `<img class="country-info_img" src="${flags.svg}" alt="${name}" width='40' height='30'>
                <span class="coutry-info_title">${name.official}</span>
                <p class="country-info_item"><span class='country-info_text'>Capital:</span> ${capital}</p>
                <p class="country-info_item"><span class='country-info_text'>Population:</span> ${population}</p>
                <p class="country-info_item"><span class='country-info_text'>Languages:</span> ${Object.values(languages)}</p>`
    }).join('');
}

function clearInfo() {
    countryList.innerHTML = '';
    countryInformation.innerHTML = '';
}


 