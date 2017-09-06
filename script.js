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
            let menu = document.querySelector('.menu__nav');

            input.checked ? menu.style.display = 'flex' : menu.style.display = '';
        }).bind(null, selector));
    }

    function showArticle(selector) {
        document.querySelector(selector).addEventListener('click', (function () {
            let input = document.querySelector(selector);
            let inputClasses = input.classList;
            let buttonName = inputClasses[inputClasses.length - 1].split('--')[1];
            let button = document.querySelector('.radio-button--' + buttonName);
            let buttonClasses = button.classList;
            let targetClass = buttonClasses[buttonClasses.length - 1];
            let article = document.querySelector('.hide-article--' + buttonName);
            let articles = document.getElementsByClassName('hide-article');

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
        // let width = window.innerWidth;
        // let $menu = document.querySelector('.menu');
        // let $header = document.querySelector('.page__header');
        // let scrolled = window.pageYOffset || document.documentElement.scrollTop;
        // let logoHeight = 87;
        // let menuHeight = 54;
        // let marginTablet = 33;
        // let marginDesktop = 49;
        // let marginStatic = width > 939 ? marginDesktop : marginTablet;
        // let marginFixed = marginStatic + menuHeight;
        //
        // if (scrolled < logoHeight) {
        //     $menu.style.position = 'relative';
        //     $menu.style.top = 'auto';
        //     $menu.style.width = 'auto';
        //     $header.style.marginBottom = marginStatic.toString() + 'px';
        // } else if (scrolled > logoHeight) {
        //     $menu.style.position = 'fixed';
        //     $menu.style.top = '0';
        //     $menu.style.width = '100%';
        //     $header.style.marginBottom = marginFixed.toString() + 'px';
        // }

        let width = window.innerWidth;
        let header = document.querySelector('.header');
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
    showArticle('.radio-button__input--about');
    showArticle('.radio-button__input--information');
    showArticle('.radio-button__input--tags');
    showArticle('.hide-button--about');
    showArticle('.hide-button--information');
    showArticle('.hide-button--tags');
    dropDownMenu('.radio-button__input--burger');
}());
