<?php 
	require_once ('database.php'); 

	$username = mysqli_real_escape_string ($dbconn, $_REQUEST["username"]);
	$fname = mysqli_real_escape_string ($dbconn, $_REQUEST["first-name"]);
	$lname = mysqli_real_escape_string ($dbconn, $_REQUEST["last-name"]);
	$email = mysqli_real_escape_string ($dbconn, $_REQUEST["email"]);
	$password = mysqli_real_escape_string ($dbconn, $_REQUEST["password"]);

	
	$patient = "patient";
	$sql = "SELECT * FROM patient WHERE username = '" . $username . "'";
	$result = mysqli_query ($dbconn, $sql);
	if (mysqli_num_rows ($result) > 0) {
		$resultStr = "FAIL";
		
	} else {
		$sql = "INSERT INTO patient (Username, Password, fname, lname, Email, role) VALUES ('" . $username . "', '" . $password . "', '" . $fname . "', '". $lname . "', '" . $email . "', '" . $patient . "')";
		$result = mysqli_query ($dbconn, $sql);
		
		if ($result) {
			$resultStr = "Pass";
		} 
		else
		{
			$resultStr = "Fail";
		}
	}
	if ($resultStr == "Pass")
	{
		echo($resultStr);
		echo "<br><a href='LoginPage.html'>LoginPage</a>";
	}
	else
	{
		echo($resultStr);
		echo "<br><a href='PatientSignUp.html'>Back to Sign Up</a>";
	}
?>