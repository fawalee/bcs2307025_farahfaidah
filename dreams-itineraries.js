        // Parse localStorage data with error handling
        let itineraries = [];
        try {
            itineraries = JSON.parse(localStorage.getItem("itineraries")) || [];
        } catch (e) {
            console.error("Error parsing itineraries from localStorage:", e);
        }

        const itinerariesList = document.getElementById("itinerariesList");

        // Render itineraries
        itineraries.forEach((itinerary, index) => {
            const itineraryDiv = document.createElement("div");
            itineraryDiv.className = "itinerary";
            itineraryDiv.innerHTML = `
                <h3>${itinerary.countryName || 'Unknown Country'}</h3>
                <p>Region: ${itinerary.region || 'N/A'}</p>
                <p>Continent: ${itinerary.continent || 'N/A'}</p>
                <p>Capital: ${itinerary.capital || 'N/A'}</p>
                <p>Currency: ${itinerary.currency || 'N/A'}</p>
                <p>Nearby Countries: ${itinerary.nearbyCountries || 'N/A'}</p>
                <p>Start Date: ${itinerary.startDate || 'N/A'}</p>
                <p>End Date: ${itinerary.endDate || 'N/A'}</p>
                <p>Status: ${itinerary.status || 'N/A'}</p>
                <p>Notes: ${itinerary.notes || 'N/A'}</p>
                <p>Activities: ${itinerary.activities || 'N/A'}</p>
                <button onclick="deleteItinerary(${index})">Delete Itinerary</button>
                <button onclick="updateItinerary(${index})">Update Itinerary</button>
            `;
            itinerariesList.appendChild(itineraryDiv);
        });

        // Delete itinerary
        function deleteItinerary(index) {
            if (confirm("Are you sure you want to delete this itinerary?")) {
                itineraries.splice(index, 1);
                localStorage.setItem("itineraries", JSON.stringify(itineraries));
                alert("Itinerary successfully deleted!"); // Alert for successful deletion
                location.reload();
            }
        }

        // Update itinerary
        function updateItinerary(index) {
            const itinerary = itineraries[index];
            localStorage.setItem("itineraryData", JSON.stringify(itinerary));
            window.location.href = "update-itinerary.html";
        }

        function toggleMenu() {
            const menuPanel = document.getElementById('menuPanel');
            menuPanel.classList.toggle('open');
        }