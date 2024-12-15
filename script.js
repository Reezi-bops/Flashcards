function initializeFlashcardApp() {
    const flashcardContainer = document.getElementById('flashcard-container');
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const addFlashcardButton = document.getElementById('add-flashcard');
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const flashcardData = [
        { question: "What is the capital of France?", answer: "Paris" },
        { question: "What is 2 + 2?", answer: "4" },
        { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
    ];

    function createFlashcard(question, answer, index) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = `Question: ${question}`;

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = `Answer: ${answer}`;

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const newQuestion = prompt('Edit the question:', question);
            const newAnswer = prompt('Edit the answer:', answer);
            if (newQuestion && newAnswer) {
                flashcardData[index].question = newQuestion;
                flashcardData[index].answer = newAnswer;
                front.textContent = `Question: ${newQuestion}`;
                back.textContent = `Answer: ${newAnswer}`;
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            flashcardData.splice(index, 1);
            renderFlashcards();
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        front.appendChild(actions);

        flashcard.appendChild(front);
        flashcard.appendChild(back);
        flashcardContainer.appendChild(flashcard);

        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('is-flipped');
        });
    }

    function renderFlashcards() {
        flashcardContainer.innerHTML = '';
        flashcardData.forEach(({ question, answer }, index) => {
            createFlashcard(question, answer, index);
        });
    }

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');

        if (isDarkMode) {
            body.style.background = 'linear-gradient(135deg, #121212, #1e1e1e)';
            body.style.color = '#f0f0f0';
            document.querySelectorAll('.flashcard').forEach(flashcard => {
                flashcard.style.background = 'linear-gradient(145deg, #2b2b2b, #3c3c3c)';
                flashcard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.7)';
            });
            themeToggleButton.textContent = '☀️';
            themeToggleButton.style.backgroundColor = '#555';
            themeToggleButton.style.color = '#fff';
        } else {
            body.style.background = 'linear-gradient(135deg, #6a11cb, #2575fc)';
            body.style.color = '#000';
            document.querySelectorAll('.flashcard').forEach(flashcard => {
                flashcard.style.background = 'linear-gradient(145deg, #1e3c72, #2a5298)';
                flashcard.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            });
            themeToggleButton.textContent = '🌙';
            themeToggleButton.style.backgroundColor = '#28a745';
            themeToggleButton.style.color = '#fff';
        }
    }

    addFlashcardButton.addEventListener('click', () => {
        const question = questionInput.value.trim();
        const answer = answerInput.value.trim();

        if (question && answer) {
            flashcardData.push({ question, answer });
            renderFlashcards();
            questionInput.value = '';
            answerInput.value = '';
        } else {
            alert('Please enter both a question and an answer.');
        }
    });

    themeToggleButton.addEventListener('click', toggleDarkMode);

    renderFlashcards();
}

initializeFlashcardApp();
