<?php 
	require_once ('database.php'); 

	$username = mysqli_real_escape_string ($dbconn, $_REQUEST["username"]);
	$fname = mysqli_real_escape_string ($dbconn, $_REQUEST["first-name"]);
	$lname = mysqli_real_escape_string ($dbconn, $_REQUEST["last-name"]);
	$email = mysqli_real_escape_string ($dbconn, $_REQUEST["email"]);
	$password = mysqli_real_escape_string ($dbconn, $_REQUEST["password"]);

	
	$sql = "SELECT COUNT(*) FROM patient";
	$id = mysqli_query ($dbconn, $sql);
	$patient = "patient";
	$sql = "SELECT * FROM patient WHERE username = '" . $username . "'";
	$result = mysqli_query ($dbconn, $sql);
	if (mysqli_num_rows ($result) > 0) {
		$resultStr = "FAIL";
		
	} else {
		$sql = "INSERT INTO patient (UserID ,Username, Password, fname, lname, Email, role) VALUES ('" . $id . "', '" . $username . "', '" . $password . "', '" . $fname . "', '". $lname . "', '" . $email . "', '" . $patient . "')";
		$result = mysqli_query ($dbconn, $sql);
		
		if ($result) {
			$resultStr = "PASS";
		} 
		else
		{
			$resultStr = "FAIL";
		}
	}
		
	echo($resultStr);

?>