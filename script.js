
const burger = document.querySelector('.btn-burger');

burger.addEventListener('click', () => {
    document.querySelector('.nav-bar__wrapper').classList.toggle('is-active');
})
// slider
const swiperBanner = new Swiper(".swiperBanner", {

    autoplay: {
        delay: 3500,
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

// form
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
