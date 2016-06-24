(function ($) {
  $.fn.addTitle = function () {
    return this.each(function () {
      var title = $(this).find('title')
      if (title.length === 0) {
        title = $('title')
      }
      var header = $(this).find('h1, h2, h3, h4, h5, h6').first()
      if (header.length > 0) {
        header = header.clone()
        header.find('[aria-hidden="true"]').remove()
        var txt = header.text().trim()
        title.html(txt)
      }
    })
  }
}(jQuery))
