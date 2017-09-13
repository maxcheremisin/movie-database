(function () {
    'use strict';

    function uncheckedRadio() {
        let allRadios = document.getElementsByName('menu-button');
        let radio;
        let x;

        for (x = 0; x < allRadios.length; x++) {
            allRadios[x].onclick = function () {
                if (radio === this) {
                    this.checked = false;
                    radio = null;
                } else {
                    radio = this;
                }
            };
        }
    }

    function dropDownMenu(selector) {
        document.querySelector(selector).addEventListener('click', (function () {
            let input = document.querySelector(selector);
            let menu = document.querySelector('.js-drop-menu');

            input.checked ? menu.style.display = 'flex' : menu.style.display = '';
        }).bind(null, selector));
    }

    function showArticle(selector) {
        document.querySelector(selector).addEventListener('click', (function () {
            let input = document.querySelector(selector);
            let inputClasses = input.classList;
            let buttonName = inputClasses[inputClasses.length - 1].split('--')[1];
            let button = document.querySelector('.js-radio-button--' + buttonName);
            let buttonClasses = button.classList;
            let targetClass = buttonClasses[buttonClasses.length - 1];
            let article = document.querySelector('.js-article--' + buttonName);
            let articles = document.getElementsByClassName('js-article');

            if (targetClass === 'radio-button--checked') {
                button.classList.remove('radio-button--checked');
                for (let i = 0; i < articles.length; i++) {
                    articles[i].style.display = '';
                }
            } else if (document.querySelector('.radio-button--checked') !== null) {
                document.querySelector('.radio-button--checked').classList.remove('radio-button--checked');
                button.classList.add('radio-button--checked');
                for (let i = 0; i < articles.length; i++) {
                    articles[i].style.display = '';
                }
                article.style.display = 'flex';
            } else {
                button.classList.add('radio-button--checked');
                for (let i = 0; i < articles.length; i++) {
                    articles[i].style.display = '';
                }
                article.style.display = 'flex';
            }

        }).bind(null, selector));
    }

    function onScroll() {
        let width = window.innerWidth;
        let header = document.querySelector('.js-header-onscroll');
        let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        let logoHeight = width <= 473 ? 55 : 87;

        if (scrolled >= logoHeight) {
            header.style.position = 'sticky';
            header.style.top = -logoHeight + 'px';
        } else {
            header.style.top = 'auto';
        }
    }

    window.onscroll = onScroll;
    uncheckedRadio();
    showArticle('.js-button--about');
    showArticle('.js-button--information');
    showArticle('.js-button--tags');
    showArticle('.js-hide-button--about');
    showArticle('.js-hide-button--information');
    showArticle('.js-hide-button--tags');
    dropDownMenu('.js-button--burger');
}());
