const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');
let allCountriesData;

// Fetch all countries data
fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

// Filter countries by region
filterByRegion.addEventListener('change', () => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

// Render countries
function renderCountries(data) {
  countriesContainer.innerHTML = '';
  data.forEach((country) => {
    const countryCard = document.createElement('a');
    countryCard.classList.add('country-card');
    countryCard.href = `country.html?name=${country.name.common}`; // Ensure the file path is correct
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="card-text">
        <h3 class="card-title">${country.name.common}</h3>
        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
        <p><b>Region: </b>${country.region}</p>
        <p><b>Capital: </b>${country.capital?.[0]}</p>
      </div>
    `;
    countriesContainer.append(countryCard);
  });
}

// Search countries by name
searchInput.addEventListener('input', (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

document.addEventListener('DOMContentLoaded', () => {
  const themeChanger = document.querySelector('.theme-changer');

  // Toggle theme
  themeChanger.addEventListener('click', () => {
      document.body.classList.toggle('dark');

      // Save the current state of the theme
      if (document.body.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark');
      } else {
          localStorage.setItem('theme', 'light');
      }
  });

  // On page load, apply the saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
      document.body.classList.add('dark');
  }
});

