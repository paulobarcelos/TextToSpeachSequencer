<?php
       header( 'Content-type: audio/mpeg' );
       $ch = curl_init();
       curl_setopt( $ch, CURLOPT_URL, 'http://translate.google.com/translate_tts?ie=UTF-8&tl='.$_GET['l'].'&q=' .urlencode(stripslashes($_GET['n'])) );
       curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );

       $return = curl_exec( $ch );

       echo $return;
?>