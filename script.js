// header
window.onscroll = function() {
    const header = document.getElementById("header");
    if (window.scrollY > 0) {
        header.classList.add("header-opacity");
    } else {
        header.classList.remove("header-opacity");
    }
};
const burger = document.getElementById('js_menu_button');
burger.addEventListener('click', () => {
    document.querySelector('.nav-bar__wrapper').classList.toggle('is-active');
    document.querySelector('.menu_button').classList.toggle('on_menu');
    document.querySelector('body').classList.toggle('body-hidden');
    document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => {
        sub.classList.remove('nav-bar__submenu--active');
    });

})// Скрипт для додавання/видалення класу при натисканні на елементи меню
const linkList = document.querySelectorAll('.nav-bar__item .effect_line');
const submenuLinks = document.querySelectorAll('.nav-bar__submenu__link');

linkList.forEach(link => {
    link.addEventListener('click', () => {
        const dataMenu = link.getAttribute('data-menu');
        const subMenu = document.querySelector(`.nav-bar__submenu[data-menu-sub="${dataMenu}"]`);
        const navBarWrapper = link.closest('.nav-bar__wrapper');

        // Перевірка наявності класу is-active
        if (navBarWrapper && navBarWrapper.classList.contains('is-active')) {
            if (subMenu.classList.contains('nav-bar__submenu--active')) {
                subMenu.classList.remove('nav-bar__submenu--active');
            } else {
                document.querySelectorAll('.nav-bar__submenu').forEach(sub => {
                    sub.classList.remove('nav-bar__submenu--active');
                });
                subMenu.classList.add('nav-bar__submenu--active');
            }
        } else {
            document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => {
                sub.classList.remove('nav-bar__submenu--active');
            });
        }
    });
});

// Скрипт для видалення активних класів при натисканні на submenu__link
submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Видалення класів у підменю
        document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => {
            sub.classList.remove('nav-bar__submenu--active');
        });

        // Видалення класу is-active з wrapper
        const navBarWrapper = link.closest('.nav-bar__wrapper');
        if (navBarWrapper) {
            navBarWrapper.classList.remove('is-active');
            document.querySelector('.menu_button').classList.remove('on_menu')
        }
    });
});


// listItems.forEach(item => {
//     item.addEventListener('mouseenter', () => {
//         const dataServices = item.getAttribute('data-services');
//         carBox.forEach(car => {
//             const pic = car.getAttribute('data-services-pic');
//             if(dataServices === pic) {
//                 car.classList.add('opacity_norm')
//             }
//             if(dataServices === pic && pic >= 5 && pic <= 6 ) {
//                 car.classList.add('opacity_light')
//             }
//         })
//     });
//     item.addEventListener('mouseleave', () => {
//         carBox.forEach(pic => pic.classList.remove('opacity_norm', 'opacity_light'));
//     });
// });




// window.onscroll = function() {
//     const header = document.getElementById("header");
//     const totalHeight = document.documentElement.scrollHeight;
//     const visibleHeight = window.innerHeight;
//     const scrolledHeight = window.scrollY + visibleHeight;
//
//     if (scrolledHeight >= totalHeight) {
//         header.classList.remove("header-opacity");
//     } else {
//         header.classList.remove("header-opacity");
//     }
// };

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