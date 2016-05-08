// calibre-server host
var calibreHost = window.location.hostname || "localhost";
// calibre-server port
var calibrePort = 8080;

function tagId(tag) {
  return tag.replace('#', '');
}

function tagName(tag) {
  var id = tagId(tag);
  id = id.replace('-', ' ');
  return id[0].toUpperCase() + id.slice(1);
}

function findHeader(tag) {
  var header = $(tag);
  if(header.length == 0) {
    header = $('h1, h2, h3, h4, h5, h6').filter(function(index) {
      return $(this).text().trim() == tagName(tag);
    });
    if(header.length > 0) {
      header.attr('id', tagId(tag));
    }
  }
  if(header.length == 0) {
    header = createHeader(tag);
  }
  return header;
}

var body = 'body';
function createHeader(tag) {
  var header = $('<h2 id ="' + tagId(tag) + '">' + tagName(tag) + '</h2>');
  $(body).append(header);
  return header;
}

function findList(tag) {
  var header = findHeader(tag);
  var ul = header.next();
  if(ul.length == 0 || ul[0].tagName != 'UL') {
    ul = createList(tag);
  }
  return ul;
}

function createList(tag) {
  var header = findHeader(tag);
  var ul = $('<ul>');
  header.after(ul);
  return ul;
}

function linkifyTag(tag, el) {
  var html = el.html();
  var link = ' #<a class="tag" href ="' + tag + '">' + tagId(tag) + '</a>';
  html = html.replace(' ' + tag, link);
  el.html(html);
}

function handleTagList(el) {
  var tag = el.attr('href');
  var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi;
  var tagRegEx2 = /(^|\s|\(|>)#<a.+<\/a>/gi;
  var li = el.parent();
  var li2 = li.html().replace(tagRegEx, '').replace(tagRegEx2, '');
  li2 = $('<li>' + li2 + '</li>');
  var ul = findList(tag);
  if(ul.find('li:contains(' + li2.text().trim() + ')').length == 0) {
    ul.append(li2);
  }
}

function handleTagLists() {
  $('.tag').each(function() {
    handleTagList($(this));
  });
}

function handleTags(el) {
  var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi;
  var tags = el.html().match(tagRegEx);
  if(tags) {
    $.each(tags, function() {
      var tag = this.trim();
      linkifyTag(tag, el);
    });
  }
}

function handleRating(el) {
  var ratingRegEx = /[(]([0-9.]+)(?:\/([0-9.]+))?[)]$/i;
  // ratingRegEx = /([0-9.]+)/gi;
  var txt = el.text().trim();
  var matches = txt.match(ratingRegEx);
  if(matches) {
    var rating = parseFloat(matches[1]);
    var total = parseFloat(matches[2] || "5.0");
    rating = rating / total * 5.0;
    var html = el.html();
    html = html.replace(ratingRegEx, starRating(rating));
    el.html(html);
  }
}

function starRating(rating) {
  var blackStar = '\u2605';
  var whiteStar = '\u2606';
  var str = '';
  var i;
  for(i = 0; i < Math.floor(rating); i++) {
    str += blackStar;
  }
  for(i = 0; i < 5 - Math.floor(rating); i++) {
    str += whiteStar;
  }
  return '<span style="color: rgb(187, 131, 0)" title="' +
    rating + '">' + str + '</span>';
}

$(function() {
  // Calibre
  $("li em").each(function() {
    // construct search string for book
    var em = $(this);
    var prev = this.previousSibling;
    var searchString = prev ? prev.nodeValue : "";
    searchString += em.text();
    searchString = searchString.replace(/:/ig, '')
      .replace(/[\u2018\u2019]/ig, "'")
      .replace(/[\u201c\u201d]/ig, '')
      .replace(/[-,.:;&!?]/ig, " ")
      .replace(/[ ]+/ig, " ")
      .toLowerCase();
    searchString = encodeURIComponent(searchString);
    // add links
    var calibreUrl = "http://" + calibreHost + ":" + calibrePort + "/browse/search?query=" + searchString;
    var amazonUrl = "http://www.amazon.com/s/" + "?field-keywords=" + searchString;
    var amazonLink = '<a href="' + amazonUrl + '">' + '<img height="16" src="img/amazon.png">' + '</a>';
    var goodreadsUrl = "http://www.goodreads.com/search?query=" + searchString;
    var goodreadsLink = '<a href="' + goodreadsUrl + '">' + '<img height="16" src="img/goodreads.png">' + '</a>';
    var librarythingUrl = "http://www.librarything.com/search.php?term=" + searchString;
    var librarythingLink = '<a href="' + librarythingUrl + '">' + '<img height="14" src="img/librarything.png">' + '</a>';
    var googleUrl = "http://www.google.com/?gws_rd=ssl#tbm=bks&q=" + searchString;
    var googleLink = '<a href="' + googleUrl + '">' + '<img height="16" src="img/google.png">' + '</a>';
    var worldcatUrl = "http://www.worldcat.org/search?q=" + searchString;
    var worldcatLink = '<a href="' + worldcatUrl + '">' + '<img height="16" src="img/worldcat.png">' + '</a>';
    var wikipediaUrl = "http://en.wikipedia.org/w/index.php?search=" + searchString;
    var wikipediaLink = '<a href="' + wikipediaUrl + '">' + '<img height="16" src="img/wikipedia.png">' + '</a>';
    if(!em.find('a').length) {
      em.wrapInner('<a href="' + calibreUrl + '"></a>');
    }
    var book = em.parent().is('del') ? em.parent() : em;
    book.after('<sup>' + amazonLink + " " +
               goodreadsLink + " " +
               librarythingLink + " " +
               worldcatLink + " " +
               googleLink + " " +
               wikipediaLink + '</sup>');

    // Tags
    var li = em.parent().is('del') ? em.parent().parent() : em.parent();
    handleTags(li);
    handleRating(li);
  });
  handleTagLists();
});
