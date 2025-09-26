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
// window.addEventListener('load', checkFade);

function togglemenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");

    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
        menu.classList.add("closing");

        setTimeout(() => {
            menu.classList.remove("closing");
        }, 400);
    } else {
        menu.classList.add("show");
    }

    icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".navbar li a, .scroll-down");
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


    document.querySelectorAll(".menu-main a, .navbar li a, .scroll-down").forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }

            // close menu if open
            const menu = document.querySelector(".menu-links");
            const icon = document.querySelector(".hamburger-icon");

            if (menu.classList.contains("show")) {
                menu.classList.remove("show");
                icon.classList.remove("open");
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
    "media/banner3.jpg",
    "media/banner4.JPG",
    "media/banner5.JPG",
    "media/banner6.JPG",
    "media/banner7.JPG"
];

let current = 0;
const bgEls = document.querySelectorAll(".home-bg");

// Initially load the first image
preloadImage(bannerImages[current], (imgUrl) => {
    bgEls[0].style.backgroundImage = `url("${imgUrl}")`;
    bgEls[0].classList.add("active");
});

function preloadImage(src, callback) {
    const img = new Image();
    img.src = src;
    img.onload = () => callback(src); // only apply after loaded
}

function rotateBanner() {
    const nextIndex = (current + 1) % bannerImages.length;

    const active = bgEls[current % 2];
    const next = bgEls[(current + 1) % 2];

    // preload next image before showing it
    preloadImage(bannerImages[nextIndex], (imgUrl) => {
        next.style.backgroundImage = `url("${imgUrl}")`;

        active.classList.remove("active");
        next.classList.add("active");

        current = nextIndex;
    });
}

setInterval(rotateBanner, 6000);

//Scroll animation for about and servcies section
const timelineItems = document.querySelectorAll(".timeline-content");
const serviceItems = document.querySelectorAll(".service-card");

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    timelineItems.forEach(item => {
        const boxTop = item.getBoundingClientRect().top;
        const boxBottom = item.getBoundingClientRect().bottom;

        if (boxTop < triggerBottom && boxBottom > 100) {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });

    serviceItems.forEach(card => {
        const boxTop = card.getBoundingClientRect().top;
        const boxBottom = card.getBoundingClientRect().bottom;

        if (boxTop < triggerBottom && boxBottom > 100) {
            card.classList.add("show");
        } else {
            card.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
// window.addEventListener("load", revealOnScroll);


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

//Lightbox logic
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".masonry-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;

    function showLightbox(index) {
        lightboxImg.src = items[index].src;
        currentIndex = index;

        lightbox.classList.add("show");
    }

    function closeLightbox() {
        lightbox.classList.remove("show");

        // Wait for transition to finish before hiding fully
        setTimeout(() => {
            if (!lightbox.classList.contains("show")) {
                lightbox.style.display = "none";
            }
        }, 400); // match CSS transition
    }

    items.forEach((img, index) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex"; // prepare before fade-in
            requestAnimationFrame(() => showLightbox(index));
        });
    });

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});

window.addEventListener("orientationchange", () => {
    if (lightbox.style.display === "flex") {
        lightboxImg.style.maxWidth = "90%";
        lightboxImg.style.maxHeight = "90%";
    }
});


let scale = 1;
let startDistance = 0;

function getDistance(touches) {
    const [touch1, touch2] = touches;
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

lightboxImg.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
        startDistance = getDistance(e.touches);
    }
});

lightboxImg.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2) {
        e.preventDefault();
        const newDistance = getDistance(e.touches);
        const pinchScale = newDistance / startDistance;

        scale = Math.min(Math.max(1, scale * pinchScale), 4); // limit between 1x–4x
        lightboxImg.style.transform = `scale(${scale})`;

        startDistance = newDistance;
    }
});

lightboxImg.addEventListener("touchend", () => {
    if (scale < 1.05) {
        scale = 1;
        lightboxImg.style.transform = "scale(1)";
    }
});


//Script for successfully form submission pop up
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const successPopup = document.getElementById("formSuccess");
    const errorPopup = document.getElementById("formError");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            form.reset();

            successPopup.classList.remove("hide");
            successPopup.classList.add("show");

            setTimeout(() => {
                successPopup.classList.remove("show");
                successPopup.classList.add("hide");
            }, 3000);

        } else {
            errorPopup.classList.remove("hide");
            errorPopup.classList.add("show");

            setTimeout(() => {
                errorPopup.classList.remove("show");
                errorPopup.classList.add("hide");
            }, 3000);
        }
    } catch (error) {
        errorPopup.classList.remove("hide");
        errorPopup.classList.add("show");

        setTimeout(() => {
            errorPopup.classList.remove("show");
            errorPopup.classList.add("hide");
        }, 3000);
    }
});

document.getElementById("year").textContent = new Date().getFullYear();
