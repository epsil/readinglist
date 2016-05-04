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
  $('body').append(header);
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

function linkifyTag(tag) {
  var html = $('body').html();
  var link = ' #<a href ="' + tag + '">' + tagId(tag) + '</a>';
  html = html.replace(' ' + tag, link);
  $('body').html(html);
}

function handleTag(tag) {
  tag = tag.trim();
  var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi;
  var tagRegEx2 = /(^|\s|\(|>)#<a.+<\/a>/gi;
  var li = $('li:contains(' + tag + ')').filter(function(index) {
    return $(this).html().match(' ' + tag);
  });
  var li2 = li.html().replace(tagRegEx, '').replace(tagRegEx2, '');
  li2 = $('<li>' + li2 + '</li>');
  var ul = findList(tag);
  if(ul.find('li:contains(' + li2.text().trim() + ')').length == 0) {
    ul.append(li2);
  }
  linkifyTag(tag);
}

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
      .replace(/[\u201c\u201d]/ig, '')
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

  // Tags
  var el = $("body");
  var content = el.html();
  var tagRegEx = /(^|\s|\(|>)#((\w|[-&\u00A1-\uFFFF])+)/gi;
  var matches = content.match(tagRegEx);

  $.each(matches, function() {
    handleTag(this);
  });
});
