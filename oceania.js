    fetch('https://restcountries.com/v3.1/region/oceania')
      .then(response => response.json())
      .then(countries => {
        const carousel = document.getElementById('country-carousel');
        countries.forEach(country => {
          const flag = country.flags.svg;
          const name = country.name.common;

          carousel.innerHTML += `
            <div class="card" style="background-image: url('${flag}');" onclick="goToCountryDetails('${name}')">
              <div class="card-content">
                <h3>${name}</h3>
              </div>
            </div>
          `;
        });
        updateCarousel();
      });

    let currentIndex = 0;

    function updateCarousel() {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        card.style.transform = `translateX(${(index - currentIndex) * 125}px) rotateY(${(index - currentIndex) * 15}deg)`;
        card.style.zIndex = index === currentIndex ? 1 : 0;
        card.style.opacity = index === currentIndex ? 1 : 0.5;
      });
    }
    
    // Function to navigate to country details page
    function goToCountryDetails(countryName) {
      window.location.href = `country-detail.html?name=${encodeURIComponent(countryName)}`;
    }
    
    document.getElementById('prev').addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
      updateCarousel();
    });

    document.getElementById('next').addEventListener('click', () => {
      const totalCards = document.querySelectorAll('.card').length;
      currentIndex = (currentIndex < totalCards - 1) ? currentIndex + 1 : totalCards - 1;
      updateCarousel();
    });

    function toggleMenu() {
      const menuPanel = document.getElementById('menuPanel');
      menuPanel.classList.toggle('open');
    }  