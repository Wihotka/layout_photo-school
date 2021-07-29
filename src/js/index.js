window.addEventListener('DOMContentLoaded', function() {
  // header burger
  document.querySelector('.header__burger').addEventListener('click', function() {
    document.querySelector('.header__nav').classList.toggle('header__nav--active');
  });

  // header nav-menu scroll
  $(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 300);
    });
  });

  // projects page switch
  document.querySelectorAll('.projects__page-btn').forEach(function(page) {
      page.addEventListener('click', function(event) {
          const path = event.currentTarget.dataset.path;

          document.querySelectorAll('.projects__page-btn').forEach(function(pageBtn) {
              pageBtn.classList.remove('projects__page-btn--active');
          });
          document.querySelector(`[data-path="${path}"]`).classList.add('projects__page-btn--active');

          document.querySelector('.projects__wrapper').classList.remove('projects__wrapper--one');
          document.querySelector('.projects__wrapper').classList.remove('projects__wrapper--two');
          document.querySelector('.projects__wrapper').classList.add(`projects__wrapper--${path}`);
      });
  });

  // services page switch
  document.querySelectorAll('.services__tab').forEach(function(tab) {
      tab.addEventListener('click', function(event) {
          const path = event.currentTarget.dataset.path;

          document.querySelector('.services__tabs').classList.remove('services__tabs--main');
          document.querySelector('.services__tabs').classList.remove('services__tabs--extra');
          document.querySelector('.services__tabs').classList.add(`services__tabs--${path}`);

          document.querySelectorAll('.services__tab').forEach(function(tabBtn) {
              tabBtn.classList.remove('services__tab--active');
          });
          document.querySelector(`[data-path="${path}"]`).classList.add('services__tab--active');

          document.querySelector('.services__wrapper').classList.remove('services__wrapper--main');
          document.querySelector('.services__wrapper').classList.remove('services__wrapper--extra');
          document.querySelector('.services__wrapper').classList.add(`services__wrapper--${path}`);

          document.querySelectorAll('.services__list').forEach(function(tabList) {
              tabList.classList.remove('services__list--active');
          });
          document.querySelector(`[data-list="${path}"]`).classList.add('services__list--active');

          document.querySelectorAll('.services__done-works').forEach(function(tabWorks) {
              tabWorks.classList.remove('services__done-works--active');
          });
          document.querySelector(`[data-works="${path}"]`).classList.add('services__done-works--active');
      });
  });

  // services text ellipsis
  function addTextEllipsis() {
    let MAX_TEXT_LENGTH = 200;
    let MAX_TITLE_LENGTH = 50;

    document.querySelectorAll('.services__list-text').forEach(function(text) {
      if (window.innerWidth <= 1300) {
        MAX_TEXT_LENGTH = 99;
      }

      if (window.innerWidth <= 750) {
        MAX_TEXT_LENGTH = 91;
      }

      if (text.textContent.length > MAX_TEXT_LENGTH) {
        text.textContent = text.textContent.slice(0, MAX_TEXT_LENGTH) + '...';
      }
    });

    document.querySelectorAll('.services__list-title--extra').forEach(function(title) {
      if (window.innerWidth <= 1300) {
        MAX_TITLE_LENGTH = 27;
      }

      if (title.textContent.length > MAX_TITLE_LENGTH) {
        title.textContent = title.textContent.slice(0, MAX_TITLE_LENGTH) + '...';
      }
    });
  }

  addTextEllipsis();

  // yandex map
  ymaps.ready(init);
  function init(){
      // Создание карты.
    var myMap = new ymaps.Map("map", {
      center: [55.7695, 37.6399],
      // от 0 (весь мир) до 19.
      zoom: 15,
      // Элементы управления (выкл).
      controls: []
    });
        
    // Создание кастомной метки на карте.
    var myPlacemark = new ymaps.Placemark([55.7695, 37.6399], {},
    {
       iconLayout: 'default#image', // обозначаем что будет использоваться пользовательское изображение
       iconImageHref: '/images/contacts/point.svg',  // указываем путь к метке
       iconImageSize: [20, 20], // указываем размер изображения
       iconImageOffset: [-10, -10] // обозначаем сдвиг от левого верхнего угла к точке изображения метки .
    });

    myMap.geoObjects.add(myPlacemark) // добавляем метку на карту
  };

  // about jquery validate
  $(document).ready(function() {
    $('#about-form').submit(function(e) {
      e.preventDefault();
      var email = $('#about-email').val();
       
      $('.error').remove();
      $('#about-email').removeClass('about__input--error');
       
      if (email.length < 1) {
        $('#about-email').after('<span class="error">Это обязательное поле</span>');
        $('#about-email').addClass('about__input--error');
      } else {
        var regEx = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
        var validEmail = regEx.test(email);
        if (!validEmail) {
          $('#about-email').after('<span class="error">Введите корректный email</span>');
          $('#about-email').addClass('about__input--error');
        }
      }
    });
  });

  // contacts jquery validate
  $(document).ready(function() {
    $('#contacts-form').submit(function(e) {
      e.preventDefault();
      var name = $('#contacts-name').val();
      var email = $('#contacts-email').val();
       
      $('.error').remove();
      $('#contacts-name').removeClass('contacts__input--error');
      $('#contacts-email').removeClass('contacts__input--error');
       
      if (name.length < 1) {
        $('#contacts-name').after('<span class="error">Это обязательное поле</span>');
        $('#contacts-name').addClass('contacts__input--error');
      } else {
        var letters = /^[A-Za-zА-Яа-яЁё]*$/;
        var validName = letters.test(name);
        if (!validName) {
            $('#contacts-name').after('<span class="error">Введите корректное имя</span>');
            $('#contacts-name').addClass('contacts__input--error');
        }
      }
      if (email.length < 1) {
        $('#contacts-email').after('<span class="error">Это обязательное поле</span>');
        $('#contacts-email').addClass('contacts__input--error');
      } else {
        var regEx = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;
        var validEmail = regEx.test(email);
        if (!validEmail) {
          $('#contacts-email').after('<span class="error">Введите корректный email</span>');
          $('#contacts-email').addClass('contacts__input--error');
        }
      }
    });
  });

  window.addEventListener('resize', () => {
    addTextEllipsis();
  });
});
