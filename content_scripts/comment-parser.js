var CommentParser = function ($comments, op) {
    // Save the $comments and op as state!
    this.$comments = $comments;
    this.op = op;
};

//helper function for removing chain classes 
var reset = function ($comment) {
  if ($comment.hasClass('answered-chain')) {
    $comment.removeClass('answered-chain');
  }
  if ($comment.hasClass('unanswered-chain')) {
    $comment.removeClass('unanswered-chain');
  }
}

// parse and filter implementations go here.
CommentParser.prototype.parse = function (username) {
  var found; //check if username was found

  if (username === undefined) { //parse with OP 
    username = this.op;
    console.log(username);
  }

  //array of authors
  for (var i = 0; i < this.$comments.length; i++) {
    var $topComment = $(this.$comments[i]);
    var $authors = $topComment.find('a.author');
    found = false; //reset whether username was found 

    for (var j = 0; j < $authors.length; j++) {
      var author = $($authors[j]).text();

      if (username === author) { 
        reset($topComment); //remove unanswered-chain and answered-chain classes
        //username found in chain and chain doesn't have answered class yet
        $topComment.addClass('answered-chain');
        found = true;
      }
    }
    if (found) {
      continue; //move on to next top level comment
    }
    if (!found) {
      reset($topComment);
     //no username in chain
      $topComment.addClass('unanswered-chain');
    }
  }

  this.filter(true);
};

CommentParser.prototype.filter = function (notVisible) {
  var $comment;
  for (var i = 0; i < this.$comments.length; i++) {
    $comment = $(this.$comments[i]);
    if (notVisible) {
      if ($comment.hasClass('unanswered-chain')) { //unanswered chains should be hidden
        $comment.css('display', 'none');
      } else if ($comment.hasClass('answered-chain')) {
        $comment.css('display', 'block');
      }
    } else if (!notVisible && $comment.hasClass('unanswered-chain')) {
      $comment.css('display', 'block');
    }
  }
};
