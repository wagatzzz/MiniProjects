let quizData;
    let currentQuestionIndex = 0;
    let selectedOption = null;
    const selectedSubject = localStorage.getItem('selectedSubject');

    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        quizData = data.quiz.find(subject => subject.subject === selectedSubject).questions;
        loadQuestion();
      })
      .catch(error => console.error('Error loading quiz data:', error));

    function loadQuestion() {
      const questionElement = document.getElementById('question');
      const optionsElement = document.getElementById('options');

      const questionData = quizData[currentQuestionIndex];

      questionElement.textContent = questionData.question;
      optionsElement.innerHTML = '';

      questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500';
        button.textContent = option;
        button.onclick = () => selectOption(button, option);
        optionsElement.appendChild(button);
      });

      selectedOption = null;
    }

    function selectOption(button, option) {
      const optionsElement = document.getElementById('options');
      optionsElement.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('bg-blue-200');
        btn.classList.add('bg-gray-200');
      });
      button.classList.remove('bg-gray-200');
      button.classList.add('bg-blue-200');
      selectedOption = option;
    }

    function submitAnswer() {
      if (selectedOption === null) {
        alert('Please select an answer!');
        return;
      }

      const questionData = quizData[currentQuestionIndex];
      if (selectedOption === questionData.answer) {
        alert('Correct!');
        updateScore(selectedSubject);
      } else {
        alert('Wrong answer. Try again!');
      }

      currentQuestionIndex++;
      if (currentQuestionIndex >= quizData.length) {
        showScore();
      } else {
        loadQuestion();
      }
    }

    function updateScore(subject) {
      let score = sessionStorage.getItem(subject + '_score');
      score = score ? parseInt(score) + 1 : 1;
      sessionStorage.setItem(subject + '_score', score);
    }

    function showScore() {
      const scoreElement = document.getElementById('score');
      const subjectScore = sessionStorage.getItem(selectedSubject + '_score');
      scoreElement.textContent = subjectScore ? subjectScore : '0';
      const scoreSection = document.getElementById('score-section');
      scoreSection.classList.remove('hidden');
      const submitButton = document.getElementById('submit-button');
      submitButton.textContent = 'Return to Subject Selection';
      submitButton.onclick = goBack;
    }

    function goBack() {
      window.location.href = 'index.html';
    }