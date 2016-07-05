/* global jQuery */
(function ($) {
  $.fn.addCollapsibleSections = function (options) {
    var opts = $.extend({}, $.fn.addCollapsibleSections.defaults, options)
    return this.each(function () {
      var body = $(this)

      // process innermost sections first
      $.each(['h6', 'h5', 'h4', 'h3', 'h2', 'h1'],
             function (i, el) {
               body.find(el).each(function () {
                 // add section
                 var header = $(this)
                 var section = $.fn.addCollapsibleSections.addSection(header)

                 // add button
                 var button = $.fn.addCollapsibleSections.button(opts.hide)
                 header.append(button)

                 // add click handler
                 button.click($.fn.addCollapsibleSections.clickHandler(button, header, section, opts.show, opts.hide))

                 // allow pre-collapsed sections
                 if (header.hasClass('collapsed')) {
                   button.click()
                 }
               })
             })
    })
  }

  // add section for header
  $.fn.addCollapsibleSections.addSection = function (header) {
    // h1 ends at next h1, h2 ends at next h1 or h2,
    // h3 ends at next h1, h2 or h3, and so on
    var stop = []
    var i = parseInt(header.prop('tagName').match(/\d+/)[0])
    for (var j = 1; j <= i; j++) {
      stop.push('h' + j)
    }
    var end = stop.join(', ')
    var section = header.nextUntil(end)
    return section.wrapAll('<div>')
  }

  // button
  $.fn.addCollapsibleSections.button = function (hide) {
    return $('<span aria-hidden="true" class="collapse-button" title="Collapse">' + hide + '</span>')
  }

  // click handler
  $.fn.addCollapsibleSections.clickHandler = function (button, header, section, show, hide) {
    return function () {
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
    }
  }

  // Default options
  $.fn.addCollapsibleSections.defaults = {
    show: '\u25b2', // black up-pointing triangle
    hide: '\u25bc'  // black down-pointing triangle
  }
}(jQuery))
