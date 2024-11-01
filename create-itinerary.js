const urlParams = new URLSearchParams(window.location.search);
const countryName = decodeURIComponent(urlParams.get('name'));
const region = decodeURIComponent(urlParams.get('region'));
const continent = decodeURIComponent(urlParams.get('continent'));
const capital = decodeURIComponent(urlParams.get('capital'));
const currency = decodeURIComponent(urlParams.get('currency'));
const borders = decodeURIComponent(urlParams.get('borders'));

// Populate form fields
document.getElementById("countryName").value = countryName;
document.getElementById("region").value = region;
document.getElementById("continent").value = continent;
document.getElementById("capital").value = capital;
document.getElementById("currency").value = currency;
document.getElementById("nearbyCountries").value = borders;

document.getElementById("itineraryForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Save itinerary to local storage
  const itinerary = {
    countryName: countryName,
    region: region,
    continent: continent,
    capital: capital,
    currency: currency,
    nearbyCountries: borders,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    status: document.getElementById("status").value,
    notes: document.getElementById("notes").value,
    activities: document.getElementById("activities").value,
    fileName: document.getElementById("fileName").value
  };

  const itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
  itineraries.push(itinerary);
  localStorage.setItem("itineraries", JSON.stringify(itineraries));

  // Alert and redirect to itineraries page
  alert("Itinerary created successfully!");
  window.location.href = "dreams-itineraries.html"; // Redirect to the itineraries page
});
function toggleMenu() {
  const menuPanel = document.getElementById('menuPanel');
  menuPanel.classList.toggle('open');
}