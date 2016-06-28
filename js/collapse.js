/* global jQuery */
(function ($) {
  $.fn.addCollapsibleSections = function () {
    return this.each(function () {
      var show = '\u25bc' // black down-pointing triangle
      var hide = '\u25b2' // black up-pointing triangle

      // process innermost sections first
      for (var i = 6; i >= 1; i--) {
        // find end of section: h1 ends at next h1,
        // h2 ends at next h1 or h2, h3 ends at next
        // h1, h2 or h3, and so on
        var stop = []
        for (var j = 1; j <= i; j++) {
          stop.push('h' + j)
        }
        var next = stop.join(', ')

        // process section
        $(this).find('h' + i).each(function () {
          var header = $(this)
          var section = header.nextUntil(next)
          section = section.wrapAll('<div>')
          var button = $('<span aria-hidden="true" class="collapse-button" title="Collapse">' + hide + '</span>')
          header.append(button)

          // click handler
          button.click(function () {
            if (button.text() === show) {
              button.text(hide)
              button.attr('title', 'Collapse')
              header.removeClass('collapsed')
            } else {
              button.text(show)
              button.attr('title', 'Expand')
              header.addClass('collapsed')
            }
            section.toggle()
            return false
          })

          // allow pre-collapsed sections
          if (header.hasClass('collapsed')) {
            button.click()
          }
        })
      }
    })
  }
}(jQuery))
