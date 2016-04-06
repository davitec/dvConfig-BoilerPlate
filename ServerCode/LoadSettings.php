<?php

include_once(__DIR__ . '/libs/ApiRequestUtility.php');
include_once(__DIR__ . '/Settings.php');

$api = \DvConfig\ServerCode\Libs\ApiRequestUtility::createApi();

$settings = new \DvConfig\ServerCode\Settings();

if ($api->createSession() === true){
    $clisetts = array(
        'Apikey' => $settings->getSetting('Apikey'),
        'Sessionkey' => $api->getResponse(),
        'ApiUrlProduct' => $settings->getSetting('ApiUrlProduct'),
        'ApiUrlDecision' => $settings->getSetting('ApiUrlDecision'),
        'ApiUrlContext' => $settings->getSetting('ApiUrlContext')
    );
    echo json_encode($clisetts);
    die();
} else {
    http_response_code($api->getStatusCode());
    echo "Cant get session key. Use correct ApiKey/Topken/Your-IP combination in ServerCode/Settings ?";
    echo "dvConfig API said: " . $api->getResponse();
    die();
}
