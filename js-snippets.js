const { body } = document;
const $ = jQuery;

/*---------------------------------------
    DOM ready
---------------------------------------*/
$(document).ready(function () {
    init();
});

/*---------------------------------------
    Init
---------------------------------------*/
function init() {
    stickyHeaderInit();
    toggleMenuInit();
    sliderHeroInit();
    sliderMediaInit();
    sliderClientsInit();
    sliderTestinonialsInit();
    sliderRelatedVideosInit();
    toggleContactInit();
    toggleBookingInit();
    accordionInit();
    masonryInit();

    GLightbox();
}

/*---------------------------------------
    Sticky header
---------------------------------------*/
function stickyHeaderInit() {
    window.addEventListener(
        'scroll',
        function () {
            if (this.scrollY > 124) {
                body.classList.add('is-headerstuck');
            } else {
                body.classList.remove('is-headerstuck');
            }
        },
        false,
    );
}

/*---------------------------------------
    toggle menu
---------------------------------------*/
function toggleMenuInit() {
    const toggleMenu = document.querySelector('.js-toggle-menu');
    if (toggleMenu) {
        toggleMenu.addEventListener('click', function () {
            body.classList.toggle('is-menuopen');
            toggleMenu.classList.toggle('is-active');
        });
        window.addEventListener('resize', closeMenu);
        function closeMenu() {
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            if (viewportWidth > 1024) {
                body.classList.remove('is-menuopen');
                toggleMenu.classList.remove('is-active');
            }
        }
    }
}

/*---------------------------------------
    toggle contact
---------------------------------------*/
function toggleContactInit() {
    const openModalContact = document.querySelectorAll('.js-contact');
    const closeModal = document.querySelector('.js-modal-close');
    const tl = gsap.timeline();

    openModalContact.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            tl.to('.js-modal-contact', {
                duration: 0.5,
                x: 0,
                opacity: 1,
                scale: 1,
            })
                .from(
                    '.c-modal__header',
                    {
                        duration: 1,
                        opacity: 0,
                        y: -40,
                        ease: 'expo.out',
                    },
                    '-=0.1',
                )
                .from(
                    '.c-formgrid',
                    {
                        duration: 1,
                        opacity: 0,
                        y: -40,
                        ease: 'expo.out',
                    },
                    '-=0.8',
                );
        });
    });
    closeModal.addEventListener('click', function () {
        tl.to('.js-modal-contact', {
            duration: 0.6,
            x: '100%',
            ease: 'expo.inOut',
        });
    });
}

/*---------------------------------------
    toggle Booking
---------------------------------------*/
function toggleBookingInit() {
    const openModalBooking = document.querySelectorAll('.js-booking');
    const closeModal = document.querySelector('.js-modal-close-booking');
    const tl = gsap.timeline();

    openModalBooking.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            tl.to('.js-modal-event', {
                duration: 0.5,
                x: 0,
                opacity: 1,
                scale: 1,
            })
                .from(
                    '.c-modal__header',
                    {
                        duration: 1,
                        opacity: 0,
                        y: -40,
                        ease: 'expo.out',
                    },
                    '-=0.1',
                )
                .from(
                    '.c-formgrid',
                    {
                        duration: 1,
                        opacity: 0,
                        y: -40,
                        ease: 'expo.out',
                    },
                    '-=0.8',
                );
        });
    });
    closeModal.addEventListener('click', function () {
        tl.to('.js-modal-event', {
            duration: 0.6,
            x: '100%',
            ease: 'expo.inOut',
        });
    });
}

/*---------------------------------------
    Hero Slider
---------------------------------------*/
function sliderHeroInit() {
    const sliderHero = document.querySelector('.js-slider-hero');
    const sliderHeroContent = document.querySelector('.js-slider-herocontent');
    if (sliderHero && sliderHeroContent) {
        const sliderHeroInstance = new Swiper(sliderHero, {
            slidesPerView: '1',
            spaceBetween: 0,
            speed: 1600,
            navigation: {
                nextEl: '.c-next',
                prevEl: '.c-prev',
            },
            breakpoints: {
                768: {
                    touchRatio: 1,
                },
                1024: {
                    touchRatio: 0,
                },
            },
        });
        sliderHeroInstance.on('slideChange', function () {
            const tl = gsap.timeline();
            tl.from('.swiper-slide-active .c-txt--hero', {
                delay: 1,
                duration: 1,
                opacity: 0,
                y: -40,
                // clipPath: 'inset(0 0 100% 0)',
                ease: 'power4.out',
            })
                .from(
                    '.swiper-slide-active .c-txt--h2',
                    {
                        duration: 1,
                        opacity: 0,
                        y: -40,
                        // clipPath: 'inset(0 0 100% 0)',
                        ease: 'power4.out',
                    },
                    '-=0.8',
                )
                .from(
                    '.swiper-slide-active .c-link',
                    {
                        duration: 1,
                        opacity: 0,
                        y: -40,
                        // clipPath: 'inset(0 0 100% 0)',
                        ease: 'power4.out',
                    },
                    '-=0.8',
                );
        });
        const sliderHeroContentInstance = new Swiper(sliderHeroContent, {
            slidesPerView: '1',
            spaceBetween: 0,
            speed: 1600,
            breakpoints: {
                768: {
                    touchRatio: 1,
                },
                1024: {
                    touchRatio: 0,
                },
            },
        });
        sliderHeroInstance.controller.control = sliderHeroContentInstance;
        sliderHeroContentInstance.controller.control = sliderHeroInstance;
    }
}

/*---------------------------------------
    Media Slider
---------------------------------------*/
function sliderMediaInit() {
    const sliderMedia = document.querySelector('.js-slider-media');
    if (sliderMedia) {
        new Swiper(sliderMedia, {
            slidesPerView: '1',
            spaceBetween: 30,
            speed: 600,
            autoHeight: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.c-slider-media__pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: '2',
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: '3',
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: '4',
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: '5',
                    spaceBetween: 30,
                },
            },
        });
    }
}

/*---------------------------------------
    Clients Slider
---------------------------------------*/
function sliderClientsInit() {
    const sliderClients = document.querySelector('.js-slider-clients');
    if (sliderClients) {
        new Swiper(sliderClients, {
            slidesPerView: '1',
            spaceBetween: 30,
            speed: 600,
            autoHeight: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.c-slider-clients__pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: '2',
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: '3',
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: '4',
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: '5',
                    spaceBetween: 30,
                },
            },
        });
    }
}

/*---------------------------------------
    Testimonials Slider
---------------------------------------*/
function sliderTestinonialsInit() {
    const sliderTestinonials = document.querySelector('.js-slider-testimonials');
    if (sliderTestinonials) {
        new Swiper(sliderTestinonials, {
            slidesPerView: '1',
            spaceBetween: 30,
            speed: 600,
            autoHeight: true,
            pagination: {
                el: '.c-slider-clients__pagination',
                clickable: true,
            },
        });
    }
}

/*---------------------------------------
    Testimonials Slider
---------------------------------------*/
function sliderRelatedVideosInit() {
    const sliderRelatedVideos = document.querySelector('.js-slider-relatedvideos');
    if (sliderRelatedVideos) {
        new Swiper(sliderRelatedVideos, {
            slidesPerView: '1',
            spaceBetween: 20,
            speed: 600,
            autoHeight: true,
            pagination: {
                el: '.c-slider-media__pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: '3',
                    spaceBetween: 30,
                },
                1280: {
                    slidesPerView: '3',
                    spaceBetween: 50,
                },
            },
        });
    }
}

/*---------------------------------------
    Accordion
---------------------------------------*/
function accordionInit() {
    const accordionItemHeaders = document.querySelectorAll('.c-accordion__header');
    accordionItemHeaders.forEach(accordionItemHeader => {
        accordionItemHeader.addEventListener('click', event => {
            // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

            const currentlyActiveAccordionItemHeader = document.querySelector('.c-accordion__header.active');
            if (currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader !== accordionItemHeader) {
                currentlyActiveAccordionItemHeader.classList.toggle('active');
                currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
            }
            accordionItemHeader.classList.toggle('active');
            const accordionItemBody = accordionItemHeader.nextElementSibling;
            if (accordionItemHeader.classList.contains('active')) {
                accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 'px';
            } else {
                accordionItemBody.style.maxHeight = 0;
            }
        });
    });
}

/*---------------------------------------
    Masonry (press)
---------------------------------------*/
function masonryInit() {
    const masonryContainer = document.querySelector('.js-macy-container');
    if (masonryContainer) {
        var macy = Macy({
            container: '.js-macy-container',
            trueOrder: false,
            waitForImages: false,
            margin: 40,
            columns: 3,
            breakAt: {
                1200: {
                    margin: {
                        x: 40,
                    },
                    columns: 3,
                },
                1024: 2,
                768: {
                    margin: {
                        x: 20,
                        y: 20,
                    },
                    columns: 1,
                },
            },
        });
    }
}

/*---------------------------------------

---------------------------------------*/
$('.js-date').flatpickr({
    dateFormat: 'd M Y',
});
$('.js-time').flatpickr({
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
    time_24hr: true,
});

/*---------------------------------------
    GSAP
---------------------------------------*/
// gsap.registerPlugin(ScrollTrigger);

// function outAnim() {
//     gsap.to('#primary', {
//         duration: 0.2,
//         y: 30,
//         opacity: 0,
//         ease: Power1.easeInOut,
//     });
// }
// function inAnim() {
//     gsap.from('#primary', {
//         duration: 0.2,
//         y: 30,
//         opacity: 0,
//         ease: Power1.easeInOut,
//     });
// }

/*---------------------------------------
    Swupjs
---------------------------------------*/
// const animOptions = [
//     {
//         from: '(.*)',
//         to: '(.*)',
//         // out: next => next(),
//         // in: next => next(),
//         out: function (next) {
//             outAnim();
//             setTimeout(next, 200);
//         },
//         in: function (next) {
//             inAnim();
//             setTimeout(next, 200);
//         },
//     },
// ];
// const options = {
//     containers: ['.js-swup'],
//     // prettier-ignore
//     plugins: [
//         new SwupBodyClassPlugin(),
//         new SwupJsPlugin(animOptions),
//         new SwupHeadPlugin(),
//         new SwupPreloadPlugin(),
//         new SwupDebugPlugin(),
//         new SwupScrollPlugin({
//             doScrollingRightAway: true,
//             animateScroll: true,
//             scrollFriction: 0.3,
//             scrollAcceleration: 0.04,
//         }),
//     ],
// };
// const swup = new Swup(options);
// swup.on('pageView', function () {
//     init();
// });
