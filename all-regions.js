    // Fetch all countries
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
        const countryList = document.getElementById('country-list');
        countries.forEach(country => {
          const flag = country.flags.svg;
          const name = country.name.common;

          countryList.innerHTML += `
            <div class="country-card">
              <img src="${flag}" alt="${name} flag" class="country-flag" onclick="window.location.href='country-detail.html?name=${encodeURIComponent(name)}'">
              <p class="country-name">${name}</p>
            </div>
          `;
        });
      });

    const scrollContainer = document.getElementById('country-list');
    document.getElementById('scroll-left').addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
    });
    document.getElementById('scroll-right').addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
    });

    function toggleMenu() {
      const menuPanel = document.getElementById('menuPanel');
      menuPanel.classList.toggle('open');
    }

    // Filter countries by alphabet
    function filterCountries() {
      const input = document.getElementById('filterInput');
      const filter = input.value.toLowerCase();
      const countryCards = document.querySelectorAll('.country-card');

      countryCards.forEach(card => {
        const countryName = card.querySelector('.country-name').textContent.toLowerCase();
        card.style.display = countryName.startsWith(filter) ? '' : 'none';
      });
    }