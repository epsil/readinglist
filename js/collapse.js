(function ($) {
  $.fn.addCollapsibleSections = function () {
    return this.each(function () {
      var show = '\u25bc'
      var hide = '\u25b2'
      for (var i = 6; i >= 1; i--) {
        var stop = []
        for (var j = 1; j <= i; j++) {
          stop.push('h' + j)
        }
        var next = stop.join(',')
        $(this).find('h' + i).each(function () {
          var header = $(this)
          var section = header.nextUntil(next)
          var div = section.wrapAll('<div></div>')
          var button = $('<span aria-hidden="true" class="collapse-button" title="Collapse">' + hide + '</span>')
          header.append(button)
          button.click(function () {
            var button = $(this)
            var header = button.parent()
            if (button.text() === show) {
              button.text(hide)
              button.attr('title', 'Collapse')
              header.removeClass('collapsed')
            } else {
              button.text(show)
              button.attr('title', 'Expand')
              header.addClass('collapsed')
            }
            div.toggle()
            return false
          })
          if (header.hasClass('collapsed')) {
            button.click()
          }
        })
      }
    })
  }
}(jQuery))
