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

                 // skip top-level headers
                 if ($.inArray(el, opts.include) < 0) {
                   return
                 }

                 // add button
                 var button = $.fn.addCollapsibleSections.button(opts.collapse, opts.hide)
                 header.append(button)

                 // add click handler
                 button.click($.fn.addCollapsibleSections.clickHandler(button, header, section, opts.collapse, opts.expand, opts.show, opts.hide))

                 // allow pre-collapsed sections
                 if (header.hasClass('collapsed')) {
                   button.click()
                 }

                 // animation style
                 if (opts.slide) {
                   button.addClass('slide')
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
  $.fn.addCollapsibleSections.button = function (collapse, hide) {
    return $('<span aria-hidden="true" class="collapse-button" title="' + collapse + '">' + hide + '</span>')
  }

  // click handler
  $.fn.addCollapsibleSections.clickHandler = function (button, header, section, collapse, expand, show, hide) {
    return function () {
      if (button.text() === show) {
        button.text(hide)
        button.attr('title', collapse)
        header.removeClass('collapsed')
      } else {
        button.text(show)
        button.attr('title', expand)
        header.addClass('collapsed')
      }
      if (button.hasClass('slide')) {
        section.slideToggle('slow')
      } else {
        section.toggle()
      }
      return false
    }
  }

  // Default options
  $.fn.addCollapsibleSections.defaults = {
    include: ['h2', 'h3', 'h4', 'h5', 'h6'], // skip h1
    collapse: 'Collapse', // collapse title
    expand: 'Expand', // expand title
    show: '\u25b2', // black up-pointing triangle
    hide: '\u25bc', // black down-pointing triangle
    slide: true     // animation
  }
}(jQuery))
