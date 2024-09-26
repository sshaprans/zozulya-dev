
window.onscroll = function() {
    const header = document.getElementById("header");
    if (window.scrollY > 0) {
        header.classList.add("header-opacity");
    } else {
        header.classList.remove("header-opacity");
    }
};
// Константи
const linkList = document.querySelectorAll('.nav-bar__item .effect_line');
const submenuLinks = document.querySelectorAll('.nav-bar__submenu__link');
const menuButton = document.querySelector('.menu_button');
const navBarWrapper = document.querySelector('.nav-bar__wrapper');
const mobileArrows = document.querySelectorAll('.menu_arrow--mobile');

// Функція для відкриття/закриття підменю
linkList.forEach(link => {
    link.addEventListener('click', () => {
        const dataMenu = link.getAttribute('data-menu');
        const subMenu = document.querySelector(`.nav-bar__submenu[data-menu-sub="${dataMenu}"]`);
        const arrow = link.querySelector('.menu_arrow--mobile');

        // Перевірка: якщо підменю вже відкрите, закриваємо його
        if (subMenu.classList.contains('nav-bar__submenu--active')) {
            subMenu.classList.remove('nav-bar__submenu--active');
            link.classList.remove('on_menu');
            if (arrow) arrow.style.transform = 'rotate(0deg)';
            arrow.style.fill = '#E4E5E8';
        } else {
            // Закриваємо всі інші підменю перед відкриттям нового
            document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => {
                sub.classList.remove('nav-bar__submenu--active');
            });
            document.querySelectorAll('.nav-bar__item .effect_line.on_menu').forEach(item => {
                item.classList.remove('on_menu');
            });
            document.querySelectorAll('.menu_arrow--mobile').forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.fill = '#E4E5E8';
            });

            // Відкриваємо нове підменю і перевертаємо стрілку
            subMenu.classList.add('nav-bar__submenu--active');
            link.classList.add('on_menu');
            if (arrow) {
                arrow.style.transform = 'rotate(180deg)';
                arrow.style.fill = '#FCC341';

            }
        }
    });
});

// Видалення активних класів при кліку на submenu__link
submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => {
            sub.classList.remove('nav-bar__submenu--active');
        });
        document.querySelectorAll('.on_menu').forEach(item => {
            item.classList.remove('on_menu');
        });
        navBarWrapper.classList.remove('is-active');
        document.body.classList.remove('body-hidden');

        // Повертаємо всі стрілки назад
        mobileArrows.forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
            arrow.style.fill = '#E4E5E8';
        });
    });
});

// Додавання/видалення класів для кнопки меню
menuButton.addEventListener('click', () => {
    navBarWrapper.classList.toggle('is-active');
    menuButton.classList.toggle('on_menu');
    document.body.classList.toggle('body-hidden');

    // Якщо is-active видалено, очищуємо всі активні стани і повертаємо стрілки
    if (!navBarWrapper.classList.contains('is-active')) {
        document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => {
            sub.classList.remove('nav-bar__submenu--active');
        });
        document.querySelectorAll('.on_menu').forEach(item => {
            item.classList.remove('on_menu');
        });
        mobileArrows.forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
            arrow.style.fill = '#E4E5E8';

        });
    }
});






// form sender
document.getElementById('contacts').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch('./sendMessage.php', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            let resultDiv = document.getElementById('form-result');
            if (data.status === 'success') {
                resultDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
            } else {
                resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


// slider
const swiperBanner = new Swiper(".swiperBanner", {
    lazy: true,
    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    loop:true,
});
const swiperProjects = new Swiper(".swiperProjects", {
    lazy: true,
    slidesPerView: 1,
    loop:true,
    spaceBetween: 60,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        380: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        780: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 60,
        },
    },
});
const swiperProjectPage = new Swiper(".swiperProjectPage--thumb", {
    lazy: true,
    spaceBetween: 10,
    slidesPerView: 4,
    watchSlidesProgress: true,
    autoplay: {
        delay: 3500,
        // disableOnInteraction: false,
    },
    loop:true,
    direction: "vertical",
});
const swiperProjectPageThumb = new Swiper(".swiperProjectPage", {
    lazy: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiperProjectPage,
    },
    autoplay: {
        delay: 3500,
        // disableOnInteraction: false,
    },
    loop:true,
});