/* global $ */
/* jshint asi:true */

// calibre-server host
var calibreHost = window.location.hostname || 'localhost'
// calibre-server port
var calibrePort = 8080
// document body
var body = '.container'
// whether to use Calibre
var useCalibre = true
// whether to create links
var createLinks = true
// whether to create lists
var createLists = true
// whether to create anchors
var createAnchors = true

var md = window.markdownit({ typographer: true })
var attr = window.markdownItAttrs
md.use(attr)

function tagId (tag) {
  return tag.replace('#', '')
}

function tagName (tag) {
  var id = tagId(tag)
  id = id.replace('-', ' ')
  return id[0].toUpperCase() + id.slice(1)
}

function findHeader (tag) {
  var header = $(tag)
  if (header.length === 0) {
    header = $('h1, h2, h3, h4, h5, h6').filter(function (index) {
      return $(this).text().trim() === tagName(tag)
    })
    if (header.length > 0) {
      header.attr('id', tagId(tag))
    }
  }
  if (header.length === 0) {
    header = createHeader(tag)
  }
  return header
}

function createHeader (tag) {
  var header = $('<h2 id ="' + tagId(tag) + '">' + tagName(tag) + '</h2>')
  $(body).append(header)
  return header
}

function findList (tag) {
  var header = findHeader(tag)
  var ul = header.next()
  if (ul.length === 0 || ul[0].tagName !== 'UL') {
    ul = createList(tag)
  }
  return ul
}

function createList (tag) {
  var header = findHeader(tag)
  var ul = $('<ul>')
  header.after(ul)
  return ul
}

function linkifyTag (tag) {
  tag = tag.trim()
  return ' #<a class="tag" href ="' + tag + '" title="' + tagName(tag) + '">' + tagId(tag) + '</a>'
}

function handleTagList (el) {
  var tag = el.attr('href')
  var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi
  var tagRegEx2 = /(^|\s|\(|>)#<a.+<\/a>/gi
  var li = el.parent()
  var li2 = li.html().replace(tagRegEx, '').replace(tagRegEx2, '')
  li2 = $('<li>' + li2 + '</li>')
  var ul = findList(tag)
  if (ul.find('li:contains(' + li2.text().trim() + ')').length === 0) {
    ul.append(li2)
  }
}

function handleTagLists () {
  $('.tag').each(function () {
    handleTagList($(this))
  })
}

function handleTags () {
  var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi
  var body = $('body')
  var html = body.html()
  html = html.replace(tagRegEx, linkifyTag)
  body.html(html)
}

function handleRating (el) {
  var ratingRegEx = /[(]([0-9.]+)(?:\/([0-9.]+))?[)]$/i
  var txt = el.text().trim()
  var matches = txt.match(ratingRegEx)
  if (matches) {
    var rating = parseFloat(matches[1])
    var total = parseFloat(matches[2] || '5.0')
    rating = rating / total * 5.0
    var html = el.html()
    html = html.replace(ratingRegEx, starRating(rating))
    el.html(html)
  }
}

function starRating (rating) {
  var blackStar = '\u2605'
  var whiteStar = '\u2606'
  var oneHalf = '\u00bd'
  var str = ''
  var i, n
  n = Math.floor(rating)
  for (i = 0; i < n; i++) {
    str += blackStar
  }
  if (rating > 0 && rating - n > 0) {
    str += oneHalf
  }
  n = 5 - str.length
  for (i = 0; i < n; i++) {
    str += whiteStar
  }
  return '<span style="color: rgb(187, 131, 0)" title="' +
    rating + '">' + str + '</span>'
}

function linkifyBooks () {
  $('li em').each(function () {
    // construct search string for book
    var em = $(this)
    var prev = this.previousSibling
    var author = prev ? prev.nodeValue : ''
    var title = em.text()
    var book = author + title
    // add links
    var search = searchString(book)
    if (!em.find('a').length) {
      if (useCalibre) {
        em.wrapInner(calibreUrl(book, search))
      } else {
        em.wrapInner(amazonUrl(book, search))
      }
    }
    var entry = em.parent().is('del') ? em.parent() : em
    entry.after('<sup>' +
                (useCalibre ? (amazon(title, search) + ' ') : '') +
                goodreads(title, search) + ' ' +
                librarything(title, search) + ' ' +
                worldcat(title, search) + ' ' +
                google(title, search) + ' ' +
                reddit(title) + ' ' +
                hackernews(title) + ' ' +
                stackexchange(title) + ' ' +
                medium(title) + ' ' +
                forum(title) + ' ' +
                wikipedia(title, search) +
                '</sup>')

    // Tags
    var li = em.parent().is('del') ? em.parent().parent() : em.parent()
    em.replaceWith('<cite>' + em.html() + '</cite>')
    handleRating(li)
  })
}

function asciify (str) {
  return str.replace(/[\u2018\u2019]/ig, "'")
    .replace(/[\u201c\u201d]/ig, '"')
    .replace(/\u2026/ig, '...')
}

function searchString (search) {
  search = asciify(search)
  search = search.replace(/:/ig, '')
    .replace(/"/ig, '')
    .replace(/[-,:;&!?#]/ig, ' ')
    .replace(/\.\.\./ig, ' ')
    .replace(/\. /ig, ' ')
    .replace(/[ ]+/ig, ' ')
    .toLowerCase()
  return encodeURIComponent(search)
}

function handleHeaders () {
  $('h1, h2, h3, h4, h5, h6').prepend(function () {
    return '<a aria-hidden="true" class="header-anchor" href="#' + $(this).attr('id') + '">&para;</a>'
  })
}

function calibreUrl (title, search) {
  var url = 'http://' + calibreHost + ':' + calibrePort + '/browse/search?query=' + search
  return '<a href="' + url + '" title="' + title + '"></a>'
}

function amazonUrl (title, search) {
  var url = 'http://www.amazon.com/s/' + '?field-keywords=' + search
  return '<a href="' + url + '" title="' + title + '"></a>'
}

function amazon (title, search) {
  var url = 'http://www.amazon.com/s/' + '?field-keywords=' + search
  return '<a href="' + url + '" title="Find ' + title + ' on Amazon.com">' + '<img alt="Amazon.com" height="16" src="img/amazon.png">' + '</a>'
}

function goodreads (title, search) {
  var url = 'http://www.goodreads.com/search?query=' + search
  return '<a href="' + url + '" title="Find ' + title + ' on Goodreads">' + '<img alt="Goodreads" height="16" src="img/goodreads.png">' + '</a>'
}

function librarything (title, search) {
  var url = 'http://www.librarything.com/search.php?term=' + search
  return '<a href="' + url + '" title="Find ' + title + ' on LibraryThing">' + '<img alt="LibraryThing" height="14" src="img/librarything.png">' + '</a>'
}

function google (title, search) {
  var url = 'http://www.google.com/?gws_rd=ssl#tbm=bks&q=' + search
  return '<a href="' + url + '" title="Find ' + title + ' on Google Books">' + '<img alt="Google Books" height="16" src="img/google.png">' + '</a>'
}

function worldcat (title, search) {
  var url = 'http://www.worldcat.org/search?q=' + search
  return '<a href="' + url + '" title="Find ' + title + ' on WorldCat">' + '<img alt="WorldCat" height="16" src="img/worldcat.png">' + '</a>'
}

function reddit (title) {
  var search = encodeURIComponent(asciify(title).toLowerCase())
  var url = 'http://www.google.com/#q=site:www.reddit.com+' + '&quot;' + search + '&quot;'
  return '<a href="' + url + '" title="Find ' + title + ' on Reddit">' + '<img alt="Reddit" height="16" src="img/reddit.png">' + '</a>'
}

function hackernews (title) {
  var search = encodeURIComponent(asciify(title).toLowerCase())
  var url = 'http://www.google.com/#q=site:news.ycombinator.com+' + '&quot;' + search + '&quot;'
  return '<a href="' + url + '" title="Find ' + title + ' on Hacker News">' + '<img alt="Hacker News" height="16" src="img/hackernews.png">' + '</a>'
}

function stackexchange (title) {
  var search = encodeURIComponent(asciify(title).toLowerCase())
  var url = 'http://stackexchange.com/search?q=' + '&quot;' + search + '&quot;'
  return '<a href="' + url + '" title="Find ' + title + ' on Stack Exchange">' + '<img alt="Stack Exchange" height="16" src="img/stackexchange.png">' + '</a>'
}

function medium (title) {
  var search = encodeURIComponent(asciify(title).toLowerCase())
  var url = 'http://www.google.com/#q=site:medium.com+' + '&quot;' + search + '&quot;'
  return '<a href="' + url + '" title="Find ' + title + ' on Medium">' + '<img alt="Medium" height="16" src="img/medium.png">' + '</a>'
}

function forum (title) {
  var search = encodeURIComponent(asciify(title).toLowerCase())
  var url = 'http://www.google.com/#q=forum+' + '&quot;' + search + '&quot;'
  return '<a href="' + url + '" title="Find ' + title + ' on forums">' + '<img alt="Forums" height="16" src="img/disqus.png">' + '</a>'
}

function wikipedia (title, search) {
  var url = 'http://en.wikipedia.org/w/index.php?search=' + search
  return '<a href="' + url + '" title="Find ' + title + ' on Wikipedia">' + '<img alt="Wikipedia" height="16" src="img/wikipedia.png">' + '</a>'
}

function processList () {
  if (createLinks) {
    linkifyBooks()
  }
  handleTags()
  if (createLists) {
    handleTagLists()
  }
  if (createAnchors) {
    handleHeaders()
  }
}

function convert (markdown) {
  var html = md.render(markdown)
  $('.container').append(html)
}

function floats () {
  $('p img').each(function () {
    var img = $(this)
    var p = img.parent()
    var div = $('<div class="figure"></div>')
    var caption = $('<p class="caption">' +
                    img.attr('alt') + '</p>')
    div.insertBefore(p)
    div.addClass('figure')
    var width = parseInt(img.attr('width'))
    div.addClass(img.attr('class'))
    div.css('width', (width + 9) + 'px')
    div.append(img)
    div.append(caption)
    p.remove()
  })
}

function headers () {
  $('h1, h2, h3, h4, h5, h6').each(function () {
    var show = '\u25bc'
    var hide = '\u25b2'
    var header = $(this)
    var section = header.nextUntil('h1, h2, h3, h4, h5, h6')
    var div = section.wrapAll('<div></div>')
    var button = $('<span>' + hide + '</span>')
    button.css({'color': '#999',
                'float': 'right',
                'margin-top': '0.5em',
                'font-size': '0.8em'})
    header.append(button)
    button.click(function () {
      if ($(this).text() === show) {
        $(this).text(hide)
      } else {
        $(this).text(show)
      }
      div.toggle()
    })
  })
}

// https://github.com/kellym/smartquotesjs
function smartquotes () {
  var root = document.body
  var node = root.childNodes[0]
  while (node !== null) {
    if (node.nodeType === 3 && node.nodeName !== 'TEXTAREA') {
      node.nodeValue = node.nodeValue
        .replace(/([-([«\s]|^)"(\S)/g, '$1\u201c$2') // beginning "
        .replace(/"/g, '\u201d') // ending "
      // .replace(/([^0-9])"/g,'$1\u201d') // remaining " at end of word
        .replace(/([0-9])('|\u2019)([0-9])/g, '$1\u2032$3') // prime
        .replace(/([-([«\u201c\s]|^)('|\u2019)(\S)/g, '$1\u2018$3') // beginning '
        .replace(/'/ig, '\u2019') // ending '
      // .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3') // conjunction's possession
      // .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3') // abbrev. years like '93
      // .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe

        .replace(/<-+>/g, '\u2194') // double arrow
        .replace(/<=+>/g, '\u21D4')
        .replace(/-+>/g, '\u2192') // right arrow
        .replace(/==+>/g, '\u21D2')
        .replace(/<-+?/g, '\u2190') // left arrow
        .replace(/<==+/g, '\u21D0')
        .replace(/===/g, '\u2261')
        .replace(/---/g, '\u2014') // em-dashes
        .replace(/--/g, '\u2013') // en-dashes
        .replace(/ - /g, ' \u2013 ')
        .replace(/,-/g, ',\u2013')
        .replace(/\.\.\.\./g, '.\u2026') // ellipsis
        .replace(/\.\.\./g, '\u2026')
        .replace(/!=/g, '\u2260') // not equal
        .replace(/<=/g, '\u2264') // less than or equal
        .replace(/>=/g, '\u2265') // more than or equal
        .replace(/'''/g, '\u2034') // triple prime
        .replace(/("|'')/g, '\u2033') // double prime
        .replace(/'/g, '\u2032') // prime
        .replace(/<3/g, '\u2764') // heart
        .replace(/!! :\)/g, '\u203c\u032e') // smiley
        .replace(/:\)/g, '\u263a') // smiley
        .replace(/:\(/g, '\u2639') // frowning smiley
    }
    if (node.hasChildNodes() && (node.firstChild.nodeName !== 'CODE' ||
                                 node.firstChild.nodeName !== 'PRE' ||
                                 node.firstChild.nodeName !== 'TEXTAREA')) {
      node = node.firstChild
    } else {
      do {
        while (node.nextSibling === null && node !== root) {
          node = node.parentNode
        }
        node = node.nextSibling
      } while (node && (node.nodeName === 'CODE' ||
                        node.nodeName === 'PRE' ||
                        node.nodeName === 'SCRIPT' ||
                        node.nodeName === 'TEXTAREA' ||
                        node.nodeName === 'STYLE'))
    }
  }
}

function title () {
  var h1 = $('h1, h2, h3, h4, h5, h6').first()
  var txt = h1.text()
  $('title').html(txt)
}

function process (markdown) {
  convert(markdown)
  floats()
  smartquotes()
  title()
  processList()
  headers()
}
