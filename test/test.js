/* global describe, it, assert, $, md */
var markdown = 'Reading List Example\n' +
    '--------------------\n\n' +
    '- Matthew MacDonald: *HTML5: The Missing Manual* #development\n' +
    '- ~~Erich Gamma & Richard Helm & Ralph Johnson & John Vlissides: *Design Patterns*~~ #development\n' +
    '- Steve Krug: *Don\'t Make Me Think!* #design\n' +
    '- Garr Reynolds: *Presentation Zen* #presentation\n'

var html = md.render(markdown)
var div = $('<div>' + html + '</div>')

describe('Fixtures', function () {
  describe('Markdown', function () {
    it('should be a list with hashtags and strikethrough text', function () {
      assert.equal(markdown,
                   'Reading List Example\n' +
                   '--------------------\n\n' +
                   '- Matthew MacDonald: *HTML5: The Missing Manual* #development\n' +
                   '- ~~Erich Gamma & Richard Helm & Ralph Johnson & John Vlissides: *Design Patterns*~~ #development\n' +
                   '- Steve Krug: *Don\'t Make Me Think!* #design\n' +
                   '- Garr Reynolds: *Presentation Zen* #presentation\n')
    })
  })

  describe('HTML', function () {
    it('should be converted from the Markdown', function () {
      assert.equal(html,
                   '<h2 id="reading-list-example">' +
                   '<a class="header-anchor" href="#reading-list-example" aria-hidden="true">¶</a> ' +
                   'Reading List Example' +
                   '</h2>\n' +
                   '<ul>\n' +
                   '<li>Matthew MacDonald: <em>HTML5: The Missing Manual</em> #development</li>\n' +
                   '<li><s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: <em>Design Patterns</em></s> #development</li>\n' +
                   '<li>Steve Krug: <em>Don’t Make Me Think!</em> #design</li>\n' +
                   '<li>Garr Reynolds: <em>Presentation Zen</em> #presentation</li>\n' +
                   '</ul>\n')
    })
  })

  describe('jQuery element', function () {
    it('should contain the HTML', function () {
      assert.equal(div.html(), html)
    })
  })
})

describe('readinglist.js', function () {
  describe('starRating()', function () {
    it('should handle zero stars ratings', function () {
      assert.equal($.fn.readingList.starRating(0),
                   '<span style="color: rgb(187, 131, 0)" title="0">☆☆☆☆☆</span>')
    })
    it('should handle half star ratings', function () {
      assert.equal($.fn.readingList.starRating(0.5),
                   '<span style="color: rgb(187, 131, 0)" title="0.5">½☆☆☆☆</span>')
    })
    it('should handle one star ratings', function () {
      assert.equal($.fn.readingList.starRating(1),
                   '<span style="color: rgb(187, 131, 0)" title="1">★☆☆☆☆</span>')
    })
    it('should handle one and one half star ratings', function () {
      assert.equal($.fn.readingList.starRating(1.5),
                   '<span style="color: rgb(187, 131, 0)" title="1.5">★½☆☆☆</span>')
    })
    it('should handle four stars ratings', function () {
      assert.equal($.fn.readingList.starRating(4),
                   '<span style="color: rgb(187, 131, 0)" title="4">★★★★☆</span>')
    })
    it('should handle four and a half star ratings', function () {
      assert.equal($.fn.readingList.starRating(4.5),
                   '<span style="color: rgb(187, 131, 0)" title="4.5">★★★★½</span>')
    })
    it('should handle five star ratings', function () {
      assert.equal($.fn.readingList.starRating(5),
                   '<span style="color: rgb(187, 131, 0)" title="5">★★★★★</span>')
    })
  })

  describe('readingList()', function () {
    it('should add links', function () {
      assert.equal(div.readingList({createLists: false}).html(),
                   '<h2 id="reading-list-example">' +
                   '<a class="header-anchor" href="#reading-list-example" aria-hidden="true">¶</a> ' +
                   'Reading List Example' +
                   '</h2>\n' +
                   '<ul>\n' +
                   '<li>Matthew MacDonald: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Matthew MacDonald: HTML5: The Missing Manual">HTML5: The Missing Manual</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#development" title="Development">development</a>' +
                   '</li>\n' +
                   '<li>' +
                   '<s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: Design Patterns">Design Patterns</a>' +
                   '</cite>' +
                   '</s>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;design%20patterns&quot;" title="Find Design Patterns on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;design%20patterns&quot;" title="Find Design Patterns on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#development" title="Development">development</a>' +
                   '</li>\n' +
                   '<li>Steve Krug: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Steve Krug: Don’t Make Me Think!">Don’t Make Me Think!</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#design" title="Design">design</a>' +
                   '</li>\n' +
                   '<li>Garr Reynolds: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen" title="Garr Reynolds: Presentation Zen">Presentation Zen</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;presentation%20zen&quot;" title="Find Presentation Zen on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;presentation%20zen&quot;" title="Find Presentation Zen on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#presentation" title="Presentation">presentation</a>' +
                   '</li>\n' +
                   '</ul>\n')
    })

    it('should create sublists', function () {
      assert.equal(div.readingList({createLists: true}).html().trim(),
                   '<h2 id="reading-list-example">' +
                   '<a class="header-anchor" href="#reading-list-example" aria-hidden="true">¶</a> ' +
                   'Reading List Example' +
                   '</h2>\n' +
                   '<ul>\n' +
                   '<li>Matthew MacDonald: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Matthew MacDonald: HTML5: The Missing Manual">HTML5: The Missing Manual</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#development" title="Development">development</a>' +
                   '</li>\n' +
                   '<li>' +
                   '<s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: Design Patterns">Design Patterns</a>' +
                   '</cite>' +
                   '</s>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;design%20patterns&quot;" title="Find Design Patterns on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;design%20patterns&quot;" title="Find Design Patterns on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#development" title="Development">development</a>' +
                   '</li>\n' +
                   '<li>Steve Krug: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Steve Krug: Don’t Make Me Think!">Don’t Make Me Think!</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#design" title="Design">design</a>' +
                   '</li>\n' +
                   '<li>Garr Reynolds: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen" title="Garr Reynolds: Presentation Zen">Presentation Zen</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;presentation%20zen&quot;" title="Find Presentation Zen on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;presentation%20zen&quot;" title="Find Presentation Zen on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup> #' +
                   '<a class="tag" href="#presentation" title="Presentation">presentation</a>' +
                   '</li>\n' +
                   '</ul>\n' +
                   '<h2 id="development">' +
                   '<a aria-hidden="true" class="header-anchor" href="#development">¶</a>' +
                   'Development' +
                   '</h2>' +
                   '<ul>' +
                   '<li>Matthew MacDonald: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Matthew MacDonald: HTML5: The Missing Manual">HTML5: The Missing Manual</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;html5%3A%20the%20missing%20manual&quot;" title="Find HTML5: The Missing Manual on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual" title="Find HTML5: The Missing Manual on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup>' +
                   '</li>' +
                   '<li>' +
                   '<s>Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Erich Gamma &amp; Richard Helm &amp; Ralph Johnson &amp; John Vlissides: Design Patterns">Design Patterns</a>' +
                   '</cite>' +
                   '</s>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;design%20patterns&quot;" title="Find Design Patterns on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;design%20patterns&quot;" title="Find Design Patterns on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;design%20patterns&quot;" title="Find Design Patterns on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns" title="Find Design Patterns on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup>' +
                   '</li>' +
                   '</ul>' +
                   '<h2 id="design">' +
                   '<a aria-hidden="true" class="header-anchor" href="#design">¶</a>' +
                   'Design' +
                   '</h2>' +
                   '<ul>' +
                   '<li>Steve Krug: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Steve Krug: Don’t Make Me Think!">Don’t Make Me Think!</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;don\'t%20make%20me%20think!&quot;" title="Find Don’t Make Me Think! on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=steve%20krug%20don\'t%20make%20me%20think%20" title="Find Don’t Make Me Think! on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup>' +
                   '</li>' +
                   '</ul>' +
                   '<h2 id="presentation">' +
                   '<a aria-hidden="true" class="header-anchor" href="#presentation">¶</a>' +
                   'Presentation' +
                   '</h2>' +
                   '<ul>' +
                   '<li>Garr Reynolds: ' +
                   '<cite>' +
                   '<a href="http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen" title="Garr Reynolds: Presentation Zen">Presentation Zen</a>' +
                   '</cite>' +
                   '<sup>' +
                   '<a href="http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Amazon.com">' +
                   '<img alt="Amazon.com" src="img/amazon.png" height="16"></a> ' +
                   '<a href="http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Goodreads">' +
                   '<img alt="Goodreads" src="img/goodreads.png" height="16"></a> ' +
                   '<a href="http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on LibraryThing">' +
                   '<img alt="LibraryThing" src="img/librarything.png" height="14"></a> ' +
                   '<a href="http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on WorldCat">' +
                   '<img alt="WorldCat" src="img/worldcat.png" height="16"></a> ' +
                   '<a href="http://www.google.com/?gws_rd=ssl#tbm=bks&amp;q=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Google Books">' +
                   '<img alt="Google Books" src="img/google.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:www.reddit.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Reddit">' +
                   '<img alt="Reddit" src="img/reddit.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:news.ycombinator.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Hacker News">' +
                   '<img alt="Hacker News" src="img/hackernews.png" height="16"></a> ' +
                   '<a href="http://stackexchange.com/search?q=&quot;presentation%20zen&quot;" title="Find Presentation Zen on Stack Exchange">' +
                   '<img alt="Stack Exchange" src="img/stackexchange.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=site:medium.com+&quot;presentation%20zen&quot;" title="Find Presentation Zen on Medium">' +
                   '<img alt="Medium" src="img/medium.png" height="16"></a> ' +
                   '<a href="http://www.google.com/#q=forum+&quot;presentation%20zen&quot;" title="Find Presentation Zen on forums">' +
                   '<img alt="Forums" src="img/disqus.png" height="16"></a> ' +
                   '<a href="http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen" title="Find Presentation Zen on Wikipedia">' +
                   '<img alt="Wikipedia" src="img/wikipedia.png" height="16"></a>' +
                   '</sup>' +
                   '</li>' +
                   '</ul>')
    })
  })
})
