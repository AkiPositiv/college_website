document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const langButtons = document.querySelectorAll('.lang-btn');
    const accordionHeaders = document.querySelectorAll('.accordion-header'); // Для FAQ

    // Функция для обновления текста на странице
    function updateContentLanguage(lang) {
        // Сохраняем выбранный язык в localStorage
        localStorage.setItem('currentLang', lang);

        // Обновляем атрибут lang у html
        document.documentElement.lang = lang;

        // Обновляем все элементы с data-lang-* атрибутами
        document.querySelectorAll('[data-lang-ru]').forEach(element => {
            const currentText = element.getAttribute(`data-lang-${lang}`);
            if (element.tagName === 'TITLE') {
                element.textContent = currentText;
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Для инпутов и текстовых полей обновляем placeholder
                const placeholderText = element.getAttribute(`data-lang-${lang}-placeholder`);
                if (placeholderText) {
                    element.setAttribute('placeholder', placeholderText);
                }
            } else {
                element.textContent = currentText;
            }
        });

        // Обновляем активную кнопку языка
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Загружаем язык из localStorage при загрузке страницы
    let currentLang = localStorage.getItem('currentLang') || 'ru'; // По умолчанию русский
    updateContentLanguage(currentLang);

    // Мобильное меню
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Переключатель языков
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentLang = button.dataset.lang;
            updateContentLanguage(currentLang);
        });
    });

    // Аккордеон FAQ (если есть на странице)
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.closest('.faq-item');
            const content = header.nextElementSibling;

            // Закрыть все, кроме текущего
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Открыть/закрыть текущий
            currentItem.classList.toggle('active');
            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
});
