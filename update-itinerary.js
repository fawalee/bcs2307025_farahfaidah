function loadItineraryForUpdate() {
    const itineraryData = JSON.parse(localStorage.getItem("itineraryData"));
    if (itineraryData) {
        document.getElementById("countryName").value = itineraryData.countryName || "";
        document.getElementById("region").value = itineraryData.region || "";
        document.getElementById("continent").value = itineraryData.continent || "";
        document.getElementById("capital").value = itineraryData.capital || "";
        document.getElementById("currency").value = itineraryData.currency || "";
        document.getElementById("nearbyCountries").value = itineraryData.nearbyCountries || "";
        document.getElementById("startDate").value = itineraryData.startDate || "";
        document.getElementById("endDate").value = itineraryData.endDate || "";
        document.getElementById("status").value = itineraryData.status || "Planned";
        document.getElementById("notes").value = itineraryData.notes || "";
        document.getElementById("activities").value = itineraryData.activities || "";
        document.getElementById("fileName").value = itineraryData.fileName || "";
    }
}

function saveItinerary(event) {
    event.preventDefault();
    const itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
    const updatedItinerary = {
        countryName: document.getElementById("countryName").value,
        region: document.getElementById("region").value,
        continent: document.getElementById("continent").value,
        capital: document.getElementById("capital").value,
        currency: document.getElementById("currency").value,
        nearbyCountries: document.getElementById("nearbyCountries").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        status: document.getElementById("status").value,
        notes: document.getElementById("notes").value,
        activities: document.getElementById("activities").value,
        fileName: document.getElementById("fileName").value,
    };

    const index = itineraries.findIndex(itinerary => itinerary.fileName === updatedItinerary.fileName);

    if (index !== -1) {
        itineraries[index] = updatedItinerary;
        localStorage.setItem("itineraries", JSON.stringify(itineraries));
        alert("Itinerary updated successfully!"); // Added alert here
        window.location.href = "dreams-itineraries.html";
    } else {
        alert("Itinerary not found. Please check the file name.");
    }
}

window.onload = () => {
    loadItineraryForUpdate();
    document.getElementById("itineraryForm").addEventListener("submit", saveItinerary);
};
