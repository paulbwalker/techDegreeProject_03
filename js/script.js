/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Forms
By Paul B. Walker
******************************************/

// Another way to use the document.ready see learn.jquery.com/using-jquery-core document-ready
$(function() {

  // jQuery method that focus on the name input text field.
  $('#name').focus();


/* -------- JOB ROLE SECTION ---------------------------------------------------------- */

	  // The other jobs input fields is hidden until the user selects other on the form option.
		$('#other-title').hide();

  // This function shows or hides the select field depending of user selection
  const selectField = () => {
		let $selectedOption = $('#title option:selected').val();

		if ( $selectedOption === 'other' ) {
			// User selects other option in the dropdrown menu shows the other input filed.
			$('#other-title').show();
		} else {
			// User selects something other than 'other' on the dropdown menu.
			$('#other-title').hide();
		}
	};

  // Calls the function when other is selected on the options menu.
	$('#title').on('change', selectField);


/* -------- T-SHIRT INFO  --------------------------------------------------------------- */

// Remove the color options in the Global scope to disable the color dropdown menu.
const $colors = $('#color option').remove();
// Takes you back at the start of the application.
	$('#color').append(`
			 <option value="makeSelection"><-- Please make your selection</option>			 
		`);

/** The jQuery hide and show method did not yeild the results needed the first-child
 * would appear first even when selecting the heart js. This was the best way to avoid it. */ 
 const selectTheme = () => {
	$('#color').show();
	

 // To append the color options I use the remove method and assign it to $colors variable.
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
	 } else {
		$('#color').append(`
				<option value="makeSelection"><-- Please make your selection</option>			 
 		`);
	 }
 };
 // Calls the function on the js puns or js heart.
 $('#design').on('change', selectTheme);

/* -------- ADD TOTAL REG FOR ACTIVIES  -------------------------------------------------- */

// Append span tag with the input field on the .activities page using unobtrusive javascript.
$('.activities').append(`<span class="total-sum"><input type="text" name="amount" class="amount"></span>`);

// Hide the span when page loads
	$('.total-sum').addClass('is-hidden');	

// This function takes the checked checkboxes and add them by getting the value attribute.
	const addSum = (event) => {
		let total = 0;
		$('.total-sum').removeClass('is-hidden');
		$('.total-sum').addClass('total-sum');

		$('input[type=checkbox]:checked').each(function () {
			total += parseInt( $(this).val() );	
		});

		if ( total === 0 ) {
			$('.amount').val('');
			$('.activities legend').addClass('error');
		} else {
			$('.amount').val('Amount: ' + '$ '+ total);
			$('.activities legend').removeClass('error');
		}
	};
// Calls the addSum function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', addSum);


/* -------- TIME CONFLICT REG FOR ACTIVIES  ------------------------------------------- */


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
		// list variables needed for this function.
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
		
// Calls the sameTime function when the checkbox is checked.
	  $('input[type=checkbox]').on('click', sameTime);



/* -------- SELECT PAYMENT OPTION  --------------------------------------------------------- */

const $payOption = $('#payment');
const $creditCard = $('#credit-card');
const $payPal = $('p:contains("PayPal")');
const $bitcoin = $('p:contains("Bitcoin")');
const $selectPayMethod = $('#payment>option').eq(0);

// function that only displays corresponding payment method
// CC is first by default
$selectPayMethod.hide();
$payPal.hide();
$bitcoin.hide();
$payOption.val("credit card").attr("selected", true);

$payOption.change(function(){

  if ($(this).val() == "credit card") {
		$creditCard.show();
    $bitcoin.hide();
		$payPal.hide();
  } else if ($(this).val() == "paypal") {
			$payPal.show();
      $bitcoin.hide();
			$creditCard.hide();
  } else if ($(this).val() == "bitcoin") {
			$bitcoin.show();
      $payPal.hide();
			$creditCard.hide();
	} 
	
});


/* -------- FORM SUBMIT  ------------------------------------------------------------------ */

$('form').on('submit',function (event) {
	const name = $('#name').val();
	const email = $('#mail').val();
	const checked = $('input[type="checkbox"]').is(':checked');
	const ccNum = $('#cc-num').val();
	const zip = $('#zip').val();
	const cvv = $('#cvv').val();
	const $selectedCard = $('#payment>option').eq(1);


	if ($selectedCard.is(':selected') ) {
		validateCreditCard(ccNum, event);
		validateZip(zip, event);
		validateCvv(cvv, event);
		validateName(name, event);
		validateEmail(email, event);
		validateActivities(checked, event);
	} else {
		validateName(name, event);
		validateEmail(email, event);
		validateActivities(checked, event);
	} 
	
})



/* -------- VALIDATE NAME FIELD ----------------------------------------------------------- */


const validateName = (name, event) => {
	if (!isValidName (name) ) {
		$('.user-name').text(`Please enter name. Greater then 2. no numbers.`);	
		event.preventDefault();	
	} else {
		$('.user-name').text('');
	}
}

const validateEmail = (email, event) => {
	if (!isValidEmail (email) ) {
		$('.user-email').text(`Please enter your email.`);	
		event.preventDefault();	
	} else {
		$('.user-email').text('');
	}
}

const validateActivities = (checked, event) => {
	if (!checked) {
		$('.activities legend').addClass('error');
		event.preventDefault();	
		} else {
		$('.activities legend').removeClass('error');
		}
};

const validateCreditCard = (ccNum, event) => {
	if (!isValidCreditCard (ccNum) ) {
		$('.user-ccNum').text(`Please enter your credit card number.`);	
		event.preventDefault();	
	} else {
		$('.user-ccNum').text('');
	}
}

const validateZip = (zip, event) => {
	if (!isValidZip (zip) ) {
		$('.user-zip').text('Need zip code.');
		event.preventDefault();
	} else {
		$('.user-zip').text('');
	}
}

const validateCvv = (cvv, event) => {
	if (!isValidCvv (cvv) ) {
		$('.user-cvv').text('Need CVV number.');
		event.preventDefault();
	} else {
		$('.user-cvv').text('');
	}
}


/* -------- IS VALID FUNCTION -------------------------------------------------------------- */

const isValidName = (name) => {
	let regExName = /^[a-zA-Z]/;
	if (name.length > 2 && name.match(regExName) ) {
		return name;
	}
}

const isValidEmail = (email) => {
	let regExMail = /^[a-z, 0-9]+@[^@.]+\.[a-z]/i;
	if (email.match(regExMail) ) {
		return email;
	}
}

const isValidCreditCard = (ccNum) => {
	let regExCcNum = /\d{14}|\d{16}/;
	if (ccNum.match(regExCcNum) ) {
		return ccNum;
	}
}

const isValidZip = (zip) => {
	let regExZip = /\d{5}|\d{5}-\d{4}/;
	if (zip.match(regExZip) ) {
		return zip;
	}
}

const isValidCvv = (cvv) => {
	let regExCvv = /\d{3}/;
	if (cvv.match(regExCvv) ) {
		return cvv;
	}
}








}); // closing the jQuery ready function.
