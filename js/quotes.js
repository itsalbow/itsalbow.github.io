
var quotes = []; // array for json data to store after ajax call
var oldQuote; // old random number

// dynamic twitter link
$.getScript('http://platform.twitter.com/widgets.js');


// ready
$(document).ready(function(){
    
    // Ajax request
    $.getJSON( 'http://itsalbow.github.io/js/quotes.json', function( data ){
        
        // pull JSON data and save in quotes array
        $.each(data.quotes, function(index) {
            quotes.push(data.quotes[index]);
        });// end loop
    }).done(function(){ console.log( "Be doin thangz." ) }).fail(function(){ console.log( "getJSON failed") });
    // end getJSON
    
	
	// Button Clicked
    $('.btn').click(function( e ) {
        var r = random(oldQuote);
        e.preventDefault();
		var currentQ = quotes[r].quote;
		var currentA = quotes[r].author;
 
        $('#quote-machine').fadeOut(600, function(){
            $(this).fadeIn(1000);
            $('h2').html(currentQ);
            $('h3').html(currentA);
        });
        oldQuote = r; // set old quote to the one just used
		
		tweetLink(currentQ, currentA);
    });// end click
	
	
	$('.twitter-share-button').attr('data-text', $('h2').text() + $('h3').text() +'\n')
        
    
});// end document ready

// random num function
var random = function( old ) {
    var rand = Math.round( Math.random() * 18) + 0;
   
    // recurion to make sure not the same quote
    if( old != rand )
        return rand;
    else
        return random( old );
}// end 

function tweetLink(q, a) {
	$('.twitter-share-button').remove();
	var tweet = $('<a>')
		.attr('href','https://twitter.com/share')
		.attr('data-size', 'large')
		.attr('class', "twitter-share-button")
		.attr('data-related', "twitterapi,twitter")
		.attr('data-count',"none")   
		.attr('id','#tweet')
        .text('Tweet');
		
	$('#tweet-span').prepend(tweet);
	tweet.attr('data-text', q + " " + a + "\n");
	tweet.attr('data-via','Al_Armz');
	tweet.attr('data-hashtags', "freecodecamp");
	tweet.attr('data-url', 'https//itsalbow.github.io/quotes');
	twttr.widgets.load();
}