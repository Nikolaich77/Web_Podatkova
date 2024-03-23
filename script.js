const form = document.getElementById('surveyForm');


// Функція для зберігання даних у LocalStorage
function saveToLocalStorage() {
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach(function(value, key) {
        if (key === 'taxNews') {
            // Якщо значення - масив, зберігаємо як є
            formObject[key] = Array.isArray(formObject[key]) ? [...formObject[key], value] : [value];
        } else {
            formObject[key] = value;
        }
    });

    // Зберігаємо дані у LocalStorage
    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    surveys.push(formObject);
    localStorage.setItem('surveys', JSON.stringify(surveys));
}

// Обробник події подання форми
form.addEventListener('submit', function(event) {
    event.preventDefault();
    saveToLocalStorage();
    alert('Дякуємо за участь у опитуванні!');
    this.reset();
});

// Оновлення значення output при зміні range input
const rangeInput = document.getElementById('taxComplexity');
const outputValue = document.getElementById('taxComplexityValue');

rangeInput.addEventListener('input', function() {
    outputValue.textContent = this.value;
});

// Отримання даних з LocalStorage
const surveys = JSON.parse(localStorage.getItem('surveys')) || [];

// Відображення опитувань, що відповідають фільтру
function displayFilteredSurveys() {
    const taxComplexityFilter = document.getElementById('taxComplexityFilter').value;
    const taxIssuesFilter = document.getElementById('taxIssuesFilter').value.toLowerCase();
    const educationLevelFilter = document.getElementById('educationLevelFilter').value;

    const filteredSurveys = surveys.filter(function(survey) {
        return (survey.taxComplexity >= taxComplexityFilter || taxComplexityFilter === '') &&
            (survey.taxIssues.toLowerCase().includes(taxIssuesFilter) || taxIssuesFilter === '') &&
            (survey.educationLevel === educationLevelFilter || educationLevelFilter === '');
    });

    // Відобразити відфільтровані опитування
    console.log(filteredSurveys);
    // Тут ви можете відобразити відфільтровані опитування на веб-сторінці
}

// Фільтрація при зміні значень фільтрів
document.getElementById('taxComplexityFilter').addEventListener('change', displayFilteredSurveys);
document.getElementById('taxIssuesFilter').addEventListener('input', displayFilteredSurveys);
document.getElementById('educationLevelFilter').addEventListener('change', displayFilteredSurveys);

