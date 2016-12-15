<?php
	
	$user = $_POST['username'];
	
	$userExist = False;
	$userTable = $pdo->query("SELECT * FROM user");
	while($userRow = $userTable->fetch(PDO::FETCH_ASSOC)){
		if($userRow['username'] == $user){
			$userExist = True;
		}
	}
	
	if(empty($_POST['username']) || empty($_POST['password'])){
		echo 'FIELDS CANNOT BE EMPTY';
		header("refresh:3; url=index.php");
		exit;
	}
	elseif($userExist == False){
		$register = "INSERT INTO user (username, password)
		VALUES (:username, :password)";
		
		$stmt = $pdo->prepare($register);
		$stmt->execute(
			array(
			':username' => $_POST['username'],
			':password' => $_POST['password']
			)
		);
		//echo 'REGISTRATION SUCCESSFUL';
		header("refresh:0; url=home.php");
		exit;
	}
	else{
		echo 'USERNAME ALREADY EXISTS';
		header("refresh:3; url=index.php");
		exit;
	}

	$pdo = null;

?>
