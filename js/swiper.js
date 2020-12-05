/* Swiper page intro */
var galleryTop;
var galleryThumbs;

if($('.swiper-container-intro').length)
var swiper = new Swiper('.swiper-container-intro', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // }
});

/* Swiper page détail bien */
function CarouselInit() {

    if($('.gallery-thumbs .swiper-wrapper .swiper-slide').length)
        galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 2,
          slidesPerView: 4,
          freeMode: true,
          loop: true,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          navigation: {
            nextEl: '.slider-wrap .next-slide',
            prevEl: '.slider-wrap .prev-slide',
          },
        });
    // if($('.gallery-top .swiper-wrapper .swiper-slide').length) {
    //     galleryTop = new Swiper('.gallery-top', {
    //       spaceBetween: 10,
    //       effect: 'fade',
    //       loop: true,
    //       navigation: {
    //         nextEl: '.gallery-top .next-slide',
    //         prevEl: '.gallery-top .prev-slide',
    //       },
    //       thumbs: {
    //         swiper: galleryThumbs
    //       },
    //     });
        // setTimeout(function() {
        //   // galleryThumbs.autoplay.start();
        // }, 3000);




    
    // }
}

/* Autoplay */
$(document).ready(function() {
//    CarouselInit();
//    if(galleryTop)
//        galleryTop.autoplay.start();
});
/* Pause */
$(".pause-btn").click(function(){
  if($(this).hasClass('active')){
    galleryThumbs.autoplay.start();
  }else{
    galleryThumbs.autoplay.stop();
  }
  $('.pause-btn').toggleClass('active')
  $(".swiper-button-pause").fadeToggle();
  $(".swiper-button-play").fadeToggle();
});
$(".swiper-button-pause").click(function(){
  galleryThumbs.autoplay.stop();
  $('.pause-btn').addClass('active')
  $(".swiper-button-pause").fadeOut();
  $(".swiper-button-play").fadeIn();
});
/* Play */
$(".swiper-button-play").click(function(){
  galleryThumbs.autoplay.start();
  $('.pause-btn').removeClass('active')
  $(".swiper-button-play").fadeOut();
  $(".swiper-button-pause").fadeIn();
});

/* Box info close */
$(".close-box").click(function(){
  $(".box-info").fadeOut();
  $(".info").fadeIn();
});

/* Box info open */
$(".open-box-info").click(function(){
  $(".info").fadeOut();
  $(".box-info").fadeIn();
});




