$(document).ready(function () {
  $('a.toggle').on('click', function () {
    opens = $(this).attr('data-opens')
    console.log(opens)
    target = $('.hidden[data-opened-by=' + opens + ']')
    $(this).addClass('clicked')
    target.show()
    setTimeout(function () {
      target.addClass('visible')
    }, 100)
  })
})
