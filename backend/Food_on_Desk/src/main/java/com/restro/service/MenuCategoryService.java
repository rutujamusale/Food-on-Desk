package com.restro.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.restro.model.MenuCategory;
import com.restro.repository.MenuCategoryRepository;

@Service
public class MenuCategoryService {

    @Autowired
    MenuCategoryRepository menuCatRepo;
    
    //add new category
    public MenuCategory addMenuCategory(String cateName, MultipartFile categoryImage){
        
        MenuCategory mc = new MenuCategory();
        mc.setCategoryName(cateName);
        
        try {
			mc.setCatImage(Base64.getEncoder().encodeToString(categoryImage.getBytes()));
		} catch (IOException e) {
			e.printStackTrace();
		}
        return  menuCatRepo.save(mc);
	}

    // get all menu catgory
    public List<MenuCategory> getAllMenuCategories(){
        return menuCatRepo.findAll();
    }

    //update category by id
    public MenuCategory updateMenuCategory(int catId , String cateName, MultipartFile imgFile) {
        Optional<MenuCategory> menucat = menuCatRepo.findById(catId);
        MenuCategory mcinfo = new MenuCategory();
        
        if ( menucat.isPresent()) {
            mcinfo = menucat.get();
            mcinfo.setCategoryName(cateName);
            
            if (!imgFile.isEmpty() ) {
                try {
                    mcinfo.setCatImage( Base64.getEncoder().encodeToString(imgFile.getBytes()) );
                } catch (IOException e) {
                    e.printStackTrace();
                }
            
            } else {
                throw new RuntimeException("This "+menucat.get().getCategoryName()+" category does not exist!");
            }
        }
        return  menuCatRepo.saveAndFlush(mcinfo);
    }

    // update category only category name by catId
    public MenuCategory updateCategoryName(int catId, String cateName){
        Optional<MenuCategory> menucat = menuCatRepo.findById(catId);
        MenuCategory mcinfo = new MenuCategory();

        if(menucat.isPresent()){
            mcinfo = menucat.get();
            mcinfo.setCategoryName(cateName);
        }else{
            throw new RuntimeException("This "+menucat.get().getCategoryName()+ " category is not present...");
        }

        return menuCatRepo.saveAndFlush(mcinfo);
    }


    //delete category by id
    public void deleteMenuCategory(int catId) {
        Optional<MenuCategory> category = menuCatRepo.findById(catId);

        if(category.isPresent()) {
            menuCatRepo.deleteById(catId);
        }else{
            throw new RuntimeException("The Category not found");
        }
    }


}

