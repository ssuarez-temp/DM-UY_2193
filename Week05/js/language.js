function changeLanguage(lang) {
    var path = window.location.pathname;
    var match = path.match(/\/(es|en|fr)\//);
    var currentLang = match ? match[1] : 'es';

    if (lang === currentLang) {
        window.location.reload();
    } else {
        var newPath = path.replace(new RegExp("/" + currentLang + "/"), "/" + lang + "/");
        window.location.href = newPath;
    }
}

window.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var match = path.match(/\/(es|en|fr)\//);
    var currentLang = match ? match[1] : 'es';
    var select = document.querySelector('.language select');
    if (select) {
        select.value = currentLang;
    }
});
