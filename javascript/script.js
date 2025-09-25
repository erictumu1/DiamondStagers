// ========== Fade-In Animation on Scroll ==========
const fadeElements = document.querySelectorAll('.home-text, .home-banner, section, .btn');

function checkFade() {
    const triggerBottom = window.innerHeight * 0.85;
    fadeElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 1s ease-out';
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);

function togglemenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("show");
    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".navbar li a");
    const sections = document.querySelectorAll("section");

    function setActiveLink() {
        let currentSection = null;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - window.innerHeight / 3;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section;
            }
        });

        menuItems.forEach((link) => link.classList.remove("active"));

        if (currentSection) {
            const activeLink = [...menuItems].find(
                (link) => link.getAttribute("href") === `#${currentSection.id}`
            );
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    }


    menuItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
                menuItems.forEach((link) => link.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });

    window.addEventListener("load", setActiveLink);
    window.addEventListener("scroll", setActiveLink);
    setActiveLink();
});


// Banner Background Rotator
const homeBg = document.querySelector(".home-bg");
const bannerImages = [
    "media/banner.jpg",
    "media/banner1.jpg",
    "media/banner2.jpg",
    "media/banner3.jpg"
];

let current = 0;

const home = document.querySelector(".home");
const bgEls = document.querySelectorAll(".home-bg");

bgEls[0].classList.add("active");
bgEls[0].style.backgroundImage = `url("${bannerImages[current]}")`;

function rotateBanner() {
    const nextIndex = (current + 1) % bannerImages.length;

    const active = bgEls[current % 2];
    const next = bgEls[(current + 1) % 2];

    next.style.backgroundImage = `url("${bannerImages[nextIndex]}")`;

    active.classList.remove("active");
    next.classList.add("active");

    current = nextIndex;
}

setInterval(rotateBanner, 6000);

//Scroll animation for about section
const timelineItems = document.querySelectorAll(".timeline-content");

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    timelineItems.forEach(item => {
        const boxTop = item.getBoundingClientRect().top;
        const boxBottom = item.getBoundingClientRect().bottom;

        // Add class when in view
        if (boxTop < triggerBottom && boxBottom > 100) {
            item.classList.add("show");
        } else {
            // Remove class when out of view (so it replays)
            item.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

// Request a Quote button smooth scroll
document.querySelectorAll(".request-quote").forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});


document.getElementById("year").textContent = new Date().getFullYear();
