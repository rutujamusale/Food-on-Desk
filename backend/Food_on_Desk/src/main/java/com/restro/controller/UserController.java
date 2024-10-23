package com.restro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.restro.model.User;
import com.restro.model.UserLoginRequest;
import com.restro.service.UserService;


@CrossOrigin
@RestController
public class UserController {
	
	@Autowired UserService userService;
	
	@GetMapping("/example")
	public ResponseEntity<String> getExample() {
		String responseBody = "Hello, World!";
		return ResponseEntity.ok(responseBody);
	}

//======================================================

	//	User Registration
	@PostMapping("/user-regis")
	public ResponseEntity<User> userRegistraion(@RequestBody User user) {
		try {
			User regisUser = userService.registorUser(user);
			return new ResponseEntity<>(regisUser, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//User Login
	@PostMapping("/usr-login")
	public ResponseEntity<User> loginUser(@RequestBody UserLoginRequest loginData) {
		Long mobileNumber = loginData.getMobNum();
		String password = loginData.getPassword();
		try {
			User usr = userService.userLogin(mobileNumber, password);
			// System.out.println(usr.getMobileNo() + " = " + usr.getName());
			return new ResponseEntity<>(usr, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Get all user  list
	@GetMapping("/allUserData")
	public List<User> userDetails() {
		return userService.usrDetails();
	}
	




	
}



