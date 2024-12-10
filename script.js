// header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('header-opacity', window.scrollY > 0);
});
// menu
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu_button');
    const navBarWrapper = document.querySelector('.nav-bar__wrapper');
    const linkList = document.querySelectorAll('.nav-bar__item .effect_line');
    const submenuLinks = document.querySelectorAll('.nav-bar__submenu__link');
    const mobileArrows = document.querySelectorAll('.menu_arrow--mobile');

    linkList.forEach(link => {
        link.addEventListener('click', () => {
            const dataMenu = link.getAttribute('data-menu');
            const subMenu = document.querySelector(`.nav-bar__submenu[data-menu-sub="${dataMenu}"]`);
            const arrow = link.querySelector('.menu_arrow--mobile');
            const isActive = subMenu.classList.contains('nav-bar__submenu--active');

            document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => sub.classList.remove('nav-bar__submenu--active'));
            document.querySelectorAll('.nav-bar__item .effect_line.on_menu').forEach(item => item.classList.remove('on_menu'));
            document.querySelectorAll('.menu_arrow--mobile').forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.fill = '#E4E5E8';
            });
            if (!isActive) {
                subMenu.classList.add('nav-bar__submenu--active');
                link.classList.add('on_menu');
                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                    arrow.style.fill = '#FCC341';
                }
            }
        });
    });
    submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => sub.classList.remove('nav-bar__submenu--active'));
            document.querySelectorAll('.on_menu').forEach(item => item.classList.remove('on_menu'));
            navBarWrapper.classList.remove('is-active');
            document.body.classList.remove('body-hidden');

            mobileArrows.forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.fill = '#E4E5E8';
            });
        });
    });

    // mobile menu
    menuButton.addEventListener('click', () => {
        navBarWrapper.classList.toggle('is-active');
        menuButton.classList.toggle('on_menu');
        document.body.classList.toggle('body-hidden');

        if (!navBarWrapper.classList.contains('is-active')) {
            document.querySelectorAll('.nav-bar__submenu--active').forEach(sub => sub.classList.remove('nav-bar__submenu--active'));
            document.querySelectorAll('.on_menu').forEach(item => item.classList.remove('on_menu'));
            mobileArrows.forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
                arrow.style.fill = '#E4E5E8';
            });
        }
    });
});
// form
document.getElementById('contacts').addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch('./sendMessage.php', {
        method: 'POST',
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            let resultDiv = document.getElementById('form-result');
            if (data.status === 'success') {
                resultDiv.innerHTML = `<p style="color: green;">${data.message}</p>`;
                this.reset();
            } else {
                resultDiv.innerHTML = `<p style="color: red;">${data.message}</p>`;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('form-result').innerHTML = `<p style="color: red;">Сталася помилка: ${error.message}</p>`;
        });
});

// swiper
const initSwiper = () => {
    new Swiper('.swiperBanner', {
        lazy: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        loop: true,
    });

    new Swiper('.swiperProjects', {
        lazy: true,
        slidesPerView: 1,
        loop: true,
        spaceBetween: 60,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            380: { slidesPerView: 1, spaceBetween: 0 },
            780: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 2, spaceBetween: 60 },
        },
    });
    const thumbs = new Swiper('.swiperProjectPage--thumb', {
        lazy: true,
        spaceBetween: 10,
        slidesPerView: 4,
        watchSlidesProgress: true,
        autoplay: { delay: 3500 },
        loop: true,
        direction: 'vertical',
    });

    new Swiper('.swiperProjectPage', {
        lazy: true,
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: { swiper: thumbs },
        autoplay: { delay: 3500 },
        loop: true,
    });
};
initSwiper();
// scroll inside
document.addEventListener('DOMContentLoaded', () => {
    const OFFSET = 90;
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const currentPath = window.location.pathname;
            const linkPath = new URL(this.href).pathname;
            if (currentPath === linkPath) {
                e.preventDefault();
                const targetId = this.hash.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = window.scrollY + elementPosition - OFFSET;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth',
                    });
                }
            }
        });
    });

    // scroll outside
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = window.scrollY + elementPosition - OFFSET;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        }, 150);
    }
});
// responsive menu link
document.addEventListener('DOMContentLoaded', () => {
    const replaceLinkWithSpan = () => {
        const menuLink = document.querySelector('.nav-bar__menu__link--shop');
        if (!menuLink) return;
        if (window.innerWidth < 780 && menuLink.tagName === 'A') {
            const span = document.createElement('span');
            span.className = menuLink.className;
            span.textContent = menuLink.textContent;
            menuLink.replaceWith(span);
        } else if (window.innerWidth >= 780 && menuLink.tagName === 'SPAN') {
            const a = document.createElement('a');
            a.className = menuLink.className;
            a.textContent = menuLink.textContent;
            a.href = 'shop.html';
            menuLink.replaceWith(a);
        }
    };
    replaceLinkWithSpan();
    window.addEventListener('resize', replaceLinkWithSpan);
});
