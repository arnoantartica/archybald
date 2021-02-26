<?php include('include/header.php'); ?>

<main id="intro">
    <!-- Loader -->
    <div class="wrap-loader wrap-intro">
        <div class="loading">
            <div class="bounceball"></div>
            <img src="img/logo-archybald-top.png" alt="Archybald" class="text" width="80">
        </div>
    </div>
    <!-- Loader END -->
    <aside>
        <!-- logo top -->
        <img src="img/logo-archybald-top.png" alt="archybald" class="anim-1">
        <!-- logo bottom -->
        <img src="img/logo-archybald-bottom.png" alt="archybald" class="anim-3">
        <!-- explore -->
        <div class="explore anim-2">
            <a href="biens.php">
                <button data-lang="Explore">explore</button>
            </a>
        </div>
    </aside>

    <!-- swiper -->
    <section class="swiper-container swiper-container-intro">
        <div class="swiper-wrapper">
            <div class="swiper-slide intro-1" data-src="../img/slide-intro1.jpg"></div>
            <div class="swiper-slide intro-2" data-src="../img/slide-intro2.jpg"></div>
            <div class="swiper-slide intro-3" data-src="../img/slide-intro3.jpg"></div>
        </div>
        <div class="swiper-pagination"></div>
    </section>
    <!-- swiper END -->


</main>


<?php include('include/footer.php'); ?>