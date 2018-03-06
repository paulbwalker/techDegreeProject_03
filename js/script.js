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

});
