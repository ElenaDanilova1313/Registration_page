console.log('Hello');
console.log('message mytask user1');

window.addEventListener('load', function () {
    let registration = true;

    const form = document.querySelector('form');
    form[0].addEventListener('input', function () {
        this.value = this.value.replace(/[0-9]/g, '');
    });

    form[1].addEventListener('input', function () {
        this.value = this.value.replace(/[.,]/g, '');
    });

    //сообщение в консоль “Согласен” или “Не согласен” при изменении значения чекбокса
    if (form[7]) {
        form[7].addEventListener('change', function () {
            this.checked ?
                console.log('Согласен') :
                console.log('Не согласен');
        });
    }

    // Обработчик кнопок
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;

            if (input.type === 'password') {
                input.type = 'text';
                this.classList.add('visible');
            } else {
                input.type = 'password';
                this.classList.remove('visible');            }
        });
    });

    function regForm(event) {
        event.preventDefault();
        if (!form[0].value) {
            alert('Заполните поле Full Name');
            return;
        }
        if (!form[1].value) {
            alert('Заполните поле Your username');
            return;
        }
        if (!form[2].value) {
            alert('Заполните поле E-mail');
            return;
        }
        if (!form[3].value) {
            alert('Заполните поле Password');
            return;
        } else if (form[3].value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }

        if (!form[5].value) {
            alert('Заполните поле Repeat Password');
            return;
        } else if (form[3].value !== form[5].value) {
            alert('Пароли не совпадают');
            return;
        }
        if (!form[7].checked) {
            alert('Подтвердите согласие с условиями использования сервиса');
            return;
        }
        alert('Спасибо за заказ!');
        form.reset();
        modalWindow.style.display = 'flex';
    }
    form.addEventListener('submit', regForm);

    // элементы модального окна
    const modalWindow = document.getElementsByClassName('modalWindow')[0];
    const modalBtn = document.getElementsByClassName('modalBtn')[0];

    // Функция для закрытия модального окна
    function closeModal() {
        modalWindow.style.display = 'none';
    }

    //обработка кнопки “Sign In”
    function signIn(event) {
        event.preventDefault();
        if (!form[1].value) {
            alert('Заполните поле Your username');
            return;
        }
        if (!form[3].value) {
            alert('Заполните поле Password');
            return;
        } else if (form[3].value.length < 8) {
            alert('Пароль должен содержать не менее 8 символов');
            return;
        }
        alert(`Добро пожаловать, ${form[1].value}!`)
    }

    let registrationTitle = document.getElementsByClassName('registration__title')[0];
    const registration__questionText = document.getElementsByClassName('registration__question-text')[0];
    const button = document.getElementsByClassName('registration__btn')[0];

    // Функция для имитации перехода на страницу логина
    function redirectToLogin() {
        registration = false;

        if (registrationTitle) {
            registrationTitle.textContent = 'Log in to the system';
        }

        if (form[0]) {
            form[0].parentElement.style.display = 'none';
        }

        if (form[2]) {
            form[2].parentElement.style.display = 'none';
        }

        if (form[5]) {
            form[5].parentElement.style.display = 'none';
        }

        // изменить текст кнопки
        if (button) {
            button.textContent = 'Sign In';
        }

        // Скрыть чекбокс и связанный с ним текст
        if (form[7] && form[7].parentElement) {
            form[7].parentElement.style.display = 'none';
        }

        // Ссылку "Already have an account?" удалить
        if (registration__questionText) {
            registration__questionText.style.display = 'none';
        }

        if (!registration) {
            form.removeEventListener('submit', regForm);
            form.addEventListener('submit', signIn);
        }
    }

    // Обработчик кнопки "ОК" в модальном окне
    modalBtn.addEventListener('click', closeModal);
    modalBtn.addEventListener('click', redirectToLogin);

    // Обработчик при клике на ссылку
    registration__questionText.addEventListener('click', redirectToLogin);
});
