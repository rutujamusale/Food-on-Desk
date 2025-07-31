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

import com.restro.model.MenuItem;
import com.restro.service.MenuItemService;

@CrossOrigin
@RestController
public class MenuItemController {
    
    @Autowired
    MenuItemService  menuItemService;

    //add menu items to particular category
    @PostMapping("/add-menuItem/{categoryId}")
    public ResponseEntity<?> addMenuItemToCategory(@PathVariable int categoryId,
                                                        @RequestParam("itemName") String itemName,
                                                        @RequestParam("itemPrice") Double itemPrice,
                                                        @RequestParam("itemType") String itemType,
                                                        @RequestParam("description") String description,
                                                        @RequestParam("itemImg") MultipartFile imageFile) {
        System.out.println("Item added in category: " +categoryId);
        MenuItem addMenuItem = menuItemService.addMenuItemToCategory(categoryId, itemName, itemPrice, itemType, description, imageFile);
        return ResponseEntity.ok(addMenuItem);
    }

    // get all menu item list
    @GetMapping("/get-all-menuItems")
    public ResponseEntity<List<MenuItem>>  getAllMenuItems() {
        List<MenuItem> allMenuItems = menuItemService.getAllMenuItems();
        return new ResponseEntity<>(allMenuItems, HttpStatus.OK);
    }

    //get all menu items of particular category
    @GetMapping("/get-menuItem-categoryId/{id}")
    public List<MenuItem> getAllMenuItemsByCategory(@PathVariable int id){
        return menuItemService.getMenuItemsByCategory(id);
    }

    //update menuItem of with image
    @PutMapping("/update-menuItem/{itemId}")
    public ResponseEntity<?> updateMenuItem(@PathVariable int itemId,
                                            @RequestParam("itemName") String itmName,
                                            @RequestParam("itemPrice") Double itmPrice,
                                            @RequestParam("itemType") String itmType,
                                            @RequestParam("itemDesc") String itmDesc,
                                            @RequestParam("itemImg") MultipartFile itemImg){
        MenuItem updatedItem = menuItemService.updateMenuItem(itemId, itmName, itmPrice, itmType, itmDesc, itemImg);
        return ResponseEntity.ok(updatedItem);
    }

    //update menu item  without updating image
    @PutMapping("/update-menuItemDetails/{itemId}")
    public ResponseEntity<?> updateMenuItem(@PathVariable int itemId,
                                            @RequestParam("itemName") String itmName,
                                            @RequestParam("itemPrice") Double itmPrice,
                                            @RequestParam("itemType") String itmType,
                                            @RequestParam("itemDesc") String itmDesc){

        MenuItem updateItem = menuItemService.updateMenuItem(itemId, itmName, itmPrice, itmType, itmDesc);
        return ResponseEntity.ok(updateItem);
    }




    @DeleteMapping("delete-menuItem/{itemId}")
    public ResponseEntity<String> deleteMenuItem( @PathVariable int itemId){
            menuItemService.deleteMenuItem(itemId);
            return  new ResponseEntity<>("Item Deleted Successfully, Id number: " +itemId, HttpStatus.OK);
    }


}
