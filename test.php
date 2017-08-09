<?php
//Simpletest classes
require_once('simpletest/autorun.php');
require_once('simpletest/web_tester.php');
//Search Class
require_once('libraries/Api.php');

class SimpleFormTests extends WebTestCase {

	private $_lang = 'en';
	private $_country = 'ie';

	public function setUp() {
		$this->_api = new Api('6nwazmd2mc2dvbrvxjd66jyg');
	}	

	//Check if for a given keyword e.g. 'mechanics', returns matches
	function testGetAutocompleteKeyword() {
		$keyword = 'mechanics';
		$results = $this->_api->getAutocompleteKeyword($keyword, $this->_lang);
		$this->assertEqual(1, $results['success']); 
	}

	//Check if for a given keyword e.g. 'mechanics', returns matches
	function testGetAutocompleteLocation() {
		$location = 'Dublin';
		$results = $this->_api->getAutocompleteLocation($location, $this->_country, $this->_lang);
		$this->assertEqual(1, $results['success']); 
	}

	//Check if the pai return results
	function testGetEntitySearchWhatBylocation() {
		$keyword = 'mechanics';
		$location = 'Dublin';
		$results = $this->_api->getEntitySearchWhatBylocation($keyword, $location, 10, 1, $this->_country, $this->_lang, null, null, null, null, null, null);
		$this->assertEqual(1, $results['success']); 
		$this->assertEqual('ok', $results['msg']); 
	}

}
	
?>
