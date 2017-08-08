<?php define('denyAccess', TRUE); ?>
<!DOCTYPE html>
<html>
<head>
	<title>WebDotCom</title>
</head>
<body>
	<div class="container">
		<!-- Form Search View -->
		<?php include('./views/form.php'); ?>
		<!-- Results View -->
		<?php include('./views/results.php'); ?>
	</div>
</body>
<!-- JS -->
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/jquery-ui.min.js"></script>
<script src="./assets/js/bootstrap.min.js"></script>
<script src="./assets/js/app.js" type="text/javascript"></script>
<!-- CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-bootstrap/0.5pre/css/custom-theme/jquery-ui-1.10.0.custom.css" rel="stylesheet"/>
<link href="http://maxcdn.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet"/>
<link rel="stylesheet" href="./assets/css/bootstrap.min.css">
<link rel="stylesheet" href="./assets/css/style.css">
</html>