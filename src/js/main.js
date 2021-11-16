// header
const header = $('.header')
header.scrollView({
  start: header.outerHeight(),
  threshold: 0,
  end: '.footer-content-wrapper',
  repeat: true,
  onAddClass: function () {
    header
      .removeClass('header-at-end')
      .addClass('header-at-scroll')
      .addClass('header-scroll-start-animation')
    setTimeout(() => header.removeClass('header-scroll-start-animation'), 1000)
  },
  onRemoveClassAtStart: function () {
    header.removeClass('header-at-scroll').removeClass('header-at-end')
  },
  onRemoveClassAtEnd: function () {
    header
      .removeClass('header-at-scroll')
      .addClass('header-at-end')
      .addClass('header-scroll-end-out-animation')
    setTimeout(() => header.removeClass('header-scroll-end-out-animation'), 1000)
  }
})

// go-top
$('html, body').on('scroll mousewheel', function () {
  $('html, body').stop()
})
const goTop = $('.footer-content-gotop')
goTop.on('click', function () {
  $('html, body').animate({ scrollTop: 0 }, 2000, 'easeOutExpo')
})
goTop.scrollView({
  start: window.innerHeight / 2,
  end: '.footer-content-gotop',
  endKey: 'top',
  threshold: 0,
  repeat: true
})

// tooltip
$('[data-toggle="tooltip"]').tooltip()

// demo validation
const cookies = document.cookie.split(';')
if (!cookies.some((cookie) => cookie.includes('demo_validation='))) {
  $('body').append(
    '<div id="demo-validation-box" style="position: fixed; z-index: 9999; width: 100%; height: 100%; background: #ffffff; top: 0; left: 0;"><input id="demo-validation-input" placeholder="請輸入demo驗證碼" style="display: block; width: 240px; height: 40px; border: 1px solid #333333; background: #ffffff; border-radius: 4px; text-align: center; position: absolute; top: 50%; left: 50%; margin: -20px 0 0 -120px;" /></div>'
  )
  $(document).on('keyup', '#demo-validation-input', function (event) {
    if (event.currentTarget.value === '1234') {
      document.cookie = 'demo_validation=true; max-age=604800'
      window.location.reload()
    }
  })
}
