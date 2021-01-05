<?php
	if (isset($_POST['usnm'])) {
		$id = $_POST['id'];
		require "database.php";
		$stmt = $mysqli->prepare("delete from events where id=?");
		if(!$stmt){
			printf("Query Prep Failed: %s\n", $mysqli->error);
			exit;
		}
		$stmt->bind_param('s',$id);
		$stmt->execute();
		$stmt->close();
	}
?>