<?php
/* adapted from Paypal class.w_http_request, R Schüppel, davitec 2016 */

namespace DvConfig\ServerCode\Libs;

class HttpRequestUtility {


    function __construct() {

    }

    public function http_request
    (
        $label,
        $method,
        $url,
        $request_header,
        $request_body
    )
    {
        // input
        $method = strtoupper($method);

        // curl settings
        $curl_handle = curl_init();

        curl_setopt($curl_handle, CURLOPT_URL,				$url);
        curl_setopt($curl_handle, CURLOPT_CUSTOMREQUEST,	$method);
        curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT,	3);
        curl_setopt($curl_handle, CURLOPT_VERBOSE,			true);
        //	curl_setopt($curl_handle, CURLOPT_SSLVERSION,		3);			// SSL3 is no longer supported by PayPal!!!
        curl_setopt($curl_handle, CURLOPT_SSL_VERIFYPEER,	false);		// turning off peer verification (TrustManager Concept)
        curl_setopt($curl_handle, CURLOPT_SSL_VERIFYHOST,	false);		// turning off host verification (TrustManager Concept)
        curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER,	true);
        curl_setopt($curl_handle, CURLOPT_BINARYTRANSFER,	true);
        curl_setopt($curl_handle, CURLOPT_FORBID_REUSE,		true);
        curl_setopt($curl_handle, CURLOPT_FRESH_CONNECT,	true);
        curl_setopt($curl_handle, CURLINFO_HEADER_OUT,		true);
        curl_setopt($curl_handle, CURLOPT_HTTPHEADER, $this->generate_http_header($request_header));

        // format request
        switch ($method)
        {
            case 'GET':
                /*
                switch ($request_format)
                {
                    case "name-value-pairs":
                        $url .= "?" . http_build_query($request_data);
                        break;
                }*/

            case 'POST':
                curl_setopt($curl_handle, CURLOPT_POST, 1);
                curl_setopt($curl_handle, CURLOPT_POSTFIELDS,$request_body);

                /*
                switch ($request_format)
                {
                    case "name-value-pairs":
                        curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $this->generate_url_string($request_body));
                        break;

                    case "json":
                        curl_setopt($curl_handle, CURLOPT_POSTFIELDS, str_replace('\\"', '"',json_encode($request_body, true)));
                        break;
                }*/
                break;

            case 'PATCH':
                curl_setopt($curl_handle, CURLOPT_POST, 1);
/*
                switch ($request_format)
                {
                    case "name-value-pairs":
                        curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $this->generate_url_string($request_body));
                        break;

                    case "json":
                        curl_setopt($curl_handle, CURLOPT_POSTFIELDS, str_replace('\\"', '"',json_encode($request_body, true)));
                        break;
                }
*/

                break;
        }


        // execute call
        $http_response = curl_exec($curl_handle);

        $result = array(
            "_origin"	=>	$label,
            "_statuscode" => curl_getinfo($curl_handle,CURLINFO_HTTP_CODE),
            "_request"  =>	array
            (
                "method" => $method,
                "url" => $url,
                "header" => $request_header,
                "body" => $request_body
            ),
            "_response"	=>	$http_response,
            "_details"	=>	array
                (
                    "curl_error_number"		=>	curl_errno($curl_handle),
                    "curl_error_message"	=>	curl_error($curl_handle)
                ) +  curl_getinfo($curl_handle)
        );

        // react on curl error
        if (curl_errno($curl_handle)){
            $result["_status"] = 'failed';
            if ($result["_statuscode"] = 0)  $result["_statuscode"] = 400;
        } else {
            $result["_status"] = 'success';
        }

        return $result;
    }

    protected function generate_url_string(&$a)
    {
        $s = '';

        foreach ($a as $k => $v)
            $s .= urlencode($k) . '=' . urlencode($v) . '&';

        return (substr($s, 0, -1)); // delete last unnecessary ampersand
    }


    protected  function extract_array_from_query_string($query_string)
    {
        $nvp_array = explode("&", $query_string);
        $array = array();

        foreach ($nvp_array as $i)
        {
            list($key, $value) = explode("=", $i);
            $array[urldecode($key)] = urldecode($value);
        }

        return ($array);
    }

    protected  function generate_http_header($http_header_assoc_array)
    {
        $http_header = array();
        foreach ($http_header_assoc_array as $key => $value)
            $http_header[] = $key . ": " . $value;

        return ($http_header);
    }


}