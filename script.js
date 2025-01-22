// Переменная для хранения текущего перетаскиваемого животного
let draggedAnimal = null;

// Список животных, которым разрешено быть посаженными в окна
const allowedAnimals = ["mouse", "frog", "rabbit", "fox", "cat", "bear"];

// Переменная для счёта ошибок
let errorCount = 0;

// Переменная для подсчёта успешно размещённых животных
let successfulPlacements = 0;

// Элемент для отображения счётчика ошибок
const errorDisplay = document.createElement('div');
errorDisplay.style.position = 'absolute';
errorDisplay.style.top = '10px';
errorDisplay.style.right = '10px';
errorDisplay.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
errorDisplay.style.color = 'white';
errorDisplay.style.padding = '10px';
errorDisplay.style.borderRadius = '5px';
errorDisplay.style.fontSize = '16px';
errorDisplay.innerText = `Ошибки: ${errorCount}`;
document.body.appendChild(errorDisplay);

// Находим всех животных
const animals = document.querySelectorAll('.animal');

// Устанавливаем события для перетаскивания животных
animals.forEach(animal => {
    animal.addEventListener('dragstart', (e) => {
        draggedAnimal = e.target; // Сохраняем перетаскиваемый элемент
    });
});

// Находим все окна
const windows = document.querySelectorAll('.window');

// Устанавливаем события для окон
windows.forEach(window => {
    // Событие, когда животное находится над окном
    window.addEventListener('dragover', (e) => {
        e.preventDefault(); // Разрешаем сбрасывание
    });

    // Событие сброса животного в окно
    window.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedAnimal) {
            // Проверяем, есть ли уже животное в окне
            if (window.children.length > 0) {
                alert("Это окно уже занято!");
                return;
            }

            // Проверяем, разрешено ли сажать это животное
            const animalId = draggedAnimal.id; // Получаем ID перетаскиваемого животного
            if (allowedAnimals.includes(animalId)) {
                // Если животное разрешено, добавляем его в окно
                window.appendChild(draggedAnimal);
                draggedAnimal.style.position = 'absolute';
                draggedAnimal.style.top = '0';
                draggedAnimal.style.left = '0';
                draggedAnimal.style.width = '100%';
                draggedAnimal.style.height = '100%';
                draggedAnimal = null; // Сбрасываем переменную
                successfulPlacements++; // Увеличиваем счётчик успешных размещений

                // Проверяем, завершена ли игра
                if (successfulPlacements === allowedAnimals.length) {
                    showCompletionModal(); // Показываем сообщение об успехе
                }
            } else {
                // Если животное не разрешено
                errorCount++; // Увеличиваем счётчик ошибок
                errorDisplay.innerText = `Ошибки: ${errorCount}`; // Обновляем отображение
                alert("Это животное не может сесть в это окно!");
            }
        }
    });
});

// Функция для отображения сообщения об успехе
function showCompletionModal() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.border = '2px solid black';
    modal.style.padding = '20px';
    modal.style.textAlign = 'center';
    modal.style.boxShadow = '0px 4px 10px rgba(0, 0, 0, 0.5)';
    
    modal.innerHTML = `
        <p>Вы справились с заданием!</p>
        <p>Допущено ошибок: ${errorCount}</p>
        <img src="qr.png" alt="QR-код" style="width: 100px; height: 100px; margin: 10px 0;">
        <button onclick="location.reload()">Начать заново</button>
    `;
    document.body.appendChild(modal);
}

// Карта звуков для животных
const soundMap = {
    "cat": "cat.mp3",
    "lion": "lion.mp3",
    "fox": "fox.mp3",
    "goat": "goat.mp3",
    "rabbit": "rabbit.mp3",
    "frog": "frog.mp3",
    "bear": "bear.mp3",
    "tiger": "tiger.mp3",
    "mouse": "mouse.mp3"
};

// Переменная для хранения текущего звука
let currentAudio = null;

// Функция для воспроизведения звука
function playSound(soundFile) {
    if (currentAudio) {
        currentAudio.pause();           // Останавливаем предыдущий звук
        currentAudio.currentTime = 0;   // Сбрасываем его на начало
    }
    currentAudio = new Audio(soundFile);
    currentAudio.play();
}

// Функция для остановки звука
function stopSound() {
    if (currentAudio) {
        currentAudio.pause();           // Останавливаем звук
        currentAudio.currentTime = 0;   // Сбрасываем его на начало
        currentAudio = null;            // Сбрасываем переменную
    }
}

// Устанавливаем обработчики событий для всех животных
animals.forEach(animal => {
    const animalId = animal.id; // Получаем ID животного
    if (soundMap[animalId]) {
        // Наведение мыши
        animal.addEventListener('mouseenter', () => {
            playSound(soundMap[animalId]); // Воспроизводим звук
        });
        // Уход мыши
        animal.addEventListener('mouseleave', () => {
            stopSound(); // Останавливаем звук
        });
    }
});
