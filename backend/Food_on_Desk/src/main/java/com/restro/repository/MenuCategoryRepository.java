package com.restro.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restro.model.MenuCategory;

@Repository
public interface MenuCategoryRepository extends JpaRepository<MenuCategory, Integer>{

    public Optional<MenuCategory> findByCategoryId(int id);
    
}