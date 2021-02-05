<?php
$_languages = array(/*'de-DE' => 'de',*/ 'en-GB' => 'en', 'fr-BE' => 'fr', 'nl-BE' => 'nl');

$_lang = $_COOKIE['lang'];
if(!$_lang) {
    $_lang = 'fr-BE';
}
require_once('recaptcha-keys.php');

$user_agent = $_SERVER['HTTP_USER_AGENT'];
if ( preg_match('/windows/i', $user_agent ) ){
  $isWindows = true;
}else{
  $isWindows = false;
}
?>
<!DOCTYPE html>
<html data-lang-attr="lang" lang="<?=$_languages[$_lang];?>">

    <meta charset="utf-8" />
    <title data-lang-meta="metaTitle" data-lang-meta-pre="Archybald • "></title>
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css">
    <link rel="stylesheet" href="css/update.css" />
    <link rel="stylesheet" href="css/style.css">
    <link rel=“icon” href="./img/Alogo.png" type="image/x-icon">


    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/common.js"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-136165486-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-136165486-1');
    </script>
    <!-- Facebook Pixel Code -->
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1197387417109817');
      fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=1197387417109817&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Facebook Pixel Code -->
</head>

<body>
