<?php include('include/header.php'); ?>
<?php include('include/menu.php'); ?>

<main>
<?php include('include/filter.php'); ?>

    <!-- Loader -->
    <div class="wrap">
      <div class="loading">
        <div class="bounceball"></div>
        <img src="img/logo-archybald-top.png" alt="Archybald" class="text" width="80">
      </div>
    </div>
    <!-- Loader END -->
    
    <!-- Liste biens -->
    <section id="biens" class="content-wrapper">
    </section>
    <!-- Liste biens END -->

</main>

<script>
function getMainData() {
    $('#biens>a').fadeOut('slow');
    $('#biens>a').remove();

    $res_cnt = 0;
    $is_end = 0;
    $cur_cnt = 0;

    while(show) {
        var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[1,2],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":0}';//EstateID

        $.ajax({
            async: false,
            type: "GET",
            url: url,
            dataType: "xml",
            success: xmlParser_biensaletranger
        });

        page++;

        if(page>10) break;
    }
    page = 0;
    show = true;
    $is_end = 1;

    while(show) {
        var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":0}';//EstateID

        $.ajax({
            async: false,
            type: "GET",
            url: url,
            dataType: "xml",
            success: xmlParser_biensaletranger
        });
        page++;

        if(page>10) break;
    }
    page = 0;
    show = true;
    $res_cnt = 0;
}
</script>

<?php include('include/footer-part.php'); ?>

<?php include('include/footer.php'); ?>
