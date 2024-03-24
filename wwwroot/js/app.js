
var linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = '../css/styles.css';

document.head.appendChild(linkElement);

function addToHistory(url, backendUrl) {
    const list = document.getElementById('linksHistory');
    const listItem = document.createElement('div');
    listItem.classList.add('history-item');

    const urlParagraph = document.createElement('p');
    urlParagraph.textContent = url; 
    var slimParagraph = document.createElement('a');
    slimParagraph.setAttribute("href", url);
    slimParagraph.textContent = backendUrl;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    var statButton = document.createElement('a');
    statButton.setAttribute("href", "#");
    statButton.textContent = 'Статистика';
    statButton.classList.add('stat-btn');

    buttonsContainer.appendChild(statButton);

    listItem.appendChild(urlParagraph);
    listItem.appendChild(slimParagraph);
    listItem.appendChild(buttonsContainer);

    list.appendChild(listItem);
}

function showHistory() {
    const historySection = document.getElementById('historySection');
    historySection.classList.add('show');
}

function addToHistoryFromInput(backendUrl) {
    const originalUrl = document.getElementById('originalUrl').value;
    if (!originalUrl) {
        alert("Будь ласка, введіть URL.");
        return;
    }

    addToHistory(originalUrl, backendUrl);
    showHistory();

    const historySection = document.getElementById('historySection');
    historySection.style.display = 'block';

    if (window.innerWidth <= 768) {
        historySection.style.transition = 'display 0.5s ease-in-out';
        historySection.style.maxWidth = '90%';
        historySection.style.margin = '0 auto';
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('backend-url')) {
        const manualUrl = document.getElementById('originalUrl').value;
        if (manualUrl) {
            window.location.href = manualUrl;
        } else {
            alert("Будь ласка, введіть URL.");
        }
    }
});

window.addEventListener('resize', function() {
    const historySection = document.getElementById('historySection');
    if (window.innerWidth <= 768) {
        historySection.style.transition = 'display 0.5s ease-in-out';
        historySection.style.maxWidth = '90%';
        historySection.style.margin = '0 auto';
    } else {
        historySection.style.transition = 'none';
        historySection.style.maxWidth = 'none';
        historySection.style.margin = '0';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const response = await fetch('/Index', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        const shortLink = data.shortLink;
        addToHistoryFromInput(shortLink);

        if (response.ok) {
            const result = await response.json();
        } else {
            console.error('Помилка при відправці даних на сервер');
        }
    });
});
