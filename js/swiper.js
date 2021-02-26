/* Swiper page intro */
var galleryTop;
var galleryThumbs;

if($('.swiper-container-intro').length){
  var introSlides = $('.swiper-container-intro .swiper-slide');
  var slidesLoaded = 0;
  function imgLoaded(){
    slidesLoaded++;
    if(slidesLoaded === introSlides.length){
      swiper.init();
    }
  }
  introSlides.each(function(i, item){
    var img = document.createElement('img');
    img.onload = imgLoaded;
    img.src = item.dataset.src;
    // debugger;
    item.style.backgroundImage = 'url(' + item.dataset.src + ')';
  })
  var swiper = new Swiper('.swiper-container-intro', {
    init: false,
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    speed: 600,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    // pagination: {
    //   el: '.swiper-pagination',
    //   clickable: true,
    // }
  });
  swiper.on('init', function() {

    $('.wrap-intro').addClass('hide-me')
    setTimeout(function(){
      $('.wrap-intro').remove();
    }, 600)

    setTimeout(function(){ 
      $(".anim-1").addClass("active"); 
    }, 500);
    setTimeout(function(){ 
      $(".anim-2").addClass("active");
    }, 1000);
    setTimeout(function(){ 
      $(".anim-3").addClass("active");
    }, 1600);
    
  });
}

/* Swiper page détail bien */
function CarouselInit() {

  var slideDuration = 5000;
  var speedTransition = 800;
  var slidesImg = [];
  var currentPrevSlides = {
      current: 0,
      prev: 0
  }

  function fillImgArray(){
    var slides = galleryTop.slides;

    for(var i = 0; i < slides.length; i++){

        var slide = slides[i];
        slidesImg.push(slide.querySelector('.swiper-slide__bg'))

    }
  }
  function playAnimation(i){

      if(slidesImg.length === 0){
        fillImgArray();
      }

      var img = slidesImg[i];

      if(img === null) return;

      // debugger;
      img.classList.add('animation_play');
      img.offsetHeight;

  }

  function stopAnimation(i){

      var img = slidesImg[i];

      if(img === null) return;
      
      img.classList.remove('animation_play');
      img.offsetHeight;

  }

  if($('.gallery-thumbs .swiper-wrapper .swiper-slide').length){
    galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 2,
      slidesPerView: 4,
      freeMode: true,
      loop: true,
      centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.slider-wrap .next-slide',
        prevEl: '.slider-wrap .prev-slide',
      },
    });
  }
  if($('.gallery-top .swiper-wrapper .swiper-slide').length) {
    galleryTop = new Swiper('.gallery-top', {
      init: false,
      spaceBetween: 10,
      effect: 'fade',
      autoplay: {
        delay: slideDuration,
        disableOnInteraction: false,
      },
      speed: speedTransition,
      loop: true,
      navigation: {
        nextEl: '.gallery-top .next-slide',
        prevEl: '.gallery-top .prev-slide',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });

    galleryTop.on('init', function() {

      currentPrevSlides.current = galleryTop.activeIndex;
      // debugger;
      playAnimation(currentPrevSlides.current);

      $('.wrap-detail').addClass('hide-me')
      setTimeout(function(){
        $('.wrap-detail').remove();
      }, 600)
    });
     // init Swiper
    galleryTop.init();   

    galleryTop.on('slideChangeTransitionStart', function() {
      // console.log(galleryTop.activeIndex);
      currentPrevSlides.prev = galleryTop.previousIndex;
      currentPrevSlides.current = galleryTop.activeIndex;

      playAnimation(currentPrevSlides.current);
    });

    galleryTop.on('slideChangeTransitionEnd', function() {
      stopAnimation(currentPrevSlides.prev);
    });
  }
}

/* Autoplay */
$(document).ready(function() {
//    CarouselInit();
//    if(galleryTop)
//        galleryTop.autoplay.start();
});
/* Pause */

function stopSlideAnimation(){
  $('.animation_play').each(function(i, item){
    var self = $(item);
    var computedStyleTransform = self.css('transform');
    self.css('transform', computedStyleTransform);
  })
}
function playSlideAnimation(){
  $('.animation_play').each(function(i, item){
    var self = $(item);
    self.css('transform', '');
  })
}
$(".pause-btn").hover(function(){
  $(this).addClass('hover');
}, function(){
  $(this).removeClass('hover');
})
$(".pause-btn").click(function(){
  if($(this).hasClass('active')){
    galleryTop.autoplay.start();
    $(this).removeClass('hover');
    playSlideAnimation()
  }else{
    galleryTop.autoplay.stop();
    stopSlideAnimation()
  }
  $('.pause-btn').toggleClass('active')
  $(".swiper-button-pause").fadeToggle();
  $(".swiper-button-play").fadeToggle();
});
$(".swiper-button-pause").click(function(){
  galleryTop.autoplay.stop();
  stopSlideAnimation()
  $('.pause-btn').addClass('active')
  $(".swiper-button-pause").fadeOut();
  $(".swiper-button-play").fadeIn();
});
/* Play */
$(".swiper-button-play").click(function(){
  galleryTop.autoplay.start();
  playSlideAnimation()
  $('.pause-btn').removeClass('active')
  $(".swiper-button-play").fadeOut();
  $(".swiper-button-pause").fadeIn();
});

/* Box info close */
$(".close-box").click(function(){
  $(".box-info").animate({ opacity: 0 });
  setTimeout(function(){ 
    $(".box-info").css('z-index', '-1')
  }, 400);
  $(".info").fadeIn();
});

/* Box info open */
$(".open-box-info").click(function(){
  $(".info").fadeOut();
  $(".box-info").css('z-index', '4').animate({ opacity: 1 });
});




