<?php define('denyAccess', TRUE); ?>
<!DOCTYPE html>
<html>
<head>
	<title>WebDotCom</title>
	<!-- CSS -->
	<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-bootstrap/0.5pre/css/custom-theme/jquery-ui-1.10.0.custom.css" rel="stylesheet"/>
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet"/>
	<link rel="stylesheet" href="./assets/css/libraries/bootstrap.min.css">
	<link rel="stylesheet" href="./assets/css/style.css">
</head>
<body>
	<div class="container">
		<div class="logo-wrapper">
			<img class="logo" src="http://assets.centralindex.com/A/10/34438913982cc58ebb1c6d15aee847f8.png" style="width: 238px" alt="">
		</div>
		<!-- Form Search View -->
		<?php include('./views/form.php'); ?>
		<!-- Results View -->
		<?php include('./views/results.php'); ?>
	</div>
</body>
<!-- JS -->
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js"></script>
<script src="./assets/js/libraries/bootstrap.min.js"></script>
<script src="./assets/js/libraries/pagination.js"></script>
<script src="./assets/js/app.js" type="text/javascript"></script>
<!-- HERE MAP Resources -->
<link rel="stylesheet" type="text/css" href="https://js.cit.api.here.com/v3/3.0/mapsjs-ui.css" />
<script type="text/javascript" src="https://js.cit.api.here.com/v3/3.0/mapsjs-core.js"></script>
<script type="text/javascript" src="https://js.cit.api.here.com/v3/3.0/mapsjs-service.js"></script>
<script type="text/javascript" src="https://js.cit.api.here.com/v3/3.0/mapsjs-ui.js"></script>
<script type="text/javascript" src="https://js.cit.api.here.com/v3/3.0/mapsjs-mapevents.js"></script>
</html>
