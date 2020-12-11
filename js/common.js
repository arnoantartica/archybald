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

var images_for_displacement_slider = [];

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



// function xmlParser_nosbiens(xml) {
// //console.log(xml);
//     parser = xmlParser_nosbiens;

//     $res_cnt += parseInt($(xml).find("QueryInfo RowCount:first").text());

//     var cnt = 0;
//     var data = '';

//     $(xml).find("EstateServiceGetEstateListResponseEstate").each(function() { 
//         var eid = $(this).find('EstateID:first').text();
//         var name = $(this).find('Name:first').text();
//         var price = priceSet($(this).find('Price:first').text());
//         var price_show = $(this).find('DisplayPrice:first').text();
//         var currency = $(this).find('Currency:first').text();
//         var city = $(this).find('City:first').text();
//         var pic = $(this).find('Pictures UrlLarge:first').text();
//         var pic_big = $(this).find('Pictures UrlXXL:first').text();
//         var status = $(this).find('PurposeStatus:first').text();
//         var status_id = $(this).find('PurposeStatusId:first').text();
//         var disp_status = $(this).find('DisplayStatusId:first').text();
//         var peb = $(this).find('EnergyClass:first').text().toLocaleLowerCase();
        
//         if(status_id == 3 || status_id == 4)
//             var price_text = '<p class="price"></p>';
//         else
//             var price_text = (price_show == "false") ? '<p class="price" data-lang="RequestPrice"></p>' : '<p class="price">' + price + '</p>';

//         if(disp_status == 3 && pic_big){
//             pic = pic_big;
//         }

// //        if(!$is_end && !page && !cnt) {
//         var l = langs_name[langs.indexOf(lang)];
//         l = "/"+l+"/detail-bien.php#"+eid;

//         var data_one = 
//             '<a data-detail-id="'+eid+'" href="'+l+'" class="biens-item '+((disp_status == 3) ? ' month ' : '')+
//             ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//             && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id!=20 && status_id !=21 && status_id !=22 && status_id !=23) ? "" : " disabled ")+'">'+
//             ((disp_status == 3) ? '   <div data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</div> ' : "")+
//             '   <div class="case-bien ~b1" style="background: url(' + pic + ') center/cover;">'+
//             '       <div class="info-bien">'+
//             '           <h4>' + city + '</h4>'+
//             '           <div class="price-peb">'+
//                             price_text+
//             '               '+((peb) ? '<img src="img/peb-'+peb+'.png" alt="peb">' : '')+
//             '               ' + ((status_id != 1 && status_id != 2) ? '<p class="price">' + status + '</p>' : '<p class="price"></span>')+   
//             '           </div>'+
//             '       </div>'+
//             '   </div>'+
//             '</a>';
//         if(disp_status == 3)
//             data = data_one + data;
//         else
//             data = data + data_one;
// /*
//         //Bien du mois
//          if(disp_status == 3) {
//             data = '<div class="col-sm-12 col-md-8 col-xl-8 grid-item  size1 Portfolio  ">'+
//                     ((status_id != 3 && status_id != 4) ?//sold & rented
//                     '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
//                     '     <img src="' + pic_big + '" alt="'+ pic_big + '" />'+
//                     '</a>'
//                     :
//                     '<span class="bienBox">'+
//                     '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                     '</span>'
//                     )+((disp_status == 3) ?
//                     '<div class="featured wow fadeIn" data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
//                     '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
//                     '</div>' : ''
//                     )+
//                     '<div class="imagebox-desc wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
//                     '    <div id="eom" class="col-sm-6 col-md-6 no-padding " > '+
//                     '        <span class="commune">' + city + '</span><br />'+
//                     '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
//                     '        ' + ((!peb) ? '<span class="PEB"> </span> ' : '<span class="PEB"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
//                     '    </div>'+
//                     '    <div class="col-sm-6 col-md-6 col-xs-6 " style="text-align: right; padding-top: 24px;"> '+
//                     '        ' + ((status_id != 1 && status_id != 2) ? '<span id="propertyStatusSR" class="statut">' + status + '</span>' :         '<span id="propertyStatusSR" class="statut" data-lang=""></span>')+   
//                     '    </div>'+
//                     '</div>'+
//                 '</div>' + data;
//         } else {
//             data += '<div class="col-sm-12 col-md-4 col-xl-4 grid-item size2 Portfolio ">'+
//                     ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//                     && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id !=20 && status_id !=21
//                     && status_id !=22 && status_id !=23) ?//sold & rented
//                     '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
//                     '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                     '</a>'
//                     :
//                     '<span class="bienBox">'+
//                     '     <img src="' + pic + '" alt="'+ pic + '" />'+
//                     '</span>'
//                     )+((disp_status == 3) ?
//                     '<div class="featured wow fadeIn" data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+                    
//                     '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
//                     '</div>' : '')+
//                     '<div class="imagebox-desc wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+                    
//                     '    <div class="col-xs-8 col-sm-8 col-md-8 no-padding">'+
//                     '        <span class="commune">' + city + '</span><br />'+
//                     '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
//                     '        ' + ((!peb) ? '<span class="PEB"> </span> ' : '<span class="PEB"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
//                     '    </div>'+
//                     '    <div class="col-xs-4 col-sm-4 col-md-4 " style="text-align: right; padding-top: 24px;"> '+
//                     '        ' + ((status_id != 1 && status_id != 2) ? '<span id="propertyStatusSR" class="statut">' + status + '</span>' :         '<span id="propertyStatusSR" class="statut" data-lang=""></span>')+                       
//                     '    </div>'+
//                     '</div>'+
//                 '</div>';
//         }
// */
//         cnt++;
//         $cur_cnt++;
//     });

//     $('#biens').hide();
//     $('#biens').append(data);
//     $('#biens').fadeIn('slow');

//     if($('#biens>div.noresult').length)
//         $('#biens>div.noresult').remove();
//     if($res_cnt == 0 && $is_end) {
//         $('#biens').append('<div data-lang="NoResultFound" class="noresult white">No result was found</div>');
//     }

//     if(cnt < per_page)
//         show = false;

//     setLanguage(lang);
// }

// function xmlParser_biensaletranger(xml) {
//     parser = xmlParser_biensaletranger;

//     $res_cnt += parseInt($(xml).find("QueryInfo RowCount:first").text());

//     var cnt = 0;
//     var data = '';

//     $(xml).find("EstateServiceGetEstateListResponseEstate").each(function() { 
//         var country_id = parseInt($(this).find('CountryId:first').text());
//         var eid = $(this).find('EstateID:first').text();
//         var name = $(this).find('Name:first').text();
//         var price = priceSet($(this).find('Price:first').text());
//         var price_show = $(this).find('DisplayPrice:first').text();
//         var currency = $(this).find('Currency:first').text();
//         var city = $(this).find('City:first').text();
//         var pic = $(this).find('Pictures UrlLarge:first').text();
//         var pic_big = $(this).find('Pictures UrlXXL:first').text();
//         var status = $(this).find('PurposeStatus:first').text();
//         var status_id = $(this).find('PurposeStatusId:first').text();
//         var disp_status = $(this).find('DisplayStatusId:first').text();
//         var peb = $(this).find('EnergyClass:first').text().toLocaleLowerCase();
        
//         if(status_id == 3 || status_id == 4)
//             var price_text = '<p class="price"></p>';
//         else
//             var price_text = (price_show == "false") ? '<p class="price" data-lang="RequestPrice"></p>' : '<p class="price">' + price + '</p>';

//         if(disp_status == 3 && pic_big){
//             pic = pic_big;
//         }

//         if(country_id != 1) {
//             $res_cnt++;
            
//         var l = langs_name[langs.indexOf(lang)];
//         l = "/"+l+"/detail-bien.php#"+eid;

//         var data_one = 
//             '<a data-detail-id="'+eid+'" href="'+l+'" class="biens-item '+((disp_status == 3) ? ' month ' : '')+
//             ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//             && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id!=20 && status_id !=21 && status_id !=22 && status_id !=23) ? "" : " disabled ")+'">'+
//             ((disp_status == 3) ? '   <div data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</div> ' : "")+
//             '   <div class="case-bien ~b1" style="background: url(' + pic + ') center/cover;">'+
//             '       <div class="info-bien">'+
//             '           <h4>' + city + '</h4>'+
//             '           <div class="price-peb">'+
//                             price_text+
//             '               '+((peb) ? '<img src="img/peb-'+peb+'.png" alt="peb">' : '')+
//             '               ' + ((status_id != 1 && status_id != 2) ? '<p class="price">' + status + '</p>' : '<p class="price"></span>')+   
//             '           </div>'+
//             '       </div>'+
//             '   </div>'+
//             '</a>';
//         if(disp_status == 3)
//             data = data_one + data;
//         else
//             data = data + data_one;
// /*        
//         if(disp_status == 3) {
//                 data = '<div class="col-sm-12 col-md-8  col-xl-8 grid-item  size1 Portfolio ">'+
//                         ((status_id != 3 && status_id != 4) ?//sold & rented
//                         '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
//                         '      <img class="estateThumb" src="' + pic_big + '" alt="'+ pic_big + '" />'+
//                         '</a>'
//                         :
//                         '<span class="bienBox">'+
//                         '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                         '</span>'
//                         )+((disp_status == 3) ?
//                         '<div class="featured wow fadeIn" data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+                    
//                         '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
//                         '</div>' : '')+
//                         '<div class="imagebox-desc feat wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
//                         '    <div class="col-xs-8 col-sm-8 col-md-8 no-padding" >  '+
//                         '        <span class="commune">' + city + '</span><br />'+
//                         '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
//                         '        ' + ((!peb) ? '<span class="PEB hidden"> </span> ' : '<span class="PEB hidden"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
//                         '    </div>'+
//                         '    <div class="col-xs-4 col-sm-4 col-md-4 no-padding" style="text-align: right; padding-top: 24px;"> '+
//                         '        ' + ((status_id != 1 && status_id != 2) ? 
//                                       '<span id="propertyStatusSR" class="statut">' + status + '</span>' :         
//                         '      <span id="propertyStatusSR" class="statut" data-lang=""></span>')+                          
//                         '    </div>'+
//                         '</div>'+
//                     '</div>' + data; 
//             } else {
//                 data += '<div class="col-sm-12 col-md-4  col-xl-4  grid-item  size2 Portfolio ">'+
//                         ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//                     && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id !=20 && status_id !=21
//                     && status_id !=22 && status_id !=23) ?//sold & rented
//                         '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
//                         '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                         '</a>'
//                         :
//                         '<span class="bienBox">'+
//                         '      <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                         '</span>'
//                         )+((disp_status == 3) ?
//                          '<div class="featuredProperty wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
//                         '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
//                         '</div>' : '')+
//                         '<div class="imagebox-desc wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
//                         '    <div class="col-xs-8 col-sm-8 col-md-8 no-padding" > '+
//                         '        <span class="commune">' + city + '</span><br />'+
//                         '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
//                        '        ' + ((!peb) ? '<span class="PEB hidden"> </span> ' : '<span class="PEB hidden"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
//                         '    </div>'+
//                         '    <div class="col-xs-4 col-sm-4 col-md-4 no-padding" style="text-align: right; padding-top: 24px;"> '+
//                         '        ' + ((status_id != 1 && status_id != 2) ? 
//                                       '<span id="propertyStatusSR" class="statut">' + status + '</span>' :         
//                         '      <span id="propertyStatusSR" class="statut" data-lang=""></span>')+                          
//                         '    </div>'+
//                         '</div>'+
//                     '</div>';
//             }
// */
//             cnt++;
//         }
//     });

//     $('#biens').hide();
//     $('#biens').append(data);
//     $('#biens').fadeIn('slow');

//     if($('#biens>div.noresult').length)
//         $('#biens>div.noresult').remove();
//     if($res_cnt == 0 && $is_end) {
//         $('#biens').append('<div data-lang="NoResultFound" class="noresult white">No result was found</div>');
//     }

//     if(cnt < per_page)
//         show = false;

//     setLanguage(lang);
// }

// function xmlParser_recherche(xml) {
//    parser = xmlParser_recherche;

//     $res_cnt += parseInt($(xml).find("QueryInfo RowCount:first").text());

//     var cnt = 0;
//     var data = '';

//     $(xml).find("EstateServiceGetEstateListResponseEstate").each(function() { 
//         var eid = $(this).find('EstateID:first').text();
//         var name = $(this).find('Name:first').text();
//         var price = priceSet($(this).find('Price:first').text());
//         var price_show = $(this).find('DisplayPrice:first').text();
//         var currency = $(this).find('Currency:first').text();
//         var city = $(this).find('City:first').text();
//         var pic = $(this).find('Pictures UrlLarge:first').text();
//         var pic_big = $(this).find('Pictures UrlXXL:first').text();
//         var status = $(this).find('PurposeStatus:first').text();
//         var status_id = $(this).find('PurposeStatusId:first').text();
//         var disp_status = $(this).find('DisplayStatusId:first').text();
//         var peb = $(this).find('EnergyClass:first').text().toLocaleLowerCase();
        
//         if(status_id == 3 || status_id == 4)
//             var price_text = '<p class="price"></p>';
//         else
//             var price_text = (price_show == "false") ? '<p class="price" data-lang="RequestPrice"></p>' : '<p class="price">' + price + '</p>';
        
//         if(disp_status == 3 && pic_big){
//             pic = pic_big;
//         }

//         var l = langs_name[langs.indexOf(lang)];
//         l = "/"+l+"/detail-bien.php#"+eid;

//         var data_one = 
//             '<a data-detail-id="'+eid+'" href="'+l+'" class="biens-item '+((disp_status == 3) ? ' month ' : '')+
//             ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//             && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id!=20 && status_id !=21 && status_id !=22 && status_id !=23) ? "" : " disabled ")+'">'+
//             ((disp_status == 3) ? '   <div data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</div> ' : "")+
//             '   <div class="case-bien ~b1" style="background: url(' + pic + ') center/cover;">'+
//             '       <div class="info-bien">'+
//             '           <h4>' + city + '</h4>'+
//             '           <div class="price-peb">'+
//                             price_text+
//             '               '+((peb) ? '<img src="img/peb-'+peb+'.png" alt="peb">' : '')+
//             '               ' + ((status_id != 1 && status_id != 2) ? '<p class="price">' + status + '</p>' : '<p class="price"></span>')+   
//             '           </div>'+
//             '       </div>'+
//             '   </div>'+
//             '</a>';
//         if(disp_status == 3)
//             data = data_one + data;
//         else
//             data = data + data_one;
// /*
//             data +=  '<div class="col-xs-12  col-sm-6  col-lg-6 col-xl-6 col-xxl-4 grid-item size3 Portfolio ">'+                  ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//                     && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id !=20 && status_id !=21
//                     && status_id !=22 && status_id !=23) ?//sold & rented
//                     '<a class="bienBox" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
//                     '      <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                     '</a>'
//                     :
//                     '<span class="bienBox">'+
//                     '     <img class="estateThumb" src="' + pic + '" alt="'+ pic + '" />'+
//                     '</span>'
//                     )+((disp_status == 3) ?
//                     '<div class="featured wow fadeIn" data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+                    
//                     '    <span data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</span> '+
//                 '</div>' : '')+
//                 '<div class="imagebox-desc container-fluid wow fadeIn"  data-wow-duration="1s" data-wow-iteration="1" data-wow-delay="1s">'+
//                 '    <div class="col-xs-8 col-sm-8 col-md-8 no-padding" > '+
//                 '        <span class="commune">' + city + '</span><br />'+
//                 '        ' + ((price_show == "false") ? '<span class="currency" data-lang="RequestPrice"></span>' : (status_id != 3 && status_id != 4) ? '<span class="prix">' + price + '</span><span class="currency">' + currency + '</span>' : '<span class="currency" data-lang=""></span>')+
//                 '        ' + ((!peb) ? '<span class="PEB"> </span> ' : '<span class="PEB"><img src="img/PEB/peb-'+peb+'.png"> </span> ')+
//                 '    </div>'+
//                 '    <div class="col-xs-4 col-sm-4 col-md-4 no-padding" style="text-align: right; padding-top: 24px !important;"> '+
//                 '        ' + ((status_id != 1 && status_id != 2) ? '<span id="propertyStatusSR" class="statut">' + status + '</span>' :   
//                 '      <span id="propertyStatusSR" class="statut" data-lang=""></span>')+                          
//                 '    </div>'+
//                 '</div>'+
//             '</div>';
// */
//         cnt++;
//     });

//     $('#reference>div.biens').hide();
//     $('#reference>div.biens').append(data);
//     $('#reference>div.biens').fadeIn('slow');

//     if($('#reference>div.biens>div.noresult').length)
//         $('#reference>div.biens>div.noresult').remove();
//     if($res_cnt == 0 && $is_end) {
//         $('#reference>div.biens').append('<div data-lang="NoResultFound" class="noresult white">No result was found</div>');
//     }

//     if(cnt < per_page)
//         show = false;

//     setLanguage(lang);
// }

// function xmlParser_favoris(xml) {
// //console.log(xml);

//     parser = xmlParser_favoris;

//     $res_cnt += parseInt($(xml).find("QueryInfo RowCount:first").text());

//     var cnt = 0;
//     var data = '';

//     $(xml).find("EstateServiceGetEstateListResponseEstate").each(function() {
//         var eid = $(this).find('EstateID:first').text();
//         var name = $(this).find('Name:first').text();
//         var price = priceSet($(this).find('Price:first').text());
//         var price_show = $(this).find('DisplayPrice:first').text();
//         var currency = $(this).find('Currency:first').text();
//         var city = $(this).find('City:first').text();
//         var pic = $(this).find('Pictures UrlLarge:first').text();
//         var pic_big = $(this).find('Pictures UrlXXL:first').text();
//         var status = $(this).find('PurposeStatus:first').text();
//         var status_id = $(this).find('PurposeStatusId:first').text();
//         var disp_status = $(this).find('DisplayStatusId:first').text();
//         var peb = $(this).find('EnergyClass:first').text().toLocaleLowerCase();
        
//         if(status_id == 3 || status_id == 4)
//             var price_text = '<p class="price"></p>';
//         else
//             var price_text = (price_show == "false") ? '<p class="price" data-lang="RequestPrice"></p>' : '<p class="price">' + price + '</p>';
        
//         if(disp_status == 3 && pic_big){
//             pic = pic_big;
//         }

//         var l = langs_name[langs.indexOf(lang)];
//         l = "/"+l+"/detail-bien.php#"+eid;

//         var data_one = 
//             '<a data-detail-id="'+eid+'" href="'+l+'" class="biens-item '+((disp_status == 3) ? ' month ' : '')+
//             ((status_id != 3 && status_id != 4 && status_id !=5 && status_id !=6 && status_id !=7 && status_id !=8 && status_id !=9 && status_id !=10 && status_id !=11
//             && status_id !=12 && status_id !=13 && status_id !=14 && status_id !=15 && status_id !=16 && status_id !=17 && status_id !=18 && status_id !=19 && status_id!=20 && status_id !=21 && status_id !=22 && status_id !=23) ? "" : " disabled ")+'">'+
//             ((disp_status == 3) ? '   <div data-lang="EstateOfMonth" class="bienduMois">'+$language.EstateOfMonth+'</div> ' : "")+
//             '   <div class="heart-list change-favor active" onclick="setFavorite('+eid+'); getMainData();"><i class="noaction fas fa-heart"></i></div>'+
//             '   <div class="case-bien ~b1" style="background: url(' + pic + ') center/cover;">'+
//             '       <div class="info-bien">'+
//             '           <h4>' + city + '</h4>'+
//             '           <div class="price-peb">'+
//                             price_text+
//             '               '+((peb) ? '<img src="img/peb-'+peb+'.png" alt="peb">' : '')+
//             '               ' + ((status_id != 1 && status_id != 2) ? '<p class="price">' + status + '</p>' : '<p class="price"></span>')+   
//             '           </div>'+
//             '       </div>'+
//             '   </div>'+
//             '</a>';
//         if(disp_status == 3)
//             data = data_one + data;
//         else
//             data = data + data_one;
// /*
//         data += '<div class="parent col-xs-12 col-md-6 col-lg-4 col-xl-4">'+
//                 '    <div class="card">'+
//                 '        <div class="removeFav" onclick="setFavorite(\''+eid+'\'); $(this).parents(\'.parent\').fadeOut(\'slow\'); noFavorites();">  <i class="fa fa-times" aria-hidden="true"></i> </div>'+
//                 '        <a class="img-card" data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">'+
//                 '             <img src="' + pic_big + '" alt="'+ pic_big + '" />'+
//                 '        </a>'+
//                 '        <div class="card-content">'+
//                 '            <h5 class="card-title">'+
//                 '                <a data-detail-id="'+eid+'" href="detail-bien.php#'+eid+'">' + city + '</a>'+
//                 '            </h5>'+
//                 '            <p class="white small">' + description + '</p>'+
//                 '        </div>'+
//                 '    </div>'+
//                 '</div>';
// */
//         cnt++;
//     });

//     $('#biens').hide();
//     $('#biens').append(data);
//     $('#biens').fadeIn('slow');

//     if($('#biens>div.noresult').length)
//         $('#biens>div.noresult').remove();
//     if($res_cnt == 0 && $is_end) {
//         $('#biens').append('<div data-lang="NoResultFound" class="noresult white">No result was found</div>');
//     }

//     if(cnt < per_page)
//         show = false;

//     setLanguage(lang);
// }


// function xmlParser_detail(xml) {
// //console.log(xml);

//     parser = xmlParser_detail;

//     var cnt = 0;

//     $(xml).find("EstateServiceGetEstateListResponseEstate").each(function() { 
//         var country_id = parseInt($(this).find('CountryId:first').text());
//         var ref = $(this).find('EstateID').text();
//         var name = $(this).find('Name:first').text();
//         var description = $(this).find('ShortDescription:first').text();
//         var price = priceSet($(this).find('Price:first').text());
//         var price_show = $(this).find('DisplayPrice:first').text();
//         var currency = $(this).find('Currency:first').text();
//         var city = $(this).find('City:first').text();
//         var pic = $(this).find('Pictures UrlLarge:first').text();
//         var status = $(this).find('PurposeStatus:first').text();
//         var status_id = $(this).find('PurposeStatusId:first').text();
//         var disp_status = $(this).find('DisplayStatusId:first').text();
//         var peb = $(this).find('EnergyClass:first').text().toLocaleLowerCase();
//         var kw = $(this).find('EnergyValue:first').text();
//         var energy = '';

// // || $(this).find('SubDetailId').text() == '2090' ----CO2

//         $(this).find('Details EstateServiceGetEstateListResponseDetail Subdetails EstateServiceGetEstateListResponseSubDetail').each(function() {
//             if($(this).find('SubDetailId').text() == '2390' /*|| $(this).find('SubDetailId').text() == '2089' /*|| $(this).find('SubDetailId').text() == '2056'*/ /*||   $(this).find('SubDetailId').text() == '2391' || $(this).find('SubDetailId').text() == '2090'*/) {
//                 var v = $(this).find('Value').text();
//                 if(v) {
//                     energy += '<p class="e-total">';
//                     energy += '<strong>' + $(this).find('Label').text() + ': </strong>';
//                     energy += v + ' kWh/an';
//                     energy += '</p>';
//                 }
//             } 
//         });
//         $(this).find('Details EstateServiceGetEstateListResponseDetail Subdetails EstateServiceGetEstateListResponseSubDetail').each(function() {
//            if(/*$(this).find('SubDetailId').text() == '2390' ||*/ $(this).find('SubDetailId').text() == '2089' /*|| $(this).find('SubDetailId').text() == '2056'*/ /*|| $(this).find('SubDetailId').text() == '2391' || $(this).find('SubDetailId').text() == '2090'*/) {
//                var v = $(this).find('Value').text();
//                 if(v) {
//                     energy += '<p class="e-spec">';
//                     energy += '<strong>E Spec: </strong>';
//                     energy += v + ' kWh/m²/an';
//                     energy += '</p>';
//                 }
//             } 
//         });
//         $(this).find('Details EstateServiceGetEstateListResponseDetail Subdetails EstateServiceGetEstateListResponseSubDetail').each(function() {
//            if(/*$(this).find('SubDetailId').text() == '2390' || $(this).find('SubDetailId').text() == '2089' || $(this).find('SubDetailId').text() == '2056'*/ /*|| $(this).find('SubDetailId').text() == '2391' ||*/ $(this).find('SubDetailId').text() == '2090') {
//                 var v = $(this).find('Value').text();
//                 if(v) {
//                     energy += '<p class="e-spec">';
//                     energy += '<strong>' + $(this).find('Label').text() + ': </strong>';
//                     energy += v + '';
//                     energy += '</p>';
//                 }
//             } 
//         });

//         eid_cur = ref;

//         $('#SingleTitle').text(city);
//         $('#description').html(description);
//         $('#ref').text(ref);
//         if(status_id == 1 || status_id == 2)
//             $('#stat').attr("data-lang", "");
//         else
//             $('#stat').text(status);     

//         $('#cert').text('');

//         if(status_id == 3 || status_id == 4)
//             $('#price').text("");
//         else if(price_show == "false")
//             $('#price').attr("data-lang", "RequestPrice");
//         else
//             $('#price').text(price+currency);

//         if(country_id != 1 || !peb)
//             $('#peb').css("display", "none");
//         else
//             $('#peb').attr('src', 'img/peb-'+peb+'.png');

//         $('div.energydata').html("");
//         if(energy){
//             $('div.energydata .peb-data').remove();
//             $('div.energydata').append(energy);
//         }        

//         //pictures
//         $('.gallery-top .swiper-wrapper').html("");
//         $('.gallery-thumbs .swiper-wrapper').html("");

//         var pic_orient = new Array();
//         var pic_big = new Array();
//         var pic_small = new Array();

//         var i = 0;
//         $(this).find('Pictures EstateServiceGetEstateListResponsePicture').each(function() {
//             pic_big[i] = $(this).find('UrlXXL:first').text();
//             pic_small[i] = $(this).find('UrlSmall:first').text();
//             pic_orient[i] = $(this).find('Orientation:first').text();
//             i++;
//         });
//         for(i=0; i<pic_big.length; i++) {
//             var data = '<div class="swiper-slide" style="background-image:url(' + pic_big[i] + ')"></div>';
//             $('.gallery-top .swiper-wrapper').append(data);

//             data = '<div class="swiper-slide" style="background-image:url(' + pic_small[i] + ')"></div>';
//             $('.gallery-thumbs .swiper-wrapper').append(data);
//         }
//         CarouselInit();

//         //documents
//         $('#docs').html("");

//         $(this).find('Documents EstateServiceGetEstateListResponseDocument').each(function() {
//             var dl = $(this).find('LanguageID').text();
            
//             if((lang == 'nl-BE' && dl == 'nl-BE') || (lang != 'nl-BE' && dl != 'nl-BE')) {
//                 var doct = $(this).find('Description').text();
//                 var fn = $(this).find('Url').text().substring($(this).find('Url').text().lastIndexOf('/')+1);
//                 fn = fn.substring(fn.indexOf('-')+1);
//                 var s = '/'+ref+'/g';
//                 fn = fn.replace(s, '');
//                 fn = fn.replace(/\+/g, ' ');
//                 doct = (doct) ? doct : fn;
//                 var text = "fiche détaillée"

//                 var data = '<a href="' + $(this).find('Url').text() + '" download="' + $(this).find('Url').text() + '" target="_blank" class="pdf" title="' + doct + '"><button data-lang="btnMoreDetail">' + text + '</button></a>';

//                 $('#docs').append(data);
//             }
//         });
//     });
//     setLanguage(lang);
// }

// function setFilter(flt) {
//     var fields = new Array();
//     var vals = new Array();
//     var field = $(flt).data('field');

//     $('.filterLink[data-field='+field+']').removeClass('active').removeClass('target');
//     $(flt).addClass('active').addClass('target');

//     var cats = $(flt).data('filter');
//     if(cats == 'all')
//         cats = '';

//     var i = 0;

//     if(cats) {
//         fields[0] = field;
//         vals[0] = cats;

//         i = 1;
//     }

//     $('.filterLink[data-field!='+field+'].active[data-filter!=all]').each(function() {
//         fields[i] = $(this).data('field');
//         vals[i] = $(this).data('filter');

//         i++;
//     });

//     var filter = '';
//     for(var i=0; i<fields.length; i++) {
//         filter += ',"' + fields[i] + '":[' + vals[i] + ']';
//     }

//     if(parser == xmlParser_nosbiens) 
//        filter += ',"countryID":1';

//     $('#biens').fadeOut('slow');
//     $('.biens-item').remove();

//     page = 0;
//     show = true;
//     $res_cnt = 0;
//     $is_end = 0;

//     while(show) {
//         var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[1,2],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":1' + filter + '}';

//         $.ajax({
//             async: false,
//             type: "GET",
//             url: url,
//             dataType: "xml",
//             success: parser
//         });

//         page++;

//         if(page>10) break;
//     }

//     page = 0;
//     show = true;
//     $is_end = 1;

//     while(show) {
//         var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":1' + filter + '}';

//         $.ajax({
//             async: false,
//             type: "GET",
//             url: url,
//             dataType: "xml",
//             success: parser
//         });

//         page++;
//         if(page>10) break;
//     }

//     page = 0;
//     show = true;
//     $res_cnt = 0;
// }

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
        $('.gallery-top .swiper-wrapper').html("");
        $('.gallery-thumbs .swiper-wrapper').html("");

        var pic_orient = new Array();
        var pic_big = new Array();
        var pic_small = new Array();

        var i = 0;
        $(this).find('Pictures EstateServiceGetEstateListResponsePicture').each(function() {
            pic_big[i] = $(this).find('UrlXXL:first').text();
            pic_small[i] = $(this).find('UrlSmall:first').text();
            pic_orient[i] = $(this).find('Orientation:first').text();
            i++;
        });
        for(i=0; i<pic_big.length; i++) {
            var data = '<div class="swiper-slide" style="background-image:url(' + pic_big[i] + ')"></div>';
            $('.gallery-top .swiper-wrapper').append(data);

            data = '<div class="swiper-slide" style="background-image:url(' + pic_small[i] + ')" data-swiper-slide-index="' + i + '"></div>';
            $('.gallery-thumbs .swiper-wrapper').append(data);

            images_for_displacement_slider.push(pic_big[i]);
            // images_for_displacement_slider.push(pic_small[i]);

        }



        // images_for_displacement_slider = ["https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/6c49a7aa8c484da69c461777c93834cf.jpg", 
        // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/6bd2080577e740cba273488f66357258.jpg", 
        // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/c79ffea36cef488cbc6872f0cac0ab3d.jpg",
        // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/d1b1a96d353e42e0ba081d01ce068e13.jpg",
        // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/0840747ab7f3442b914efab63222b679.jpg"
        // ];
        // console.log('images_for_displacement_slider', images_for_displacement_slider)




























"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// GLOBAL FUNCTIONS ----------------------
var log = console.log;

if (!window.console) {
  console = {};

  console.log = function () {};

  log = function log() {};
}

// angular.module('app').controller('DisplacementSliderCtrl', DisplacementSliderCtrl);

function DisplacementSliderCtrl() {
  var vm = this;
  var DEV = 1;
  var vp_width = $(window).width();
  var vp_height = $(window).height();
  // var images_for_displacement_slider = ["http://localhost:9000/ARCHYBALD/_ASSETS/6c49a7aa8c484da69c461777c93834cf.jpg", "http://localhost:9000/ARCHYBALD/_ASSETS/6bd2080577e740cba273488f66357258.jpg", "http://localhost:9000/ARCHYBALD/_ASSETS/c79ffea36cef488cbc6872f0cac0ab3d.jpg"]; // images_for_displacement_slider = ["https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/6c49a7aa8c484da69c461777c93834cf.jpg", 
  // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/6bd2080577e740cba273488f66357258.jpg", 
  // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/c79ffea36cef488cbc6872f0cac0ab3d.jpg",
  // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/d1b1a96d353e42e0ba081d01ce068e13.jpg",
  // "https://whisestorageprod.blob.core.windows.net/public/archybald/Pictures/3808117/1920/0840747ab7f3442b914efab63222b679.jpg"
  // ];
  //      images_for_displacement_slider.forEach(function(url, index){
  // var image = new Image();
  // image.src = url;
  // image.onload = function() {
  //     // images_array_of_objects.push({
  //     //     url: url,
  //     //     width: this.width,
  //     //     height: this.height,
  //     //     ratio: this.width / this.height
  //     // })
  //     log('load')
  // }
  //   })
  //https://codepen.io/ashthornton/pen/ZmxaWv?editors=1010

  var Slider = /*#__PURE__*/function () {
    function Slider(canvas, loader) {
      _classCallCheck(this, Slider);

      this.canvas = canvas;
      this.loader = loader;
      this.setOptions();
      this.createApp();
      this.loadImages();
    }

    _createClass(Slider, [{
      key: "setOptions",
      value: function setOptions() {
        PIXI.utils.skipHello(); // turn off console branding

        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
        PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
        this.dpr = window.devicePixelRatio && window.devicePixelRatio >= 2 ? 2 : 1;
        this.thumbsVisible = false;
        this.animating = false;
        this.slideData = images_for_displacement_slider;
      }
    }, {
      key: "createApp",
      value: function createApp() {
        this.app = new PIXI.Application(this.canvasWidth, this.canvasHeight, {
          view: this.canvas,
          width: this.canvasWidth,
          height: this.canvasHeight,
          transparent: true,
          resolution: this.dpr,
          autoResize: true
        });
      }
    }, {
      key: "loadImages",
      value: function loadImages() {
        var _this = this;

        images_for_displacement_slider.forEach(function (element) {
          PIXI.loader.add(element);
          console.log('image loaded');
        });
        PIXI.loader.load(function (l, images) {
          _this.images = images;

          _this.createSlider();

          log('sliderCreated'); // this.loader.hide();
          galleryThumbs.on('slideNextTransitionStart', function() {
              if (galleryThumbs.autoplay.running === true) {
                  slider.nextSlide();
              }
          });
          galleryThumbs.autoplay.start();
        });
      }
    }, {
      key: "createSlider",
      value: function createSlider() {
        var _this2 = this;

        this.slider = new PIXI.Container();
        this.slider.width = this.app.screen.width;
        this.slider.height = this.app.screen.height;
        this.app.stage.addChild(this.slider);
        this.clipRect = new PIXI.Rectangle(0, 0, this.app.screen.width, this.app.screen.height);
        this.slider.filterArea = this.clipRect;
        this.app.stage.interactive = true;
        this.addSlides();
        this.createDisplacementFilter();
        this.buttonEvents();
        $('#displacement_slider').addClass('show-me')
        $('.wrap-detail').addClass('hide-me')
        $('.pause-wrap').addClass('displacement-slider-loaded')
      }
    }, {
      key: "addSlides",
      value: function addSlides() {
        var _this3 = this;

        this.slides = {
          activeIndex: 0,
          count: 0
        };
        var i = 0;
        var $canvas_holder = document.getElementById('canvas_holder');
        var container_w = $canvas_holder.offsetWidth;
        var container_h = $canvas_holder.offsetHeight;
        var container_ra = container_w / container_h;
        var root_url = window.location.href.match(/^.*\//);
        Object.keys(this.images).forEach(function (key) {
          var slide = new PIXI.Sprite(_this3.images[key].texture);
          var source_image_w = _this3.images[key].data.width;
          var source_image_h = _this3.images[key].data.height;
          var source_image_ra = source_image_w / source_image_h;
          var container_source_width_ra = container_w / source_image_w;
          var container_source_height_ra = container_h / source_image_h;

          if (source_image_ra < container_ra) {
            slide.width = container_w;
            slide.height = source_image_h * container_source_width_ra;
            slide.x = 0;
            slide.y = -((slide.height - container_h) / 2);
          } else {
            slide.height = container_h;
            slide.width = source_image_w * container_source_height_ra;
            slide.x = -((slide.width - container_w) / 2);
            slide.y = 0;
          } // var width_scale = vp_width / source_image_w;
          // var height_should_be = parseInt((source_image_h * width_scale).toFixed(0));
          // var y_offset = -((height_should_be - vp_height) / 2)
          // slide.width = this.app.screen.width;
          // slide.height = height_should_be;
          // slide.y = y_offset;


          slide.original_canvas_w = $canvas_holder.offsetWidth;
          slide.original_canvas_h = $canvas_holder.offsetHeight;
          slide.original_image_w = _this3.images[key].data.width;
          slide.original_image_h = _this3.images[key].data.height;
          slide.alpha = i === 0 ? 1 : 0;
          slide.original_adapted_image_w = slide.width;
          slide.original_adapted_image_h = slide.height;

            slide.filterArea = this.clipRect;
            slide.dispSprite = PIXI.Sprite.fromImage(root_url + 'img/displacement_filter.jpg');
            slide.dispSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
            slide.dispSprite.skew.x = 1;
            slide.dispSprite.skew.y = -1;
            slide.dispSprite.position.y = 380;
            slide.dispSprite.scale.y = 1.8;
            slide.dispSprite.scale.x = 1.8;
            slide.dispFilter = new PIXI.filters.DisplacementFilter( slide.dispSprite, 0 );
            slide.filters = [ slide.dispFilter ];

          _this3.slides[i] = slide;
          _this3.slides[i].y_offset = slide.y;
          _this3.slides[i].x_offset = slide.x;

          _this3.slider.addChild(slide);

          i++;
          _this3.slides.count++;
        });
        this.onResize(); // this.prevBtn.addEventListener( 'click', this.prevSlide.bind( this ) );

        window.onresize = this.onResize.bind(this);
      }
    }, {
      key: "nextSlide",
      value: function nextSlide() {
        var _this4 = this;

        var this_index = this.slides.activeIndex;
        var next_index;

        if (this_index + 1 >= this.slides.count) {
          next_index = 0;
        } else {
          next_index = this.slides.activeIndex + 1;
        }

        if (this.nextBtn.getAttribute('disabled') || this.animating) return false;
        this.prevBtn.removeAttribute('disabled');

        if (this.slides.activeIndex + 2 >= this.slides.count) {// this.nextBtn.setAttribute( 'disabled', 'disabled' );
        }

        // console.log('galleryThumbs.autoplay', galleryThumbs.autoplay)
        if (galleryThumbs.autoplay.running === false) {
            galleryThumbs.slideNext();
        }

        var tl = new TimelineMax({
          onStart: function onStart() {
            _this4.animating = true;
            $('.for-gallery-thumbs').hide()
          },
          onComplete: function onComplete() {
            if (_this4.slides.activeIndex + 1 >= _this4.slides.count) {
              _this4.slides.activeIndex = 0;
            } else {
              _this4.slides.activeIndex++;
            }
            $('.for-gallery-thumbs').show()

            _this4.animating = false;
          }
        });
        var last_index = this.slides.count - 1;

        if (this_index === 0) {
          tl.to(this.slides[last_index], 0.7, {
            y: this.slides[last_index].y_offset,
            x: this.slides[last_index].x_offset,
            alpha: 0 // ease: 'Expo.easeInOut'

          }, 0);
        }

        tl.to(this.slides[this_index], 0.7, {
          y: this.slides[this_index].y_offset,
          x: this.slides[this_index].x_offset,
          alpha: 0 // ease: 'Expo.easeInOut'

        }, 0).fromTo(this.slides[next_index], 0.8, {
          y: this.slides[next_index].y_offset,
          x: this.slides[next_index].x_offset,
          alpha: 0
        }, {
          y: this.slides[next_index].y_offset,
          x: this.slides[next_index].x_offset,
          alpha: 1 // ease: 'Expo.easeInOut'

        }, 0)
        .fromTo( this.slides[ next_index ].dispFilter.scale, 0.8, {
            x: 400,
            y: 0,
        }, {
            x: 0,
            y: 0,
            // ease: 'Expo.easeInOut'
        }, 0 );
      }
    }, {
      key: "prevSlide",
      value: function prevSlide() {
        var _this5 = this;

        var this_index = this.slides.activeIndex;
        var next_index;

        if (this_index === 0) {
          next_index = this.slides.count - 1;
        } else {
          next_index = this.slides.activeIndex - 1;
        }

        if (this.prevBtn.getAttribute('disabled') || this.animating) return false;
        this.nextBtn.removeAttribute('disabled');

        if (this.slides.activeIndex - 2 < 0) {// this.prevBtn.setAttribute( 'disabled', 'disabled' );
        }

        galleryThumbs.slidePrev();
        var tl = new TimelineMax({
          onStart: function onStart() {
            _this5.animating = true;
            $('.for-gallery-thumbs').hide()
          },
          onComplete: function onComplete() {
            if (_this5.slides.activeIndex === 0) {
              _this5.slides.activeIndex = _this5.slides.count - 1;
            } else {
              _this5.slides.activeIndex--;
            }
            $('.for-gallery-thumbs').show()

            _this5.animating = false;
          }
        });
        var last_index = this.slides.count - 1;

        if (this_index === 0) {
          tl.to(this.slides[last_index], 0.7, {
            y: this.slides[last_index].y_offset,
            x: this.slides[last_index].x_offset,
            alpha: 0 // ease: 'Expo.easeInOut'

          }, 0);
        }

        tl.to(this.slides[this_index], 0.7, {
          y: this.slides[this_index].y_offset,
          x: this.slides[this_index].x_offset,
          alpha: 0 // ease: 'Expo.easeInOut'

        }, 0).fromTo(this.slides[next_index], 0.8, {
          y: this.slides[next_index].y_offset,
          x: this.slides[next_index].x_offset,
          alpha: 0
        }, {
          y: this.slides[next_index].y_offset,
          x: this.slides[next_index].x_offset,
          alpha: 1 // ease: 'Expo.easeInOut'

        }, 0)
        .fromTo( this.slides[ next_index ].dispFilter.scale, 0.8, {
            x: 400,
            y: 0,
        }, {
            x: 0,
            y: 0,
            // ease: 'Expo.easeInOut'
        }, 0 );
      }
    }, {
      key: "reachSlide",
      value: function reachSlide(index) {
        var _this6 = this;

        var this_index = this.slides.activeIndex;
        var next_index = index;
        if (this_index === next_index || next_index >= this.slides.count || this.animating) return false; // galleryThumbs.slideTo(next_index)

        var tl = new TimelineMax({
          onStart: function onStart() {
            _this6.animating = true;
            $('.for-gallery-thumbs').hide();
          },
          onComplete: function onComplete() {
            _this6.slides.activeIndex = next_index;
            _this6.animating = false;
            $('.for-gallery-thumbs').show();
          }
        });
        tl.to(this.slides[this_index], 0.7, {
          y: this.slides[this_index].y_offset,
          x: this.slides[this_index].x_offset,
          alpha: 0 // ease: 'Expo.easeInOut'

        }, 0).fromTo(this.slides[next_index], 0.8, {
          y: this.slides[next_index].y_offset,
          x: this.slides[next_index].x_offset,
          alpha: 0
        }, {
          y: this.slides[next_index].y_offset,
          x: this.slides[next_index].x_offset,
          alpha: 1 // ease: 'Expo.easeInOut'

        }, 0)
        .fromTo( this.slides[ next_index ].dispFilter.scale, 0.8, {
            x: 400,
            y: 0,
        }, {
            x: 0,
            y: 0,
            // ease: 'Expo.easeInOut'
        }, 0 );
      }
    }, {
      key: "createDisplacementFilter",
      value: function createDisplacementFilter() {
        // var root_url = window.location.href.match(/^.*\//);
        // this.dispSprite = PIXI.Sprite.fromImage(root_url + 'img/displacement_filter.jpg');
        // this.dispSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        // this.dispSprite.skew.x = 1;
        // this.dispSprite.skew.y = -1;
        // this.dispSprite.position.y = 380;
        // this.dispSprite.scale.y = 1.8;
        // this.dispSprite.scale.x = 1.8;
        // this.app.stage.addChild(this.dispSprite);
        // this.dispFilter = new PIXI.filters.DisplacementFilter(this.dispSprite, 0);
        // this.slider.filters = [this.dispFilter];
      }
    }, {
      key: "buttonEvents",
      value: function buttonEvents() {
        var _this7 = this;

        this.prevBtn = document.querySelector('.prev-slide.displacement');
        this.nextBtn = document.querySelector('.next-slide.displacement');
        this.prevBtn.addEventListener('click', this.prevSlide.bind(this));
        this.nextBtn.addEventListener('click', this.nextSlide.bind(this));

        document.onkeydown = function (e) {
          e = e || window.event;

          if (e.keyCode == 38 || e.keyCode == 37) {
            _this7.prevSlide.call(_this7);
          } else if (e.keyCode == 40 || e.keyCode == 39) {
            _this7.nextSlide.call(_this7);
          }
        };
      }
    }, {
      key: "onResize",
      value: function onResize() {
        var _this8 = this;

        var $canvas_holder = document.getElementById('canvas_holder');
        var $canvas = document.getElementById('canvas_slider');
        var canvas_holder_w = $canvas_holder.offsetWidth;
        var canvas_holder_h = $canvas_holder.offsetHeight;
        $canvas.style.width = canvas_holder_w + 'px';
        $canvas.style.height = canvas_holder_h + 'px';
        var i = 0;
        Object.keys(this.slides).forEach(function (key) {
          // log('this.slides', _this8.slides);
          var transformation_ratio_w = canvas_holder_w / _this8.slides[key].original_canvas_w;
          var transformation_ratio_h = canvas_holder_h / _this8.slides[key].original_canvas_h; // this.slides[key].width = this.slides[key].original_canvas_w / transformation_ratio_w
          // this.slides[key].height = this.slides[key].original_canvas_h / transformation_ratio_h
          // var width_scale = canvas_holder_w / this.slides[key].original_image_w;
          // var height_should_be = parseInt((this.slides[key].original_image_h * width_scale).toFixed(0));
          // var y_offset = -((height_should_be - canvas_holder_h) / 2);
          // this.slides[key].y = y_offset * transformation_ratio_h
          // this.slides[key].y_offset = y_offset
          // log('this.slides[key].transform', this.slides[key].transform)
          // this.slides[key].transform.scale.y = 0.8
          // var image_width = this.images[key].data.width;
          // var image_height = this.images[key].data.height;
          // var width_scale = vp_width / image_width;
          // var height_should_be = parseInt((image_height * width_scale).toFixed(0));
          // var y_offset = -((height_should_be - vp_height) / 2)
          //    let slide = new PIXI.Sprite( this.images[key].texture );
          // slide.width = this.app.screen.width;
          //    slide.height = height_should_be;
          //    slide.y = y_offset;
          //    slide.alpha = i === 0 ? 1 : 0;
          //    this.slides[ i ] = slide;
          //    this.slides[ i ].y_offset = y_offset;
          //    this.slider.addChild( slide );
          //    i++;
          //    this.slides.count++;
        });
      }
    }]);

    return Slider;
  }(); // let loader = new Loader();


  var slider = new Slider(document.getElementById('canvas_slider'));
  $('.gallery-thumbs .swiper-slide').on('click', function () {

    if (slider.animating) return false;
    var index = parseInt($(this).attr('data-swiper-slide-index')); // log('index', index)

    slider.reachSlide(index);
    galleryThumbs.slideToLoop(index);

    galleryThumbs.autoplay.stop();
    $('.pause-btn').addClass('active')
  });

  $('.prev-slide.for-gallery-thumbs').on('click', function () {
    if (slider.animating) return false;
    slider.prevSlide();
  });
  $('.next-slide.for-gallery-thumbs').on('click', function () {
    if (slider.animating) return false;
    slider.nextSlide(); 
  });

  $('.next-slide.slider-arrows.displacement').on('click', function () {
      galleryThumbs.autoplay.stop();
  });
  $('.prev-slide.slider-arrows.displacement').on('click', function () {
      galleryThumbs.autoplay.stop();
  });
}

;


DisplacementSliderCtrl();






















        CarouselInit();





        //documents
        $('#docs').html("");

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

                $('#docs').append(data);
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
