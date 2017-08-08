$(document).ready(function() {
	var itemsPerPage = 10;

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

	// Search 
	$('.search').on('click', function(e) {
		// Prevent form submisson
		e.preventDefault();
		// load default page 
		var page = 1;
		// call search function
		search(page);
	})

	// Start a loading animation
	function loadingIn() { $('.loading').show(); $('.error > div').html(''); $('.error').hide(); $('#list').html('');}
	// Close the loading animation
	function loadingOut() { $('.loading').hide(); }
	// Error handler 
	function error(msg) { $('.error').append('<div>' +msg+ '</div>').show();	}
	
	// Search function
	// @param1 - string (keyword)
	// @param2 - string (location)
	// @param3 - integer (page)
	// return - void
	function search(page){
		
		// Add loading bar
		loadingIn();
		// Ajax call to the API
		var keyword = $('#keyword').val();
		var location = $('#location').val();

		$.ajax({
			url: '../../controller/search.php',
			data: {
				page,
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
					paginate(data['data']['total_rows'], page);
					// Show phone number
					$('.showPhone').on('click', function(e) {
						e.preventDefault();
						$(this).hide()
						$(this).next('span.phoneNumberHid').show();
					})
					// Search 
					$('.searchFromPage').on('click', function(e) {
						// Prevent form submisson
						e.preventDefault();
						// load page sent from pagination
						var page = $(this).attr('data-rel');
						// call search function
						search(page);
					})
				} else {
					// On error - print error mesagge
					error(data['msg']);
				}
			}
		})
	}

	// Build the pagination
	// @param - integer (totalRows)
	// @return - void
	function paginate(totalRows, currentPage) {
		var paginateTemplate = '';
		var totalPages = Math.ceil(totalRows/itemsPerPage);
		for(var i=1; i<=totalPages; i++) {
			var active = (i == currentPage) ? "active" : ""
			paginateTemplate += '<li class="'+active+'"><a href="#" data-rel="'+i+'" class="searchFromPage">'+ i +'</a></li>';
		}
		$('.pagination').html(paginateTemplate);
	}

	// Load template - Simulate a template engine
	// @params - object
	// @return - string
	function renderTemplate(data) {
		// check if has phone
		var phoneNumber = '<span><i class="icon-ban-circle" aria-hidden="true"></i>&nbsp;Not available</span>';
		if(typeof data['claim'] != 'undefined') {
			if( data['claim']['claim_method']['phone_number'].length != 0) {
				phoneNumber = '<span class="showPhone"><a href="#">show phone</a></span><span class="phoneNumberHid"><i class="icon-phone"></i>&nbsp;' + data['claim']['claim_method']['phone_number'] + '</span>';
			}
		} else {
			
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
})