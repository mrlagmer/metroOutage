<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require('PtvApi.php');

$api = new PtvApi();
$json = str_replace('metro-train','metro',$api->getDisruptions());
echo $json;
?>
