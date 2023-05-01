
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const refs = {
  querryInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.querryInput.addEventListener(
  'input', debounce(onInputGetQuerry, DEBOUNCE_DELAY)
);

function onInputGetQuerry() {
  refs.querryInput.value = refs.querryInput.value.trim();
  if (refs.querryInput.value) {
    fetchCountries(refs.querryInput.value)
      .then(checkOutput)
      .catch(eggog => {
        clearFields();
        console.log('Catch:', eggog);
        Notify.failure('Oops, there is no country with that name');
      });
  } else {
    clearFields();
  }
}

function clearFields() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function checkOutput(inputData) {
  console.log(inputData);
  clearFields();
  if (inputData.length > 9) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (inputData.length >= 2) {
    refs.countryList.innerHTML = makeList(inputData);
    return;
  }
  refs.countryInfo.innerHTML = makeInfo(inputData);
}

function makeList(inputData) {
  return inputData.map(({ flags: { svg, alt }, name: { official } }) => `<li><div class="title"><img src="${svg}" alt="${alt}"><h2>${official}</h2></div></li>`).join('');
}

function makeInfo(inputData) {
  return inputData.map(({capital,population,flags: { svg, alt },name: { official },languages,}) => `<div class="title">
  <img src="${svg}" alt="${alt}">
  <h2>${official}</h2></div>
  <div"><h3>Capital:</h3><p>${capital}</p>
  <h3>Population:</h3><p>${population}</p>
  <h3>Languages:</h3><p>${Object.values(languages).toString()}</p>
  </div>`).join('');
}




