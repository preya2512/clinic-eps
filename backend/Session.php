<?php

sessionstart();

if(isset($_SESSION["username"]) && $_SESSION["username"] === true) {

header ("location : accinfo.php");

exit;

}

?>