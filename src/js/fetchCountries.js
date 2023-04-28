function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/';
    const END_POINT = 'name/';
    const params = new URLSearchParams({
      // status: true,
      fields: 'name,capital,population,flags,languages',
    });
    return fetch(`${BASE_URL}${END_POINT}${name}?${params}`).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
}
  
export { fetchCountries };