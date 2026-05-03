document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ─────────────────────────────────────────
    const navbar = document.querySelector('.navbar');

    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar);


    // ── Sidebar ──────────────────────────────────────────────────────
    const trigger = document.getElementById('sidebarTrigger');
    const sidebar = document.getElementById('heroFacts');
    const tab     = document.getElementById('sidebarTab');

    let isOpen = false;
    let timer  = null;
    let isAnimating = false
    let isHovering = false;
    let pendingClose = false;

    const CLOSE_DELAY_MS = 10;

    const openSidebar = () => {
        clearTimeout(timer);
        if (isAnimating) return;
        if (isOpen) return;
        isOpen = true;
        isAnimating = true;
        pendingClose = false;
        sidebar.classList.remove('close');
        sidebar.classList.add('open');
        tab.classList.remove('close');
        tab.classList.add('open');

        setTimeout(() => {
            isAnimating = false;
            if (!isHovering && pendingClose) {
                closeSidebar();
            }
        }, 680);
    };

    const closeSidebar = () => {
        if (isAnimating) {
            pendingClose = true;
            return;
        }
        if (!isOpen) return;
        isOpen = false;
        pendingClose = true;
        isAnimating = true;
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
        tab.classList.remove('open');
        tab.classList.add('close');

        setTimeout(() => {
            isAnimating = false;
        }, 380);

        sidebar.addEventListener('animationend', () => {
            sidebar.classList.remove('close');
            sidebar.style.transform = 'translateX(-125%)';
            tab.classList.remove('close');
        }, { once: true });
    };

    trigger.addEventListener('mouseenter', () => {
        isHovering = true;
        openSidebar();
    });
    sidebar.addEventListener('mouseenter', () => {
        isHovering = true;
        openSidebar();
    });

    trigger.addEventListener('mouseleave', () => {
        isHovering = false;
        pendingClose = true;
        timer = setTimeout(closeSidebar, CLOSE_DELAY_MS);
    });
    sidebar.addEventListener('mouseleave', () => {
        isHovering = false;
        pendingClose = true;
        timer = setTimeout(closeSidebar, CLOSE_DELAY_MS);
    });
    tab.addEventListener('click', openSidebar);

});