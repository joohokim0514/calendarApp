<?php
	if (isset($_POST['usnm'])) {
		# code...
	
		$usnm = $_POST['usnm'];
		
		//$usnm = "aaaaaa";
		//connect to database
		mysql_connect("localhost", "wustl_inst", "wustl_pass") or die("Could not connect: " . mysql_error());
		mysql_select_db("calendar");
		$query = "select id,title,date,time,description,category,color from events where usnm_fk = '".$usnm."'"; 
 	
		$result = mysql_query($query) or die(mysql_error());
		$ar = array();
		# code...
		while($row = mysql_fetch_array($result)){
			$eventobj = new \stdClass();
			$eventobj->id = $row['id'];
			$eventobj->title = $row['title'];
			$eventobj->date = $row['date'];
			$eventobj->time = $row['time'];
			$eventobj->description = $row['description'];
			$eventobj->category = $row['category'];
			$eventobj->color = $row['color'];
			array_push($ar, $eventobj);
		}
		$jsonArr = json_encode($ar);
		echo $jsonArr;	
	}
	
?>