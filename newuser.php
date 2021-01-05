<?php
	if (isset($_POST['usnm']) && isset($_POST['pswd'])) {
		# code...
	
		$usnm = $_POST['usnm'];
		$pswd = $_POST['pswd'];
		
		//connect to database
		require "database.php";
		//get all usernames and passwords from database
		$stmt = $mysqli->prepare("select count(*) from users where usnm=?");
			if(!$stmt){
				printf("Query Prep Failed: %s\n", $mysqli->error);
				exit;
			}
		$stmt->bind_param('s', $usnm);
		$stmt->execute();
		$stmt->bind_result($num);
		$stmt->fetch();
		$stmt->close();
		if($num < 1){
			require "database.php";
			$stmt = $mysqli->prepare("insert into users (usnm, pswd) values (?, ?)");
			if(!$stmt){
				printf("Query Prep Failed: %s\n", $mysqli->error);
				exit;
			}
			$hashed_newpass = password_hash($pswd, PASSWORD_BCRYPT);
			//echo $hashed_newpass;
			$stmt->bind_param('ss',$usnm,$hashed_newpass);
			$stmt->execute();
			$stmt->close();
			echo json_encode("1");
		} else {
			echo json_encode("0");
		}
	}
	
	
?>