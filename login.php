<?php
	if (isset($_POST['usnm']) && isset($_POST['pswd'])) {
		# code...
	
		$usnm = $_POST['usnm'];
		$pswd = $_POST['pswd'];
		
		//connect to database
		require "database.php";
		$stmt = $mysqli->prepare("select pswd from users where usnm = ?");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('s', $usnm);
		$stmt->execute();
		$stmt->bind_result($crypted_password);
		$stmt->fetch();
		//echo $crypted_password;
		$stmt->close();
		if(password_verify($pswd, $crypted_password)){
			session_start();
			$_SESSION['userloggedin'] = $usnm;

			//$_SESSION['loggedin'] = true;
			//header("Location: main.php");
			echo json_encode($_SESSION['userloggedin']);
		} else {
			echo json_encode("wrong"); 
		}
	}

?>