<?php
if(!defined('denyAccess')) { die('Direct access not permitted');}
?>

<div class="col-md-12 results">
	<div class='loading'></div>
	<div class='error'>Sorry, we have no results</div>

	<div id="splitResults">	
		
		<ul class="nav nav-tabs">
			<li class="active">
        <a href="#list" data-toggle="tab">List</a>
			</li>
			<li>
				<a href="#map" data-toggle="tab">Map</a>
			</li>
		</ul>

		<div class="tab-content">
		  <div class="tab-pane active" id="list"></div>
			<div class="tab-pane" id="map" style="position:absolute; width: 97%; height: 400px;"></div>
		</div>

  </div>

  <ul id="pagination" class="pagination"></ul>

</div>