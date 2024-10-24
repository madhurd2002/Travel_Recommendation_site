let travelRecommendations = {};

// Fetch the travel recommendations data
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Check the structure of your data
        travelRecommendations = data; // Assign fetched data to travelRecommendations
        displayRecommendation({ cities: data.countries.flatMap(country => country.cities) }); // Display all recommendations
    })
    .catch(error => {
        console.error('Error fetching the data:', error);
    });

function search() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    let filteredCities = [];

    // Search through countries and their cities
    travelRecommendations.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm)) {
                filteredCities.push(city);
            }
        });
    });

    // Log the filtered cities to check if data is accessed correctly
    console.log("Filtered Cities: ", filteredCities);

    // Display the recommendations if any match is found
    if (filteredCities.length > 0) {
        displayRecommendation({ cities: filteredCities }); // Pass as an object
    } else {
        document.getElementById('recommendation-results').innerHTML = '<p>No results found.</p>';
    }
}

function displayRecommendation(data) {
    const recommendationDiv = document.getElementById("recommendation-results");
    let content = '';

    // Check if data has cities property and is an array
    if (data && data.cities && Array.isArray(data.cities)) {
        data.cities.forEach(city => {
            content += `
            <div>
                <h2>${city.name}</h2>
                <img src="${city.imageUrl}" alt="${city.name}" style="width:200px; height:auto;">
                <p>${city.description}</p>
            </div>
            `;
        });
    } else {
        console.error('No cities found in data:', data);
        recommendationDiv.innerHTML = '<p>No cities to display.</p>'; // Provide user feedback
    }

    recommendationDiv.innerHTML = content;
}

function reset() {
    document.getElementById('search').value = '';
    document.getElementById('recommendation-results').innerHTML = '';
}