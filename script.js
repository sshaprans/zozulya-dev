
const burger = document.querySelector('.btn-burger');

burger.addEventListener('click', () => {
    document.querySelector('.nav-bar__wrapper').classList.toggle('is-active');
})

const swiperBanner = new Swiper(".swiperBanner", {
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    loop:true,
});
const swiperProjects = new Swiper(".swiperProjects", {
    slidesPerView: 1,
    spaceBetween: 60,
    autoplay: {
        delay: 3000,
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
