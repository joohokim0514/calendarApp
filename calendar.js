//DOM load
document.addEventListener("DOMContentLoaded",getTodayMonth,false);
//prev and next arrow listener
document.getElementById("prev").addEventListener("click",prevMonth,false);
document.getElementById("next").addEventListener("click",nextMonth,false);

//global variables
var userloggedin = "guest";
var monthstr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//get current month and date
function getTodayMonth(event){
	var today = new Date();
	var yyyy = today.getFullYear();
	console.log("yyyy = " + yyyy);
	//January is 0
	var mm = today.getMonth();
	console.log("mm = " + mm);
	//var dd = today.getDate();
	
	//var today = yyyy+"&nbsp;&nbsp;&nbsp;"+monthstr[mm];
	console.log("today = " + today);
	showCalendar(yyyy, mm+1);
}

//cite from: https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
//return how many days in that year and month
function daysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}

//return the day in week of the first day of that month in that year
function dayOfFirst(year, month) {
    return new Date(year, (month-1), 1).getDay();
}
function YMDtoStr(year, month, date){
	var ystr = year.toString();
	var dstr = date.toString();
	if (dstr.length<2) {
		dstr = "0"+dstr;
	}
	var mstr = month.toString();
	if (mstr.length<2) {
		mstr = "0"+mstr;
	}
	//console.log("mstr = " + mstr);
	//console.log("dstr = " + dstr);
	return ystr+"-"+mstr+"-"+dstr;
}

//monthstr to month number convert
function strToNum(month){
	if (month == "January") {
		return 1;
	} else if (month == "February"){
		return 2;
	} else if (month == "March"){
		return 3;
	} else if (month == "April"){
		return 4;
	} else if (month == "May"){
		return 5;
	} else if (month == "June"){
		return 6;
	} else if (month == "July"){
		return 7;
	} else if (month == "August"){
		return 8;
	} else if (month == "September"){
		return 9;
	} else if (month == "October"){
		return 10;
	} else if (month == "November"){
		return 11;
	} else {
		return 12;
	}
}
//previous month
function prevMonth(){
	var year = parseInt(document.getElementById("year").innerHTML);
	console.log("year = " + year);
	var month = document.getElementById("month").innerHTML;
	console.log("month = " + month);
	var m = parseInt(strToNum(month));
	console.log("m = " + m);
	//if current month is Jan, the previous month would be Dec, and 1 year before
	if (m == 1) {
		m = 12;
		year = year - 1;
	} else {
		m = m - 1;
	}
	//delete all the rows below <th> by getting the total number of rows in the table first
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update the calendar
	showCalendar(year, m);
	//addSelector();
}
//next month
function nextMonth(){
	var year = parseInt(document.getElementById("year").innerHTML);
	console.log("year = " + year);
	var month = document.getElementById("month").innerHTML;
	console.log("month = " + month);
	var m = parseInt(strToNum(month));
	console.log("m = " + m);
	//if current month is Dec, the next month would be Jan, and 1 year after
	if (m == 12) {
		m = 1;
		year = year + 1;
	} else {
		m = m + 1;
	}
	//delete all the rows below <th> by getting the total number of rows in the table first
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update the calendar
	showCalendar(year, m);
	//addSelector();
}





function showCalendar(year, month){
	document.getElementById("year").innerHTML = year + " ";
	document.getElementById("month").innerHTML = monthstr[month-1];
	var date = 1;
	//convert to str
	
	var today = new Date();
	var flag = false;
	var totaldays = daysInMonth (year, month);
	console.log("totaldays = " + totaldays);
	var firstday = dayOfFirst(year, month);
	console.log("firstday = " + firstday);
	//total rows in the calendar in that specific month
	var rows = Math.ceil((totaldays + firstday) / 7);
	console.log("rows = " + rows);
	for (var j = 0; j < rows; j++) {
		//create <tr> tag
		var tr = document.createElement("tr");
		tr.setAttribute("class", "weekrow");
		//append <tr> tag to table
		document.getElementsByClassName("caltable")[0].appendChild(tr);
		for (var i = 0; i < 7; i++) {
			//create <td> tag
			var td = document.createElement("td");
			
			//first day of this month
			if (j === 0 && i == firstday) {
				flag = true;
			} 
			if (flag) {
				td.setAttribute("class", "avail");
				//to set each td a unique id
				td.setAttribute("id",YMDtoStr(year, month, date));
				var t = document.createTextNode(date);
				var span = document.createElement("SPAN");
				span.appendChild(t);
				td.appendChild(span);
				//showToday(year,month,date);
				date = date + 1;
			} else {
				td.setAttribute("class", "empty");
			}
			if (date > totaldays){
				flag = false;
			}
			//append <td> tag to <tr>
			tr.appendChild(td);
		}
	}
	//highlight today
	var tdid = "#"+YMDtoStr(today.getFullYear(), today.getMonth()+1, today.getDate());
	console.log("tdid = " + tdid);
	//$(tdid).css("background","rgba(73, 230, 0, 0.1)");
	$(tdid).append("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id='today'>Today</span>");
	$(tdid).css("background","rgba(73, 230, 0, 0.1)");
	addSelector(tdid);
	console.log("userloggedin in calendar = " + userloggedin);
	showEvent(userloggedin);
	$("#sharecalendar").prop("disabled",true);
	$("#sharecalendarusersdiv").css("display","none");
	$("#initiatesharecalendar").prop("disabled",false);

}


//select specific date
function addSelector(todaystr){
	$(".avail").click(function(event){
		var id = event.target.id;
		var str = "#"+id;
		console.log("hahaha = " + str);
		$(".avail").css("background","white");
		if (todaystr == str) {
			
			$(todaystr).css("background","rgba(73, 230, 0, 0.4)");
		} else {

			$(todaystr).css("background","rgba(73, 230, 0, 0.1)");
			$(str).css("background","rgba(0, 122, 204, 0.2)");
		}
		if (userloggedin != "guest") {
			if ($("#eventlist").find("button").length) {
				$("#eventlist").find("button").remove();
			}
			//reset clear input first
			$("#et").val("");
			$("#sd").val("");
			$("#hh").val("");
			$("#mm").val("");
			$("#des").val("");
			$("#list").val("----");

			$("#addevent").prop("disabled",false);
			$("#updateevent").prop("disabled",true);
			$("#deleteevent").prop("disabled",true);
			$("#shareevent").prop("disabled",true);
			$("#initiategroupevent").prop("disabled",false);


			for (var i = 0; i < msg.length; i++) {
				if (id == msg[i].date) {
						$("#eventlist").append("<button id='"+msg[i].id+"' class='eventbtn'>"+msg[i].title+"</button>");
						document.getElementById(msg[i].id).style.background=msg[i].color;

						$(".eventbtn").css("background",'"+msg[i].color+"');
						//console.log("msg[i].id = " + msg[i].id);
						console.log("im here...");

					//}
					
				}
			}
			viewEvent();
		}
	});
	
}
//view and update event function
function viewEvent(){
	$(".eventbtn").click(function(event){
		for (var i = 0; i <msg.length; i++) {
			if (event.target.id == msg[i].id) {
				var id = msg[i].id;
				$("#et").val(msg[i].title);
				$("#sd").val(msg[i].date);
				$("#list").val(msg[i].category);
				var numt = parseInt(msg[i].time);
				var hh = Math.floor(numt / 100);
				$("#hh").val(hh);
				var mm = numt % 100;
				$("#mm").val(mm);
				$("#des").val(msg[i].description);
				$("#addevent").prop("disabled",true);
				$("#updateevent").prop("disabled",false);
				$("#deleteevent").prop("disabled",false);
				$("#shareevent").prop("disabled",true);
				$("#sharediv").css("display","none");
				$("#initiategroupevent").prop("disabled",true);
				

				$("#updateevent").bind("click", function(){
					//create httprequest object
					var xmlHttp = new XMLHttpRequest();
					//url
					var url = "updateevent.php";
					//console.log("usnm+pswd = " + data);
					xmlHttp.open("POST", url, true);
					xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					xmlHttp.send("id="+id+"&usnm="+userloggedin+"&et="+$("#et").val()+"&sd="+$("#sd").val()+"&starth="+$("#hh").val()+"&startm="+$("#mm").val()+"&eventdes="+$("#des").val()+"&category="+$("#list").val());
					//console.log("echo once");
					//callback
					xmlHttp.addEventListener("load", ajaxUpdateEventCallBack, false);
				});
				$("#deleteevent").click(function(){
					//create httprequest object
					var xmlHttp = new XMLHttpRequest();
					//url
					var url = "deleteevent.php";
					//console.log("usnm+pswd = " + data);
					xmlHttp.open("POST", url, true);
					xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					xmlHttp.send("id="+id+"&usnm="+userloggedin);
					//console.log("echo once");
					//callback
					xmlHttp.addEventListener("load", ajaxDeleteEventCallBack, false);
				});
			}
		}
		
	});
}
/////////////////
function ajaxUpdateEventCallBack(){
	console.log("updated!!!!!");
	$("#et").val("");
	$("#sd").val("");
	$("#hh").val("");
	$("#mm").val("");
	$("#des").val("");
	$("#list").val("----");

	$("#updateevent").unbind();

	//clear calendar
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update calendar view
	if ($("#eventlist").find("button").length) {
		$("#eventlist").find("button").remove();
	}
	$("#addevent").prop("disabled",false);
	$("#updateevent").prop("disabled",true);
	$("#deleteevent").prop("disabled",true);
	$("#shareevent").prop("disabled",true);
	$("#initiategroupevent").prop("disabled",false);
	
	showCalendar(parseInt($("#year").text()), strToNum($("#month").text()));
	//unbind update event button
}
////////////////
/////////////
function ajaxDeleteEventCallBack(){
	console.log("deleted!!!!!");
	$("#et").val("");
	$("#sd").val("");
	$("#hh").val("");
	$("#mm").val("");
	$("#des").val("");
	$("#list").val("----");

	//clear calendar
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update calendar view
	if ($("#eventlist").find("button").length) {
		$("#eventlist").find("button").remove();
	}
	$("#addevent").prop("disabled",false);
	$("#updateevent").prop("disabled",true);
	$("#deleteevent").prop("disabled",true);
	$("#shareevent").prop("disabled",true);
	$("#initiategroupevent").prop("disabled",false);
	$("#sharediv").css("display","none");

	showCalendar(parseInt($("#year").text()), strToNum($("#month").text()));
	
	//userloggedin = "guest";
}
//////////////////
//
function showEvent(user){
	if (user != "guest") {
		//create httprequest object
		var xmlHttp = new XMLHttpRequest();
		//url
		var url = "displayevent.php";
		//console.log("usnm+pswd = " + data);
		xmlHttp.open("POST", url, true);
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlHttp.send("usnm="+user);
		console.log("echo once");
		//callback
		
		xmlHttp.addEventListener("load", ajaxShowEventCallBack, false);
		//xmlHttp.abort();
		
	}
	
}
//call back from showevent
var msg;
function ajaxShowEventCallBack(event){
	msg = JSON.parse(event.target.responseText);
	
	//console.log("events detail = " + msg[1].id + " " + msg[0].title);
	console.log("all events number= " + msg.length);
	if (msg.length > 0) {
		for (var i = 0; i < msg.length; i++) {
			var showstr = "#"+msg[i].date;

			if ($(showstr).find("lable").length) {
				//var count = parseInt($(showstr).find("strong").text())+1;
				//$(showstr).find("strong").text(count);
			} else {
				$(showstr).append("<br><br><lable>Events </lable>");
				//$(showstr).append("<strong>1</strong>");
			}
			
			//$(showstr).append("*");
		}
	}
	
}

//add event to the database
function addEvent(){
	//create httprequest object
	var usnm = userloggedin;
	var et = $("#et").val();
	//console.log("et = " + et);
	var sd = $("#sd").val();
	//console.log("sd = " + sd);
	var starth = $("#hh").val();
	//console.log("starth = " + starth);
	var startm = $("#mm").val();
	//console.log("startm = " + startm);
	var eventdes = $("#des").val();
	var category = $("#list").val();
	//console.log("eventdes = " + eventdes);
	//console.log("count = ######");
	xmlHttp = new XMLHttpRequest();
	var url = "addevent.php";
	//console.log("usnm+pswd = " + data);
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("usnm="+usnm+"&et="+et+"&sd="+sd+"&starth="+starth+"&startm="+startm+"&eventdes="+eventdes+"&category="+category);
	xmlHttp.addEventListener("load", ajaxAddEventCallBack, false);
	//xmlHttp.abort();

}

function ajaxAddEventCallBack(event){
	//var addflag = JSON.parse(event.target.responseText);
	//if (addflag) {
	console.log("add event success!");
	$("#et").val("");
	$("#sd").val("");
	$("#hh").val("");
	$("#mm").val("");
	$("#des").val("");
	$("#sharediv").css("display","none");
	$("#list").val("----");
	$("#addevent").unbind();

		$("#updateevent").unbind();

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

	//clear calendar
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update calendar view
	
	showCalendar(parseInt($("#year").text()), strToNum($("#month").text()));
	
	//showEvent(userloggedin);
}


function shareEvent() {
	$("#sharediv").css("display","none");
	$("#shareevent").prop("disabled",true);
	$("#initiategroupevent").prop("disabled",false);
	$("#initiategroupevent").unbind();

	var usnm = userloggedin;
	var et = $("#et").val();
	//console.log("et = " + et);
	var sd = $("#sd").val();
	//console.log("sd = " + sd);
	var starth = $("#hh").val();
	//console.log("starth = " + starth);
	var startm = $("#mm").val();
	//console.log("startm = " + startm);
	var eventdes = $("#des").val();
	var people = $("#people").val();
	var category = $("#list").val();
	//console.log("eventdes = " + eventdes);
	//console.log("count = ######");
	xmlHttp = new XMLHttpRequest();
	var url = "shareevent.php";
	//console.log("usnm+pswd = " + data);
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("usnm="+usnm+"&et="+et+"&sd="+sd+"&starth="+starth+"&startm="+startm+"&eventdes="+eventdes+"&people="+people+"&category="+category);
	xmlHttp.addEventListener("load", ajaxShareEventCallBack, false);
}

function ajaxShareEventCallBack(event){
	console.log("share event success!");
	$("#et").val("");
	$("#sd").val("");
	$("#hh").val("");
	$("#mm").val("");
	$("#des").val("");
	$("#people").val("");
	$("#list").val("----");
	$("#shareevent").unbind();

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

	//clear calendar
	var x = document.getElementById("caltable").rows.length;
	for (var i = 0; i < x-2; i++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update calendar view
	
	showCalendar(parseInt($("#year").text()), strToNum($("#month").text()));
}

function searchEventByTitle(){
	$("#searchresultdiv").empty();
	var usnm = userloggedin;
	var eet = $("#eet").val();

	xmlHttp = new XMLHttpRequest();
	var url = "searcheventbytitle.php";
	//console.log("usnm+pswd = " + data);
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("usnm="+usnm+"&eet="+eet);
	xmlHttp.addEventListener("load", ajaxSearchEventByTitleCallBack, false);
}

function searchEventByDate(){
	$("#searchresultdiv").empty();
	var usnm = userloggedin;
	var esd = $("#esd").val();

	xmlHttp = new XMLHttpRequest();
	var url = "searcheventbydate.php";
	//console.log("usnm+pswd = " + data);
	xmlHttp.open("POST", url, true);
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.send("usnm="+usnm+"&esd="+esd);
	xmlHttp.addEventListener("load", ajaxSearchEventByDateCallBack, false);
}

function ajaxSearchEventByTitleCallBack(event) {
	msg = JSON.parse(event.target.responseText);
	$("#searchbytitle").unbind();

	$("#searchbytitle").bind("click", function(){
		searchEventByTitle();
		$('#searchresultdiv').empty();
	});
	
	if (msg.length > 0) {
		for (var i = 0; i < msg.length; i++) {
			var hour1 = msg[i].time.charAt(0);
			var hour2 = msg[i].time.charAt(1);
			var colon = ':';
			var minute1 = msg[i].time.charAt(2);
			var minute2 = msg[i].time.charAt(3);
			$("#searchresultdiv").append("Title: "+msg[i].title+"<br>");
			$("#searchresultdiv").append("Date: "+msg[i].date+"<br>");
			$("#searchresultdiv").append("Time: "+hour1+""+hour2+""+colon+""+minute1+""+minute2+"<br>");
			$("#searchresultdiv").append("Description: "+msg[i].description+"<br>");
			$("#searchresultdiv").append("Category: "+msg[i].category+"<br>");
			$("#searchresultdiv").append("<br>");
		}
	} else {
		$("#searchresultdiv").append("No match found");
	}

	var x = document.getElementById("caltable").rows.length;
	for (var j = 0; j < x-2; j++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update calendar view
	
	showCalendar(parseInt($("#year").text()), strToNum($("#month").text()));
}

function ajaxSearchEventByDateCallBack(event) {
	msg = JSON.parse(event.target.responseText);
	$("#searchbydate").unbind();

	$("#searchbydate").bind("click", function(){
		searchEventByDate();
		$('#searchresultdiv').empty();
	});
	
	if (msg.length > 0) {
		for (var i = 0; i < msg.length; i++) {
			var hour1 = msg[i].time.charAt(0);
			var hour2 = msg[i].time.charAt(1);
			var colon = ':';
			var minute1 = msg[i].time.charAt(2);
			var minute2 = msg[i].time.charAt(3);
			$("#searchresultdiv").append("Title: "+msg[i].title+"<br>");
			$("#searchresultdiv").append("Date: "+msg[i].date+"<br>");
			$("#searchresultdiv").append("Time: "+hour1+""+hour2+""+colon+""+minute1+""+minute2+"<br>");
			$("#searchresultdiv").append("Description: "+msg[i].description+"<br>");
			$("#searchresultdiv").append("Category: "+msg[i].category+"<br>");
			$("#searchresultdiv").append("<br>");
		}
	} else {
		$("#searchresultdiv").append("No match found");
	}

	var x = document.getElementById("caltable").rows.length;
	for (var j = 0; j < x-2; j++) {
		document.getElementById("caltable").deleteRow(2);
	}
	//update calendar view
	
	showCalendar(parseInt($("#year").text()), strToNum($("#month").text()));
}


