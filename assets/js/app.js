$(document).ready(function() {
	
	var itemsPerPage = 10;
	var step = 2;
	var centerLng;
	var centerLat;

	// Toggle tabs
	$('.tab-pane').first().css('visibility', 'visible');
	$('.nav-tabs > li > a').on('click', function() {
		$('.tab-pane').css('visibility', 'hidden');
		$($(this).attr('href')).css('visibility', 'visible');
	})

	// Autocomplete - keyword
	$('#keyword').autocomplete({
		minLength: 3,
		source: function (request, response) {
			$.ajax({
				url: "../../controller/search.php",
				data: { keyword: request.term },
				dataType: "json",
				success: response,
				error: function (err) { console.log(err);}
			});
		},
		select: function( event, ui ) {
	       // Add selected value to the input
	       $(this).val(ui.item.value);
	    }
	});


	// Autocomplete - location
	$('#location').autocomplete({
		minLength: 3,
		source: function (request, response) {
			$.ajax({
				url: "../../controller/search.php",
				data: { location: request.term },
				dataType: "json",
				success: response,
				error: function (err) { console.log(err);}
			});
		},
		select: function( event, ui ) {
	       // Add selected value to the input
	       $(this).val(ui.item.value);
	    }
	})

	// Search from form box
	$('.search').on('click', function(e) {
		// Prevent form submisson
		e.preventDefault();
		// Load default page 
		var page = 1;
		// Call search function
		search(page, true);
	})

	// Start a loading animation
	function loadingIn() { $('.loading').show(); $('.error > div').html(''); $('.error').hide(); $('#list').html(''); $('#splitResults').hide();}
	// Close the loading animation
	function loadingOut() { $('.loading').hide(); $('#splitResults').show(); }
	// Error handler 
	function error(msg) { $('.error').append('<div>' +msg+ '</div>').show(); $('#pagination').html(''); $('#splitResults').hide();}
	
	/** Search function
	 *  @param1 - string (keyword)
	 *  @param2 - string (location)
	 *  @param3 - integer (page)
	 *  return - void
	 */
	function search(page, init){
		
		// Add loading bar
		loadingIn();
		// Ajax call to the API
		var keyword = $('#keyword').val();
		var location = $('#location').val();

		$.ajax({
			url: '../../controller/search.php',
			data: {
				page: page,
				keyword: keyword,
				location: location
			},
			dataType: "json",
			success: function(data) {
				loadingOut();
				if(data['success'] === true) {
					// Success results - handle data
					var resultsTemplate = '';
					$.each(data['data']['rows'], function(i, obj) {
					  resultsTemplate += renderTemplate(obj);
					});
					$('#list').html(resultsTemplate);
					
					// Generate pagination
					if(init) {
						paginate(data['data']['total_rows'], page);
					}
					// Show phone number
					$('.showPhone').on('click', function(e) {
						e.preventDefault();
						$(this).hide()
						$(this).next('span.phoneNumberHid').show();
					})
					// Call search form pagination
					$('.searchFromPage').on('click', function(e) {
						// Prevent form submisson
						e.preventDefault();
						// load page sent from pagination
						var page = $(this).attr('data-rel');
						// Call search function
						search(page, false);
					})

					// Generate map
					generateMap(data);

				} else {
					// On error - print error mesagge
					error(data['msg']);
				}
			}
		})
	}

	/** Build the pagination
	 *  @param1 - integer (totalRows)
	 *  @param2 - integer (currentPage)
	 *  @return - void
	 */
	function paginate(totalRows, currentPage) {

		Pagination.Init(document.getElementById('pagination'), {
	    size: Math.ceil(totalRows/itemsPerPage), // pages size
	    page: currentPage, // selected page
	    step: step // pages before and after current
	  });
	}

	/** Load template - Simulate a template engine
	 *  @params - object
	 *  @return - string
	 */
	function renderTemplate(data) {
		// check if has phone
		var phoneNumber = '<span><i class="icon-ban-circle" aria-hidden="true"></i>&nbsp;Not available</span>';
		if(typeof data['claim'] != 'undefined') {
			if( data['claim']['claim_method']['phone_number'].length != 0) {
				phoneNumber = '<span class="showPhone"><a href="#">show phone</a></span><span class="phoneNumberHid"><i class="icon-phone"></i>&nbsp;' + data['claim']['claim_method']['phone_number'] + '</span>';
			}
		} 
		//check if has website url
		var siteUrl = '<span><i class="icon-ban-circle" aria-hidden="true"></i>&nbsp;Not available</span>';
		if(typeof data['socialmedia'] != 'undefined') {
			if(data['socialmedia'][0]['website_url'].length != 0 ) {
				siteUrl = '<i class="icon-globe"></i>&nbsp;<a target="_blank" href="'+data['socialmedia'][0]['website_url']+'">Website</a>';
			}
		}
		//check if has logo
		var logo = '<div class="pull-right"></div>';
		if(typeof data['logos'] != 'undefined') {
			if(data['logos'][0]['small']['logo_path'].length != 0 ) {
				logo = '<div class="ser-logo thumbnail pull-right hidden-phone" style="background-image: url(\'http://assets.centralindex.com/'+ data['logos'][0]['small']['logo_path'] +'\'); background-repeat: no-repeat; width: 100px; height:100px"></div> ';
			}
		}

		var template = '<div class="col-md-12" >' +
				'<div class="row-fluid row">' +
					'<div class="col-md-8">' +	
						'<h4 class="ser-title ">' +
							'<a href="#" data-yext-click="name" data-id="379253022834688" data-yext="">'+ data["name"]["name"] +'</a>' +
						'</h4>' +
						'<div class="row-fluid ser-row">' +
							'<p><span>'+ data['postal_address']['address1'] +', '+ data['postal_address']['town'] +', '+ data['postal_address']['county'] +' </span></p>' +
						'</div>' +
						'<!-- active row -->' +
						'<div class="row-fluid ">' +			
							'<div class="col-md-4">' +
								'<p>' +	phoneNumber +
								'</p>' +
							'</div>' +  
							'<div class="col-md-4">' +
								'<p>' + siteUrl+ '</p> ' +
							'</div>' +
						
						'</div>' +
					'</div>' +
					'<div class="col-md-4">' +
						'<!-- logo -->' +
						logo +
					'</div>	' +				
				'</div>' +
			'</div>';

		return template;	
	}

	/******************************************************************************************* Here Map ******************************************************/

	// @param1 - object (data - serach results)
	function generateMap(data) {
		/**
		 * Boilerplate map initialization code starts below:
		 */
		//Step 1: initialize communication with the platform
		var platform = new H.service.Platform({
		  app_id: 'DemoAppId01082013GAL',
		  app_code: 'AJKnXv84fjrb0KIHawS0Tg',
		  useCIT: true,
		  useHTTPS: true
		});
		var defaultLayers = platform.createDefaultLayers();

		//Step 2: initialize a map - this map is centered over the first Lat&Lng received from search results
		$('#map').html('');
		centerMap(data);
		var map = new H.Map(document.getElementById('map'),
		   	defaultLayers.normal.map,{
			  center: {lat:centerLat, lng:centerLng},
			  zoom: 10
			});

		//Step 3: make the map interactive
		// MapEvents enables the event system
		// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
		var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

		// Create the default UI components
		var ui = H.ui.UI.createDefault(map, defaultLayers);

		// Now use the map as required...
		addInfoBubble(map, data, ui);
	} 

	/**
	 * Get first geolocation encountered in data results
	 * @param - object (data results)
	 * @return - object (lat lng)
	 */
	function centerMap(data) {
		$.each(data['data']['rows'], function(i, obj) {
			if( typeof obj['geopoint'] != 'undefined') {
				centerLng = obj['geopoint']['longitude'];
				centerLat = obj['geopoint']['latitude'];
				return false;
			}
		})
	}

	function addMarkerToGroup(group, coordinate, html) {
		var marker = new H.map.Marker(coordinate);
		// add custom data to the marker
		marker.setData(html);
		group.addObject(marker);
	}

	/**
	 * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
	 * @param1 object {H.Map} map      A HERE Map instance within the application
	 * @param2 object results
	 * @param3 object ui component
	 */
	function addInfoBubble(map, data, ui) {
		var group = new H.map.Group();

		map.addObject(group);

		// add 'tap' event listener, that opens info bubble, to the group
		group.addEventListener('tap', function (evt) {
		// event target is the marker itself, group is a parent event target
		// for all objects that it contains
		var bubble =  new H.ui.InfoBubble(evt.target.getPosition(), {
			// read custom data
			content: evt.target.getData()
		});
		// show info bubble
		ui.addBubble(bubble);
		}, false);

		// add marker and bubble
		$.each(data['data']['rows'], function(i, obj) {
			addMarkerToGroup(group, {lat:obj['geopoint']['latitude'], lng:obj['geopoint']['longitude']},
			'<div><a href=\'#\' >'+ obj['name']['name'] +'</a>' +
			'</div><div >'+ obj['postal_address']['address1'] +', '+ obj['postal_address']['town'] +', '+ obj['postal_address']['county'] +'</div>');
		});			

	}
	/******************************************************************************************* END Here Map ******************************************************/
})