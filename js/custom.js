/* global $ */
/* jshint asi:true */

var md = window.markdownit({ typographer: true })
var attr = window.markdownItAttrs
var anchor = window.markdownItAnchor

md.use(attr)
md.use(anchor, {permalink: true, permalinkBefore: true})

function convert (markdown) {
  var html = md.render(markdown)
  $('.container').append(html)
}

function process (markdown) {
  convert(markdown)
  $('html').addPunctuation()
  $('html').addTitle()
  $('.container').readingList()
  $('.container').fixAnchors()
  $('html').addCollapsibleSections({
    show: '\uf078', // chevron-down,
    hide: '\uf077', // chevron-up,
    font: 'FontAwesome'
  })
}

$(function () {
  var iframe = $('iframe')
  if (iframe.length > 0) {
    iframe.hide()
    iframe.on('load', function () {
      var markdown = $(this).contents().text()
      process(markdown)
      $(this).remove()
    })
  }
})
