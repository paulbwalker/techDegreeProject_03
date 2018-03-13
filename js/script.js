// I used the jQuery ready event function in case the script was moved.
$(function() {

/****************************** JOB ROLE SECTION *********************************/

	let $designOptionShow =	$('#colors-js-puns').removeClass('hide-selection');
	// This function uses the select:selected pseudo class and removes the class 'hide-selection'
	//  if the value matches with 'other' option then it adds the class else it removes that class.
	const selectField = () => {
		let $selectedOption = $('#title option:selected').val();

		if ( $selectedOption === 'other' ) {
			// the removeClass is used because the CSS has a visibility: hidden.
			$('#other-title').removeClass('hide-selection');
		} else {
			// if it does not match 'other' then I addClass to the selected element.
			$('#other-title').addClass('hide-selection');
		}
	};

	$('#title').on('change', selectField);

/********************************* T-SHIRT INFO ***********************************/

// Remove the color options in the Global scope.
	const $colors = $('#color option').remove();

// This function toggle between js puns and js heart when you select it and shows the proper color.
	const toggleFields = () => {
	// I used this as the Local scope for this function.
		const $colors = $('#color option').remove();

		if ($('#design').val() === 'js puns') {
			$('#color').append(`
			  	<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
              	<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
              	<option value="gold">Gold (JS Puns shirt only)</option> 
          	`);
		}
		if ($("#design").val() === 'heart js') {
			$('#color').append(`
				<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
              	<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
              	<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
			`);
		}
	};

// Calls the function on the js puns or js heart. 
	$('#design').on('change', toggleFields);

/************************** REGISTER FOR ACTIVITIES *******************************/

// Append span tag with the input field on the .activities page using unobtrusive javascript.
	$('.activities').append(`<span>Amount: <input type="text" name="amount" class="amount"></span>`);

// Hide the span when page loads
	$('fieldset .activities span').addClass('hide-selection');	

// This function takes the checked checkboxes and add them by getting the value attribute.
	const addSum = (event) => {
		let total = 0;
		$('fieldset .activities span').removeClass('hide-selection');

		$('input[type=checkbox]:checked').each(function () {
			total += parseInt( $(this).val() );	
		});

		if ( total === 0 ) {
			$('.amount').val('');
		} else {
			$('.amount').val('$'+ total);
		}
	};

// Calls the addSum function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', addSum);


}); // closing the jQuery ready function.
