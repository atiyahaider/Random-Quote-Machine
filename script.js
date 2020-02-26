var quote = [];

function getRandomQuote() {
    //get a random background picture
    randomPicture();
  
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        quote = data.shift(); // The data is an array of posts. Grab the first one.
      //  $('#author').html('<span style="background-color: #e6e6e6; color: black">' + quote.title + '</span>');
        
        $("#text").animate( { opacity: 0 }, 300,
                  function() {
                    $(this).animate({ opacity: 1}, 400);
                    $('#text').html(quote.content.substring(3,quote.content.length-5));
                  }
        );

        $("#author").animate( { opacity: 0 }, 300,
                  function() {
                    $(this).animate({ opacity: 1}, 400);
                    $('#author').html(quote.title);
                  }
        );
        
        //update URL for tweet
        updateTweetURL($('#text').text(), $('#author').text());
      }, //success
      cache: false
    } );  //ajax
};


$(document).ready(function() {
  getRandomQuote();
});

$('#new-quote').on('click', getRandomQuote);

function updateTweetURL(content, title){
  var message = encodeURIComponent(content + '-- ' + title);
    // set the Tweet button to link to the proper URL
  $('#tweet-quote').attr('href', "https://twitter.com/intent/tweet?text=" + message);
}

function randomPicture() {
 
  //get a random number from 0 to 83- no. of pics in the collection
  const getRandomNum = () => {
    return Math.floor(Math.random() * 83);
  }
  
  const bgImage = `url('https://source.unsplash.com/collection/162213/${getRandomNum()}')`;
   $('#quote-box').css('background-image', bgImage);
}