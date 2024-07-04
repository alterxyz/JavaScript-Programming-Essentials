// Load the JSON data
let travelData;
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
    })
    .catch(error => console.error('Error loading JSON:', error));

function searchRecommendations(keyword) {
    if (!travelData) return [];

    const results = [];
    keyword = keyword.toLowerCase().trim();

    if (['beach', 'beaches'].includes(keyword)) {
        return travelData.beaches.map(beach => ({ type: 'Beach', ...beach }));
    }
    if (['temple', 'temples'].includes(keyword)) {
        return travelData.temples.map(temple => ({ type: 'Temple', ...temple }));
    }
    // If country, we return cities not countries
    if (['country', 'countries'].includes(keyword)) {
        travelData.countries.forEach(country => {
            country.cities.forEach(city => {
                results.push({ type: 'City', ...city, country: country.name });
            });
        });
        return results;
    }

    // Regular keyword search
    travelData.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)) {
                results.push({ type: 'City', ...city, country: country.name });
            }
        });
    });

    travelData.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(keyword) || temple.description.toLowerCase().includes(keyword)) {
            results.push({ type: 'Temple', ...temple });
        }
    });

    travelData.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(keyword) || beach.description.toLowerCase().includes(keyword)) {
            results.push({ type: 'Beach', ...beach });
        }
    });

    return results;
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement('div');
        let content = `
            <h3>${result.name} (${result.type})</h3>
            <p>${result.description}</p>
        `;

        if (result.type === 'City') {
            content += `<p>Country: ${result.country}</p>`;
        }

        if (result.imageUrl) {
            content += `<img src="${result.imageUrl}" alt="${result.name}" style="max-width: 200px;">`;
        }

        resultElement.innerHTML = content;
        resultsContainer.appendChild(resultElement);
    });
}

// Change layout
function changeLayout(isSearching) {
    const contentWrapper = document.querySelector('.content-wrapper');
    const searchResults = document.getElementById('searchResults');

    if (isSearching) {
        contentWrapper.classList.remove('cw-center');
        contentWrapper.classList.add('cw-left');
        searchResults.classList.add('cw-right');
        searchResults.style.display = 'block';
    } else {
        contentWrapper.classList.remove('cw-left');
        contentWrapper.classList.add('cw-center');
        searchResults.classList.remove('cw-right');
        searchResults.style.display = 'none';
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const searchInput = document.getElementById('searchInput');

    if (searchButton && clearButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const keyword = searchInput.value.toLowerCase();
            const results = searchRecommendations(keyword);
            displayResults(results);
            changeLayout(true);
        });

        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            document.getElementById('searchResults').innerHTML = '';
            changeLayout(false);
        });
    }
});