var workTime = 25;
var breakTime = 5;
var i = 0;
var timer = 0;
var clickable =  true;

// ready
$(document).ready(function(){
	
	// Button Click
	$('a').click(function(e){
		e.preventDefault();
		var id = e.target.id; // save id

	/*******  Check Buttons *******/
		// Start
		if(id === 'start'){
			$('#start').text('Stop');
			$('#start').prop('id', 'stop');
			$('#work-timer').animate({ 
				marginLeft: "-=70px",
			}, 1000 );
			$('#break-timer').animate({ 
				marginLeft: "-=65px",
			}, 1000 ); 
			$('a.symbol').animate({ opacity: 0 });
			$('a.symbol').css('cursor', 'default');
			clickable = false;
			// Run clock
			tick(true);
		}// end start
		
		// Stop
		else if(id === 'stop'){
			$('#stop').text('Start');
			$('#stop').prop('id', 'start');
			$('#work-timer').animate({ 
				marginLeft: "+=70px",
			}, 1000 );
			$('#break-timer').animate({ 
				marginLeft: "+=65px",
			}, 1000 ); 
			$('a.symbol').animate({ opacity: 1 }, 1600);
			$('a.symbol').css('cursor', 'pointer');
			clickable = true;
			// Stop clock
			tick(false);
		}// end stop button
		
		// Plus buttons 
		else if(id === 'work-plus' && clickable)  // plus
			workTime += 1;
		else if(id === 'work-minus' && clickable) // Minus
			workTime = workTime > 1 ? workTime - 1 : 1;
		// end plus buttons
		
		// Break buttons
		else if(id === 'break-plus' && clickable)  // Plus
			breakTime += 1;
		else if(id === 'break-minus' && clickable) // Minus
			breakTime = breakTime > 1 ? breakTime - 1 : 1;
		// end break buttons

		// Update page
		if(clickable){
			$('#mins').text(format(workTime));
			$('#break-timer').text(format(breakTime));
			$('#work-timer').text(format(workTime));
		}
	});
	
});

/****** Functions ******/

// Format number to 2 digits
var format = function(n){
	return (n < 10 ? "0" : "") + n;
}

// Tick function
function tick(bool){
	var seconds = 59;
	var minutes = workTime - 1;
	var type = $('#type').text();
	
	// Run once every second
	if(bool){
		timer = setInterval(function(){ 
			// Time ran out in work
			if(minutes === 0 && seconds === 0 && type === 'WORK'){
				minutes = breakTime - 1;
				seconds = 59;
				type = 'BREAK';
				$('#type').fadeOut(300);
				$('#type').text(type);
				$('#type').fadeIn(300);
  				var audio = document.getElementsByTagName("audio")[0];
  audio.play();
			}// end if
			// Time ran out in break
			else if(minutes === 0 && seconds === 0 && type === 'BREAK'){
				minutes = workTime - 1;
				seconds = 59;
				type = 'WORK';
				$('#type').fadeOut(300);
				$('#type').text(type);
				$('#type').fadeIn(300);
				var audio = document.getElementsByTagName("audio")[1];
  audio.play();
			}// end if
			else {
				seconds = seconds >= 0 ? seconds: 59;
				minutes = seconds === 0 ? minutes - 1 : minutes;
			}
			
			
			
			
			$('#mins').text(format(minutes));
				$('#secs').text(format(seconds));
				seconds--;
			
			
		}, 1000);
	}
	else {
		clearInterval(timer);
		$('#mins').text(format(workTime));
		$('#secs').text(format(0));
		$('#type').text('WORK');
		return;
	}
}