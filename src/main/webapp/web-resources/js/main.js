$(document).ready(function(){

$("#welcome").text('Welcome, ' + localStorage.getItem("firstName"));

});

var welcomeUser;

var validateLogin = function () {
	var userId = $('#userid').val();
	var password = $('#password').val();

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/user?email=' + userId + '&password=' + password,
		dataType: "json",
		async: false,
		success: function (data) { 
			loginSuccess(data);
		},
		
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			$("#validationMessage").text("invalid login/ password");
		}
	});
};


// SUBMIT FORM
var userRegister = function () {
	// Prevent the form from submitting via the browser.
	event.preventDefault();
	ajaxPost();
};

function ajaxPost() {
	// PREPARE FORM DATA
	var formData = {
		firstName: $("#firstName").val(),
		lastName: $("#lastName").val(),
		country: $("#country").val(),
		city: $("#city").val(),
		email: $("#email").val(),
		password: $("#password").val(),
		confirmPassword: $("#confirmPassword").val()
	}
	// DO POST
	$.ajax({
		type: "POST",
		contentType: "application/json",
		url: "http://localhost:8080/register",
		data: JSON.stringify(formData),
		dataType: 'json',

		success: function (data, textStatus, jqXHR) {
			alert('User registered successfully' + jqXHR.status);
			window.location.href = 'mainPage.html';
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert('userRegistry error: ' + textStatus + jqXHR.status);
		}
	});

}

function loginSuccess(data){
	localStorage.setItem('firstName', data.firstName);
	alert(localStorage.getItem('firstName'));
	welcomeUser= "Welcome, " + localStorage.getItem('firstName');

	window.location.href = 'mainPage.html';
};

function logout(){

	localStorage.setItem('firstName', "");
	
	$("#welcome").val("");
	window.location.reload(true);
};