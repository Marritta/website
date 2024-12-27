let headerEl = document.getElementById("header"); 

// обробник події "scroll" для вікна
window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY; 
    if (scrollPos > 1) { 
        headerEl.classList.add("fixed"); 
    } else { 
        headerEl.classList.remove("fixed"); 
    }
});

// кнопка прокрутки
let scrollTopButton = document.querySelector("#scroll-top");


window.addEventListener("scroll", function() {
    if (window.scrollY > 1) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

// Обробник події для натискання на кнопку
scrollTopButton.addEventListener("click", function() {
    scrollTopButton.classList.add('rotate');
    window.scrollTo({
        top: 0,
        behavior: "smooth"  
    });
    setTimeout(() => {
        scrollTopButton.classList.remove('rotate');
    }, 600);  
});


let showMenu = document.querySelector("#show-menu");
let hiddenMenu = document.querySelector("#hidden-menu");

// Функція для відкриття/закриття меню
showMenu.addEventListener("click", function () {
    if (hiddenMenu.style.right === "0px") {
        hiddenMenu.style.right = "-300px"; 
    } else {
        hiddenMenu.style.right = "0"; 
    }
});

// Відстеження ширини вікна
function checkWindowSize() {
    if (window.innerWidth <= 992) { 
        showMenu.style.display = "block"; 
    } else {
        showMenu.style.display = "none"; 
        hiddenMenu.style.right = "-300px"; 
    }
}


checkWindowSize();

window.addEventListener("resize", checkWindowSize);


const gallery = document.querySelector('.images');
const spinner = document.getElementById('spinner');
const largeImg = document.getElementById('largeImg'); 
let currentImageHref = ''; // Змінна для зберігання поточного великого зображення

const images = document.querySelectorAll('.images img');

// Обробник кліків на контейнері зображень 
gallery.onclick = function(event) { 
    const thumbnail = event.target.closest('a');
     if (!thumbnail) return;
     
     if (thumbnail.href === currentImageHref) {
        // Якщо клікаємо на те ж саме зображення, ховаємо велике зображення
        largeImg.classList.add('hidden');
        currentImageHref = '';
    } else {
        // Якщо клікаємо на інше зображення, відображаємо його
        showLargeImage(thumbnail.href, thumbnail.title);
        currentImageHref = thumbnail.href;
    }
    event.preventDefault();
} 

// Функція для відображення великого зображення 
function showLargeImage(href, title) {
    return new Promise((resolve, reject) => {
        largeImg.src = href;
        largeImg.alt = title;
        largeImg.classList.remove('hidden'); 

        
        if (largeImg.complete) {
            resolve();
        } else {
            largeImg.addEventListener('load', resolve);
            largeImg.addEventListener('error', reject);
        }
    });
}

//масив обіцянок для завантаження зображень
const promiseArr = Array.from(images).map((img) => {
    return new Promise((resolve, reject) => {
        if (img.complete) {
            resolve(); 
        } else {
            img.addEventListener('load', resolve); 
            img.addEventListener('error', reject); 
        }
    });
});

// спінер до завершення завантаження
Promise.all(promiseArr)
    .then(() => {
        spinner.classList.add('hidden'); 
        gallery.classList.remove('hidden'); 
    })
    .catch(() => {
        
        spinner.classList.add('hidden'); 
        gallery.classList.remove('hidden'); 
    });


// Початковий індекс слайда
let slideIndex = 0;

// слайдер
function showSlides() {
    const slides = document.querySelectorAll('.slider .item');
   
    slides.forEach(slide => (slide.classList.remove('active')));
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add('active');

    setTimeout(showSlides, 5000);
}

showSlides();

// Кнопки для ручного перемикання
function nextSlide() {
    slideIndex++;
    manualSlide();
}

function previousSlide() {
    slideIndex--;
    manualSlide();
}

function manualSlide() {
    const slides = document.querySelectorAll('.slider .item');

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    slides.forEach(slide => (slide.classList.remove('active')));
    slides[slideIndex - 1].classList.add('active');
}

// Анімація при наведенні соц мер
document.querySelectorAll('.social-icon img').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        anime({
            targets: icon,
            scale: [1, 1.5],
            rotate: '1turn',
            easing: 'easeOutElastic(1, .5)',
            duration: 800,
            loop: false
        });
    });

    icon.addEventListener('mouseleave', () => {
        anime({
            targets: icon,
            scale: 1,
            rotate: '0turn',
            easing: 'easeOutExpo',
            duration: 500,
            loop: false
        });
    });

    
});


function calculateCost() {
    const city = document.getElementById('city').value;
    const days = parseInt(document.getElementById('days').value);
    const transport = document.getElementById('transport').value;
    const accommodation = document.getElementById('accommodation').value;
    const food = document.getElementById('food').value;
    const result = document.getElementById('result');

    // Валідація 
    if (!city || !days || !transport || !accommodation || !food) {
        result.textContent = "Будь ласка, заповніть усі поля!";
        return;
    }

    if (days < 1) {
        result.textContent = "Кількість днів не може бути менше 1!";
        return;
    }

    let transportCost, accommodationCost, foodCost;

    // транспорт
    if (transport === 'car') transportCost = 30;
    else if (transport === 'train') transportCost = 20;
    else if (transport === 'plane') transportCost = 50;

    // проживання
    if (accommodation === 'hotel') accommodationCost = 50;
    else if (accommodation === 'hostel') accommodationCost = 20;
    else if (accommodation === 'apartment') accommodationCost = 40;

    // харчування
    if (food === 'restaurant') foodCost = 30;
    else if (food === 'cafe') foodCost = 15;
    else if (food === 'street') foodCost = 10;

    const totalCost = (transportCost + accommodationCost * days + foodCost * days);

    document.getElementById('result').textContent = `Загальна вартість подорожі: ${totalCost} USD`;
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Зупиняємо відправку форми
    
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const comment = document.getElementById("comment").value;
    const error = document.getElementById("error");
    const success = document.getElementById("success");

    error.innerHTML = ""; // Очищуємо попередні помилки
    success.innerHTML = "";// Очищуємо попереднє успішне повідомлення

    let isValid = true; // Змінна для перевірки валідності
    
    // Валідація імені та прізвища
    validateNameSurname(name, "Ім'я")&& isValid;
    validateNameSurname(surname, "Прізвище")&& isValid;

    // Валідація пошти
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        error.innerHTML += "<p>Поле email обов'язкове.</p>";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        error.innerHTML += "<p>Введіть коректний email.</p>";
        isValid = false;
    }

    // Валідація телефону
    const phoneRegex = /^(\+380|0)[0-9]{9}$/;
    if (phone === "") {
        error.innerHTML += "<p>Поле телефон обов'язкове.</p>";
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        error.innerHTML += "<p>Введіть коректний номер телефону.</p>";
        isValid = false;
    }

    // Валідація коментаря 
    if (comment === "") {
        error.innerHTML += "<p>Поле коментар не може бути порожнім.</p>";
        isValid = false;
    }

    
    function validateNameSurname(value, fieldName) {
        const nameSurnameRegex = /^[A-Za-zА-Яа-яёЁіІїЇєЄ'-]{3,}$/;
        if (value === "") {
            error.innerHTML += `<p>Поле ${fieldName} обов'язкове.</p>`;
            return false;
        } else if (!nameSurnameRegex.test(value)) {
            error.innerHTML += `<p>Введіть коректне ${fieldName} (тільки літери, апострофи, дефіси, не менше 3 символів).</p>`;
            return false;
        }
        return false;
    }

   
    if (isValid) {
        success.innerHTML = "<p>Повідомлення успішно відправлено!</p>";
    }
});
