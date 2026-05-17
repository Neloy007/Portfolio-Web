const counters = document.querySelectorAll('.counter');

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

    const card = counter.closest('.stat-card');
    const label = card.querySelector('.dynamic-label');

    function updateCounter() {

        if (current < target) {

            current++;

            counter.innerText = current + "+";

            setTimeout(updateCounter, 80);

        } else {

            setInterval(() => {

                card.classList.add("live-card");

                const fake = target + Math.floor(Math.random() * 3);

                counter.innerText = fake + "+";

                label.innerText =
                    labels[Math.floor(Math.random() * labels.length)];

                setTimeout(() => {

                    counter.innerText = target + "+";

                    card.classList.remove("live-card");

                }, 1200);

            }, 4000);
        }
    }

    updateCounter();
});