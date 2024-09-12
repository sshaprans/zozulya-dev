// header
const burger = document.querySelector('.btn-burger');
burger.addEventListener('click', () => {
    document.querySelector('.nav-bar__wrapper').classList.toggle('is-active');
})
window.onscroll = function() {
    const header = document.getElementById("header");
    if (window.scrollY > 0) {
        header.classList.add("header-opacity");
    } else {
        header.classList.remove("header-opacity");
    }
};

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

    autoplay: {
        delay: 4500,
        disableOnInteraction: false,
    },
    loop:true,
});
const swiperProjects = new Swiper(".swiperProjects", {
    slidesPerView: 1,
    loop:true,
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
const swiperProjectPage = new Swiper(".swiperProjectPage--thumb", {
    spaceBetween: 10,
    slidesPerView: 4,
    watchSlidesProgress: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    loop:true,
});
const swiperProjectPageThumb = new Swiper(".swiperProjectPage", {
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
        disableOnInteraction: false,
    },
    loop:true,
});