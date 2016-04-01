$(document).ready(function() {

  var timeStamp = function() {return Math.floor(Date.now()/1000);};

  if (localStorage.getItem('tweetList')) {
    var serverList = localStorage.getItem('tweetList').split(',');
    idList = serverList;} else {idList = [];}

if (idList.length) {
    for (var i=0; i<idList.length; i++) {
      var currentId = idList[i];
      var currentItem = JSON.parse(localStorage.getItem(currentId));
  $('#stream').prepend('<div class="tweet" id="' + currentItem.tweetId + '"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">BKing</strong><span class="username">@tasty</span><p class="tweet-text">' + currentItem.tweetText + '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="time">' + '<p><span data-livestamp="' + currentItem.tweetTime + '"></span></p>' + '</div></div>');
    }
  }

  // $('#testEdit').on('click', function() {
    // var currentId = IDNUMBER;
    // var currentItem = JSON.parse(localStorage.getItem(currentId));
    // localStorage.removeItem(IDNUMBER);
    // var currentList = JSON.parse(localStorage.getItem(currentId));
    // localStorage.removeItem('tweetList');
    // idList.splice(idList.indexOf(448828),1);
    // localStorage.setItem('tweetList', idList);
    //allows for tweets to be edited by removing, adding properties, then adding back with same id number, will not update text without refresh, but useful for adding/toggling props
    // delete currentItem.moreass;
    // currentItem.TESTER = 'ideazz';
    // localStorage.setItem(currentId, JSON.stringify(currentItem));
  // });

  //on textarea focus it will expand height and show tweet controls
  $('textarea').focus(function() {
    $(this).animate({height: '6em'}, 400);
    $(this).siblings('#tweet-controls').fadeIn();
  });

  //count characters, disable button when too many characters are in, disable button when no characters are typed in, change to red when <10 remaining
  $('#tweet-submit').attr('disabled', 'disabled');
  $('textarea').on('keyup', function() {
    var charCount = 140 - $('textarea.tweet-compose').val().length;
    $('#char-count').text(charCount);

    if (charCount === 140) {
      $('#tweet-submit').attr('disabled', 'disabled');
    } else if (charCount > 10 && charCount < 140) {
      $('#char-count').css({color: '#999'});
      $('#tweet-submit').removeAttr('disabled');
    } else if (charCount >= 0 && charCount <= 10) {
      $('#char-count').css({color: 'red'});
      $('#tweet-submit').removeAttr('disabled');
    } else  if (charCount < 0) {
      $('#char-count').css({color: 'red'});
      $('#tweet-submit').attr('disabled', 'disabled');
      }
  });

//grab fullname, username, and tweet text when the reply button is clicked, could be used to set up a reply thing
  $('.action-retweet').parent().on('click', function() {
    var fullName = $($(this).parents()[2]).find('.fullname').text();
    var userName = $($(this).parents()[2]).find('.username').text();
    var tweetText = $($(this).parents()[2]).find('.tweet-text').text();
  });

//shrink textarea and fade out tweet controls on blur
  $('textarea').blur(function() {
    $(this).animate({height: '2.5em'}, 400);
    $('#tweet-controls').fadeOut();
  });

var newTweet = function(tweetText, timestamp) {
  var tweetIdString = timestamp.toString();
  idList.push(tweetIdString);
  localStorage.setItem('tweetList', idList);
  localStorage.setItem(timestamp, JSON.stringify({tweetText: tweetText, tweetTime: timestamp, tweetId: timestamp}));
  $('#char-count').text('140');
  return ('<div class="tweet" id="' + timestamp + '"><div class="content"><img class="avatar" src="img/alagoon.jpg" /><strong class="fullname">BKing</strong><span class="username">@tasty</span><p class="tweet-text">' + tweetText + '</p><div class="tweet-actions"><ul><li><span class="icon action-reply"></span> Reply</li><li><span class="icon action-retweet"></span> Retweet</li><li><span class="icon action-favorite"></span> Favorite</li><li><span class="icon action-more"></span> More</li></ul></div><div class="time">' + '<p><span data-livestamp="' + timestamp + '"></span></p>' + '</div></div>');
  };

  //prepend tweet, empty tweet box if successful, hide tweet actions on new tweet, and also the actions to show on hover over
  $('.button').on('click', function() {
    //prepend new tweet
    $('#stream').prepend(newTweet($('textarea.tweet-compose').val(), timeStamp()));
    //clear tweet area
    $('textarea.tweet-compose').val('');
    //allows tweet actions on new post to show on mouseenter like for other posts
    $('.tweet').mouseenter(function() {
      $(this).find('.tweet-actions').slideDown();
    });
    $('.tweet').mouseleave(function() {
      $(this).find('.tweet-actions').slideUp();
    });
  });

  //allow tweet actions to be shown on hover of tweets in steam
  $('.tweet').mouseenter(function() {
    $(this).find('.tweet-actions').slideDown();
  });

  $('.tweet').mouseleave(function() {
    $(this).find('.tweet-actions').slideUp();
  });

});
