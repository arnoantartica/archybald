<?php  
    define( 'MAIL_TO', /* >>>>> */'info@archybald.be'/* <<<<< */ );  //ajouter votre courriel  info@archybald.be
    define( 'MAIL_FROM', 'website@archybald.be' ); // valeur par défaut  
    define( 'MAIL_OBJECT', '' ); // valeur par défaut  
    define( 'MAIL_REF', '' ); // valeur par défaut 
    define( 'MAIL_MESSAGE', '' ); // valeur par défaut  

    $mailSent = false; // drapeau qui aiguille l'affichage du formulaire OU du récapitulatif  
    $errors = array(); // tableau des erreurs de saisie  
      
    if( filter_has_var( INPUT_POST, 'send' ) ) // le formulaire a été soumis avec le bouton [Envoyer]  
    {  
        $from = filter_input( INPUT_POST, 'from', FILTER_VALIDATE_EMAIL );  
        if( $from === NULL || $from === MAIL_FROM ) // si le courriel fourni est vide OU égale à la valeur par défaut  
        {  
            $errors[] = 'Vous devez renseigner votre adresse de courrier électronique.';  
        }  
        elseif( $from === false ) // si le courriel fourni n'est pas valide  
        {  
            $errors[] = 'L\'adresse de courrier électronique n\'est pas valide.';  
            $from = filter_input( INPUT_POST, 'from', FILTER_SANITIZE_EMAIL );  
        }  

 /* pas besoin de nettoyer le message.   
 / [http://www.phpsecure.info/v2/article/MailHeadersInject.php]  
 / Logiquement, les parties message, To: et Subject: pourraient servir aussi à injecter quelque chose,  mais la fonction mail()  
 / filtre bien les deux dernières, et la première est le message, et à partir du moment où on a sauté une ligne dans l'envoi du mail,  
 / c'est considéré comme du texte; le message ne saurait donc rester qu'un message.*/  
        $object = filter_input( INPUT_POST, 'object' );
        if($object === NULL OR $object === false OR empty( $object ) OR $object === ''){
            $messageObject = 'Message from contact form archybald.be';
        }else{
            $messageObject = $object;
        }
        $ref = filter_input( INPUT_POST, 'ref' );
        if( $ref === NULL OR $ref === false OR empty( $ref ) OR $ref === '' ) // si le message fourni est vide ou égale à la valeur par défaut  
        {  
            $messageRef = '';
        }else{
            $messageRef = "REF: ".$ref;
        }
        // echo $messageRef;

        $message = filter_input( INPUT_POST, 'message', FILTER_UNSAFE_RAW );  
        if( $message === NULL OR $message === false OR empty( $message ) OR $message === MAIL_MESSAGE ) // si le message fourni est vide ou égale à la valeur par défaut  
        {  
            $errors[] = 'Vous devez écrire un message.';  
        }  

        if( count( $errors ) === 0 ) // si il n'y a pas d'erreurs  
        {   
            $message = $messageRef."\nE-mail: ".$from."\n".$message;
            $headers = "From: " . MAIL_FROM . "\nReply-to: " . $from ."\n";
            if( mail( MAIL_TO, $messageObject, $message, $headers ) ) // tentative d'envoi du message  
            {  
                $mailSent = true;  
            }  
            else // échec de l'envoi  
            {  
                $errors[] = 'Votre message n\'a pas été envoyé.';  
            }  
        }  
    }  
    else // le formulaire est affiché pour la première fois, avec les valeurs par défaut  
    {  
        $object = MAIL_OBJECT;  
        $ref = MAIL_REF;
        $message = MAIL_MESSAGE;  
    }  
?> 


<?php require('include/header.php'); ?>
<?php require('include/menu.php'); ?>

<main>
    <div class="container-fluid">
        <section class="content-header">

            <div class="container-fluid">

                <?php include('include/breadcrumbs.php'); ?>
                <?php include('include/pageTitle.php'); ?>

            </div>

        </section>

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





<?php  
    if( $mailSent === true ) // si le message a bien été envoyé, on affiche le récapitulatif  
    {  
?>  
        <p id="success">Votre message a bien été envoyé.</p>  
 
<?php  
    }  
    else // le formulaire est affiché pour la première fois ou le formulaire a été soumis mais contenait des erreurs  
    {  
        if( count( $errors ) !== 0 )  
        {  
            echo( "\t\t<ul>\n" );  
            foreach( $errors as $error )  
            {  
                echo( "\t\t\t<li>$error</li>\n" );  
            }  
            echo( "\t\t</ul>\n" );  
        }  
        else  
        {  
            echo( "\t\t<p id=\"welcome\"></p>\n" );  
        }  
?>  
        <form id='contact' method="post" class="  paddingRight20px" action="<?php echo( $_SERVER['REQUEST_URI'] ); ?>">  
 
              <div id="contact-form" style="margin-top:  0px;" class="margin16px">

                    
                    
                          <p>  
                                          <label for="from"></label>  
                                          <input type="text" name="from" id="from" placeholder="E-mail*" size="40" value="<?php echo( $from ); ?>" data-lang-placeholder="E-mail" />  
                                      </p>  
                                      <p>  
                                          <label for="object"></label>  
                                          <input type="text" name="object" id="object" placeholder="Objet" size="40" value="<?php echo( $object ); ?>" data-lang-placeholder="Objet" />  
                                      </p>   
                                      <p>  
                                          <label for="ref"></label>  
                                          <input type="text" name="ref" id="ref" placeholder="Référence du bien" size="40" value="<?php echo( $ref ); ?>" data-lang-placeholder="Ref" />  
                                      </p> 
                                      <p>  
                                          <label for="message"></label>  
                                          <textarea name="message" id="sendMessage" cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea wpcf7-validates-as-required" placeholder="Message*" data-lang-placeholder="Message"><?php echo( $message ); ?></textarea>  
                                      </p> 
                                        <label class="checkbox-wrap">
                                            <input type="checkbox" name="Agreement[]" style="margin-right: 10px;">
                                            <div data-lang="ContactUs_1" class="checkbox-caption"> <p class="justify  " >Je déclare accepter que les informations ci-dessus mentionnées soient conservées et utilisées par www.archybald.be, aux fins de reprendre contact avec moi et de répondre à mes demandes.</p> </div>
                                        </label>

                                           <div class="wow fadeInUp submit-wrap" data-wow-delay="0s" data-wow-offset="100" data-wow-duration="0s" style="visibility: visible;-webkit-animation-duration: 0s; -moz-animation-duration: 0s; animation-duration: 0s;-webkit-animation-delay: 0s; -moz-animation-delay: 0s; animation-delay: 0s;"> <input type="submit" name="send" class="white " value="Envoyer" data-lang-value="Send" /> </div> 
         
 </div></form>  </div>
<?php  
    }  
?>  


            <!-- Formulaire -->
            <!-- <div class="col">
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
            </div> -->
            <!-- Formulaire END -->
        <!-- </div> -->


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
</div>
</main>
    
<?php require('include/footer-part.php'); ?>

<?php require('include/footer.php'); ?>
