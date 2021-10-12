<?php
	$dbhost = "localhost";
	$dbname = "patient";
	$dbuser = "root";
	$dbpassword = "kk126523";
	$dbconn = mysqli_connect ($dbhost, $dbuser, $dbpassword) or die (mysqli_error ()); 
	mysqli_select_db ($dbconn,$dbname);
?>