(function () {
    'use strict';

    function onScroll() {
        let width = window.innerWidth;
        let header = document.querySelector('.js-header-onscroll');
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let logoHeight = width <= 523 ? 55 : 87;

        if (scrolled >= logoHeight) {
            header.style.position = 'sticky';
            header.style.top = -logoHeight + 'px';
        } else {
            header.style.top = 'auto';
        }
    }

    function showArticle(event) {
        let target = event.target;
        let targetClass;
        let buttonName;
        let article;
        let articles;

        while (target !== this) {
            if (target.matches('.js-button')) {

                targetClass = target.classList[target.classList.length - 1];

                buttonName = targetClass.split('--')[1] === 'checked' ?
                    target.classList[target.classList.length - 2].split('--')[1] :
                    target.classList[target.classList.length - 1].split('--')[1];

                article = document.querySelector('.js-article--' + buttonName);
                articles = document.getElementsByClassName('js-article');

                if (buttonName === 'hide') {
                    document.querySelector('.radio-button--checked').classList.remove('radio-button--checked');
                    for (let i = 0; i < articles.length; i++) {
                        articles[i].style.display = '';
                    }
                } else if (targetClass === 'radio-button--checked') {
                    target.classList.remove('radio-button--checked');
                    for (let i = 0; i < articles.length; i++) {
                        articles[i].style.display = '';
                    }
                } else if (document.querySelector('.radio-button--checked') !== null) {
                    document.querySelector('.radio-button--checked').classList.remove('radio-button--checked');
                    target.classList.add('radio-button--checked');
                    for (let i = 0; i < articles.length; i++) {
                        articles[i].style.display = '';
                    }
                    article.style.display = 'flex';
                } else {
                    target.classList.add('radio-button--checked');
                    for (let i = 0; i < articles.length; i++) {
                        articles[i].style.display = '';
                    }
                    article.style.display = 'flex';
                }

                event.preventDefault();
                return;
            } else if (target.tagName === 'BODY') {
                return;
            }
            target = target.parentNode;
        }
    }

    function dropDownMenu() {
        let target = event.target;
        let menu = document.querySelector('.js-drop-menu');

        while (target !== this) {
            if (target.matches('.js-burger')) {
                target.checked ? menu.style.display = 'flex' : menu.style.display = '';
                return;
            } else if (target.tagName === 'BODY') {
                return;
            } else if (!target.closest('.menu')) {
                menu.style.display = '';
                document.querySelector('.js-burger').checked = false;
            }
            target = target.parentNode;
        }
    }

    window.onscroll = onScroll;
    window.addEventListener('click', showArticle);
    window.addEventListener('click', dropDownMenu)
}());
