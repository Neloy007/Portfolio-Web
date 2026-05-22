// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    
    /* ============================================
       COUNTER ANIMATION WITH LIVE UPDATING EFFECT
    =============================================== */
    
    const counters = document.querySelectorAll(".counter");
    const dynamicLabels = [
        "Projects Completed", 
        "Happy Clients", 
        "Active Builds", 
        "Repositories Updated", 
        "Features Shipped", 
        "Systems Designed",
        "Code Commits",
        "Successful Deployments"
    ];
    
    counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let current = 0;
        const card = counter.closest(".stat-card");
        const label = card?.querySelector(".dynamic-label");
        
        // Animate counter from 0 to target
        function animateCounter() {
            if (current < target) {
                current++;
                counter.innerText = `${current}+`;
                setTimeout(animateCounter, 60);
            } else {
                // Start live updating effect after reaching target
                startLiveEffect();
            }
        }
        
        // Live updating effect - changes numbers and labels periodically
        function startLiveEffect() {
            setInterval(() => {
                // Generate random increment (1-3)
                const fake = target + Math.floor(Math.random() * 4);
                counter.innerText = `${fake}+`;
                
                // Update label with random dynamic text
                if (label && dynamicLabels.length) {
                    const randomLabel = dynamicLabels[Math.floor(Math.random() * dynamicLabels.length)];
                    label.innerText = randomLabel;
                }
                
                // Add live highlight effect
                card?.classList.add("live-card");
                
                // Revert back to original after 1 second
                setTimeout(() => {
                    counter.innerText = `${target}+`;
                    card?.classList.remove("live-card");
                    
                    // Reset label to original if needed
                    if (label && counter.dataset.originalLabel) {
                        label.innerText = counter.dataset.originalLabel;
                    }
                }, 1000);
                
            }, 4000);
        }
        
        // Store original label text
        if (label) {
            counter.dataset.originalLabel = label.innerText;
        }
        
        // Start counter animation
        animateCounter();
    });
    
    
    /* ============================================
       SCROLL REVEAL ANIMATION (APPLE-STYLE)
    =============================================== */
    
    const revealElements = document.querySelectorAll(".reveal");
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                
                // Special handling for skills section - trigger skill bars
                if (entry.target.id === "skills" || entry.target.classList.contains("skills-section")) {
                    triggerSkillBars();
                }
                
                // Optional: unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15,      // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"  // Slight offset for better timing
    });
    
    // Observe all reveal elements
    revealElements.forEach(el => observer.observe(el));
    
    
    /* ============================================
       SKILL BAR ANIMATION
    =============================================== */
    
    function triggerSkillBars() {
        const skillBars = document.querySelectorAll(".skill-bar");
        
        skillBars.forEach(bar => {
            // Get the target percentage from the sibling span element
            const parentDiv = bar.parentElement.parentElement;
            const percentSpan = parentDiv.querySelector("span:last-child");
            
            if (percentSpan) {
                const targetWidth = percentSpan.innerText;
                // Apply the width with smooth transition
                bar.style.width = targetWidth;
            }
        });
    }
    
    // Also trigger skill bars immediately if skills section is already visible
    const skillsSection = document.querySelector("#skills");
    if (skillsSection && isElementInViewport(skillsSection)) {
        triggerSkillBars();
    }
    
    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Trigger skill bars on window scroll as fallback
    window.addEventListener("scroll", () => {
        if (skillsSection && isElementInViewport(skillsSection)) {
            triggerSkillBars();
        }
    });
    
    
    /* ============================================
       MOBILE MENU AUTO-CLOSE ON LINK CLICK
    =============================================== */
    
    // This works with Alpine.js - we add event listeners to close mobile menu
    // when any mobile nav link is clicked
    const mobileNavLinks = document.querySelectorAll(".md\\:hidden a");
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            // The mobile menu state is managed by Alpine.js
            // We need to trigger the Alpine component if available
            if (window.Alpine) {
                // Get the Alpine component scope
                const navComponent = document.querySelector("[x-data]");
                if (navComponent && navComponent.__x) {
                    navComponent.__x.$data.mobileMenu = false;
                }
            }
        });
    });
    
    
    /* ============================================
       SMOOTH SCROLLING FOR NAVIGATION LINKS
    =============================================== */
    
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            
            // Skip if it's just "#" or empty or external links
            if (targetId === "#" || targetId === "" || targetId === "#") return;
            
            // Check if it's an anchor link (starts with # and has content after)
            if (targetId.startsWith("#") && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Get header height for offset (sticky nav)
                    const header = document.querySelector("nav");
                    const headerHeight = header ? header.offsetHeight : 80;
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    
    /* ============================================
       PROJECT CARD NAVIGATION
       Handles clicking on project cards to navigate to detail pages
    =============================================== */
    
    // Get all project card links and add smooth transition effect
    const projectLinks = document.querySelectorAll('.project-card a, .project-card');
    
    projectLinks.forEach(link => {
        // If the link is an anchor tag directly
        if (link.tagName === 'A') {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && (href.includes('exam-taker.html') || 
                    href.includes('shop-system.html') || 
                    href.includes('cleaners-app.html'))) {
                    // Add a subtle transition effect before leaving
                    e.preventDefault();
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        } 
        // If the card itself is clickable (wrapped in a div with onclick or data-href)
        else if (link.getAttribute('data-href')) {
            link.addEventListener('click', function() {
                const href = this.getAttribute('data-href');
                if (href) {
                    document.body.style.opacity = '0';
                    document.body.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        }
    });
    
    // Handle any project cards that are structured as links
    const projectCardAnchors = document.querySelectorAll('.project-card > a');
    projectCardAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.includes('.html'))) {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
    
    
    /* ============================================
       ACTIVE NAVIGATION LINK HIGHLIGHTING
    =============================================== */
    
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll("section[id], header[id]");
        const navLinks = document.querySelectorAll("nav a[href^='#']");
        
        let currentSection = "";
        const scrollPosition = window.scrollY + 150; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("text-blue-600", "font-semibold");
            link.classList.add("text-slate-600");
            
            const href = link.getAttribute("href").substring(1);
            if (href === currentSection) {
                link.classList.remove("text-slate-600");
                link.classList.add("text-blue-600", "font-semibold");
            }
        });
    }
    
    // Highlight on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightActiveNavLink, 50);
    });
    
    // Initial highlight
    setTimeout(highlightActiveNavLink, 100);
    
    
    /* ============================================
       PARALLAX EFFECT FOR HERO SECTION (OPTIONAL)
    =============================================== */
    
    const heroSection = document.querySelector("header");
    if (heroSection) {
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            const heroImage = heroSection.querySelector(".rounded-full");
            
            if (heroImage && scrolled < 600) {
                heroImage.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    }
    
    
    /* ============================================
       PRELOAD IMAGES FOR BETTER PERFORMANCE
    =============================================== */
    
    function preloadImage(imageUrl) {
        const img = new Image();
        img.src = imageUrl;
    }
    
    // Preload profile image if exists
    const profileImg = document.querySelector("img[alt='Nazmul Alam']");
    if (profileImg && profileImg.src) {
        preloadImage(profileImg.src);
    }
    
    
    /* ============================================
       ADD LOADING CLASS TO BODY
    =============================================== */
    
    // Remove any loading-related body classes after splash screen
    setTimeout(() => {
        document.body.classList.remove("no-scroll");
    }, 2600);
    
    
    /* ============================================
       HANDLE EXTERNAL LINKS
    =============================================== */
    
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        // Skip if it's not an internal anchor
        if (!link.getAttribute('href').startsWith('#')) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");
        }
    });
    
    
    /* ============================================
       ADD HOVER EFFECT TO STAT CARDS
    =============================================== */
    
    const statCards = document.querySelectorAll(".stat-card");
    statCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            const icon = card.querySelector(".pulse-icon");
            if (icon) {
                icon.style.animation = "none";
                setTimeout(() => {
                    icon.style.animation = "pulseGlow 2s infinite";
                }, 10);
            }
        });
    });
    
    
    /* ============================================
       CONSOLE WELCOME MESSAGE
    =============================================== */
    
    console.log("%c🚀 Nazmul Alam Portfolio Loaded!", "color: #2563eb; font-size: 16px; font-weight: bold;");
    console.log("%c📱 Check out my projects:", "color: #475569; font-size: 12px;");
    console.log("%c  • Exam Taker Ecosystem", "color: #3b82f6;");
    console.log("%c  • Online Shop Management", "color: #3b82f6;");
    console.log("%c  • Cleaners App", "color: #3b82f6;");
    console.log("%c🔗 GitHub: github.com/Neloy007", "color: #475569; font-size: 12px;");
    
    
    /* ============================================
       FIX FOR ALPINE.JS INITIALIZATION
    =============================================== */
    
    // Ensure Alpine components are properly initialized
    if (window.Alpine) {
        window.Alpine.start();
    }
    
    
    /* ============================================
       RESIZE HANDLER FOR RESPONSIVE ADJUSTMENTS
    =============================================== */
    
    let resizeTimer;
    window.addEventListener("resize", () => {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Re-trigger skill bars if needed on resize
            if (skillsSection && isElementInViewport(skillsSection)) {
                triggerSkillBars();
            }
            // Re-highlight active nav
            highlightActiveNavLink();
        }, 250);
    });
    
    
    /* ============================================
       TOUCH DEVICE OPTIMIZATIONS
    =============================================== */
    
    if ("ontouchstart" in window) {
        document.body.classList.add("touch-device");
        // Disable hover effects that might cause issues on touch
        const hoverElements = document.querySelectorAll(".hover\\:-translate-y-1, .hover\\:shadow-xl");
        hoverElements.forEach(el => {
            el.style.transition = "all 0.2s ease";
        });
    }
    
    
    /* ============================================
       PAGE TRANSITION FOR PROJECT DETAILS
    =============================================== */
    
    // Add fade-in effect when page loads
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    
    /* ============================================
       DARK MODE DETECTION (OPTIONAL FUTURE FEATURE)
    =============================================== */
    
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDark.matches) {
        // You can add dark mode support later
        console.log("🌙 User prefers dark mode - ready for future enhancement");
    }
    
    
    /* ============================================
       PROJECT DETAIL PAGE SPECIFIC CODE
       (Only runs on project detail pages)
    =============================================== */
    
    // Check if we're on a project detail page
    const isProjectPage = window.location.pathname.includes('exam-taker.html') || 
                         window.location.pathname.includes('shop-system.html') || 
                         window.location.pathname.includes('cleaners-app.html');
    
    if (isProjectPage) {
        // Add smooth fade-in for project images
        const projectImage = document.querySelector('.bg-blue-600.rounded-3xl');
        if (projectImage) {
            projectImage.style.opacity = '0';
            projectImage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                projectImage.style.transition = 'all 0.6s ease';
                projectImage.style.opacity = '1';
                projectImage.style.transform = 'translateY(0)';
            }, 200);
        }
        
        // Animate technology tags on load
        const techTags = document.querySelectorAll('.bg-slate-100');
        techTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateX(-10px)';
            setTimeout(() => {
                tag.style.transition = 'all 0.3s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateX(0)';
            }, 100 + (index * 50));
        });
        
        // Add back button navigation with smooth transition
        const backButton = document.querySelector('nav a');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 300);
            });
        }
    }
    
}); 