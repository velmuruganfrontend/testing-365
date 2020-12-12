var MNP = {};
MNP.Common = {
    initialize: function(){
        // $(window).resize(function(){
        //     $('.myrx-bg').css('margin-top', (window.innerHeight - $('header').height()));
        //   });    
   $('.myrx-bg').css('margin-top', (window.innerHeight - $('header').height()));
    this.showCta();
    this.team();
    this.menuHide();
    if($(window).width() < 720) {
        //$('.myrx-bg').css('height',$(window).height());
    }
    if($(window).width() > 1024){
        this.cloudHide();
        this.VideoScrollerFirst();
        this.VideoScrollerSecond();
        this.VideoScrollerThird();
        this.VideoScrollerFour();
        this.VideoAnimationFrame();
        this.carousel();
        this.videoOneSticky();
        this.videoTwoSticky();
        this.videoThirdSticky();
        this.videoFourSticky();
        changeColor("myrx365-wrapper", 230, 191, 192,255,255,255,255); 
    }
},
    videoOneSticky: function(){
        var controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
        duration: 300,
        offset: 1350
        })
        .setPin('#video-wrap-1')
        .addTo(controller);
    },
    videoTwoSticky: function() {
        var controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
            duration: 400,
            offset: 2400
        })
        .setPin('#video-wrap-2')
        .addTo(controller);
    },
    videoThirdSticky: function() {
        var controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
            duration: 400,
            offset: 3400
        })
        .setPin('#video-wrap-3')
        .addTo(controller);
    },
    videoFourSticky: function(){
        var controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
            duration: 400,
            offset: 4500
        })
        .setPin('#video-wrap-4')
        .addTo(controller);
    },
    carousel: function(){

        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            autoplay:true,
            autoplayTimeout:2500,
            autoplayHoverPause:true,
            responsiveClass: true,
            responsive: {
              0: {
                items: 1,
                nav: false
              },
              600: {
                items: 5,
                nav: false
              },
              1000: {
                items: 3,
                dots: true,
                nav: false,
                loop: true,
                margin: 20,
                dotsEach: 3,
                slideBy: 3
              }
            }
          })
    },
    menuHide: function(){ 
        $('#hanbur-icon').click(function(){
            $(this).parents('nav').toggleClass('nav-active')
            $('body').addClass('no-scroll');
            $('.overlay').css('display','block');
            $('.side-menu').addClass('side-menu-visible');
        });
        $('#close-icon').click(function(){
            $('body').removeClass('no-scroll');
            $('.overlay').css('display','none')
            $('.side-menu').removeClass('side-menu-visible');
        });
    },
    cloudHide:function(){
        var getLeftPosition = setInterval(function(){ 
            var leftIndex = $('.cloud-wrap-2').offset();
            if(parseInt(Math.abs(leftIndex.left)) > 340){
              $('.cloud-wrap-2').css({"opacity": "0", "transition": "opacity 10s ease-in-out"});
              clearInterval(getLeftPosition);
            } else{
              $('.cloud-wrap-2').css({"opacity": "1", "transition": "opacity 10s ease-in-out"})
            }
           
         }, 1000);

         var getLeftPosition1 = setInterval(function(){ 
            var leftIndex1 = $('.cloud-wrap-window').offset();
            console.log(leftIndex1)
            if(parseInt(Math.abs(leftIndex1.left)) > 38){
                $('.cloud-wrap-window').css({"opacity": "0", "transition": "opacity 10s ease-in-out"});
                clearInterval(getLeftPosition1);
              } else{
                $('.cloud-wrap-window').css({"opacity": "1", "transition": "opacity 10s ease-in-out"})
              }
         }, 1000);
    },
    team: function(){
        $('.active-1').css('display','block');
        $('.team-model-wrap.active-1').css('transform','scale(1.3)');
        var activeClass 
        $(".team-model-wrap").hover(function(e){
            $('.team-model').css('display','none');
             activeClass = '.'+ e.currentTarget.classList[2];
            $(activeClass).css('display','block');
            $('.team-model-wrap.active-1').css('transform','scale(1)');
            }, function(){
            $('.team-model'+activeClass).css('display','none');
            $('.active-1').css('display','block');
            $('.team-model-wrap.active-1').css('transform','scale(1.3)');
          });  
    },
    showCta: function() {
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            var myvid = $('#video-1')[0];
            let tempFlag = true;
            if(scroll > 750){
                $(".fixed-myrx-btn").addClass('fixed-myrx-btn-visible');
            } else {
                $(".fixed-myrx-btn").removeClass('fixed-myrx-btn-visible');
            }
            if( scroll > 7800){
                $(".fixed-myrx-btn").removeClass('fixed-myrx-btn-visible');
            } 
            if(scroll > 60 && $(window).width() > 720 ){
                $("header").addClass('fixed-myrx-header');
            } else {
                $("header").removeClass('fixed-myrx-header')
            }
        });
    },
    VideoScrollerFirst: function(){
        var video = $('#video-1')[0]; // select video element  
        this.VideoAnimationFrame(video,'.video-section-1',400);
    },
    VideoScrollerSecond: function(){
        // start video at frame 0
        var video = $('#video-2')[0]; // select video element   
       this.VideoAnimationFrame(video,'.video-section-2',300,'plus');
    },
    VideoScrollerThird: function(){
        // start video at frame 0
        var video = $('#video-3')[0]; // select video element   
        this.VideoAnimationFrame(video,'.video-section-3',400,'plus');
    },
    VideoScrollerFour:function(){
        var video = $('#video-4')[0]; // select video element   
        this.VideoAnimationFrame(video,'.video-section-4',600,'plus');
    },
    VideoAnimationFrame: function(video,selectClass, metaHeight,offset){
        var frameNumber = 0; 
        if(video != undefined){
            video.addEventListener('loadedmetadata', function() {
                window.requestAnimationFrame(scrollPlay);
            });
            function scrollPlay(){
                    var winHeight = $(window).height()
                    var lowLimit = $(selectClass).offset().top - winHeight;
                    if(offset == 'minus'){
                        var highLimit = $(selectClass).offset().top - metaHeight;
                    }else{
                        var highLimit = $(selectClass).offset().top - metaHeight;
                    }
                    
                    var winScrollTop = $(window).scrollTop();
               frameNumber = (winScrollTop > highLimit) ? winScrollTop :highLimit
            
                frameNumber = (frameNumber - highLimit)*video.duration/winHeight;
                video.currentTime = (frameNumber > video.duration) ? video.duration : frameNumber;
            
               
            
                window.requestAnimationFrame(scrollPlay);
        }
        window.requestAnimationFrame(scrollPlay);
        }
    }
}
$(document).ready(function(){
    MNP.Common.initialize();  
    
});



/* Google Map */
function initMap(){
    var location =   {lat: 40.685220 , lng: -73.793000} 
    var location2 =   {lat: 40.639702 , lng: -73.606979} 
    var location3 =   {lat: 40.732290 , lng: -73.810720} 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: location,
        animation: google.maps.Animation.DROP,
    });
  new google.maps.Marker({
      position:location,  
      map: map,
      title: "Metro Drugs Inc. 95-31 Sutphin Blvd Jamaica, NY 11435"
  })
  new google.maps.Marker({
      position:location2,  
      map: map,
      title: "Baldwin Rx Inc.948 Atlantic Avenue Baldwin, NY 11510"
  })
  new google.maps.Marker({
      position:location3,  
      map: map,
      title: "Jewel Pharmacy (Jewel of Flushing Rx) 70-35 Parsons Blvd, Flushing, NY 11365" 
  })
}
/* Google Map */  



  


