
<?php require('include/header.php'); ?>

<div class="res16-9_wrap">
    <div class="res16-9">
    <main id="detail-bien">
        <?php require('include/menu.php'); ?>
        <?php require('include/contact-info.php'); ?>
        
        <!-- Loader -->
        <div class="wrap-loader wrap-detail">
            <div class="loading">
                <div class="bounceball"></div>
                <img src="img/logo-archybald-top.png" alt="Archybald" class="text" width="80">
            </div>
        </div>
        <!-- Loader END -->

        <div class="content-wrap">
            <!-- Info cadre -->
            <aside class="box-info">
                <?php 
                    $custom_class = '';
                    if($isWindows){
                        $custom_class = 'custom__win-scroll';
                    }
                ?>
                <div class="box-info_wrap">
                    <div class="box-info_btns">
                        <a class="estate-back" href="#"><i class="fas fa-angle-double-left"></i> <span data-lang="prevBtnText">Previous estate</span> </a>
                        <a class="estate-forward" href="#"> <span data-lang="nextBtnText">Next estate</span> <i class="fas fa-angle-double-right"></i></a>
                    </div>
                    <div class="box-info_details <?php echo $custom_class ?>" tabindex="-1">
                        <div class="close-box"><div class="close-box__content" data-lang="close">Fermer</div></div>
                        <!-- title -->
                        <div class="title-wrap">
                            <h2 id="SingleTitle"></h2>
                            <!-- icons -->
                            <i onclick="var e = window.location.hash; setFavorite(e.replace('#',''))" class="change-favor fas fa-heart"></i>
                        </div>
                        <!-- price -->
                        <div id="price" ~data-lang="RequestPrice" class="price">Prix sur demande</div>
                        <!-- description -->
                        <div id="description" class="description"></div>
                        <!-- PEB -->
                        <div class="peb">
                            <img id="peb" src="img/peb-d.png" alt="peb">
                        </div>
                        <div class="specifications">
                            <!-- ref -->
                            <p class="ref">
                                <strong>Ref:</strong> <span id="ref"></span>
                            </p>
                            <!-- ref -->
                            <p class="e-spec">
                                <strong>Ref:</strong> <span id="ref"></span>
                            </p>
                            <!-- E total -->
                            <p class="e-total">
                                <!--<strong>E total:</strong> 145150 kWh/an-->
                                <span id="stat"></span>
                            </p>
                            <!-- E spec -->
                            <div class="energydata smaller white"></div>
                        </div>
                        <!-- PDF link -->
                        <div id="docs">
                        <a href="https://federia.immo/images/brev/protocole-sectoriel-final-12-fevrier-fr_file.pdf" download="https://federia.immo/images/brev/protocole-sectoriel-final-12-fevrier-fr_file.pdf" target="_blank" class="pdf" title="Mesures%20COVID.pdf"><button data-lang="MesuresCOVID">Mesures COVID</button></a>
                        </div>
                        <!-- home link -->
                        <a data-scroll-back class="back" href="biens.php">Tous nos biens</a>
                        <div class="slider-wrap">
                            <div class="swiper-container gallery-thumbs" style="overflow-y: scroll;">
                                <div class="swiper-wrapper slider_nav"></div>
                                <!-- Add Arrows -->
                            </div>
                            <div class="next-slide slider-arrows for-gallery-thumbs"><i class="fas fa-chevron-right"></i></div>
                            <div class="prev-slide slider-arrows for-gallery-thumbs"><i class="fas fa-chevron-left"></i></div>
                        </div>
                        <div class="pause-wrap"><button class="pause-btn"></button></div>
                    </div>
                </div>
            </aside>
            <!-- Info cadre END -->

            <div class="info">
                <div class="open-box-info">
                    info
                    <hr>
                </div>
                <div class="autoplay-icons">
                    <i class="fas fa-play swiper-button-play"></i>
                    <i class="fas fa-pause swiper-button-pause"></i>
                </div>
                <div>
                    <a href="biens.php"><i class="fas fa-undo"></i></a></div>
            </div>


            <!-- Swiper -->
            <section class="swiper-container gallery-top">
                <div class="swiper-wrapper slider_main">
                    <!-- <div class="slider__item"><img class="animation-zoomIn" data-lazy="./images/1.jpg" alt=""></div>
                        <div class="slider__item"><img class="animation-zoomOut" data-lazy="./images/2.jpg" alt=""></div>
                        <div class="slider__item"><img class="animation-zoomInToRight" data-lazy="./images/3.jpg" alt=""></div>
                        <div class="slider__item"><img class="animation-zoomOutToLeft" data-lazy="./images/4.jpg" alt=""></div>
                        <div class="slider__item"><img class="animation-zoomInToLeft" data-lazy="./images/5.jpg" alt=""></div>
                        <div class="slider__item"><img class="animation-zoomOutToRight" data-lazy="./images/6.jpg" alt=""></div> -->
                </div>
                <!-- Add Arrows -->
                <div class="slider_main__arrow next-slide slider-arrows"><i class="fas fa-chevron-right"></i></div>
                <div class="slider_main__arrow prev-slide slider-arrows"><i class="fas fa-chevron-left"></i></div>
            </section>
            <!-- Swiper END -->


        </div>

        </main>
    </div>
</div>

<script>
var refer = '<?=$_SERVER['HTTP_REFERER'];?>';
if(refer.indexOf('detail-bien') < 0) {
    setCookie('refer', refer);
} else if(!getCookie('refer')) {
    setCookie('refer', '/biens.php');
}
    
var refer = getCookie('refer');
$('a[data-scroll-back]').attr("href", getCookie('refer'));
var eid_ar = new Array();
var eid_cur = location.hash.substr(1);
var cnt_all = 0;
var $last = 0;

localStorage.removeItem('ref');

var contactBtn = document.querySelector('.contact-widget a')
contactBtn.dataset.ref = eid_cur

contactBtn.addEventListener('click', function(){
    if(this.dataset.ref !== ''){
        localStorage.setItem('ref', contactBtn.dataset.ref)
    }
})

jQuery('.estate-back').bind('click', function() {
    if($(this).hasClass('disabled')) return;

    var estate = eid_ar.indexOf(eid_cur);
    if(estate === 0){
        estate = eid_ar[eid_ar.length - 1];
    }else{
        estate = eid_ar[estate-1];
    }
    location.hash = estate;
    window.location.reload();
    
    // getMainData();

    //CarouselInit();
    $('.swiper-button-play').hide();
    $('.swiper-button-pause').fadeIn('slow');
	
	return false;
});

jQuery('.estate-forward').bind('click', function() {
    if($(this).hasClass('disabled')) return;

    var estate = eid_ar.indexOf(eid_cur);
    if(estate + 1 >= eid_ar.length){
        estate = eid_ar[0];
    }else{
        estate = eid_ar[estate+1];
    }
    // estate = eid_ar[estate+1];
    location.hash = estate;
    window.location.reload();

    // getMainData();

    //CarouselInit();
    $('.swiper-button-play').hide();
    $('.swiper-button-pause').fadeIn('slow');
	
	return false;
});

function getMainData() {
    eid_ar = new Array();
    cnt_all = 0;

    var estate_id = window.location.hash;

    urlParameters.estateID = estate_id.replace('#','');
    urlParameters.purposeStatusIDList = "";
    urlParameters.lang = lang;
    urlParameters.displayStatusIdList = "";
    urlParameters.showDetails = 1;
    urlParameters.purposeIDlist = "";
    urlParameters.categoryIDList = "";

    let typePrevPage = localStorage.getItem('countryID');
    if(typePrevPage != null){
        urlParameters.countryID = typePrevPage;
    }else{
        urlParameters.countryID = "";
    }

    if(urlParameters.estateID) {
        getBiens({
            parser: parserDetail,
            replace: false,
            hide: false,
            show: false
        });
    }

    urlParameters.estateID = "";
    urlParameters.purposeStatusIDList = "[1,2]";
    urlParameters.lang = lang;
    urlParameters.displayStatusIdList = "[2,3]";
    urlParameters.showDetails = 0;
    $last = 1; 
    getBiens({
        parser: xmlParser_all,
        hide: false,
        show: false,
        // callBack: function(){
        //     urlParameters.purposeStatusIDList = "[3,4]";
        //     $last = 1; 
        //     getBiens({
        //         parser: xmlParser_all,
        //         hide: false,
        //         show: false
        //     });
        // }
    });
}

function xmlParser_all(xml) {
    jQuery(xml).find("EstateServiceGetEstateListResponseEstate").each(function() { 
        var country_id = parseInt($(this).find('CountryId:first').text());
        var eid = $(this).find('EstateID:first').text();
        var disp_status = $(this).find("DisplayStatusId:first").text();

        if(urlParameters.countryID == ""){
            if(country_id != 1){
                eid_ar[cnt_all] = eid;
                cnt_all++;
            }
        }else if(urlParameters.countryID == 1){
            if(country_id == 1){
                eid_ar[cnt_all] = eid;
                cnt_all++;
            }
        }
        if((urlParameters.countryID == "" || urlParameters.countryID == 1) && disp_status == 3){
            // console.log(disp_status)
            var removed = eid_ar.splice(cnt_all - 1, 1)
            eid_ar.unshift(removed[0]);
        }
        // if((urlParameters.countryID == "" && country_id != 1) || (urlParameters.countryID == 1 && country_id == 1)) {
        //     eid_ar[cnt_all] = eid;

        //     cnt_all++;
        // }

    });

//     if($last) {
//         var cur = eid_ar.indexOf(eid_cur);
// /*
//         if(getFavorite(eid_cur))
//             $('.change-favor').addClass('active');
//         else
//             $('.change-favor').removeClass('active');
// */        

//         if(cur == 0) {
//             $('.estate-back').addClass('disabled');
//         } else {
//             $('.estate-back').removeClass('disabled');
//         }
//         if(cur == cnt_all-1) {
//             $('.estate-forward').addClass('disabled');
//         } else {
//             $('.estate-forward').removeClass('disabled');
//         }
//     }
}
var estate_id = window.location.hash;
if(getFavorite(estate_id.replace('#','')))
    $('.change-favor').addClass('active');
else
    $('.change-favor').removeClass('active');

/* when a user clicks, toggle the 'is-animating' class */
$(".heart").on('click touchstart', function(){
    $(this).toggleClass('is_animating');
    $(this).toggleClass('liked');
});

/*when the animation is over, remove the class*/
$(".heart").on('animationend', function(){
    $(this).toggleClass('is_animating');
});

// When the user clicks on <span> (x), close the modal
$("div.x").bind('click', function() {
    detailsOverlay.style.display = "none";
});
</script>    




<!-- DISPLACEMENT SLIDER -->

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>


<?php require('include/footer.php'); ?>
