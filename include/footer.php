
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js"></script>
    <script src="js/swiper.js"></script>
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script src="js/main.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?render=<?php echo SITE_KEY?>"></script>
    <script>
        grecaptcha.ready(function() {
            grecaptcha.execute('<?php echo SITE_KEY;?>', {action: 'allsite'}).then(function(token) {
                //console.log(token);

                var reField = document.getElementById('g-recaptcha-response');

                if(reField !== null){
                    document.getElementById('g-recaptcha-response').value=token;
                }else{
                    var reBadge = document.querySelector('.grecaptcha-badge')
                    reBadge.style.opacity = 0;
                    reBadge.style.visibility = 'hidden';
                }
                
            });
        });
    </script>
</body>

</html>
