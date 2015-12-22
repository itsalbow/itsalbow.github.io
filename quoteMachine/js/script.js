
var quotes = []; // array for json data to store after ajax call
var oldQuote; // old random number


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
    
    $('.btn').click(function( e ) {
        var r = random(oldQuote);
        e.preventDefault();
 
        $('#quote-machine').fadeOut(600, function(){
            $(this).fadeIn(1000);
            $('h2').html(quotes[r].quote);
            $('h3').html(quotes[r].author);
        });
        
        oldQuote = r;
    });// end click
        
    
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
