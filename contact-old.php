<?php require('include/header.php'); ?>
<?php require('include/menu.php'); ?>

<main>

    <section id="contact"  class="small-container">
        <h1 data-lang="ContactUs">nous contacter</h1>
        <hr>

        <div class="col-2">

            <!-- Contact info -->
            <div class="col contact-info">
                <!-- tel -->
                <i class="fas fa-phone"></i>
                <a href="tel:+3227314999" style="margin-bottom: 0">00 32 (0)2 731 49 99</a>
                <a href="tel:+32475244348">00 32 (0)475 24 43 48</a>

                <!-- mail -->
                <i class="fas fa-envelope"></i>
                <a href="mailto:info@archybald.be">info@archybald.be</a>

                <!-- adress -->
                <i class="fas fa-map-marker"></i>
                <p>
                    Avenue Capouillet, 58A <br>
                    1410 Waterloo
                </p>

                <!-- map -->
                <a data-lang="GotoMap" href="https://www.google.fr/maps/place/Avenue+Capouillet+58,+1410+Waterloo/@50.7128833,4.3786655,17z/data=!3m1!4b1!4m5!3m4!1s0x47c3ce2f35de54e3:0xd9d594b999079fb3!8m2!3d50.7128817!4d4.3808728"
                    target="_blank">[VOIR CARTE]</a>

                <!-- facebook -->
                <i class="fab fa-facebook-f"></i>
                <a data-lang="GotoFacebook" href="https://www.facebook.com/archybaldrealestate/" target="_blank">Notre page facebook</a>

            </div>
            <!-- Contact info END -->

            <!-- Formulaire -->
            <div class="col">
                <form action="GET">
                    <input data-lang-placeholder="E-mail" type="text" placeholder="E-mail">
                    <input data-lang-placeholder="Objet" type="text" placeholder="Objet">
                    <textarea data-lang-placeholder="Message" name="msg" placeholder="Message"></textarea>
                    <div class="conditions">
                        <input type="checkbox">
                        <p data-lang="AcceptSite">
                            Je déclare accepter que les informations ci-dessus mentionnées soient conservées et
                            utilisées par www.archybald.be, aux fins de reprendre contact avec moi et de répondre à
                            mes demandes.
                        </p>
                    </div>
                    <input data-lang-value="Send" type="submit" name="envoyer" value="envoyer">

                </form>
            </div>
            <!-- Formulaire END -->
        </div>


        <div class="bottom-info">
            <p data-lang="Entreprise" class="white">
                Entreprise n° BE 0836 102 386 <br>
                Agent immobilier agréé n° 505 226
            </p>
            <p class="grey">
                    Instance Officielle de Contrôle: IPI (Institut Professionel des Agents Immobiliers) <br>
                    Rue de Luxembourg 16B, 1000 BRUXELLES Tél: 02/505 33 50 www.ipi.be <br>
                    Soumis au code de déontologie conformément à l'arrêté royal du 27 septembre 2006
            </p>
        </div>

    </section>

</main>
    
<?php require('include/footer-part.php'); ?>

<?php require('include/footer.php'); ?>
