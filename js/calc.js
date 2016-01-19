
// Alec Arnstrong

var input;
var total = 0;
var sub = "";
var str = "";
var hitEquals = false;

function DivideByZeroException() {}// divid by zero exception

// Document Ready
$( document ).ready( function() {

	// Button Listener
	$('li').click( function () {
		// Save input
		input = $(this).text(); 
		console.log(input);
		try{
			switch( input ){
				case 'AC': // All Clear
					total = 0;
					sub = "";
					str = "";
					$('#bot').html("&nbsp")
					$('#top').text('Total Reset');
					hitEquals = false;
					break;

				case 'CE': // Clear last
					str = str.substring(0, str.length - 1);
					if(str.length >= 1){
						$('#bot').text(str);
					} else {
						$('#bot').html("&nbsp");
					}
					break;	
								
				case '=': // Equals
					if(str !== ''){
						sub += str;
						total = eval(sub);
						
						if(total === Infinity){
							throw new DivideByZeroException();
						}
						
						sub = total.toString();
						$('#top').text(total);
						$('#bot').html("&nbsp");
						str = " ";
						hitEquals = true;
					} else {
						alert("Enter an equation first");
					}
					break;
					
				case '\u00f7': // Change divide
					updateTotal('/','\u00f7');
					break;
					
				case '\u00d7': // Change multiply
					updateTotal('*','\u00d7');
					break;
					
				case '-': // Minus
				case '+': // Plus
					updateTotal(input);
					break;
					
				case '.': // decismal
					if(str.index('.') < 0){
						str += input;
					}
					break;
										
				case '%': // Get percentage of current sub-total
					if(str !== "" && str !== " "){ // if no data entered
						str = (eval(str) / 100).toString();
						$('#bot').text(str);
					} else {
						alert("Enter a number and then press the % button");
					}// end else			
					break;
				case '.':
					if(str.indexOf('.') > 0){
						break;
					}
				default: // All Number buttons and decimal button
					if(hitEquals === true && sub.indexOf(" ") < 0 ){
						total = 0;
						sub = "";
						$('#top').text('Total Reset');
						str += input;
						hitEquals = false;
					} else {
						str += input;
					}// end else
					
					$('#bot').text(str);
					break;
			}// end switch
		} catch( ex ) {
			if( ex instanceof DivideByZeroException) {
				alert("Cannot divide by zero");
			} else {
				console.log(sub);
			}// end else
			$('#bot').text('Error');
			$('#top').text('Total Reset');
			sub = "";
			str = "";
			total = 0;
		}// end try catch
	});	// end click
});// end ready

// Update total
function updateTotal(operator, mathCode){
	var op = operator;
	var code = mathCode;
	if(!code) code = ''; // if mathCode wasn't sent
	
	// if doing math
	if(str !== ""){ 
		sub += str; // append string to sub total
		total = eval(sub); // evaluate current sub-total
		if(total === Infinity){
			throw new DivideByZeroException();
		}// end if
	} else { // changing operator
		sub = sub.substring(0, sub.length -2); // cut off the old operator
	}// end else
	
	sub += " " + op + " "; // append math operator
	str = "";// reset string
		
	// Display
	code === '' && $('#top').text(total + op); // if + or -
	code !== '' && $('#top').text(total + code);// if * or /
	$('#bot').html('&nbsp');
	code = '';
	
	
}
