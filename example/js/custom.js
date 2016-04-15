$(function() {
  // calibre-server host
  var calibreHost = window.location.hostname || "localhost";
  // calibre-server port
  var calibrePort = 8080;
  $("li em").each(function() {
    // construct search string for book
    var em = $(this);
    var prev = this.previousSibling;
    var searchString = prev ? prev.nodeValue : "";
    searchString += em.text();
    searchString = searchString.replace(/:/ig, '')
      .replace(/[\u2018\u2019]/ig, "'")
      .replace(/[-,.:;&!?]/ig, " ")
      .replace(/[ ]+/ig, " ")
      .toLowerCase();
    // add Amazon.com link (skip existing links)
    if(!em.find('a').length) {
      em.wrapInner('<a href="' + "http://www.amazon.com/s/" +
                   "?field-keywords=" + searchString + '"></a>');
    }
    // add calibre-server link
    var li = em.parent().is('del') ? em.parent() : em;
    li.after("<sup>[" + '<a href="' + "http://" +
             calibreHost + ":" + calibrePort +
             "/browse/search?query=" + searchString + '">' +
             "calibre" + "</a>" + "]</sup>");
  });
});
