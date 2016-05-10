// calibre-server host
var calibreHost = window.location.hostname || "localhost";
// calibre-server port
var calibrePort = 8080;
// document body
var body = '.container';
// whether to create lists
var createLists = true;

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
  var link = ' #<a class="tag" href ="' + tag + '" title="' + tagName(tag) + '">' + tagId(tag) + '</a>';
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

function searchString(search) {
  search = search.replace(/:/ig, '')
    .replace(/[\u2018\u2019]/ig, "'")
    .replace(/[\u201c\u201d\u2026]/ig, '')
    .replace(/[-,:;&!?#]/ig, " ")
    .replace(/\. /ig, " ")
    .replace(/[ ]+/ig, " ")
    .toLowerCase();
  return encodeURIComponent(search);
}

function calibre(title, search) {
  var url = "http://" + calibreHost + ":" + calibrePort + "/browse/search?query=" + search;
  return '<a href="' + url + '" title="' + title + '"></a>';
}

function amazon(title, search) {
  var url = "http://www.amazon.com/s/" + "?field-keywords=" + search;
  return '<a href="' + url + '" title="Find ' + title + ' on Amazon.com">' + '<img height="16" src="img/amazon.png">' + '</a>';
}

function goodreads(title, search) {
  var url = "http://www.goodreads.com/search?query=" + search;
  return '<a href="' + url + '" title="Find ' + title + ' on Goodreads">' + '<img height="16" src="img/goodreads.png">' + '</a>';
}

function librarything(title, search) {
  var url = "http://www.librarything.com/search.php?term=" + search;
  return '<a href="' + url + '" title="Find ' + title + ' on LibraryThing">' + '<img height="14" src="img/librarything.png">' + '</a>';
}

function google(title, search) {
  var url = "http://www.google.com/?gws_rd=ssl#tbm=bks&q=" + search;
  return '<a href="' + url + '" title="Find ' + title + ' on Google Books">' + '<img height="16" src="img/google.png">' + '</a>';
}

function worldcat(title, search) {
  var url = "http://www.worldcat.org/search?q=" + search;
  return '<a href="' + url + '" title="Find ' + title + ' on WorldCat">' + '<img height="16" src="img/worldcat.png">' + '</a>';
}

function wikipedia(title, search) {
  var url = "http://en.wikipedia.org/w/index.php?search=" + search;
  return '<a href="' + url + '" title="Find ' + title + ' on Wikipedia">' + '<img height="16" src="img/wikipedia.png">' + '</a>';
}

function processList() {
  $("li em").each(function() {
    // construct search string for book
    var em = $(this);
    var prev = this.previousSibling;
    var author = prev ? prev.nodeValue : "";
    var title = em.text();
    var book = author + title;
    // add links
    var search = searchString(book);
    if(!em.find('a').length) {
      em.wrapInner(calibre(book, search));
    }
    var book = em.parent().is('del') ? em.parent() : em;
    book.after('<sup>' + amazon(title, search) + " " +
               goodreads(title, search) + " " +
               librarything(title, search) + " " +
               worldcat(title, search) + " " +
               google(title, search) + " " +
               wikipedia(title, search) + '</sup>');

    // Tags
    var li = em.parent().is('del') ? em.parent().parent() : em.parent();
    handleTags(li);
    handleRating(li);
  });
  if(createLists) {
    handleTagLists();
  }
}

$(function() {
  processList();
});
