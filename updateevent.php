<?php
	if (isset($_POST['usnm'])) {
		# code...
		session_start();
		$usnm = $_SESSION['userloggedin'];
		$et = $_POST['et'];
		$sd = $_POST['sd'];
		$starth = (string)$_POST['starth'];
		$startm = (string)$_POST['startm'];
		$eventdes = (string)$_POST['eventdes'];
		$category = (string)$_POST['category'];
		if($category == "----") {
			$color = "#FFFFFF";
		}else if($category == "Family") {
			$color = "#90EE90";
		}else if($category == "Friends") {
			$color = "#E0A955";
		}else if($category == "Work") {
			$color = "#FF5300";
		}else if($category == "Activities") {
			$color = "#7c7ddd";
		}else if($category == "Other") {
			$color = "#ff57c5";
		}


		if (strlen($starth)<2) {
			$starth = "0" . $starth;
		}
		if (strlen($startm)<2) {
			$startm = "0" . $startm;
		}
		$stime = $starth . $startm;
		$id = $_POST['id'];
		//connect to database
		require "database.php";
		$stmt = $mysqli->prepare("update events set title=?, date=?, time=?, description=?, category=?, color=? where id=?");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('sssssss',$et, $sd, $stime, $eventdes, $category, $color, $id);
		$stmt->execute();
		$stmt->close();
	}

	


?>