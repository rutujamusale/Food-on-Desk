package com.restro.service;


import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.restro.model.MenuCategory;
import com.restro.model.MenuItem;
import com.restro.repository.MenuCategoryRepository;
import com.restro.repository.MenuItemRepository;

@Service
public class MenuItemService {
    
    @Autowired
    MenuCategoryRepository menuCategoryRepository;

    @Autowired
    MenuItemRepository menuItemRepository;

    // add new item in particular category
    public MenuItem addMenuItemToCategory(int categoryId, String itemName, Double itemPrice, String itemType, String itemDesc, MultipartFile image) {
        Optional<MenuCategory> optionCategory = menuCategoryRepository.findByCategoryId(categoryId);
        
        if(optionCategory.isPresent()){
            MenuItem menuItem = new MenuItem();
            menuItem.setItemName(itemName);
            menuItem.setItemPrice(itemPrice);
            menuItem.setItemType(itemType);
            menuItem.setDescription(itemDesc);
            
            try{
                menuItem.setItemImage(Base64.getEncoder().encodeToString(image.getBytes()));
            }catch(IOException e){
                e.printStackTrace();
            }

            MenuCategory menuCategory = optionCategory.get();
            menuItem.setMenuCategory(menuCategory);

            return menuItemRepository.save(menuItem);
        }else{
            throw new RuntimeException("No Category Found for add item to this category "+categoryId);
        }
    }


    // get all item list
    public List<MenuItem> getAllMenuItems(){
        return menuItemRepository.findAll();
    }

    // get menu item by perticular category id
    public List<MenuItem> getMenuItemsByCategory(int categoryId){
        Optional<MenuCategory> optionalCategory =  menuCategoryRepository.findByCategoryId(categoryId);
        if(optionalCategory.isPresent()){
            return menuItemRepository.findByMenuCategory(optionalCategory.get());
        }else{
            throw new RuntimeException("No Category Found for this Id: "+categoryId);
        }
    }

    // Updarte menu Item by Item Id
    public MenuItem updateMenuItem(int itemId, String itemName, Double itemPrice, String itemType, String itemDesc, MultipartFile image){
        Optional<MenuItem> menuItemOpt = menuItemRepository.findById(itemId);
        
        MenuItem menuItemInfo = new MenuItem();

        if(menuItemOpt.isPresent()){
            menuItemInfo = menuItemOpt.get();
            menuItemInfo.setItemName(itemName);
            menuItemInfo.setItemPrice(itemPrice);
            menuItemInfo.setDescription(itemType);
            menuItemInfo.setDescription(itemDesc);

            if(!image.isEmpty()) {
                try {
                    menuItemInfo.setItemImage(Base64.getEncoder().encodeToString(image.getBytes()));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                throw new RuntimeException("Please select an Image");
            }
        }else{
            throw new  RuntimeException("This menu item not found also image.");
        }
        return menuItemRepository.save(menuItemInfo);

    }

    // update Item details only not image
    public MenuItem updateMenuItem(int itemId, String itemName, Double itemPrice, String itemType, String itemDesc){
        Optional<MenuItem> menuItemOpt = menuItemRepository.findById(itemId);

        MenuItem menuItemInfo = new MenuItem();

        if(menuItemOpt.isPresent()){
            menuItemInfo = menuItemOpt.get();
            menuItemInfo.setItemName(itemName);
            menuItemInfo.setItemPrice(itemPrice);
            menuItemInfo.setItemType(itemType);
            menuItemInfo.setDescription(itemDesc);
        }else{
            throw new RuntimeException("This menu item is not found...");
        }

        return menuItemRepository.save(menuItemInfo);
    }
    
    // delete item by Id
    public void  deleteMenuItem(int itemId){
        Optional<MenuItem> menuItem = menuItemRepository.findById(itemId);
        if(!menuItem.isPresent()){
            throw new RuntimeException("Menu item id number: "+itemId+" Not Found!");
        }else{
            menuItemRepository.deleteById(itemId);
        }
    }
}