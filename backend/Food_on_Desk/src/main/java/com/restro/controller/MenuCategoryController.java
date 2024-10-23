package com.restro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restro.model.MenuCategory;
import com.restro.service.MenuCategoryService;

@CrossOrigin
@RestController
public class MenuCategoryController {
    
    @Autowired
    MenuCategoryService menuCateService;
    
    // add new category
    @PostMapping("/add-category")
    public ResponseEntity<MenuCategory> addMenuCategory(@RequestParam("categoryName") String cateName,
                                                        @RequestParam("catImage") MultipartFile catImage) {
        MenuCategory menuCategory = menuCateService.addMenuCategory(cateName, catImage);
        return ResponseEntity.status(HttpStatus.CREATED).body(menuCategory);
    }

    //get all menu category list
    @GetMapping("/getAllMenuCatagories")
    public ResponseEntity<List<MenuCategory>> getAllMenuCategories() {
        List<MenuCategory> categories = menuCateService.getAllMenuCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    //update category image or name
    @PutMapping("/update-category/{catId}")
    public ResponseEntity<?> updateMenuCategory(@PathVariable int catId,
                                                @RequestParam("categoryName") String cateName,
                                                @RequestParam("catImage") MultipartFile catImage) {
        MenuCategory updatedCategory = menuCateService.updateMenuCategory(catId, cateName, catImage);
        return ResponseEntity.ok(updatedCategory);
    }

    //update only menu category name
    @PutMapping("/update-category-name/{catId}")
    public ResponseEntity<?> updateOnlyCatName(@PathVariable int catId,
                                                @RequestParam("categoryName") String cateName){
        MenuCategory updateCategoryName = menuCateService.updateCategoryName(catId, cateName);
        return  ResponseEntity.ok(updateCategoryName);
    }
    
    //delete category  by id
    @DeleteMapping("/delete-category/{catId}")
    public ResponseEntity<String> deleteMenuCategory(@PathVariable int catId){
        menuCateService.deleteMenuCategory(catId);
        return  new ResponseEntity<>("Category Deleted Successfully, Id number: " +catId, HttpStatus.OK);
    }
    
    
}


