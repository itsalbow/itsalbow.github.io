var blue   = '#34495E',
    about  = '#27ae60',
    red    = '#c0392b',
    purple = '#2d2d2d',
    brand = 'nav.navbar.navbar-default.navbar-fixed-top a',
    icon  = 'nav.navbar.navbar-default.navbar-fixed-top .icon-bar',
    iconB = 'button.navbar-toggle.collapsed'

$(document).ready(function()
{
  $('#fullpage').fullpage
  ({
    sectionColor: [],  
    anchors: ['home', 'about', 'portfolio', 'contact'],
    menu: '#menu',
    css3: true,
    scrollOverflow: true,
    navigation: true,
    navigationPosition:'left',
    onLeave: 
    function( index, nextIndex )
    {
      setActive( index, nextIndex );
    }
  });
  
  $('.nav a').on('click', function()
  {
		if($('.navbar-toggle').css('display') !='none')
    	$('button.navbar-toggle').click();
  });
  
  $('#myButton').click(function()
  {
    console.log("call to action clicked");
    var $this = $(this);
    $this.removeClass();
    $this = reset($this);
    $this.addClass("callToAction hvr-sweep-to-bottom");
  });
  
  
  
});

// Set new active
function setActive( from, to )
{
  var comingFrom, goingTo; 
  // get current page link id
  switch( from ) 
  {
    case 1: 
      comingFrom = '#homeLink';
      break;
    case 2: 
      comingFrom = '#aboutLink';
      break;
    case 3:
      comingFrom = '#portfolioLink';
      break;
    case 4:
      comingFrom = '#contactLink';
      break;     
  } // end switch

  // get destination link id
  switch( to ) 
  {
    case 1: 
      goingTo = '#homeLink';
      $( '#navbar a' ).css( 'color', blue );
      $( brand ).css( 'color', blue );
      $( iconB ).css( 'background-color', blue );
      break;
    case 2: 
      goingTo = '#aboutLink';
      $( '#navbar a' ).css( 'color', about );
      $( brand ).css( 'color', about );
      $( iconB ).css( 'background-color', about );
      break;
    case 3:
      goingTo = '#portfolioLink';
      $( '#navbar a' ).css( 'color', red );
      $( brand ).css( 'color', red );
      $( iconB ).css( 'background-color', red );
      break;
    case 4:
      goingTo = '#contactLink';
      $( '#navbar a' ).css( 'color', purple );
      $( brand ).css( 'color', purple );
      $( iconB ).css( 'background-color', purple );
      break;     
  } // end switch

  $( comingFrom ).removeClass( 'active' + from );
  $( goingTo ).addClass( 'active' + to );   
}// end active method

// reset animaton
function reset($elem) 
{
  $elem.before($elem.clone(true));
  var $newElem = $elem.prev();
  $elem.remove();
  return $newElem;
} // end reset