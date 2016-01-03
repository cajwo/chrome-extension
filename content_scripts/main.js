/*global CommentParser */

var $comments = $('.commentarea > .sitetable > .thing');
var op = $('#siteTable').find('a.author')[0];

window.parser = new CommentParser($comments, $(op).text());
window.parser.parse();
