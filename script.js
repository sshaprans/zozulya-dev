
window.onscroll = function() {
    const header = document.getElementById("header");
    if (window.scrollY > 0) {
        header.classList.add("header-opacity");
    } else {
        header.classList.remove("header-opacity");
    }
};


function clearActiveClasses() {
    document.body.classList.remove('body-hidden');
    document.querySelectorAll('.nav-bar__submenu').forEach(sub => {
        sub.classList.remove('nav-bar__submenu--active');
    });
    document.querySelector('.menu_button').classList.remove('on_menu');
    document.querySelector('.nav-bar__wrapper').classList.remove('is-active');
    document.querySelectorAll('.menu_arrow--mobile').forEach(arrow => {
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.fill = 'var(--orange)';
    });
}
function checkWrapperActiveState() {
    const navBarWrapper = document.querySelector('.nav-bar__wrapper');
    if (!navBarWrapper.classList.contains('is-active')) {
        clearActiveClasses();
    }
}
function toggleSubMenu(link) {
    const dataMenu = link.getAttribute('data-menu');
    const subMenu = document.querySelector(`.nav-bar__submenu[data-menu-sub="${dataMenu}"]`);
    const navBarWrapper = link.closest('.nav-bar__wrapper');
    const arrow = link.querySelector('.menu_arrow--mobile');

    if (subMenu.classList.contains('nav-bar__submenu--active')) {
        subMenu.classList.remove('nav-bar__submenu--active');
        arrow.style.transform = 'rotate(0deg)';
        arrow.style.fill = '#E4E5E8';
        link.classList.remove('on_menu');
    } else {
        subMenu.classList.add('nav-bar__submenu--active');
        arrow.style.transform = 'rotate(180deg)';
        arrow.style.fill = '#FCC341';
        link.classList.add('on_menu');
        navBarWrapper.classList.add('is-active');
    }
    checkWrapperActiveState();
}
const linkList = document.querySelectorAll('.nav-bar__item .nav-bar__item__btn');
linkList.forEach(link => {
    link.addEventListener('click', () => toggleSubMenu(link));
});

const submenuLinks = document.querySelectorAll('.nav-bar__submenu__link');
submenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        clearActiveClasses();
        checkWrapperActiveState();
    });
});

const menuButton = document.querySelector('.menu_button');
menuButton.addEventListener('click', () => {
    const navBarWrapper = document.querySelector('.nav-bar__wrapper');

    navBarWrapper.classList.toggle('is-active');
    menuButton.classList.toggle('on_menu');

    if (navBarWrapper.classList.contains('is-active')) {
        document.body.classList.add('body-hidden');

    } else {
        menuButton.classList.remove('on_menu');
        clearActiveClasses();
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