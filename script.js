// Get elements from the DOM
const wordInput = document.getElementById('wordInput');
const searchButton = document.getElementById('searchButton');
const wordMeaning = document.getElementById('wordMeaning');
const languageSelect = document.getElementById('languageSelect');
const translatedWord = document.getElementById('translatedWord');
const contentText = document.getElementById('contentText');


async function fetchWikipediaContent(word, language) {
    try {
        const response = await fetch(
            `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(word)}`
        );

        if (response.ok) {
            const data = await response.json();
            return data.extract;
        } else {
            return 'Word not found on Wikipedia.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return 'An error occurred while fetching data.';
    }
}

// Event listener for the search button
searchButton.addEventListener('click', async () => {
    const word = wordInput.value.toLowerCase();
    const selectedLanguage = languageSelect.value;

    if (!word) {
        contentText.innerHTML = '';
        wordMeaning.textContent = '';
        translatedWord.textContent = '';
        return;
    }

    // Fetch content from Wikipedia
    const content = await fetchWikipediaContent(word, selectedLanguage);
    contentText.innerHTML = `<h3>Content Text for "${word}":</h3><p>${content}</p>`;
    
    // Display word meaning if available in the dictionary (replace with your own dictionary logic)
    if (dictionary[word]) {
        const meaning = dictionary[word][selectedLanguage];
        if (meaning) {
            wordMeaning.textContent = `Meaning (${selectedLanguage}): ${meaning}`;
        } else {
            wordMeaning.textContent = `Meaning (${selectedLanguage}): Not available`;
        }
    } else {
        wordMeaning.textContent = 'Word not found';
    }

    // Display translation if available (replace with your translation logic)
    const translation = await fetchTranslation(word, selectedLanguage);
    translatedWord.textContent = `Translation (${selectedLanguage}): ${translation}`;
});

/*
// Prevent form submission on pressing Enter key
wordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
});*/
