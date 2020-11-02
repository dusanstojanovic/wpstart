const { body } = document;
const $ = jQuery;

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
toggleMenuInit();
