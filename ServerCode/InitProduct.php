<?php
/**
 * Created by PhpStorm.
 * User: rschueppel
 * Date: 04.02.16
 * Time: 17:49
 */

include_once(__DIR__ . '/libs/ApiRequestUtility.php');

if (!isset($_GET['sessionkey'])){
    http_response_code(400);
    echo "Requires 'sessionkey' as Parameter.";
    die();
}

$sessionkey = $_GET['sessionkey'];
$api = \dvConfig\ServerCode\Libs\ApiRequestUtility::createApi();

if ($api->initProduct($sessionkey) === true){
    echo $api->getResponse();
    die();
} else {
    http_response_code($api->getStatusCode());
    echo $api->getResponse();
    die();
};



