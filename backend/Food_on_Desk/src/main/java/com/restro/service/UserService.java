package com.restro.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restro.model.User;
import com.restro.repository.UserRepository;




@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;

	//User registration
	public User registorUser(User user) throws Exception {
		Optional<User> usr = userRepository.findByMobileNo(user.getMobileNo());
		
		
			if(usr.isPresent()){
				throw new Exception("This Mobile number already register.");
			}

		User u = new User();
		Random rand = new Random();
		boolean uniqeUsrId = false;

		while(!uniqeUsrId) {
			// generate random number
			Long num = rand.nextLong(90000) + 10000;
			String usrId = "RJ" + num;
			
			// checking same userId present or not
			Optional<User> exitingUsrId = userRepository.findByUserId(usrId);
			// if is not present-->
			if(!exitingUsrId.isPresent()) {
				uniqeUsrId = true;
				u.setUserId(usrId);
				u.setName(user.getName());
				u.setMobileNo(user.getMobileNo());
				u.setPoints(20L);
				u.setPassword(user.getPassword());
			}
		}
		return userRepository.save(u); //201 Created
	}
	
	// Get detail of all user
	public List<User> usrDetails(){
		return userRepository.findAll();
	}

	// Login User
	public User userLogin(Long mobile, String pass) throws Exception {
		try {
			Optional<User> user = userRepository.findByMobileNoAndPassword(mobile, pass);
			if (user.isPresent()) {
				return user.get();
			}else{
				throw new Exception("Invalid Mobile Number / Password");
			}
		} catch (Exception e) {
			throw new Exception("Error occurred during login process: " + e.getMessage());
		}
	}


}
