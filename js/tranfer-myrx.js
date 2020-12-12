var MNP = {};
var selectedMedicine = [];
var lat;
var lng;
MNP.Common = {
	initialize: function () {
		this.showDatePicker();
		this.inputBlur();
		this.submitForm();
		this.pharmaCode();
		this.numberValidate();
		this.autocompleteMed();
		this.zipCodeToLatLng();
	},
	showDatePicker: function () {
		$("#datepicker").datepicker({
			dateFormat: 'dd-mm-yy',
			changeYear: true,
			changeMonth: true,
			yearRange: '1900:2100',
			onSelect: function () {
				$(this).parent().addClass('date-picker')
			}
		});
	},
	inputBlur: function () {
		$('input').focus(function () {
			$(this).parents('.form-group').addClass('focused');
		});

		$('input').blur(function () {
			var inputValue = $(this).val();
			if (inputValue == "") {
				$(this).removeClass('filled');
				$(this).parents('.form-group').removeClass('focused');
			} else {
				$(this).addClass('filled');
			}
		});
	},
	autocomplete: function (lat,lng) {
		
		var input = document.getElementById('autocomplete')
		var circle = new google.maps.Circle({
			center: new google.maps.LatLng(lat, lng),
			radius: 500
		});
		var autocomplete = new google.maps.places.Autocomplete(input, {
			types: ['establishment']
		});
		autocomplete.setBounds(circle.getBounds());
		google.maps.event.addListener(autocomplete, 'place_changed', function () {
			$('.pharma-input-wrap').css('display', 'none');
			$('.user-info').css('display', 'block');
			var place = autocomplete.getPlace();
			$('#pharma-name').val(place.name)
			$('#pharma-address').val(place.formatted_address)
			$('.pharma-name-info').text(place.name);
			$('.pharma-address').text(place.formatted_address);
			$('.input-wrapper-pharma').css('display', 'block');
		});
		$('#autocomplete').attr('placeholder', '');
		$('.input-wrapper-pharma').click(function () {
			$('.pharma-input-wrap').css('display', 'block');
			$('.input-wrapper-pharma').css('display', 'none');
			$('#autocomplete').val('')
		})
	},
	submitForm: function () {
		$('.tranfer-myrx-submit').click(function () {
			$('.throbber-loader').css('display','block');
			$('body').css('overflow','hidden');
			var data = {
				"zipcode": parseInt($('#pharmaCode').val()),
				"pharmacy_name": $('#pharma-name').val(),
				"pharmacy_address": $('#pharma-address').val(),
				"first_name": $('#fname').val(),
				"last_name": $('#lname').val(),
				"phone": $('#phone').val(),
				"dob": $('#datepicker').val(),
				"medications": selectedMedicine
			}
			$.ajax({
				url: 'https://api.healthtechgateway.com/myrx-transfer',
				type: 'POST',
				data: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
				success: function (data) {
					$('body').css('overflow','auto');
					$('.input-wrapper-rx').css('display','none');
					$('#pharma-form').css('display','none');
					$('.success-block').css('display','block');
					$('.throbber-loader').css('display','none');
				},
				error: function(error) {
					$('.throbber-loader').css('display','none');
					alert(JSON.parse(error.responseText).message);
					$('body').css('overflow','auto');
				}
			});
        });
        return false
	},
	pharmaCode: function() {
		$('#pharmaCode').keypress(function (e) {
			var key = e.which;
			if (key == 13) {
				$('.auto-complete-field').css('display', 'block');
			}
	
		});
	},
	numberValidate: function() {
		$('#pharmaCode,#phone').keypress(function (evt) {
			var charCode = (evt.which) ? evt.which : event.keyCode
			if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
			return true;
		});
	},
	autocompleteMed: function() {
		$( "#medicine" ).autocomplete({
			delay: 500,
			source: function( request, response ) {
				$('.throbber-loader').css('display','block');
				$.ajax({
					url: 'https://api.dev.myrx365.io/uberdoc/typeahead?search='+request.term,
					type: "GET",
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': 'EjutMXtlkK6Mh4ze9r0Gg6yqUwsCqzy87Zk4qyJQ'
					},
					success: function (data) {
						$('.throbber-loader').css('display','none');
						let availableTags = [];
						data.results.forEach(function(item,index){
							 availableTags.push(item.name)
						})
						response(availableTags);
					}
				});
			},
			select: function( event, ui ) {
				selectedMedicine.push({name:ui.item.value});
				var terms = split(this.value);
				 // remove the current input
				 terms.pop();
				 // add the selected item
				 terms.push(ui.item.value);
				 // add placeholder to get the comma-and-space at the end
				 terms.push("");
				 this.value = '';
				 $('#med-lable').append("<span class='med-selected-item'>"+terms[0]+"<i class='fa fa-times cursor-pointer ml-5' id='med-close' aria-hidden='true'></i></span>")
				 return false;
			},
			open: function() {
				$(this).autocomplete("widget")
					   .appendTo("#autocomplete-results")
					   .css("position", "static")},
		  });
		  function split(val) {
			return val.split(/,\s*/);
		 }
		 $(document).on('click', '.med-selected-item' , function(e) {
			$(this).remove()
			let _that = this;
			selectedMedicine = selectedMedicine.filter(function( obj ) {
			return obj.name !== $(_that).text();
			});
	   })
		
	},
	zipCodeToLatLng:function() {
		$(document).on('keyup', '#pharmaCode' , function(e) {
			if(e.currentTarget.value.length > 5){
				$('.zip-error').css('display','block');
			} else{
				$('.zip-error').css('display','none')
			}
	   });
	   $(document).on('keydown', '#pharmaCode' , function(event) {
		var input = $('#pharmaCode').val();		
		if (event.keyCode === 13 && input.length === 5) {
			var zipCode = input;
			var xhr = $.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&key=AIzaSyB-DStG1wJTHgHfRWXgAFXdMOGAp1sTkJM');
			xhr.done(function(data) {
				if(data.status == 'ZERO_RESULTS'){
					$('.zip-error').css('display','block');
					$('.auto-complete-field').css('display', 'none');
				} else {
					$('.zip-error').css('display','none');
					lat = data.results[0].geometry.location.lat;
					lng = data.results[0].geometry.location.lng;
					MNP.Common.autocomplete(lat,lng)
				}
			});
		} 
		});
	}
}

$(document).ready(function () {
	MNP.Common.initialize();
});