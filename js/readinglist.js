/* global jQuery */
(function ($) {
  $.fn.readingList = function (options) {
    var opts = $.extend({},
                        $.fn.readingList.defaults,
                        {body: $(this)},
                        options)

    var tagId = function (tag) {
      return tag.replace('#', '')
    }

    var tagName = function (tag) {
      var id = tagId(tag)
      id = id.replace('-', ' ')
      return id[0].toUpperCase() + id.slice(1)
    }

    var findHeader = function (tag) {
      var header = opts.body.find(tag)
      if (header.length === 0) {
        header = opts.body.find('h1, h2, h3, h4, h5, h6').filter(function (index) {
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

    var createHeader = function (tag) {
      var header = $('<h2 id ="' + tagId(tag) + '">' + tagName(tag) + '</h2>')
      opts.body.append(header)
      return header
    }

    var findList = function (tag) {
      var header = findHeader(tag)
      var ul = header.next()
      if (ul.length === 0 || ul[0].tagName !== 'UL') {
        ul = createList(tag)
      }
      return ul
    }

    var createList = function (tag) {
      var header = findHeader(tag)
      var ul = $('<ul>')
      header.after(ul)
      return ul
    }

    var linkifyTag = function (tag) {
      tag = tag.trim()
      return ' #<a class="tag" href ="' + tag + '" title="' + tagName(tag) + '">' + tagId(tag) + '</a>'
    }

    var handleTagList = function (el) {
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

    var handleTagLists = function () {
      opts.body.find('.tag').each(function () {
        handleTagList($(this))
      })
    }

    var handleTags = function () {
      var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi
      var html = opts.body.html()
      html = html.replace(tagRegEx, linkifyTag)
      opts.body.html(html)
    }

    var handleRating = function (el) {
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

    var starRating = function (rating) {
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

    var linkifyBooks = function () {
      opts.body.find('li em').each(function () {
        // construct search string for book
        var em = $(this)
        var prev = this.previousSibling
        var author = prev ? prev.nodeValue : ''
        var title = em.text()
        var book = author + title
        // add links
        var search = searchString(book)
        if (!em.find('a').length) {
          if (opts.useCalibre) {
            em.wrapInner(calibreUrl(book, search))
          } else {
            em.wrapInner(amazonUrl(book, search))
          }
        }
        var entry = em.parent().is('del, s, strike') ? em.parent() : em
        entry.after('<sup>' +
                    (opts.useCalibre ? (amazon(title, search) + ' ') : '') +
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
        var li = em.parent().is('del, s, strike') ? em.parent().parent() : em.parent()
        em.replaceWith('<cite>' + em.html() + '</cite>')
        handleRating(li)
      })
    }

    var asciify = function (str) {
      return str.replace(/[\u2018\u2019]/ig, "'")
        .replace(/[\u201c\u201d]/ig, '"')
        .replace(/\u2026/ig, '...')
    }

    var searchString = function (search) {
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

    var handleHeaders = function () {
      opts.body.find('h1, h2, h3, h4, h5, h6').each(function () {
        if ($(this).find('.header-anchor').length === 0) {
          $(this).prepend('<a aria-hidden="true" class="header-anchor" href="#' + $(this).attr('id') + '">&para;</a>')
        }
      })
    }

    var calibreUrl = function (title, search) {
      var url = 'http://' + opts.calibreHost + ':' + opts.calibrePort + '/browse/search?query=' + search
      return '<a href="' + url + '" title="' + title + '"></a>'
    }

    var amazonUrl = function (title, search) {
      var url = 'http://www.amazon.com/s/' + '?field-keywords=' + search
      return '<a href="' + url + '" title="' + title + '"></a>'
    }

    var amazon = function (title, search) {
      var url = 'http://www.amazon.com/s/' + '?field-keywords=' + search
      return '<a href="' + url + '" title="Find ' + title + ' on Amazon.com">' + '<img alt="Amazon.com" height="16" src="img/amazon.png">' + '</a>'
    }

    var goodreads = function (title, search) {
      var url = 'http://www.goodreads.com/search?query=' + search
      return '<a href="' + url + '" title="Find ' + title + ' on Goodreads">' + '<img alt="Goodreads" height="16" src="img/goodreads.png">' + '</a>'
    }

    var librarything = function (title, search) {
      var url = 'http://www.librarything.com/search.php?term=' + search
      return '<a href="' + url + '" title="Find ' + title + ' on LibraryThing">' + '<img alt="LibraryThing" height="14" src="img/librarything.png">' + '</a>'
    }

    var google = function (title, search) {
      var url = 'http://www.google.com/?gws_rd=ssl#tbm=bks&q=' + search
      return '<a href="' + url + '" title="Find ' + title + ' on Google Books">' + '<img alt="Google Books" height="16" src="img/google.png">' + '</a>'
    }

    var worldcat = function (title, search) {
      var url = 'http://www.worldcat.org/search?q=' + search
      return '<a href="' + url + '" title="Find ' + title + ' on WorldCat">' + '<img alt="WorldCat" height="16" src="img/worldcat.png">' + '</a>'
    }

    var reddit = function (title) {
      var search = encodeURIComponent(asciify(title).toLowerCase())
      var url = 'http://www.google.com/#q=site:www.reddit.com+' + '&quot;' + search + '&quot;'
      return '<a href="' + url + '" title="Find ' + title + ' on Reddit">' + '<img alt="Reddit" height="16" src="img/reddit.png">' + '</a>'
    }

    var hackernews = function (title) {
      var search = encodeURIComponent(asciify(title).toLowerCase())
      var url = 'http://www.google.com/#q=site:news.ycombinator.com+' + '&quot;' + search + '&quot;'
      return '<a href="' + url + '" title="Find ' + title + ' on Hacker News">' + '<img alt="Hacker News" height="16" src="img/hackernews.png">' + '</a>'
    }

    var stackexchange = function (title) {
      var search = encodeURIComponent(asciify(title).toLowerCase())
      var url = 'http://stackexchange.com/search?q=' + '&quot;' + search + '&quot;'
      return '<a href="' + url + '" title="Find ' + title + ' on Stack Exchange">' + '<img alt="Stack Exchange" height="16" src="img/stackexchange.png">' + '</a>'
    }

    var medium = function (title) {
      var search = encodeURIComponent(asciify(title).toLowerCase())
      var url = 'http://www.google.com/#q=site:medium.com+' + '&quot;' + search + '&quot;'
      return '<a href="' + url + '" title="Find ' + title + ' on Medium">' + '<img alt="Medium" height="16" src="img/medium.png">' + '</a>'
    }

    var forum = function (title) {
      var search = encodeURIComponent(asciify(title).toLowerCase())
      var url = 'http://www.google.com/#q=forum+' + '&quot;' + search + '&quot;'
      return '<a href="' + url + '" title="Find ' + title + ' on forums">' + '<img alt="Forums" height="16" src="img/disqus.png">' + '</a>'
    }

    var wikipedia = function (title, search) {
      var url = 'http://en.wikipedia.org/w/index.php?search=' + search
      return '<a href="' + url + '" title="Find ' + title + ' on Wikipedia">' + '<img alt="Wikipedia" height="16" src="img/wikipedia.png">' + '</a>'
    }

    return this.each(function () {
      if (opts.createLinks) {
        linkifyBooks()
      }
      handleTags()
      if (opts.createLists) {
        handleTagLists()
      }
      if (opts.createAnchors) {
        handleHeaders()
      }
    })
  }

  // Default options
  $.fn.readingList.defaults = {
    // calibre-server host
    calibreHost: window.location.hostname || 'localhost',
    // calibre-server port
    calibrePort: 8080,
    // document body
    body: 'body',
    // whether to use Calibre
    useCalibre: true,
    // whether to create links
    createLinks: true,
    // whether to create lists
    createLists: true,
    // whether to create anchors
    createAnchors: true
  }
}(jQuery))
