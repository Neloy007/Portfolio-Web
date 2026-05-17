document.addEventListener("DOMContentLoaded", () => {

    /* 
       COUNTER ANIMATION
     */

    const counters = document.querySelectorAll(".counter");

    const labels = [
        "Projects Completed",
        "Projects Completed Today",
        "Active Builds",
        "Repositories Updated",
        "Features Shipped",
        "Systems Designed"
    ];

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);
        let current = 0;

        const card = counter.closest(".stat-card");
        const label = card?.querySelector(".dynamic-label");

        function animateCounter() {

            if (current < target) {
                current++;
                counter.innerText = `${current}+`;
                setTimeout(animateCounter, 60);
            } else {
                startLiveEffect();
            }
        }

        function startLiveEffect() {

            setInterval(() => {

                const fake = target + Math.floor(Math.random() * 3);

                counter.innerText = `${fake}+`;

                if (label) {
                    label.innerText =
                        labels[Math.floor(Math.random() * labels.length)];
                }

                card?.classList.add("live-card");

                setTimeout(() => {
                    counter.innerText = `${target}+`;
                    card?.classList.remove("live-card");
                }, 1000);

            }, 4000);
        }

        animateCounter();
    });


    /* 
       APPLE STYLE SCROLL REVEAL
     */

    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));

});