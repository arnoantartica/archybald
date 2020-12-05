<?php include('include/header.php'); ?>
<?php include('include/menu.php'); ?>

<main>

    <!-- Loader -->
    <div class="wrap">
      <div class="loading">
        <div class="bounceball"></div>
        <img src="img/logo-archybald-top.png" alt="Archybald" class="text" width="80">
      </div>
    </div>
    <!-- Loader END -->

    
    <aside class="filters">
        <div class="page-title">
            <a href="home.php">Archybald</a> <i class="fas fa-chevron-right"></i> <a data-lang="RechercheByReference" href="reference.php" class="target">Recherche par référence</a>
        </div>
    </aside>

    <section id="reference">

        <!-- LISTE REFERENCE -->
        <div class="biens" class="content-wrapper">
        </div>
        <!-- LISTE REFERENCE END -->

        <!-- RESEARCH BY REFERENCE -->
        <div class="ref-search">
            <div class="fixed-top">
                <h2 data-lang="RechercheByReference">recherche par <br>
                    référence</h2>
                <hr>
                <p data-lang="HaveReferenceNumber">Je dispose d'un n° de référence</p>
                <div class="search">
                    <input id="myInput" type="text" onchange="getEstate();" data-lang-placeholder="MyReference" placeholder="Ma référence"> <button data-lang="Search" onclick="getEstate();">recherche</button>
                </div>
            </div>
        </div>
        <!-- RESEARCH BY REFERENCE END -->
    </section>
</main>

<script>
function getEstate(inp) {
    var id = $('#myInput').val();

    $('#reference>div.biens>a').fadeOut('slow');
    $('#reference>div.biens>a').remove();

    var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Language":"'+lang+'","EstateID":"'+id+'","ShowDetails":0}';

    $.ajax({
        async: false,
        type: "GET",
        url: url,
        dataType: "xml",
        success: xmlParser_recherche
    });
}

function getMainData() {
    $('#reference>div.biens>a').fadeOut('slow');
    $('#reference>div.biens>a').remove();

    $res_cnt = 0;
    $is_end = 0;
    $cur_cnt = 0;

    while(show) {
        var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[1,2],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":0}';

        $.ajax({
            async: false,
            type: "GET",
            url: url,
            dataType: "xml",
            success: xmlParser_recherche
        });
        page++;

        if(page>10) break;
    }
    page = 0;
    show = true;
    $is_end = 1;

    while(show) {
        var url = 'https://sbs.whise.eu/websiteservices/EstateService.svc/GetEstateListXML?EstateServiceGetEstateListRequest={"ClientId":"'+client_id+'","Page":'+page+',"RowsPerPage":'+per_page+',"Language":"'+lang+'","StatusIDList":[1],"DisplayStatusIdList":[2,3],"PurposeStatusIDList":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],"OrderByFields":["City ASC","DisplayStatusIdList DESC","PurposeStatusIDList ASC"],"ShowDetails":0}';

        $.ajax({
            async: false,
            type: "GET",
            url: url,
            dataType: "xml",
            success: xmlParser_recherche
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
