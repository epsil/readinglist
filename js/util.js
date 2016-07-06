/* global jQuery */
(function ($) {
  $.fn.removeAria = function () {
    return this.map(function () {
      var clone = $(this).clone()
      clone.find('[aria-hidden="true"]').remove()
      return clone
    })
  }

  $.fn.addTitle = function () {
    return this.each(function () {
      var title = $(this).find('title')
      if (title.length === 0) {
        title = $('title')
      }
      var header = $(this).find('h1, h2, h3, h4, h5, h6').first()
      if (header.length > 0) {
        var txt = header.removeAria().text().trim()
        title.html(txt)
      }
    })
  }
}(jQuery))
