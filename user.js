
//bind register button
$("#regi").bind("click",function(){
	//regex check username

	var usnm = $("#usnm").val();
	console.log("username = " + usnm);
	var usnmmatch = /^[A-Za-z0-9][A-Za-z0-9]{5,31}$/.test(usnm);
	console.log("usnm match = " + usnmmatch);
	
	//regex check password

	var pswd = $("#pswd").val();
	console.log("password = " + pswd);
	var pswdmatch = /^[A-Za-z0-9][A-Za-z0-9]{5,31}$/.test(pswd);
	console.log("pswd match = " + pswdmatch);
	//show error message
	if (!usnmmatch) {
		$("#usnmwrong").html("invalid username!");
	} else {
		$("#usnmwrong").html("");
	}
	if (!pswdmatch) {
		$("#pswdwrong").html("invalid password!");
	} else {
		$("#pswdwrong").html("");
	}
	//valid username and password!
	if (usnmmatch && pswdmatch) {
		//create httprequest object
		var xmlHttp = new XMLHttpRequest();
		//url
		var url = "newuser.php";
		//console.log("usnm+pswd = " + data);
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send("usnm="+usnm+"&pswd="+pswd);
		//callback
		xmlHttp.addEventListener("load", ajaxAddCallBack, false);
		//xmlHttp.send(null);
		
	} else {
		$("#regitext").html("");
	}
	$("#logintext").html("");
	
});

//bind login button
$("#login").bind("click",function(){
	//create httprequest object
	var xmlHttp = new XMLHttpRequest();
	var usnm = $("#usnm").val();
	var pswd = $("#pswd").val();
	console.log("login.usnm = "+usnm);
	console.log("login.pswd = "+pswd);

	
	//url
	var url = "login.php";
	//console.log("usnm+pswd = " + data);
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("usnm="+usnm+"&pswd="+pswd);
	//callback
	xmlHttp.addEventListener("load", ajaxLoginCallBack, false);
});


//bind logout button
$("#logout").bind("click",function(){
	//create httprequest object
	var xmlHttp = new XMLHttpRequest();
	var url = "login.php";
	//console.log("usnm+pswd = " + data);
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send(null);
	xmlHttp.addEventListener("load", ajaxLogoutCallBack, false);
});

//callback function for add
function ajaxAddCallBack(event){
	var msgnewuser = JSON.parse(event.target.responseText);
	//alert(msg);
	if (msgnewuser > 0) {
		//success change color to green
		$("#regitext").css("color", "#00e600");
		$("#regitext").html("new user created!");
	} else {
		//fail change color to red
		$("#regitext").css("color", "#ff66a3");
		$("#regitext").html("user already exist!");
	}
	//clear text
	$("#usnmwrong").html("");
	$("#pswdwrong").html("");
	$("#logintext").html("");
}
//callback function for login
function ajaxLoginCallBack(event){
	var msglogin = JSON.parse(event.target.responseText);
	console.log("msglogin = " + msglogin);
	if (msglogin != "wrong") {
		//success change color to green
		$("#logintext").css("color", "#00e600");
		$("#logintext").html("login success!");
		
		//hide register button
		$("#regi").css("display","none");
		//reset value
		// $("#usnm").val("");
		// $("#pswd").val("");
		//hide text input
		$("#usnm").attr("hidden",true);
		$("#pswd").attr("hidden",true);
		//hide login button
		$("#login").attr("hidden",true);
		//add logout button
		$("#logout").attr("hidden",false);
		userloggedin = msglogin;

		console.log("userloggedin = " + userloggedin);
		//display the loggedinuser to the header
		$("#header").html(userloggedin+", welcome! Here is your schedule");
		//display the eventdiv
		$("#eventdiv").css("display","block");
		$("#sharecalendardiv").css("display","block");
		$("#sharecalendarusersdiv").css("display","none");
		$("#sharediv").css("display","none");
		//disable buttons
		$("#addevent").prop("disabled",false);
		$("#updateevent").prop("disabled",true);
		$("#deleteevent").prop("disabled",true);
		$("#shareevent").prop("disabled",true);
		$("#searcheventdiv").css("visibility", "visible");
		$("#searchresultdiv").css("visibility", "visible");
		$("#searchresultdiv").css("visibility", "visible");

		$("#categorybycolor").css("display","block");

		$("#searchbytitle").unbind();
		$("#searchbydate").unbind();
		bindbuttons();
		showEvent(userloggedin);

	} else {
		//fail change color to red
		$("#logintext").css("color", "#ff66a3");
		$("#logintext").html("username or password is wrong!");
	}
	$("#usnmwrong").html("");
	$("#pswdwrong").html("");
	$("#regitext").html("");
}

//callback function for logout
function ajaxLogoutCallBack(event){
	//set inputs visible
	$("#header").html("");
	$("#usnm").attr("hidden",false);
	$("#pswd").attr("hidden",false);
	$("#usnm").val("");
	$("#pswd").val("");
	$("#login").attr("hidden",false);
	$("#logintext").html("");
	$("#regi").css("display","inline");
	$("#logout").attr("hidden",true);
	$("#categorybycolor").css("display","none");
	$("#eet").val("");
	$("#esd").val("");

	
	//clear all eventdiv inputs
	$("#et").val("");
	$("#sd").val("");
	$("#hh").val("");
	$("#mm").val("");
	$("#des").val("");
	$("#list").val("----");

	//hide eventdiv
	$("#eventdiv").css("display", "none");
	//reset user to guest
	//disable buttons////
	$("#addevent").prop("disabled",true);
	$("#updateevent").prop("disabled",true);
	$("#deleteevent").prop("disabled",true);
	$("#shareevent").prop("disabled",true);

	/////
	$("#eventdiv").css("display","none");
	$("#sharediv").css("display","none");
	$("#searcheventdiv").css("visibility", "hidden");
	$("#searchresultdiv").css("visibility", "hidden");
	$('#searchresultdiv').empty();



	//unbind add event button
	$("#addevent").unbind();
	//unbind update event button
	$("#updateevent").unbind();
	//unbind delete event button
	$("#deleteevent").unbind();
	$("#shareevent").unbind();
	$("#searchbytitle").unbind();
	$("#searchbydate").unbind();
	$("#initiategroupevent").unbind();



	userloggedin = "guest";
	//console.log("log out user! = "+userloggedin);
	//xmlHttpadd.abort();
	//reset msg
	msg = {};
	//console.log("log out msg = " + msg);
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update the calendar
	getTodayMonth();
	
}

function bindbuttons() {
	$("#searchbytitle").bind("click", function(){
		searchEventByTitle();
		//$('#searchresultdiv').empty();
	});

	$("#searchbydate").bind("click", function(){
		searchEventByDate();
		//$('#searchresultdiv').empty();
	});

	//bind add event button
	$("#addevent").bind("click",function(){
		//console.log("LOL");
		//console.log("why LOL twice?");
		if ($.trim($('#et').val()) === '' || $.trim($('#sd').val()) === '' || $.trim($('#hh').val()) === '' || $.trim($('#mm').val()) === '') {
			if ($("#eventdiv").find("#fieldmiss").length) {
				$("#eventdiv").find("#fieldmiss").remove();
			}
			$("#eventdiv").append("<span id='fieldmiss'>at least one field is missing!</span>");
			$("#fieldmiss").css("color","#ff66a3");
			console.log("at least one field is missing!");

		} else {
			if ($("#eventdiv").find("#fieldmiss").length) {
				$("#eventdiv").find("#fieldmiss").remove();

			}
			addEvent();
			console.log("you have et input");
		}
	});

	$("#initiategroupevent").bind("click", function(){
		$("#shareevent").prop("disabled",false);
		$("#addevent").prop("disabled",true);
		$("#initiategroupevent").prop("disabled",true);
		$("#sharediv").css("display","block");
	});

	$("#shareevent").bind("click",function(){
		if ($.trim($('#et').val()) === '' || $.trim($('#sd').val()) === '' || $.trim($('#hh').val()) === '' || $.trim($('#mm').val()) === '' || $.trim($('#people').val()) ==='') {
			if ($("#eventdiv").find("#fieldmiss").length) {
				$("#eventdiv").find("#fieldmiss").remove();
			}
			$("#eventdiv").append("<span id='fieldmiss'>at least one field is missing!</span>");
			$("#fieldmiss").css("color","#ff66a3");
			console.log("at least one field is missing!");

		} else {
			if ($("#eventdiv").find("#fieldmiss").length) {
				$("#eventdiv").find("#fieldmiss").remove();
			}
			shareEvent();
		}
	});


}

