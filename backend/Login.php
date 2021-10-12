<?php 
	require_once ('clinic-eps/database.php'); 

	$username = mysqli_real_escape_string ($dbconn, $_POST["username"]);
	$password = mysqli_real_escape_string ($dbconn, $_POST["password"]);
	$role = mysqli_real_escape_string ($dbconn, $_POST["roles"]);
	//$username = $_POST["username"];
	//$password = md5($_POST["password"]);
	$sql;
	if($role == "Patient")
	{
		$sql = "SELECT * FROM patient WHERE username = '" . $username . "' AND password = '" . $password . "'";
	}
	else if($role == "Doctor")
	{
		$sql = "SELECT * FROM doctor WHERE username = '" . $username . "' AND password = '" . $password . "'";
	}
	else if($role == "Pharmancist")
	{
		$sql = "SELECT * FROM pharmancist WHERE username = '" . $username . "' AND password = '" . $password . "'";
	}
	else if($role == "PAdmin")
	{
		$sql = "SELECT * FROM admin WHERE username = '" . $username . "' AND password = '" . $password . "'";
	}
	
	$result = mysqli_query($dbconn, $sql);
	
	if (mysqli_num_rows ($result) > 0) {
		$row = mysqli_fetch_assoc ($result);
		$resultStr = $row;
	} else
		$resultStr = "FAIL";
		
	mysqli_close($dbconn);
	echo($resultStr);
?>
