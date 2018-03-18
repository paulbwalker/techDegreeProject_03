// I used the jQuery ready event function in case the script was moved.
$(function() {

/****************************** JOB ROLE SECTION *********************************/

	let $designOptionShow =	$('#colors-js-puns').removeClass('is-hidden');
	// This function uses the select:selected pseudo class and removes the class 'is-hidden'
	//  if the value matches with 'other' option then it adds the class else it removes that class.
	const selectField = () => {
		let $selectedOption = $('#title option:selected').val();

		if ( $selectedOption === 'other' ) {
			// the removeClass is used because the CSS has a visibility: hidden.
			$('#other-title').removeClass('is-hidden');
		} else {
			// if it does not match 'other' then I addClass to the selected element.
			$('#other-title').addClass('is-hidden');
		}
	};

	$('#title').on('change', selectField);

/********************************* T-SHIRT INFO ***********************************/

// Remove the color options in the Global scope to disable the color dropdown menu.
	const $colors = $('#color option').remove();
	const $designs = $('#design option').first().remove();

 // Add hidden class to hide select theme.
 	$('#color').append(`
		  	<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
          	<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
          	<option value="gold">Gold (JS Puns shirt only)</option> 
 		`);
// This function toggle between js puns and js heart when you select it and shows the proper color.
	const toggleFields = () => {
	// I used this as the Local scope for this function.
		let $colors = $('#color option').remove();

		if ($('#design').val() === 'js puns') {
			$('#color').append(`
			  	<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
              	<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
              	<option value="gold">Gold (JS Puns shirt only)</option> 
          	`);
		} else if ( $("#design").val() === 'heart js') {
			$('#color').append(`
				<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
              	<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
              	<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
			`);
		} 
	};
	// Calls the function on the js puns or js heart.
	$('#design').on('change', toggleFields);


/*   *****************    REGISTER FOR ACTIVITIES Cost *******************    */

// Append span tag with the input field on the .activities page using unobtrusive javascript.
	$('.activities').append(`<span class="total-sum"><input type="text" name="amount" class="amount"></span>`);

// Hide the span when page loads
	$('.total-sum').addClass('is-hidden');	

// This function takes the checked checkboxes and add them by getting the value attribute.
	const addSum = (event) => {
		let total = 0;
		$('.total-sum').removeClass('is-hidden');

		$('input[type=checkbox]:checked').each(function () {
			total += parseInt( $(this).val() );	
		});

		if ( total === 0 ) {
			$('.amount').val('');
		} else {
			$('.amount').val('Amount: ' + '$ '+ total);
		}
	};
// Calls the addSum function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', addSum);


/*    **************** REGISTER FOR ACTIVITIES Time Conflict ***************     */

// This function selects the label or deselect the same time the workshop is held.
	const timeConflict = (workshopName, Workshop) => {
		if ( $(workshopName).prop("checked") ) {
			Workshop.addClass('disabled');
		} else {
			Workshop.removeClass('disabled');
		}
	};
// This function disables the checkbox when the workshop has the same time.
	const disableCB = (inputName, WorkshopOff) => {
		if ( $(inputName).prop("checked") ) {
			WorkshopOff.prop('disabled', true);		
		} else {
			WorkshopOff.prop('disabled', false);		
		}
	};

// This function call both timeConflict and disableCB when user checks the checkbox.
	const sameTime = () => {
		const $jsFrameworks = $('.activities label').eq(1);
		const $jsFrameworksOff = $('input[name="js-frameworks"]');
		const $jsLibs = $('.activities label').eq(2);
		const $jsLibsOff = $('input[name="js-libs"]');
		const $express = $('.activities label').eq(3);
		const $expressOff = $('input[name="express"]');
		const $node = $('.activities label').eq(4);
		const $nodeOff = $('input[name="node"]');

// Calls the function when the checkbox is selected and is removed when not checked.
		timeConflict($jsFrameworksOff, $express); 
		disableCB($jsFrameworksOff, $expressOff); 

		timeConflict($expressOff, $jsFrameworks);
		disableCB($expressOff, $jsFrameworksOff);

		timeConflict($jsLibsOff, $node);
		disableCB($jsLibsOff, $nodeOff);

		timeConflict($nodeOff, $jsLibs);
		disableCB($nodeOff, $jsLibsOff);
			
	};
		

// Calls the addSum function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', sameTime);




}); // closing the jQuery ready function.
