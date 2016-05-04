A [pandoc](http://pandoc.org/) template for writing reading lists in
[Markdown](http://daringfireball.net/projects/markdown/syntax).

Book entries are linkified with references to the local
[Calibre](http://calibre-ebook.com/) library, as well as
[Amazon.com](http://www.amazon.com/),
[Goodreads](http://www.goodreads.com/),
[LibraryThing](http://www.librarything.com/),
[WorldCat](http://www.worldcat.org/),
[Google Books](http://books.google.no/) and
[Wikipedia](http://en.wikipedia.org/wiki/Main_Page).

Furthermore, #hashtags may be used to group books into sub-lists.

Usage
-----

Edit `example.md` and add or remove book entries.

Then run the `compile.sh` script from the command line (or
`compile.bat` on Windows):

    $ ./compile.sh

Finally, open `example.html` to see the result.

To do
-----

The linkification is implemented with a bit of jQuery in `custom.js`.
It could be extended with parameters for additional websites.
