<!DOCTYPE HTML>

<html>
<head>
    <meta charset="utf-8">
    <title>M7011E</title>

    <!-- Bootstrap CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/freelancer.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/login.css">

</head>

<body id="page-top" class="index">

<p>Testing</p>
<?php
include ("navbar-index.shtml");
include("pdo_connect.php");

if (isset($_SESSION['username'])){
	
}else{
	include ("index-content.shtml");
}
?>

</body>
</html>
