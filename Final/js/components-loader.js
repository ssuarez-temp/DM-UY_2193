// js/components-loader.js

document.addEventListener("DOMContentLoaded", function() {
    let currentLang = localStorage.getItem('site_lang') || 'es';
    let translations = {};

    async function applyI18n(lang) {
        try {
            const response = await fetch(`locals/${lang}.json`);
            if (!response.ok) throw new Error("Dictionary not found");
            translations = await response.json();
            
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) el.textContent = translations[key];
            });

            updateAuthUI();
        } catch (err) {
            console.error("Language load failed:", err);
        }
    }

    function updateAuthUI() {
        const authBtn = document.getElementById('auth-btn');
        if (!authBtn) return;
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            authBtn.textContent = translations['btn_logout'] || 'Salir';
            authBtn.href = "#";
            authBtn.onclick = (e) => {
                e.preventDefault();
                if(confirm("Logout?")) {
                    localStorage.removeItem('isLoggedIn');
                    location.reload();
                }
            };
        } else {
            authBtn.textContent = translations['btn_login'] || 'Entrar';
            authBtn.href = "login.html";
            authBtn.onclick = null;
        }
    }

    async function loadComponent(id, path) {
        const placeholder = document.getElementById(id);
        if (!placeholder) return;

        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const html = await response.text();
            placeholder.innerHTML = html;

            if (id === 'header-placeholder') {
                const selector = document.getElementById('lang-selector');
                if (selector) {
                    selector.value = currentLang;
                    selector.onchange = (e) => {
                        currentLang = e.target.value;
                        localStorage.setItem('site_lang', currentLang);
                        applyI18n(currentLang);
                    };
                }
                
                applyI18n(currentLang);
                
                if (typeof initNightMode === 'function') {
                    initNightMode();
                }
            }
        } catch (error) {
            console.error(`Failed to load component ${path}:`, error);
        }
    }

    loadComponent('header-placeholder', 'components/header-component.html');
    loadComponent('footer-placeholder', 'components/footer-component.html');
});