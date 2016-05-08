Reading list
============

A [pandoc](http://pandoc.org/) template for writing reading lists in
[Markdown](http://daringfireball.net/projects/markdown/syntax).

Description
-----------

Book entries are linkified with references to the local
[Calibre](http://calibre-ebook.com/) library, as well as
[Amazon.com](http://www.amazon.com/),
[Goodreads](http://www.goodreads.com/),
[LibraryThing](http://www.librarything.com/),
[WorldCat](http://www.worldcat.org/),
[Google Books](http://books.google.no/) and
[Wikipedia](http://en.wikipedia.org/wiki/Main_Page).

Furthermore, #hashtags may be used to group books into sub-lists.

Example
-------

Reading list in Markdown:

    - Matthew MacDonald: *HTML5: The Missing Manual* #development
    - ~~Erich Gamma & Richard Helm & Ralph Johnson & John Vlissides: *Design Patterns*~~ #development
    - Steve Krug: *Don't Make Me Think!* #design
    - Garr Reynolds: *Presentation Zen* #presentation

How it is rendered as HTML:

> **Development**
>
> -   Matthew MacDonald: *[HTML5: The Missing Manual](http://localhost:8080/browse/search?query=matthew%20macdonald%20html5%20the%20missing%20manual)* <sup>[[a](http://www.amazon.com/s/?field-keywords=matthew%20macdonald%20html5%20the%20missing%20manual)] [[g](http://www.goodreads.com/search?query=matthew%20macdonald%20html5%20the%20missing%20manual)] [[l](http://www.librarything.com/search.php?term=matthew%20macdonald%20html5%20the%20missing%20manual)] [[wc](http://www.worldcat.org/search?q=matthew%20macdonald%20html5%20the%20missing%20manual)] [[gb](http://www.google.com/?gws_rd=ssl#tbm=bks&q=matthew%20macdonald%20html5%20the%20missing%20manual)] [[w](http://en.wikipedia.org/w/index.php?search=matthew%20macdonald%20html5%20the%20missing%20manual)]</sup>
> -   ~~Erich Gamma & Richard Helm & Ralph Johnson & John Vlissides: *[Design Patterns](http://localhost:8080/browse/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)*~~ <sup>[[a](http://www.amazon.com/s/?field-keywords=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)] [[g](http://www.goodreads.com/search?query=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)] [[l](http://www.librarything.com/search.php?term=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)] [[wc](http://www.worldcat.org/search?q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)] [[gb](http://www.google.com/?gws_rd=ssl#tbm=bks&q=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)] [[w](http://en.wikipedia.org/w/index.php?search=erich%20gamma%20richard%20helm%20ralph%20johnson%20john%20vlissides%20design%20patterns)]</sup>
>
> **Design**
>
> -   Steve Krug: *[Don't Make Me Think!](http://localhost:8080/browse/search?query=steve%20krug%20don%27t%20make%20me%20think%20)* <sup>[[a](http://www.amazon.com/s/?field-keywords=steve%20krug%20don%27t%20make%20me%20think%20)] [[g](http://www.goodreads.com/search?query=steve%20krug%20don%27t%20make%20me%20think%20)] [[l](http://www.librarything.com/search.php?term=steve%20krug%20don%27t%20make%20me%20think%20)] [[wc](http://www.worldcat.org/search?q=steve%20krug%20don%27t%20make%20me%20think%20)] [[gb](http://www.google.com/?gws_rd=ssl#tbm=bks&q=steve%20krug%20don%27t%20make%20me%20think%20)] [[w](http://en.wikipedia.org/w/index.php?search=steve%20krug%20don%27t%20make%20me%20think%20)]</sup>
>
> **Presentation**
>
> -   Garr Reynolds: *[Presentation Zen](http://localhost:8080/browse/search?query=garr%20reynolds%20presentation%20zen)* <sup>[[a](http://www.amazon.com/s/?field-keywords=garr%20reynolds%20presentation%20zen)] [[g](http://www.goodreads.com/search?query=garr%20reynolds%20presentation%20zen)] [[l](http://www.librarything.com/search.php?term=garr%20reynolds%20presentation%20zen)] [[wc](http://www.worldcat.org/search?q=garr%20reynolds%20presentation%20zen)] [[gb](http://www.google.com/?gws_rd=ssl#tbm=bks&q=garr%20reynolds%20presentation%20zen)] [[w](http://en.wikipedia.org/w/index.php?search=garr%20reynolds%20presentation%20zen)]</sup>

Usage
-----

The template requires [pandoc](http://pandoc.org/) to be installed.
Also, [Calibre](http://calibre-ebook.com/)'s web server should be
configured to run on port 8080 (see the variables `calibreHost` and
`calibrePort` in `custom.js`).

Edit `example.md` and add or remove book entries. Then run the
`compile.sh` script from the command line (or `compile.bat` on
Windows):

    $ ./compile.sh

Finally, open `example.html` to view the result.

To do
-----

The linkification is implemented with a bit of jQuery in `custom.js`.
It could be extended with parameters for additional websites.

One could also add syntax for user ratings (perhaps a parenthetical
number at the end of the line?).

Philosophy
----------

A good resource on the topic of reading well is
*[How to Read a Book](http://www.amazon.com/dp/0671212095/)* by
Mortimer J. Adler and Charles Van Doren.

Alternatives
------------

Websites:

-   [Amazon.com: Your Lists](http://www.amazon.com/gp/lists/homepage.html)
-   [Goodreads Listopia](http://www.goodreads.com/list)
-   [LibraryThing Lists](http://www.librarything.com/lists)

Apps:

-   [Stacks](https://itunes.apple.com/us/app/stacks-a-modern-reading-list/id734184669)
-   [Reading List](https://itunes.apple.com/us/app/reading-list-keep-track-your/id1050466668)
