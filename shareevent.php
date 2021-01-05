<?php
	if (isset($_POST['usnm'])) {
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
		$people = (string)$_POST['people'];
		$trimmed = trim($people);
		$finaltrimmed = str_replace(' ', '', $trimmed);
		$arraypeople = explode(',', $finaltrimmed);
		if (strlen($starth)<2) {
			$starth = "0" . $starth;
		}
		if (strlen($startm)<2) {
			$startm = "0" . $startm;
		}
		$stime = $starth . $startm;

		require "database.php";
		$stmt = $mysqli->prepare("insert into events (usnm_fk, title, date, time, description, category, color) values (?, ?, ?, ?, ?, ?, ?)");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('sssssss',$usnm, $et, $sd, $stime, $eventdes, $category, $color);
		$stmt->execute();

		foreach($arraypeople as $person) {
			if($person!=$usnm) {
				$stmt = $mysqli->prepare("insert into events (usnm_fk, title, date, time, description, category, color) values (?, ?, ?, ?, ?, ?, ?)");
				if(!$stmt){
					printf("Query Prep Failed: %s\n", $mysqli->error);
					exit;
				}
				$stmt->bind_param('sssssss',$person, $et, $sd, $stime, $eventdes, $category, $color);
				$stmt->execute();
			}
		}

	}

?>