A [pandoc](http://pandoc.org/) template for writing reading lists in
[Markdown](http://daringfireball.net/projects/markdown/syntax). Book
entries are linkified with references to
[Amazon.com](http://www.amazon.com/) and the local
[Calibre](http://calibre-ebook.com/) library.

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
It could be extended to include
[Goodreads](http://www.goodreads.com/),
[LibraryThing](http://www.librarything.com/), etc.
