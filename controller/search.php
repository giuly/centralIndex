<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/libraries/Api.php';

// This is not safe, to keep api key in the source code
$api = new Api("6nwazmd2mc2dvbrvxjd66jyg");
// Default language - English
$defaultLang = 'en';
// Default country - Ireland
$defaulCountry = 'ie';
// 10 items per page default
$itemsPerPage = 10;

// search - check if the keywords and location are available
// and call the API method in charge with the search 
if(isset($_GET['location']) && isset($_GET['keyword'])) {
	$keyword = trim($_GET['keyword']);
	$location = trim($_GET['location']);
	$page = (int)trim($_GET['page']);

	try { 
		$data = $api->getEntitySearchWhatBylocation( $keyword, $location, $itemsPerPage, $page, $defaulCountry, $defaultLang);
		echo json_encode($data);

	} catch(Exception $e) {
		print_r($e->getMessage());
	}

	return;
}

// autocomplete keywords
if(isset($_GET['keyword'])) {
	$keyword = trim($_GET['keyword']);

  	try {
  		$data = $api->getAutocompleteKeyword($keyword, $defaultLang);
  		if($data['success'] == 1) {
			$results = array();
			foreach ($data['data']['suggestions'] as $value) {
				array_push($results, $value['name']);
			}
  			echo json_encode($results);
  			return;
  		} else {
  			// Posible Errors
  			print_r($data);
  		}
  	} catch(Exception $e) {
  		// Try to catch any exceptions if there are
  		print_r($e->getMessage());
  	}
}


// autocomplete location
if(isset($_GET['location'])) {
	$location = trim($_GET['location']);

  	try {
  		$data = $api->getAutocompleteLocation($location, $defaulCountry, $defaultLang);
  		if($data['success'] == 1) {
			$results = array();
			foreach ($data['data']['suggestions'] as $value) {
				array_push($results, $value['name']);
			}
  			echo json_encode($results);
  			return;
  		} else {
  			// Posible Errors
  			print_r($data);
  		}
  	} catch(Exception $e) {
  		// Try to catch any exceptions if there are
  		print_r($e->getMessage());
  	}
}

?>