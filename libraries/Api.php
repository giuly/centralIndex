<?php

  class Api {
    
    // the endpoint of the central index API
    const API_URL = "https://api.centralindex.com/v1";
    
    // store the user's API key and whether debuggin is required
    protected $apikey;
    protected $debugMode;
    
    /**
     * Constructor - store the api key in the class
     *
     *  @param apikey - the user's API key
     *  @param debugMode - whether to output debugging or not
     *  @return - the data from the api
    */
    public function __construct($apikey,$debugMode=false) {
      $this->apikey = $apikey;
    }   
    
    /**
     * Perform curl request
     *
     *  @param method - the HTTP method to do
     *  @param path - the relative path to visit
     *  @param data - an array of parameters to pass
     *  @return - the data from the api
    */
    private function doCurl($method, $path, $data) {
      
      $data['api_key'] = $this->apikey;

      $query = "";
      if($method == "GET") {
        $query.="?".http_build_query($data);
      } 

      $url = Api::API_URL.$path.$query;
      // Get cURL resource
      $curl = curl_init();
      // Set some options - we are passing in a useragent too here
      curl_setopt_array($curl, array(
          CURLOPT_RETURNTRANSFER => 1,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_URL => $url,
          CURLOPT_USERAGENT => 'Centralindex Sample cURL Request',
          CURLOPT_POST => false
      ));
      // Send the request & save response to $resp
      $resp = curl_exec($curl);
      $return = json_decode($resp,1);
      // Close request to clear up some resources
      curl_close($curl);

      return $return;
    }

      /**
   * The search matches a category name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Plumbers e.g. but
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  public function getAutocompleteKeyword( $str, $language) {
    $params = array();
    $params['str'] = $str;
    $params['language'] = $language;
    return Api::doCurl("GET","/autocomplete/keyword",$params);
  }

    /**
   * The search matches a location name or synonym on a given string and language.
   *
   *  @param str - A string to search against, E.g. Dub e.g. dub
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en e.g. en
   *  @return - the data from the api
  */
  public function getAutocompleteLocation( $str, $country, $language) {
    $params = array();
    $params['str'] = $str;
    $params['country'] = $country;
    $params['language'] = $language;
    return Api::doCurl("GET","/autocomplete/location",$params);
  }


  /**
   * Search for matching entities
   *
   *  @param what - What to get results for. E.g. Plumber e.g. plumber
   *  @param where - The location to get results for. E.g. Dublin e.g. Dublin
   *  @param per_page - Number of results returned per page
   *  @param page - Which page number to retrieve
   *  @param country - Which country to return results for. An ISO compatible country code, E.g. ie e.g. ie
   *  @param language - An ISO compatible language code, E.g. en
   *  @param latitude - The decimal latitude of the search context (optional)
   *  @param longitude - The decimal longitude of the search context (optional)
   *  @param domain
   *  @param path
   *  @param restrict_category_ids - Pipe delimited optional IDs to restrict matches to (optional)
   *  @param benchmark
   *  @return - the data from the api
  */
  public function getEntitySearchWhatBylocation( $what, $where, $per_page, $page, $country, $language, $latitude, $longitude, $domain, $path, $restrict_category_ids, $benchmark) {
    $params = array();
    $params['what'] = $what;
    $params['where'] = $where;
    $params['per_page'] = $per_page;
    $params['page'] = $page;
    $params['country'] = $country;
    $params['language'] = $language;
    $params['latitude'] = $latitude;
    $params['longitude'] = $longitude;
    $params['domain'] = $domain;
    $params['path'] = $path;
    $params['restrict_category_ids'] = $restrict_category_ids;
    $params['benchmark'] = $benchmark;
    return Api::doCurl("GET","/entity/search/what/bylocation",$params);
  }

}

?>
