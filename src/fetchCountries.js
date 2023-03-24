

export function fetchCountries(name) {

// const BASE_URL = "https://restcountries.com/v3.1/name/";
// const fields = 'fields=name,capital,population,flags,languages';
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
     if (!response.ok) {
       throw new Error();
   }
     return response.json();
   })
}