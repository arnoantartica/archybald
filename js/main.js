/* Menu Burger */
$(".burger").click(function(){
  $(".menu").addClass("active");
});

$(".close-menu").click(function(){
  $(".menu").removeClass("active");
});

/* Loader */
var biensReady = new Event('biensReady');
biensReady.initEvent('biensReady', true, true);
if($('#biens').length){

  document.addEventListener('biensReady', function (e) {
    $(".wrap").delay(1100).fadeOut("slow");
  }, false);

}else{

  $(window).ready(function() {

    $(".wrap").delay(1100).fadeOut("slow");

  });
}

/* Link virtual tour */
$(".virtual-link").click(function(){
  $(".virtual-tour").fadeIn();
});
$(".return").click(function(){
  $(".virtual-tour").fadeOut();
});

/* 100vh */
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


/* Requête JSON */
// var client_id = "c7b837316d7c4014ba59";

// let source = document.getElementById("entry-template").innerHTML;
// let template = Handlebars.compile(source);

// $.getJSON('https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXml?EstateServiceGetEstateListRequest={%22ClientId%22:%22c7b837316d7c4014ba59%22,%22Language%22:%22nl-BE%22}')
//   .done(function (data) {
//       let html = template(data.results);
//       $("#container").html(html);
// });





AOS.init();


