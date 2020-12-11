<?php include('include/header.php'); ?>
<?php include('include/menu.php'); ?>
<?php require('include/contact-info.php'); ?>

<main>
<section class="content-header">

    <div class="container-fluid">

        <?php //include('include/breadcrumbs.php'); ?>
        <?php include('include/pageTitle.php'); ?>

    </div>

</section>
        
<!-- Liste biens -->
<section class="content-wrapper nos-biens">

    <div class="container-fluid">

        <?php include('include/filter.php'); ?>

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

    urlParameters.lang = lang;
    urlParameters.countryID = getInitialCountryID()
    urlParameters.purposeStatusIDList = "[1,2]";
    getBiens({
        replace: false,
        hide: false,
        show: false,
        callBack: function () {
            urlParameters.purposeStatusIDList = "[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]";
            getBiens({
                show: false,
                hide: false,
                replace: false
            });
        }
    });
    // urlParameters.purposeStatusIDList = "[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]";
    // getBiens({
    //     replace: false,
    //     hide: false,
    //     show: false
    // });

    // $('#biens>a').fadeOut('slow');
    // $('#biens>a').remove();

    // $res_cnt = 0;
    // $is_end = 0;
    // $cur_cnt = 0;

    // while(show) {

    //     var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[1,2],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":0, "countryID":1}';

    //     $.ajax({
    //         async: false,
    //         type: "GET",
    //         url: url,
    //         dataType: "xml",
    //         success: xmlParser_nosbiens
    //     });
    //     page++;

    //     if(page>10) break;
    // }
    // page = 0;
    // show = true;
    // $is_end = 1;

    // while(show) {
    //     var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":0, "countryID":1}';

    //     $.ajax({
    //         async: false,
    //         type: "GET",
    //         url: url,
    //         dataType: "xml",
    //         success: xmlParser_nosbiens
    //     });
    //     page++;

    //     if(page>10) break;
    // }
    // page = 0;
    // show = true;
    // $res_cnt = 0;
}
</script>

<?php include('include/footer-part.php'); ?>

<?php include('include/footer.php'); ?>
