// Wrap content in a jQuery ready function.
$(function () {
	// When user selects the other in the drop-down menu the 'other' input field displays
	$('#title').on('change', function() {
		const $jobRole = $('#title option:selected').val();
		
		if( $jobRole === 'other' ) {
		// Removes the class to display the input
			$('#other-title').removeClass('hide-other');
		} else {
		// Adds the class to hide the input
			$('#other-title').addClass('hide-other');
		}
	});
// Remove select options in the optgroup
	const $jsPuns = $('#puns').remove();
	const $jsHeart = $('#hearts').remove();

// This function allows you to select which optgroup you want to see 
// and displays which groupping you want to display
	const toggleFields = () => {
		$('#color optgroup').remove();

		if ($("#design").val() === 'js puns') {
			$('#color').append($jsPuns);
		}
		if ($("#design").val() === 'heart js') {
			$('#color').append($jsHeart);
		}
	};

// When you select the theme you call the toggleFields function
	$("#design").on('change', toggleFields);

});
