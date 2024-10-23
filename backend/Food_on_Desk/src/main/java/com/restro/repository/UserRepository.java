package com.restro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restro.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	public Optional<User> findByMobileNo(Long mobNumber);
	public Optional<User> findByUserId(String usrId);

	public Optional<User> findByMobileNoAndPassword(Long mobile, String pass);
	
   
}
