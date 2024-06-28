document.addEventListener('DOMContentLoaded', () => {
    // Fetch the data.json file containing game data
    fetch('data.json')
        .then(response => response.json())
        .then(data => initializeGame(data)); // Pass the fetched data to the initializeGame function

    // Function to initialize the game
    function initializeGame(data) {
        // Retrieve game categories and select a random category
        const categories = data.categories;
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        // Select a random word from the chosen category
        const randomWord = randomCategory.words[Math.floor(Math.random() * randomCategory.words.length)].toUpperCase();

        // Display the chosen category on the page
        document.getElementById('category').textContent = randomCategory.name;

        // Initialize variables for game state
        const wordContainer = document.getElementById('word'); // Container for displaying the word with blanks
        wordContainer.textContent = '_ '.repeat(randomWord.length).trim(); // Display initial blanks for the word
        const guessedLetters = new Set(); // Set to store guessed letters
        let incorrectGuesses = 0; // Counter for incorrect guesses
        const maxIncorrectGuesses = 6; // Maximum number of allowed incorrect guesses
        const progressBar = document.getElementById('progress-bar'); // Progress bar for tracking incorrect guesses
        let points = parseInt(localStorage.getItem('hangmanPoints')) || 0; // Retrieve points from local storage or default to 0

        // Display the points on the page
        document.getElementById('points').textContent = points;

        //rows of alphabet buttons
        const rows = {
            row1: 'a-i',
            row2: 'j-r',
            row3: 's-z'
        };

        // Generate alphabet buttons dynamically
        for (const [rowId, range] of Object.entries(rows)) {
            const rowElement = document.getElementById(rowId); // Get the row element
            const [start, end] = range.split('-'); // Split the range into start and end characters
            for (let charCode = start.charCodeAt(0); charCode <= end.charCodeAt(0); charCode++) {
                const letter = String.fromCharCode(charCode).toUpperCase(); // Convert character code to uppercase letter
                const button = document.createElement('button'); // Create a button element for the letter
                button.textContent = letter; // Set the button text to the letter
                button.classList.add('w-10', 'h-10', 'm-1', 'text-lg', 'border', 'border-gray-400', 'rounded', 'focus:outline-none', 'hover:bg-gray-200', 'transition', 'duration-150'); // Apply Tailwind CSS classes to style the button
                button.addEventListener('click', () => handleGuess(letter, randomWord, wordContainer, guessedLetters, button, progressBar)); // Add event listener to handle button click
                rowElement.appendChild(button); // Append the button to the row element
            }
        }

        // Function to handle a guess
        function handleGuess(letter, word, wordContainer, guessedLetters, button, progressBar) {
            button.disabled = true; // Disable button after click
            button.classList.add('cursor-not-allowed'); // Add cursor style to indicate button is disabled
            guessedLetters.add(letter); // Add guessed letter to set

            // Update displayed word with guessed letters
            const updatedWordDisplay = word.split('').map(char => guessedLetters.has(char) ? char : '_').join(' ');
            wordContainer.textContent = updatedWordDisplay;

            // Check if the guessed letter is in the word
            if (word.includes(letter)) {
                button.classList.add('bg-green-500', 'text-white'); // Mark correct guess button
                // Check if all letters in the word have been guessed
                if (!updatedWordDisplay.includes('_')) {
                    points += 10; // Increment points by 10 for correct guess
                    localStorage.setItem('hangmanPoints', points); // Save points in local storage
                    document.getElementById('points').textContent = points; // Update displayed points
                    // Show confetti and reload the page after a delay
                    confetti();
                    setTimeout(() => {
                        alert(`Congratulations! You guessed the word! You earned 10 points. Total points: ${points}`);
                        location.reload();
                    }, 2000);
                }
            } else {
                button.classList.add('bg-red-500', 'text-white'); // Mark incorrect guess button
                incorrectGuesses++; // Increment incorrect guess counter
                progressBar.style.width = `${(incorrectGuesses / maxIncorrectGuesses) * 100}%`; // Update progress bar width
                // Check if maximum incorrect guesses have been reached
                if (incorrectGuesses >= maxIncorrectGuesses) {
                    // Show game over message and reload the page after a delay
                    setTimeout(() => {
                        alert('Game Over! You failed to guess the word.');
                        location.reload();
                    }, 100);
                }
            }
        }
    }
});
