<?php include('include/header.php'); ?>
<?php include('include/menu.php'); ?>

<main>
<section class="content-header">

    <div class="container-fluid">

        <?php include('include/breadcrumbs.php'); ?>
        <?php include('include/pageTitle.php'); ?>

    </div>

</section>
        
<!-- Liste biens -->
<section class="content-wrapper nos-biens">

    <div class="container-fluid">

        <!-- Loader -->
        <div class="wrap">
            <div class="loading">
                <div class="bounceball"></div>
                <img src="img/logo-archybald-top.png" alt="Archybald" class="text" width="80">
            </div>
        </div>
        <!-- Loader END -->

        <div id="biens"></div>
        
    </div>

</section>
<!-- Liste biens END -->

</main>

<script>
function getMainData() {

    var list = getCookie('favorites');
    urlParameters.estateIDList = list;
    urlParameters.purposeStatusIDList = "";
    urlParameters.lang = lang;
    urlParameters.displayStatusIdList = "";
    urlParameters.showDetails = "";
    urlParameters.purposeIDlist = "";
    urlParameters.categoryIDList = "";
    urlParameters.countryID = "";
    if(urlParameters.estateIDList) {
        getBiens({
            replace: false,
            hide: false,
            show: false,
            callBack: function(){
                urlParameters.countryID = 1;
                getBiens({
                    replace: false,
                    hide: false,
                    show: false
                });
            }
        });
    }else{
        noFavorites();
        document.dispatchEvent(biensReady);
    }

}
function noFavorites() {
    if(!getCookie('favorites')) {
        $('#biens>div.noresult').remove();
        $('#biens').append('<div data-lang="noFavorites" class="noresult white">Vous n’avez pas encore sélectionné de favoris</div>');
    }
}
</script>

<!-- <script>
function getMainData() {
    $('#biens>a').fadeOut('slow');
    $('#biens>a').remove();

    $res_cnt = 0;
    $is_end = 1;
    $cur_cnt = 0;

    var list = getCookie('favorites');
    if(list) {
        while(show) {
            var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","EstateIDList":['+list+'],"ShowDetails":0}';
            $.ajax({
                async: false,
                type: "GET",
                url: url,
                dataType: "xml",
                success: xmlParser_favoris
            });
            page++;
            if(page>10) break;
        }
    } else {
        noFavorites();
    }
    page = 0;
    show = true;
    $res_cnt = 0;
}

function noFavorites() {
    if(!getCookie('favorites')) {
        $('#biens>div.noresult').remove();
        $('#biens').append('<div data-lang="noFavorites" class="noresult white">Vous n’avez pas encore sélectionné de favoris</div>');
    }
}
</script> -->

<?php include('include/footer-part.php'); ?>

<?php include('include/footer.php'); ?>


