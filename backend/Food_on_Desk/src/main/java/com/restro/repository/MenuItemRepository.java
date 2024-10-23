package com.restro.repository;

import org.springframework.stereotype.Repository;

import com.restro.model.MenuCategory;
import com.restro.model.MenuItem;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer>{

    public Optional<MenuItem> findByItemName(String iName);

    public Optional<MenuItem> findByItemId(int itemId);

    public List<MenuItem> findByMenuCategory(MenuCategory menuCategory);
}
