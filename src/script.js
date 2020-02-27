$(document).ready(function() {
  getRandomQuote();
});

function getRandomQuote() {
    //get a random background picture
    randomPicture();
  
    let proxy = 'https://cors-anywhere.herokuapp.com/'; //add this to the fetch URL to get around CORS problem
    let url = 'https://api.forismatic.com/api/1.0/?';
    $.ajax({
      url: proxy + url,
      method: 'GET',
      data: {
        'method': 'getQuote',
        'lang': 'en',
        'format': 'json'
      }
    })
      .done(function(quote) {
      console.log(quote)
          $("#text").animate( { opacity: 0 }, 300,
                    function() {
                      $(this).animate({ opacity: 1}, 400);
                      $('#text').html(quote.quoteText);
                    });

          $("#author").animate( { opacity: 0 }, 300,
                    function() {
                      $(this).animate({ opacity: 1}, 400);
                      $('#author').html(quote.quoteAuthor);
                    });

          //update URL for tweet
          updateTweetURL(quote.quoteText, quote.quoteAuthor);
      })
      .fail(function(xhr, status, error) {
        console.log('Failed to get data: ' + status);
      });
};

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


