package com.restro.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restro.model.PromoCode;


@Repository
public interface PromoCodeRepository extends JpaRepository<PromoCode, Integer>{


}
