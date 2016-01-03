$(function () { 

    // Event listening code goes here.
    // Be sure to check popup.html to learn the `id` attributes of the apply/remove filter
    // buttons and the username input box - you'll need those to listen for events!

    // HINT: You can't access window.parser here. You'll have to use chrome.tabs.executeScript
    // to call window.parser.filter and window.parser.parse.
    
    $('#username').on('keydown', function (e) {
        chrome.tabs.executeScript({
          code: 'window.parser.parse(' + $('#username').val() + ');'
        });
    });

    $('#filter-off').click(function (e) {
      chrome.tabs.executeScript({
        code: 'window.parser.filter(false);'
      });
    });

    $('#filter-on').click(function (e) {
      chrome.tabs.executeScript({
        code: 'window.parser.filter(true);'
      });
    });

});
