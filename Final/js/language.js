function getCurrentLang() {
    const match = window.location.pathname.match(/\/(es|en|fr)\//);
    return match ? match[1] : 'es';
}

function changeLanguage(lang) {
    const currentLang = getCurrentLang();
    if (lang !== currentLang) {
        window.location.href = window.location.pathname.replace(`/${currentLang}/`, `/${lang}/`);
    } else {
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('.language select');
    if (select) select.value = getCurrentLang();
});