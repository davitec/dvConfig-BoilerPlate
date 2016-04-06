<?php
/**
 * Created by PhpStorm.
 * User: rschueppel
 * Date: 04.02.16
 * Time: 14:27
 */

namespace DvConfig\ServerCode\Libs;
use DvConfig\ServerCode;

require_once(__DIR__ . '/../Settings.php');
require_once(__DIR__.'/HttpRequestUtility.php');


class ApiRequestUtility
{
    /**
     * ApiUrlCliCredentials
     *
     * @var string
     */
    protected $ApiUrlCliCredentials = '';

    /**
     * ApiUrlProduct
     *
     * @var string
     */
    protected $ApiUrlProduct = '';

    /**
     * Apikey (registered user)
     *
     * @var string
     */
    protected $Apikey = '';

    /**
     * Token (registered user)
     *
     * @var string
     */
    protected $Token = '';

    /**
     * xmlfile
     *
     * @var string
     */
    protected $xmlfile = '';

    /**
     * @var \DvConfig\ServerCode\Libs\HttpRequestUtility
     */
    protected $httpRequest = null;

    /**
     * full response array of last request's response
     *
     * @var array
     */
    protected $fullresponse = array();

    /**
     * response as deliverable
     *
     * @var string
     */
    protected $response = '';

    /*
     * private constructor, load settings
     */
    protected function __construct(){
        $settings = new ServerCode\Settings;
        $this->ApiUrlCliCredentials = $settings->getSetting('ApiUrlCliCredentials');
        $this->ApiUrlProduct = $settings->getSetting('ApiUrlProduct');
        $this->Apikey = $settings->getSetting('Apikey');
        $this->Token = $settings->getSetting('Token');
        $this->xmlfile = $settings->getSetting('xmlfile');
    }

    /*
     * public factory
     */
    public static function createApi(){
        return new ApiRequestUtility();
    }


    /**
     * @return string
     */
    public function getResponse()
    {
        return $this->response;
    }

    /**
     * @return string
     */
    public function getFullResponse()
    {
        return $this->fullresponse;
    }

    /**
     * @return int
     */
    public function getStatusCode()
    {
        return isset($this->response['_statuscode'])? $this->response['_statuscode'] : 400;
    }

    public function createSession(){

        $this->httpRequest = new HttpRequestUtility();

        $label =  "Create Session by POST /cli-credentials";
        $method = "POST";
        $url = $this->ApiUrlCliCredentials;
        $header = array(
            "Access-Control-Allow-Origin" => "*",
            "Content-type" => "text/plain",
            "Accept" => "application/json",
            "Apikey" => $this->Apikey,
            "Token" => $this->Token
        );
        $body = array();

        $resp = $this->httpRequest->http_request($label, $method, $url, $header, $body);

        if ($resp['_status'] === 'success' && $resp['_statuscode'] == 200 && isset($resp['_response'])) {
            $response_array = json_decode($resp['_response'], true);
            $this->response = $response_array['sessionkey'];
            return true;
        }
        $this->response = $resp['_response'].'.'.$resp['_details']['curl_error_message'];
        return false;
    }

    /**
     *
     * Loads Product XML and Init Product @API via POST /product
     * @param integer $key
     */
    public function initProduct($key){

        //load XML file first
        /** @var \SimpleXMLElement $xml */
        $xml = simplexml_load_file($this->xmlfile);

        //now call POST /product
        $this->httpRequest = new HttpRequestUtility();

        $label =  "Create Product by POST /product";
        $method = "POST";
        $url = $this->ApiUrlProduct;
        $header = array(
            "Access-Control-Allow-Origin" => "*",
            "Content-Type" => "application/xml",
            "Accept" => "text/plain",
            "Apikey" => $this->Apikey,
            "Sessionkey" => $key
        );
        $body = $xml->asXML();

        $resp = $this->httpRequest->http_request($label, $method, $url, $header, $body);

        if ($resp['_status'] === 'success' && $resp['_statuscode'] == 200 && isset($resp['_response'])) {
            $this->response = $resp['_response'];
            return true;
        }
        $this->response = $resp['_response'].'.'.$resp['_details']['curl_error_message'];
        return false;

    }

}