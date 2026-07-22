document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar scroll effect ─────────────────────────────────────────
    const navbar = document.querySelector('.navbar');

    const updateNavbar = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };

    updateNavbar();
    window.addEventListener('scroll', updateNavbar);


    // Sidebar
    const trigger = document.getElementById('sidebarTrigger');
    const sidebar = document.getElementById('heroFacts');
    const tab     = document.getElementById('sidebarTab');

    let isOpen = false;
    let timer  = null;
    let isAnimating = false
    let isHovering = false;
    let pendingClose = false;

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
        if (isAnimating) return;
        isOpen = false;
        isAnimating = true;
        pendingClose = false;
        sidebar.classList.remove('open');
        sidebar.classList.add('close');
        tab.classList.remove('open');
        tab.classList.add('close');
        setTimeout(() => {
            isAnimating = false;
            if (!isHovering && pendingClose) {
                closeSidebar();
            }
        }, 680);
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
        timer = setTimeout(closeSidebar, 10);
    });
    sidebar.addEventListener('mouseleave', () => {
        isHovering = false;
        pendingClose = true;
        timer = setTimeout(closeSidebar, 10);
    });
    tab.addEventListener('click', openSidebar);

});