var client_id = "c7b837316d7c4014ba59";
var langs = new Array(/*'de-DE',*/ 'en-GB', 'fr-BE', 'nl-BE');
var langs_name = new Array(/*'Deutsch',*/ 'en', 'fr', 'nl');

var $cur_cnt = 0;
var $res_cnt = 0;
var $is_end = 0;
var parser = '';
var $language = '';

var per_page = 299;
var page = 0;
var show = true;

var lang;

var l = "";
var loc = window.location.pathname;
if(loc.indexOf("/en/") !== -1)
    l = "en";
else if(loc.indexOf("/fr/") !== -1)
    l = "fr";
else if(loc.indexOf("/nl/") !== -1)
    l = "nl";
if(l) {
    lang = langs[langs_name.indexOf(l)];
    setLanguage(lang);
} else {
    lang = getCookie('lang');
    if(langs.indexOf(lang) == -1) {
        lang = 'fr-BE';
        setLanguage(lang);
    }
}


jQuery(document).ready(function($) {
    setCookie("scroll_src", 0);
    $(document).on('click', 'a[data-detail-id]', function(e) {
        if($(e.target).hasClass('noaction')) {
            window.location.reload();
            e.preventDefault();
            return false;
        }
            
        setCookie("scroll", parseInt($(window).scrollTop()));
        setCookie("scroll_src", 1);
            
        var l = langs_name[langs.indexOf(lang)];
        l = "/"+l+"/detail-bien.php#"+$(this).data('detail-id');

        window.open(l, "_self");
        e.preventDefault();
    });
    $(document).on('click', 'a[data-scroll-back]', function(e) {
        window.open($(this).attr("href"), "_self");
        setCookie("scrollnow", getCookie("scroll"));
        
        e.preventDefault();
    });
    window.onbeforeunload = function (e) {
        if(getCookie("scroll_src") == 0) {
            setCookie("scrollnow", getCookie("scroll"));
        }
    }

    /* Filtre liste biens */ 
    // $('.filterLink').bind('click', function() { setFilter(this); return false; });

    $('#languages a').click(function() {
        lang = $(this).val();
        setLanguage(lang);
    
        getMainData();

        return false;

    });

//     $(document).on("click", ".x", function() {

//         $('#detailsOverlay').fadeOut('slow');
//         $('#infobtn').removeClass('hide');
//         $('#infobtn').fadeIn('slow');
//         $('#infobtn').css('visibility', 'visible');

//     });

//     $(document).on("click", "#infobtn", function(e) {
//         if($(e.target).hasClass('sliderBtn'))
//             return;
//         $('#infobtn').addClass('hide');
//         $('#infobtn').fadeOut('slow');
//         $('#detailsOverlay').fadeIn('slow');
// //        $('#infobtn').css('visibility', 'hidden');

//     });



    //languages set
    $.ajax({
    //    async: (page) ? true : false,
        type: "GET",
        url: 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetLanguageList?estateServiceGetLanguageListRequest={"ClientId":"'+client_id+'"}',
        dataType: "json",
        success: function(data) {
            var lll = new Array();
            for(var i=0; i<data.d['LanguageList'].length; i++) {
                if(langs.indexOf(data.d['LanguageList'][i]) !== -1 && lll.indexOf(data.d['LanguageList'][i]) == -1) {
                    $('#languages').append('<a href="#" data-value="'+data.d['LanguageList'][i]+'" onclick="getLang(this); return false;" style="padding-top: 1px; font-size: 1rem;">'+langs_name[langs.indexOf(data.d['LanguageList'][i])]+'</a>');

                    lll.push(data.d['LanguageList'][i]);
                }
            }
            $('#languages a:not(:last)').after(" | ");

            $('#languages').val(lang);
            $('#languages a[data-value='+lang+']').addClass('active');
        }
    });
    setLanguage(lang);

    //data main set
    var functionString = "getMainData";
    if (eval ("typeof " + functionString) === "function")
    
    getMainData();
    
    var sc = getCookie("scrollnow");
    if(sc > 0) {
        //$('html,body').animate({scrollTop: sc}, 1000);
        setTimeout(function() { 
            $(document.body).animate({scrollTop: sc}, 1000);
            document.body.scrollTop = document.documentElement.scrollTop = sc;
            setCookie("scroll", 0);
            setCookie("scroll_src", 0);
            setCookie("scrollnow", 0);
        }, 1000);
    }
});

priceSet = function(data){
    /*
     * В переменной price приводим получаемую переменную в нужный вид:
     * 1. принудительно приводим тип в число с плавающей точкой,
     *    учли результат 'NAN' то по умолчанию 0
     * 2. фиксируем, что после точки только в сотых долях
     */

    var price       = Number.prototype.toFixed.call(parseFloat(data) || 0, 2),
        //заменяем точку на запятую
        price_sep   = price.replace(/(\D)/g, ","),

        //добавляем пробел как разделитель в целых
        price_sep   = price_sep.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

    return price_sep;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();

    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }

  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie =  name + "=" + value + "; path=/; max-age=2592000";//60(s)*60(m)*24(h)*30(d)

  for (var propName in options) {
    updatedCookie += "; " + propName;

    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getLang(l) {
    lang = $(l).data('value');
    setLanguage(lang);
    
    var h = window.location.hash;
    
    var l = langs_name[langs.indexOf(lang)];
    var loc = window.location.pathname;
    loc = loc.replace("/en/", "/"+l+"/");
    loc = loc.replace("/fr/", "/"+l+"/");
    loc = loc.replace("/nl/", "/"+l+"/");
    if(loc.substr(0, 4) != '/en/' && loc.substr(0, 4) != '/fr/' && loc.substr(0, 4) != '/nl/')
        loc = "/"+ l + loc;
    window.location.replace(loc + h);

    if($('.filterLink[data-field][data-filter!=all].active').length){
        // setFilter($('.filterLink[data-field].active:first'));
    }else if(typeof "getMainData" === "function"){
        getMainData();
    }

    // return false
}

function setLanguage(lang) {
    setCookie('lang', lang);

//    $('#languages').css('background', 'url(img/flags/'+lang+'.png) -20px top no-repeat #333333');
//    $('#languages').css('background-image', 'url(img/flags/'+lang+'.png)');

    $('#languages a[data-value], .menuLanguageSelect a[data-value]').removeClass('active');
    $('#languages a[data-value='+lang+'], .menuLanguageSelect a[data-value='+lang+']').addClass('active');
    
    $('a').each(function() {
        if(typeof $(this).attr("href") == "undefined"){
            return;
        }
        if($(this).attr("href").substr(0,8).indexOf("//") == -1) {
            if($(this).attr("href").indexOf("en/") == -1 && $(this).attr("href").indexOf("fr/") == -1 && $(this).attr("href").indexOf("nl/") == -1)
                $(this).attr("href", "/" + langs_name[langs.indexOf(lang)] + "/" + $(this).attr("href"));
        }
    });

    $.ajax({
        // async: false,
        url: 'languages/'+lang+'.php',
        dataType: "json",
        success: function(data, textStatus) {
            $language = JSON.parse(JSON.stringify(data), function(key, value) {
                if (key) {
                    $ ('* [data-lang = "' + key + '"]'). html (value);
                    $ ('* [data-lang-placeholder = "' + key + '"]'). attr ('placeholder', value);
                    $ ('* [data-lang-value = "' + key + '"]'). attr ('value', value);
                    $ ('* [data-lang-meta = "' + key + '"]'). each(function() {
                        var txt = $(this).attr("data-lang-meta-pre") || "";
                        var l = location.pathname.replace("/"+langs_name[langs.indexOf(lang)]+"/", "");
                        var l = l.replace("/", "");
                        if(!l)
                            l = "index.php";
                        $(this).text(txt + value[l]);
                    });
                }
                setEqualWidthFilterBtns();
                return value;
            });
        }
    });
}
function setEqualWidthFilterBtns(){
    const btns = document.querySelectorAll('.filters-type_btn'),
        btnsLenght = btns.length;
    let i = 0,
        minWidth = 0;
    for(i; i<btnsLenght; i++){
        const width =  btns[i].offsetWidth || btns[i].clientWidth;
        minWidth = width > minWidth ? width : minWidth;
    }
    if(minWidth > 0){
        let parent = btns[0].parentNode;
        parent.style.setProperty('--filters-btn-width', minWidth + "px");
    }
}
function setFavorite(estate) {
    var favs = getCookie('favorites');
    if(favs)
        var arFavs = favs.split(",");
    else
        var arFavs = new Array();
    
    arFavs = getUniqTags(arFavs);
    
    var f = arFavs.indexOf(String(estate));
    
    if(f < 0) {
        arFavs.push(estate);
        $('.change-favor').addClass('active');
    } else {
        arFavs.splice(f, 1);
        $('.change-favor').removeClass('active');
    }
    
    favs = arFavs.join(",");
    
    setCookie('favorites', favs, );
}

function getFavorite(estate) {
    var favs = getCookie('favorites');
    if(favs)
        var arFavs = favs.split(",");
    else
        return 0;
    
    var f = arFavs.indexOf(String(estate));
    
    if(f >= 0)
        return 1;
    else
        return 0;
}

function getUniqTags(tags) {
    var results = [];

    tags.forEach(function (value) {
        value = value.trim();

        if (results.indexOf(value) === -1) {
            results.push(value);
        }
    });

    return results; 
}    

function is_touch_device() {
    return !!('ontouchstart' in window);
}














var urlParameters = {
    clientId: "c7b837316d7c4014ba59",
    getClientId: function () {
      return '"ClientId":"' + this.clientId + '",';
    },
    page: 0,
    setNextPage: function(){
        this.page =  this.page < maxPage ? this.page + 1 : maxPage;
    },
    getPage: function () {
      return '"Page":' + page + ',';
    },
    per_page: 299,
    getPer_page: function () {
      return '"RowsPerPage":' + per_page + ',';
    },
    lang: "",
    getLang: function () {
      if (this.lang !== "") {
        return '"Language":"' + this.lang + '",';
      }else{
        return '';
      }
    },
    purposeStatusIDListDefault: "[1,2]",
    purposeStatusIDList: "[1,2]",
    getPurposeStatusIDList: function () {
      if (this.purposeStatusIDList !== "") {
        return '"PurposeStatusIDList":' + this.purposeStatusIDList + ',';
      }else{
        return '';
      }
    },
    estateID: "",
    getEstateID: function () {
        if (typeof this.estateID !== "undefined" && this.estateID !== "") {
            return '"EstateID":' + this.estateID + ',';
        }else{
            return '';
        }
    },
    estateIDList: "",
    getEstateIDList: function () {
        if (typeof this.estateIDList !== "undefined" && this.estateIDList !== "") {
            return '"EstateIDList":[' + this.estateIDList + '],';
        }else{
            return '';
        }
    },
    showDetails: 0,
    getShowDetails: function () {
      if (typeof this.showDetails !== "undefined" && this.showDetails !== "") {
        return '"ShowDetails":' + this.showDetails + ',';
      }else{
        return '';
      }
    },
    purposeIDlist: "",
    getPurposeIDlist: function () {
      if (this.purposeIDlist !== "") {
        return '"PurposeIDlist":[' + this.purposeIDlist + '],';
      }else{
        return '';
    }
    },
    categoryIDList: "",
    getCategoryIDList: function () {
      if (this.categoryIDList !== "") {
        return '"CategoryIDList":[' + this.categoryIDList + '],';
      }else{
          return '';
      }
    },
    countryID: 1,
    getCountryID: function () {
      if (typeof this.countryID !== "undefined" && this.countryID !== "") {
        return '"countryID":' + this.countryID;
      }else{
        return '';
        }
    },
  },
  needPaginate = false,
  maxPage = 0,
  isLoadingData = false,
  isRenderingSecond = false,
  isHiding = false,
  animataionDuration = 400,
  currentBiensArr = [];


var biensHided = new Event('biensHided');
biensHided.initEvent('biensHided', true, true);

function hideBiens(){
    $('#biens').fadeOut(animataionDuration, function(){
        isHiding = true;
        document.dispatchEvent(biensHided);
    });
}
function showBiens(){
    isLoadingData = false;
    $('#biens').fadeIn(animataionDuration, function(){
        isHiding = false;
    });
}
function getBiens(param) {
    param = param || {};
    param.replace = typeof param.replace === "undefined" ? true : param.replace;
    param.hide = typeof param.hide === "undefined" ? true : param.hide;
    param.show = typeof param.show === "undefined" ? true : param.show;
    param.parser = typeof param.parser === "undefined" ? parserList : param.parser;
    function defaultCallback(){
        
    }
    param.callBack = typeof param.callBack === "undefined" ? defaultCallback : param.callBack;

    if(param.hide){
        hideBiens()
    }

    const url =
        "https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={" +
        urlParameters.getClientId()+
        urlParameters.getPage()+
        urlParameters.getPer_page()+
        urlParameters.getLang()+
        '"StatusIDList":[1],"DisplayStatusIdList":[2,3],' +
        urlParameters.getPurposeStatusIDList() +
        '"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],' +
        urlParameters.getEstateID() +
        urlParameters.getEstateIDList() +
        urlParameters.getShowDetails() +
        urlParameters.getPurposeIDlist() +
        urlParameters.getCategoryIDList() +
        urlParameters.getCountryID() +
        "}";
        isLoadingData = true;
    $.ajax({
        async: true,
        type: "GET",
        url: url,
        dataType: "xml",
        success: function (xml) {

            if(!isHiding && param.hide){
                document.addEventListener("biensHided", parseXml);
            }else{
                parseXml()
            }


            function parseXml () {

                document.removeEventListener("biensHided", parseXml);

                param.parser(xml, param.replace);

                param.callBack(xml);
                
            }

            if(param.show){
                showBiens();
            }

            isLoadingData = false;
            document.dispatchEvent(biensReady);

        },
    });
}

function parserDetail(xml) {
    var cnt = 0;

    $(xml).find("EstateServiceGetEstateListResponseEstate").each(function() { 
        var country_id = parseInt($(this).find('CountryId:first').text());
        var ref = $(this).find('EstateID').text();
        var name = $(this).find('Name:first').text();
        var description = $(this).find('ShortDescription:first').text();
        var price = priceSet($(this).find('Price:first').text());
        var price_show = $(this).find('DisplayPrice:first').text();
        var currency = $(this).find('Currency:first').text();
        var city = $(this).find('City:first').text();
        var pic = $(this).find('Pictures UrlLarge:first').text();
        var status = $(this).find('PurposeStatus:first').text();
        var status_id = $(this).find('PurposeStatusId:first').text();
        var disp_status = $(this).find('DisplayStatusId:first').text();
        var peb = $(this).find('EnergyClass:first').text().toLocaleLowerCase();
        var kw = $(this).find('EnergyValue:first').text();
        var energy = '';

        if(kw !== ""){
            $('.e-spec').html("<strong>PEB (E-SPEC):</strong> " + kw);
        }else{
          $('.e-spec').remove()
        }
// || $(this).find('SubDetailId').text() == '2090' ----CO2

        $(this).find('Details EstateServiceGetEstateListResponseDetail Subdetails EstateServiceGetEstateListResponseSubDetail').each(function() {
            if($(this).find('SubDetailId').text() == '2390' /*|| $(this).find('SubDetailId').text() == '2089' /*|| $(this).find('SubDetailId').text() == '2056'*/ /*||   $(this).find('SubDetailId').text() == '2391' || $(this).find('SubDetailId').text() == '2090'*/) {
                var v = $(this).find('Value').text();
                if(v) {
                    energy += '<p class="e-total">';
                    energy += '<strong>' + $(this).find('Label').text() + ': </strong>';
                    energy += v + ' kWh/an';
                    energy += '</p>';
                }
            } 
        });
        $(this).find('Details EstateServiceGetEstateListResponseDetail Subdetails EstateServiceGetEstateListResponseSubDetail').each(function() {
           if(/*$(this).find('SubDetailId').text() == '2390' ||*/ $(this).find('SubDetailId').text() == '2089' /*|| $(this).find('SubDetailId').text() == '2056'*/ /*|| $(this).find('SubDetailId').text() == '2391' || $(this).find('SubDetailId').text() == '2090'*/) {
               var v = $(this).find('Value').text();
                if(v) {
                    energy += '<p class="e-spec">';
                    energy += '<strong>E Spec: </strong>';
                    energy += v + ' kWh/m²/an';
                    energy += '</p>';
                }
            } 
        });
        $(this).find('Details EstateServiceGetEstateListResponseDetail Subdetails EstateServiceGetEstateListResponseSubDetail').each(function() {
           if(/*$(this).find('SubDetailId').text() == '2390' || $(this).find('SubDetailId').text() == '2089' || $(this).find('SubDetailId').text() == '2056'*/ /*|| $(this).find('SubDetailId').text() == '2391' ||*/ $(this).find('SubDetailId').text() == '2090') {
                var v = $(this).find('Value').text();
                if(v) {
                    energy += '<p class="e-spec">';
                    energy += '<strong>' + $(this).find('Label').text() + ': </strong>';
                    energy += v + '';
                    energy += '</p>';
                }
            } 
        });

        eid_cur = ref;

        $('#SingleTitle').text(city);
        $('#description').html(description);
        $('#ref').text(ref);
        if(status_id == 1 || status_id == 2)
            $('#stat').attr("data-lang", "");
        else
            $('#stat').text(status);     

        $('#cert').text('');

        if(status_id == 3 || status_id == 4)
            $('#price').text("");
        else if(price_show == "false")
            $('#price').attr("data-lang", "RequestPrice");
        else
            $('#price').text(price+currency);

        if(country_id != 1 || !peb)
            $('#peb').css("display", "none");
        else
            $('#peb').attr('src', 'img/peb-'+peb+'.png');

        $('div.energydata').html("");
        if(energy){
            $('div.energydata .peb-data').remove();
            $('div.energydata').append(energy);
        }        

        //pictures

        function shuffle(array) {
          array.sort(() => Math.random() - 0.5);
        }

        function estateSlider(){

          var slideDuration = 5000;
          var speedTransition = 1000;
          var mainSlider = $('.slider_main');
          var navSlider = $('.slider_nav');
          var slidesImg = [];
          var currentPrevSlides = {
              current: 0,
              prev: 0
          }
          var loadToshow = 3;
          var wasLoad = 0;
      
          mainSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
      
              currentPrevSlides.prev = currentSlide;
              currentPrevSlides.current = nextSlide;
      
              playAnimation(currentPrevSlides.current);
      
          });
          mainSlider.on('afterChange', function(){
      
              stopAnimation(currentPrevSlides.prev);
      
          });
          mainSlider.on('lazyLoaded', function(event, slick, image, src){
            // console.log(image, src)
            wasLoad++;

            if(wasLoad === loadToshow){
              $('.wrap-detail').addClass('hide-me')
            }
    
          });
          mainSlider.on('init', function(event, slick){
      
              // console.log(slick);
              
              var slides = slick.$slides;
      
              for(var i = 0; i < slides.length; i++){
      
                  var slide = slides[i];
                  slidesImg.push(slide.querySelector('img'))
      
              }
      
              currentPrevSlides.current = slick.currentSlide;
              
              playAnimation(currentPrevSlides.current);
      
          });
      
          function playAnimation(i){
      
              var img = slidesImg[i];
      
              if(img === null) return;
      
              // debugger;
              img.classList.add('animation_play');
      
          }
          function stopAnimation(i){
      
              var img = slidesImg[i];
      
              if(img === null) return;
              
              img.classList.remove('animation_play');
      
          }
          
          mainSlider.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              speed: speedTransition,
              fade: true,
              infinite: true,
              autoplay: true,
              pauseOnHover: false,
              autoplaySpeed: slideDuration,
              lazyLoad: 'progressive',
              // arrows: false,
              nextArrow: $('.slider_main__arrow.next-slide'),
              prevArrow: $('.slider_main__arrow.prev-slide'),
              asNavFor: '.slider_nav'
          });
      
          navSlider.slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              asNavFor: '.slider_main',
              dots: false,
              centerMode: true,
              infinite: true,
              lazyLoad: 'progressive',
              nextArrow: $('.for-gallery-thumbs.next-slide'),
              prevArrow: $('.for-gallery-thumbs.prev-slide'),
              focusOnSelect: true
          });
      
      }

        var mainSlider = $('.slider_main');
        var navSlider = $('.slider_nav');
        mainSlider.html("");
        navSlider.html("");

        var animationOrder = [
          'animation-zoomIn',
          'animation-zoomOut',
          'animation-zoomInToRight',
          'animation-zoomOutToLeft',
          'animation-zoomInToLeft',
          'animation-zoomOutToRight'
        ]

        var whiseSliderArr = [];

        // var pic_orient = new Array();
        var pic_big = new Array();
        var pic_small = new Array();

        $(this).find('Pictures EstateServiceGetEstateListResponsePicture').each(function() {

            whiseSliderArr.push({
              big: $(this).find('UrlXXL:first').text(),
              small: $(this).find('UrlSmall:first').text(),
              orient: $(this).find('Orientation:first').text()
            })

        });
        // shuffle(whiseSliderArr);

        var i = 0;
        var animI = 0;

        var imgLoaded = 0;

        function imgLoadedCallback(){
            imgLoaded++;

            if(imgLoaded === whiseSliderArr.length){
                CarouselInit();
            }

        }

        for(i=0; i<whiseSliderArr.length; i++) {

            var img = document.createElement('img');
            img.onload = imgLoadedCallback;
            img.onerror = function() {
                alert("Ошибка во время загрузки изображения");
              };
            img.src = whiseSliderArr[i].big;

            var data = '<div class="slider__item swiper-slide"><div class="swiper-slide__bg ' + animationOrder[animI] + '" style="background-image: url(' + whiseSliderArr[i].big + ')"></div></div>';
            mainSlider.append(data);

            data = '<div class="slider__item swiper-slide" style="background-image: url(' + whiseSliderArr[i].small + ')"></div>';
            navSlider.append(data);

            animI = animI === (animationOrder.length - 1) ? 0 : (animI + 1);

        }

        // estateSlider();

        // CarouselInit()   

        // console.log('images_for_displacement_slider', images_for_displacement_slider)





        function setDetailFocus(){
          if(window.innerWidth > 1100){
            $('.box-info_details').focus()
          }
        }
        document.addEventListener('click', setDetailFocus)
        setDetailFocus()


        //documents
        // $('#docs').html("");

        $(this).find('Documents EstateServiceGetEstateListResponseDocument').each(function() {
            var dl = $(this).find('LanguageID').text();
            // debugger;
            if(lang === dl) {
                var doct = $(this).find('Description').text();
                var fn = $(this).find('Url').text().substring($(this).find('Url').text().lastIndexOf('/')+1);
                fn = fn.substring(fn.indexOf('-')+1);
                var s = '/'+ref+'/g';
                fn = fn.replace(s, '');
                fn = fn.replace(/\+/g, ' ');
                doct = (doct) ? doct : fn;
                var text = "fiche détaillée"

                var data = '<a href="' + $(this).find('Url').text() + '" download="' + $(this).find('Url').text() + '" target="_blank" class="pdf" title="' + doct + '"><button data-lang="btnMoreDetail">' + text + '</button></a>';

                $('#docs').prepend(data);
                return false;
            }
        });
    });
    setLanguage(lang);
}

function parserList(xml, replace) {
    if(replace){
        $("#biens").html('');
        currentBiensArr = [];
    }
    var data = "";
    var rowCount = parseInt($(xml).find("QueryInfo RowCount:first").text());

    if ($("#biens>div.noresult").length) $("#biens>div.noresult").remove();

    var estatesArr = $(xml).find("EstateServiceGetEstateListResponseEstate");

    estatesArr.each(function () {
        var country_id = parseInt($(this).find('CountryId:first').text());
        if(urlParameters.countryID !== 1 && country_id == 1) return;

        var eid = $(this).find("EstateID:first").text();
        if(currentBiensArr.indexOf(eid) == -1){
            currentBiensArr.push(eid);
        }else{
            return;
        }
        var name = $(this).find("Name:first").text();
        var price = priceSet($(this).find("Price:first").text());
        var price_show = $(this).find("DisplayPrice:first").text();
        var currency = $(this).find("Currency:first").text();
        var city = $(this).find("City:first").text();
        var pic = $(this).find("Pictures UrlLarge:first").text();
        var pic_big = $(this).find("Pictures UrlXXL:first").text();
        var status = $(this).find("PurposeStatus:first").text();
        var status_id = $(this).find("PurposeStatusId:first").text();
        // console.log(status_id)
        var disp_status = $(this).find("DisplayStatusId:first").text();
        var peb = $(this).find("EnergyClass:first").text().toLocaleLowerCase();

        if (status_id == 3 || status_id == 4)
        var price_text = '<p class="price"></p>';
        else
        var price_text =
            price_show == "false"
            ? '<p class="price" data-lang="RequestPrice"></p>'
            : '<p class="price">' + price + "</p>";

        if (disp_status == 3 && pic_big) {
        pic = pic_big;
        }

        //        if(!$is_end && !page && !cnt) {
        var l = langs_name[langs.indexOf(lang)];
        l = "/" + l + "/detail-bien.php#" + eid;

        var data_one =
        '<a data-detail-id="' +
        eid +
        '" ' +
        'data-aos="fade-up" data-aos-offset="50" ' +
        'href="' +
        l +
        '" class="biens-item ' +
        (disp_status == 3 ? " month " : "") +
        (status_id != 3 &&
        status_id != 4 &&
        status_id != 5 &&
        status_id != 6 &&
        status_id != 7 &&
        status_id != 8 &&
        status_id != 9 &&
        status_id != 10 &&
        status_id != 11 &&
        status_id != 12 &&
        status_id != 13 &&
        status_id != 14 &&
        status_id != 15 &&
        status_id != 16 &&
        status_id != 17 &&
        status_id != 18 &&
        status_id != 19 &&
        status_id != 20 &&
        status_id != 21 &&
        status_id != 22 &&
        status_id != 23
            ? ""
            : " disabled ") +
        '">' +
        (disp_status == 3
            ? '   <div data-lang="EstateOfMonth" class="bienduMois">' +
            $language.EstateOfMonth +
            "</div> "
            : "") +
        '   <div class="case-bien ~b1" style="background: url(' +
        pic +
        ') center/cover;">' +
        '       <div class="info-bien">' +
        "           <h4>" +
        city +
        "</h4>" +
        '           <div class="price-peb">' +
        price_text +
        "               " +
        (peb ? '<img src="img/peb-' + peb + '.png" alt="peb">' : "") +
        "               " +
        (status_id != 1 && status_id != 2
            ? '<p class="price">' + status + "</p>"
            : '<p class="price"></span>') +
        "           </div>" +
        "       </div>" +
        "   </div>" +
        "</a>";
        if (disp_status == 3) data = data_one + data;
        else data = data + data_one;
        /*
                //Bien du mois
                if(disp_status == 3) {
                    data = '<div class="col-sm-12 col-md-8 col-xl-8 grid-item  size1 Portfolio  ">'+
                            ((status_id != 3 && status_id != 4) ?//sold & rented
                            '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
                            '     <img src="' + pic_big + '" alt="'+ pic_big + '" />'+
                            '</a>'
                            :
                            '<span class="bienBox">'+
                            '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
                            '</span>'
                            )+((disp_status == 3) ?
                            '<div class="featured wow fadeIn" data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
                            '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
                            '</div>' : ''
                            )+
                            '<div class="imagebox-desc wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
                            '    <div id="eom" class="col-sm-6 col-md-6 no-padding " > '+
                            '        <span class="commune">' + city + '</span><br />'+
                            '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
                            '        ' + ((!peb) ? '<span class="PEB"> </span> ' : '<span class="PEB"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
                            '    </div>'+
                            '    <div class="col-sm-6 col-md-6 col-xs-6 " style="text-align: right; padding-top: 24px;"> '+
                            '        ' + ((status_id != 1 && status_id != 2) ? '<span id="propertyStatusSR" class="statut">' + status + '</span>' :         '<span id="propertyStatusSR" class="statut" data-lang=""></span>')+   
                            '    </div>'+
                            '</div>'+
                        '</div>' + data;
                } else {
                    data += '<div class="col-sm-12 col-md-4 col-xl-4 grid-item size2 Portfolio ">'+
                            ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
                            && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id !=20 && status_id !=21
                            && status_id !=22 && status_id !=23) ?//sold & rented
                            '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
                            '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
                            '</a>'
                            :
                            '<span class="bienBox">'+
                            '     <img src="' + pic + '" alt="'+ pic + '" />'+
                            '</span>'
                            )+((disp_status == 3) ?
                            '<div class="featured wow fadeIn" data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+                    
                            '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
                            '</div>' : '')+
                            '<div class="imagebox-desc wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+                    
                            '    <div class="col-xs-8 col-sm-8 col-md-8 no-padding">'+
                            '        <span class="commune">' + city + '</span><br />'+
                            '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
                            '        ' + ((!peb) ? '<span class="PEB"> </span> ' : '<span class="PEB"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
                            '    </div>'+
                            '    <div class="col-xs-4 col-sm-4 col-md-4 " style="text-align: right; padding-top: 24px;"> '+
                            '        ' + ((status_id != 1 && status_id != 2) ? '<span id="propertyStatusSR" class="statut">' + status + '</span>' :         '<span id="propertyStatusSR" class="statut" data-lang=""></span>')+                       
                            '    </div>'+
                            '</div>'+
                        '</div>';
                }
        */
    });

    var currentBiensCount = $('.biens-item').length;

    if (data === "" || rowCount === 0 && !currentBiensCount) {
        needPaginate = false;
        $("#biens").append(
        '<div data-lang="NoResultFound" class="noresult white">No result was found</div>'
        );
        setLanguage(lang);
        return false;
    }
    
    if (rowCount > urlParameters.per_page) {
        maxPage = Math.ceil(rowCount / urlParameters.per_page);
        if (maxPage > urlParameters.page) {
        needPaginate = true;
        } else {
        needPaginate = false;
        }
    }

    $("#biens").append(data);

    setLanguage(lang);
}
function getInitialCountryID(){
  var initialState = sessionStorage.getItem('countryID');
  if(initialState !== null){
    return initialState * 1 === 0 ? '' : 1;
  }else{
    return 1
  }
}
function filtersInit () {
    
    if($('.filters-type_btn').length){
        var initialState = getInitialCountryID()
        localStorage.setItem('countryID', initialState);
        sessionStorage.setItem('countryID', initialState);

        initialState = initialState === '' ? 'all' : initialState;
        jQuery('.filters-type_btn[data-filter="' + initialState + '"]').addClass('active')
    }

    $('.filterLink').click(function(e){

        e.preventDefault();

        if(isLoadingData) return;

        let dataField = $(this).data('field');
        let dataVal = $(this).data('filter');

        if(typeof dataVal == "undefined"){
            return;
        }

        // $('.filterLink[data-field=' + $(this).data('field') + ']').removeClass('active');
        $(this).parent().find('.filterLink').removeClass('active');
        $(this).addClass('active');

        if(dataVal == "all"){
            dataVal = ""
        }


        if(dataField === "countryID"){
            localStorage.setItem('countryID', dataVal);
            sessionStorage.setItem('countryID', dataVal);
        }

        urlParameters['categoryIDList'] = '';
        urlParameters['purposeIDlist'] = '';
        urlParameters[dataField] = dataVal;
        urlParameters.page = 0;
        urlParameters.purposeStatusIDList = "[1,2]";
        getBiens({
            show: false,
            callBack: function () {
                urlParameters.purposeStatusIDList = "[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]";
                getBiens({
                    hide: false,
                    replace: false
                });
            }
        });
    })
}
function paginate () {
    let biensHeight = $("#biens").height();
    let windowHeight = $(window).height();
    let lastKnownScrollPosition = 0;
    let ticking = false;
    const whenLoad = 0.5;
    const biensCoor = $("#biens").offset();

    function doSomething (scrollPos) {
        biensHeight = $("#biens").height();
        windowHeight = $(window).height();
        const endPoint = biensCoor.top + biensHeight;
        const currentEndPoint = scrollPos + windowHeight;
        const makeLoad = currentEndPoint >= endPoint * whenLoad;

        if (makeLoad && !isLoadingData && needPaginate) {

            urlParameters.setNextPage();
            urlParameters.lang = lang;
            urlParameters.purposeStatusIDList = "[1,2]";
            getBiens({
                replace: false,
                hide: false,
                show: false
            });
            urlParameters.purposeStatusIDList = "[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]";
            getBiens({
                replace: false,
                hide: false,
                show: false
            });

        }

    };

    window.addEventListener("scroll", () => {

        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
        
            window.requestAnimationFrame(() => {

                doSomething(lastKnownScrollPosition);
                ticking = false;

            });

            ticking = true;

        }

    });

};
$(document).ready( function() {
    
    filtersInit();

    if(typeof document.searchByref !== "undefined"){
        document.searchByref.addEventListener('submit', function(e){
            e.preventDefault();
    
            urlParameters.estateID = this.s.value;
            urlParameters.purposeStatusIDList = "";
            urlParameters.page = 0;
            getBiens();
    
        })
    }
})




$(window).bind('load', function() {
    if($('#biens').length){
        paginate()   
    }
})
