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
        const $headerClose = document.querySelector('.menu__close');
        const $overlay = document.querySelector('.overlay');


        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1280
            if (window.innerWidth <= 1280) {
                $headerClose.addEventListener('click', () => {
                    $header.classList.remove('active');
                    $html.classList.remove('overflow-hidden');
                    $overlay.classList.remove('active');
                })
                
                $headerBtn.addEventListener('click', () => {
                    $header.classList.add('active');
                    $html.classList.add('overflow-hidden');
                    $overlay.classList.add('active');
                })
                $overlay.addEventListener('click', () => {
                    $header.classList.remove('active');
                    $html.classList.remove('overflow-hidden');
                    $overlay.classList.remove('active');
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
        const $header = document.querySelector('.header');
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');
        const $modalOverlays = document.querySelectorAll('.modal__overlay');

        $modalOverlays.forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                const modalId = overlay.closest('.modal').id;
                
                if (e.target.classList.contains('modal__container') || e.target.classList.contains('modal__overlay')) {
                    MicroModal.close(modalId);
                }
            })
        })
        
        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })

        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    hideScroll();
                    $header.style.pointerEvents = 'none';
                },
                onClose: (modal) => {
                    showScroll();
                    setTimeout(() => $header.style.pointerEvents = '', 500)
                },
                disableFocus: true,
                openClass: 'is-open', 
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

    disableTransitionsBeforePageLoading();
    initMenu();

    initModals();
    initPhoneMasks();

    initWorksSlider();

});
