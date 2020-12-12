jQuery(function(){
	jQuery('.close-link').click(function(){
		localStorage.setItem('nopopup', '1')
		jQuery('.top-note').hide();
	});
	var nopopup = localStorage.getItem('nopopup'); 

	if( nopopup == 1 ){
		jQuery('.top-note').hide();
	}
	jQuery('#hanbur-icon').click(function(){
		jQuery('body').addClass('no-scroll');
		jQuery('.overlay').css('display','block');
		jQuery('.side-menu').addClass('side-menu-visible');
	});
	jQuery('#close-icon').click(function(){
		jQuery('body').removeClass('no-scroll');
		jQuery('.overlay').css('display','none')
		jQuery('.side-menu').removeClass('side-menu-visible');
	});
	jQuery(window).scroll(function (event) {
		var scroll = jQuery(window).scrollTop();
		if(scroll > 60 && jQuery(window).width() > 720 ){
			jQuery("header").addClass('fixed-myrx-header');
		} else {
			jQuery("header").removeClass('fixed-myrx-header')
		}
	});
	//$('.marketing-myrx').css('margin-top', (window.innerHeight ));
	
    $('#tabs .trigger-tab').click(function(){
		var t = $(this).attr('id');
		$('#tabs .trigger-tab').removeClass('active-tab');   
		$(this).addClass('active-tab');        
		$('.container-patient').hide();
		$('#'+ t + 'C').show();
	});
	////
	$('.panel h6').click(function() {
			if($(this).hasClass('active') ) {
				
				// close panel if active and clicked
				$(this).removeClass('active')
					.next().slideUp(200);              
			} 
			else
			{     
				$('.active').removeClass('active')
					.next().slideUp(200);
				
				// open this clicked panel
				$(this).addClass('active')
					.next().slideDown(200);        
			}
			   
		});

		// $('.learn-more').click(function(){
		// 	$(this).next().slideToggle();
		// }) 
		$('#price-switch').click(function(){
            if($(this).is(":checked")){
				$('.price-boxes-2').css('display','block');
				$('.price-boxes-1').css('display','none');
            }
            else if($(this).is(":not(:checked)")){
				$('.price-boxes-1').css('display','block');
                $('.price-boxes-2').css('display','none');
            }
        });
});

$(document).ready(function() {  
	if($(window).width() < 720) {
		$('.overlap-empty-wrap').css('margin-top', ($(window).height() - $('header').height()));
    }else {
		$('.overlap-empty-wrap').css('margin-top', $(window).height());
	}
});