<?php

function format_size($bytes){
    $coeficientForMB=1048576;
    $coeficientForKB=1024;
    $coeficientForBytes=1;
    if ($bytes >= $coeficientForMB) {
        $bytes = number_format($bytes / $coeficientForMB, 2) . ' MB';
    }
    elseif ($bytes >= $coeficientForKB) {
        $bytes = number_format($bytes / $coeficientForKB, 2) . ' KB';
    }
    elseif ($bytes > $coeficientForBytes) {
        $bytes = $bytes . ' bytes';
    }
    elseif ($bytes == $coeficientForBytes) {
        $bytes = $bytes . ' byte';
    }
    else {
        $bytes = '0 bytes';
    }
    
    return $bytes;
}

?>