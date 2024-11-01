const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get('name');

if (countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(country => {
      const details = country[0];
      const name = details.name.common;  // Fetch the common name of the country
      document.getElementById("countryName").innerText = name;  // Set the country name
      const flag = details.flags.svg;
      const area = details.area;
      const region = details.region;
      const subregion = details.subregion;
      const population = details.population;
      const capitalCity = details.capital ? details.capital.join(', ') : 'N/A'; // Get capital city
      const currency = details.currencies
        ? Object.values(details.currencies).map(c => `${c.name} (${c.symbol || 'N/A'})`).join(", ") : 'N/A';
      const languages = details.languages ? Object.values(details.languages).join(', ') : 'N/A';
      const borders = details.borders ? details.borders.join(', ') : 'None';
      const latlng = details.latlng;
      const timezone = details.timezones ? details.timezones.join(', ') : 'N/A';
      const coa = details.coatOfArms?.png;

      // Get the continent from the API response
      const continent = details.continents ? details.continents.join(', ') : 'N/A';

      // Update the HTML elements with the data
      document.getElementById("capitalCity").innerText = capitalCity;  // Set the capital city
      document.getElementById("currency").innerText = currency;
      document.getElementById("timezone").innerText = timezone;
      document.getElementById("region").innerText = region;
      document.getElementById("subregion").innerText = subregion;
      document.getElementById("continent").innerText = continent;  
      document.getElementById("area").innerText = area;
      document.getElementById("languages").innerText = languages;
      document.getElementById("population").innerText = population;

      // Display latitude and longitude
      if (latlng) {
        const locationString = `Latitude: ${latlng[0]}, Longitude: ${latlng[1]}`;
        document.getElementById("location").innerText = locationString; // Set the location
      }

      document.getElementById("flag").src = flag;
      document.getElementById("coa").src = coa;

      if (latlng) {
        const map = L.map('map').setView([latlng[0], latlng[1]], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        L.marker([latlng[0], latlng[1]]).addTo(map).bindPopup(`<b>${countryName}</b>`).openPopup();
      }

      fetchNearbyCountries(borders.split(','));

      // Prepare the link for creating an itinerary
      document.getElementById("createItineraryButton").href += encodeURIComponent(name) +
        '&region=' + encodeURIComponent(region) +
        '&continent=' + encodeURIComponent(continent) +
        '&capital=' + encodeURIComponent(capitalCity) +
        '&currency=' + encodeURIComponent(currency) +
        '&borders=' + encodeURIComponent(borders);
    })
    .catch(error => console.error('Error fetching country data:', error));
}

function fetchNearbyCountries(borderCodes) {
  const countryListElement = document.getElementById("countryList");
  countryListElement.innerHTML = '';
  if (!borderCodes || borderCodes.length === 0 || borderCodes[0] === "None") {
    countryListElement.innerHTML = '<li>None</li>';
    return;
  }
  borderCodes.forEach(code => {
    fetch(`https://restcountries.com/v3.1/alpha/${code.trim()}`)
      .then(response => response.json())
      .then(country => {
        const name = country[0].name.common;
        const flag = country[0].flags.svg;
        countryListElement.innerHTML += `
          <li class="nearby-country">
            <img src="${flag}" alt="${name} flag" class="nearby-flag">
            ${country[0].cca3} - ${name}
          </li>
        `;
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        countryListElement.innerHTML += `<li>Error: ${code}</li>`;
      });
  });
}
function toggleMenu() {
  const menuPanel = document.getElementById('menuPanel');
  menuPanel.classList.toggle('open');
}
