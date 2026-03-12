document.addEventListener("DOMContentLoaded", () => {

    const toggleButton = document.getElementById("dark-toggle");
    const hour = new Date().getHours();

    function updateIcon() {
        if (document.body.classList.contains("dark-mode")) {
            toggleButton.textContent = "☀️";
        } else {
            toggleButton.textContent = "🌙";
        }
    }

    if (hour >= 20 || hour < 6) {
        document.body.classList.add("dark-mode");
    }
    updateIcon();

    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        updateIcon();
    });

});