<?php
	$dbhost = "localhost";
	$dbname = "cliniceps";
	$dbuser = "root";
	$dbpassword = "kk126523";
	$dbconn = mysqli_connect ($dbhost, $dbuser, $dbpassword) or die (mysqli_error ()); 
	mysqli_select_db ($dbconn,$dbname);
?>