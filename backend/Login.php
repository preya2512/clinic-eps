<?php 
	require_once ('database.php'); 

	$username = mysqli_real_escape_string ($dbconn, $_POST["username"]);
	$password = mysqli_real_escape_string ($dbconn, $_POST["password"]);
	$role = mysqli_real_escape_string ($dbconn, $_POST["roles"]);
	//$username = $_POST["username"];
	//$password = md5($_POST["password"]);
	$sql;
	if($role == "Patient")
	{
		$sql = "SELECT * FROM patient WHERE Username = '" . $username . "' AND Password = '" . $password . "'";
	}
	else if($role == "Doctor")
	{
		$sql = "SELECT * FROM doctor WHERE Username = '" . $username . "' AND Password = '" . $password . "'";
	}
	else if($role == "Pharmacist")
	{
		$sql = "SELECT * FROM pharmacist WHERE Username = '" . $username . "' AND Password = '" . $password . "'";
	}
	else if($role == "Admin")
	{
		$sql = "SELECT * FROM admin WHERE Username = '" . $username . "' AND Password = '" . $password . "'";
	}
	
	$result = mysqli_query($dbconn, $sql);
	
	if (mysqli_num_rows ($result) > 0) {
		$row = mysqli_fetch_assoc ($result);
		$resultStr = $row;
		$result = "Pass";
	} else
		$result = "FAIL";
	
	if($role == "Patient" && $result == "Pass")
	{
		echo($result);
		echo "<br><a href='PatientHome.html'>PatientHome</a>";
	}
	else if($role == "Doctor" && $result == "Pass")
	{
		echo($result);
		echo "<br><a href='DoctorHome.html'>DoctorHome</a>";
	}
	else if($role == "Pharmacist" && $result == "Pass")
	{
		echo($result);
		echo "<br><a href='PharmacistHome.html'>PharmacistHome</a>";
	}
	else if($role == "Admin" && $result == "Pass")
	{
		echo($result);
		echo "<br><a href='AdminHome.html'>AdminHome</a>";
	}
	else
	{
		echo "<a href='LoginPage.html'>Failed Login back to Login Page</a>";
	}
	mysqli_close($dbconn);
?>
