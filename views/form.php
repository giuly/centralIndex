<?php
if(!defined('denyAccess')) { die('Direct access not permitted');}
?>

<div class="col-md-12">
	<form method="GET" class="form-inline">
		<div class="form-group">
        	<label for="keyword">I'm looking for</label>
        	<input name="keyword" id="keyword" type="text" />
        </div>
		<div class="form-group">
			<label for="location">Located in</label>
			<input name="location" id="location" type="text" />
		</div>
		<div class="form-group">
			<button type="submit" data-rel="1" class="btn btn-default search">Search</button>
		</div>
	</form>
</div>