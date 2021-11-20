document.addEventListener("DOMContentLoaded", function () {
    const $html = document.querySelector('html');
    let scrollTop = window.pageYOffset;
    
    function hideScroll() {
        document.body.classList.add('block-scroll');
        // Блокировка скролла для Safari
        if (window.innerWidth <= 1024) {
            $html.style.scrollBehavior = 'auto';
            scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
            document.body.style.position = 'fixed';
            document.body.style.top = -scrollTop + 'px';
            $html.style.scrollBehavior = '';
        }
    }

    function showScroll() {
        document.body.classList.remove('block-scroll');

        // Блокировка скролла для Safari
        if (window.innerWidth <= 1024) {
            $html.style.scrollBehavior = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scroll(0, scrollTop);
            $html.style.scrollBehavior = '';
        }
    }

    function initMenu() {
        const $header = document.querySelector('.header');
        const $headerBtn = document.querySelector('.header__menu-btn');


        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1280
            if (window.innerWidth <= 1280) {
                $headerBtn.addEventListener('click', () => {
                    $header.classList.toggle('active');
                    $html.classList.toggle('overflow-hidden');
                })
            }
        }

        window.addEventListener('resize', checkScreenWidth);
        
        checkScreenWidth();
    }

    function initWorksSlider() {
        const $worksSlider = document.querySelector('.works__slider');
        if ($worksSlider) {
            const worksSlider = new Swiper('.works__slider', {
                slidesPerView: 3,
                spaceBetween: 20,
                pagination: {
                    clickable: true,
                    el: ".works__pagination",
                    type: "fraction",
                },
                navigation: {
                    nextEl: ".works__button-next",
                    prevEl: ".works__button-prev",
                },
                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    600: {
                        slidesPerView: 2
                    },
                    900: {
                        slidesPerView: 3
                    },
                },
            });
        }
    }


    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');

        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })

        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    // hideScroll();
                },
                onClose: (modal) => {
                    // showScroll();
                },
                disableFocus: true,
                openClass: 'is-open', 
                awaitOpenAnimation: true, 
                awaitCloseAnimation: true, 
                disableScroll: true
            });
        }
    }

    function disableTransitionsBeforePageLoading() {
        if (document.body.classList.contains('preload')) {
            document.body.classList.remove('preload');
        }
    }

    function initPhoneMasks() {
        const $phones = document.querySelectorAll('.phone-mask');

        $phones.forEach(item => {
            IMask(item, {
                mask: '000-00-00-00' 
            });
        })
    }

    function initQuestionsAccordion() {
        const $triggers = document.querySelectorAll('.questions__item-head');
        
        if ($triggers.length > 0) {
            
            $triggers.forEach(item => {
                item.addEventListener('click', function() {
                    item.closest('.questions__item').classList.toggle('active');
                })
            })
        }
    }

    function initShowMore() {
        const $buttons = document.querySelectorAll('.more-btn');

        if ($buttons.length > 0) {
            $buttons.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();

                    if (item.closest('.more-wrapper').classList.contains('active')) {
                        item.textContent = item.dataset.text;
                        item.closest('.more-wrapper').classList.remove('active');
                    }
                    else {
                        item.textContent = item.dataset.textActive;
                        item.closest('.more-wrapper').classList.add('active');
                    }
                })
            })
        }
    }

    function initStarRating() {
        const $rating = document.querySelectorAll('.star-rating');

        if ($rating.length > 0) {
            $rating.forEach(item => {
                const $ratingBar = item.querySelector('.star-rating__active');
                const ratingValue = item.querySelector('.star-rating__value').dataset.starRatingValue || item.querySelector('.star-rating__value').textContent;

                const value = (ratingValue * 10) * 2;

                $ratingBar.style.width = value + '%';
            })
        }
    }

    function initDeviceSlider() {
        if (document.querySelector('.device-slider')) {
            const thumbs = new Swiper(".device-thumbs", {
                spaceBetween: 14,
                slidesPerView: 'auto',
                direction: 'vertical',
                breakpoints: {
                    320: {
                        direction: 'horizontal',
                    },
                    1024: {
                        direction: 'vertical',
                    }
                },
            });
            const deviceSlider = new Swiper(".device-slider", {
                spaceBetween: 30,
                slidesPerView: 1,
                thumbs: {
                    swiper: thumbs,
                },
            });
            deviceSlider.on('slideChange', function () {
                const $players = document.querySelectorAll('.device-slider__item--video iframe');
                if ($players.length > 0) {
                    $players.forEach(item => {
                        var iframeSrc = item.src;
                        item.src = iframeSrc;
                    });
                }
            });
        }
    }

    function initCartSubmit() {
        const $cartBtn = document.querySelector('.device-cart__btn');

        if ($cartBtn) {
            const $deviceDefenseTypeInput = document.querySelector('#deviceDefenseType');
            const $deviceMaterialTypeInput = document.querySelector('#deviceMaterialType');
            const $deviceCountInput = document.querySelector('#deviceCount');
            const $devicePriceInput = document.querySelector('#devicePrice');

            $cartBtn.addEventListener('click', function(e) {
                e.preventDefault();

                const count = document.querySelector('.device-cart__counter-value').dataset.deviceCount;
                const price = document.querySelector('.device-cart__price').dataset.devicePrice;
                const defenseType = document.querySelector('.device-boxes__item input:checked').value;
                const materialType = document.querySelector('.device-materials__item input:checked').value;
                
                $deviceDefenseTypeInput.value = count;
                $deviceMaterialTypeInput.value = price;
                $deviceCountInput.value = defenseType;
                $devicePriceInput.value = materialType;
            })
        }
    }

    disableTransitionsBeforePageLoading();
    initMenu();

    initModals();
    initPhoneMasks();
    initStarRating();
    initShowMore();

    initWorksSlider();
    initQuestionsAccordion();
    initDeviceSlider();
    initCartSubmit();
});
