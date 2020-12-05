<?php
$_languages = array(/*'de-DE' => 'de',*/ 'en-GB' => 'en', 'fr-FR' => 'fr', 'nl-BE' => 'nl');

$_lang = $_COOKIE['lang'];
if(!$_lang) {
    $_lang = 'fr-FR';
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
</head>

<body>
