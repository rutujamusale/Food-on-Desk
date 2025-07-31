package com.restro.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.restro.model.PromoCode;
import com.restro.service.PromoCodeService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@CrossOrigin
@RestController
public class PromoCodeController {

    @Autowired
    PromoCodeService promoCodeService;

    @PostMapping("/add-promocode")
    public ResponseEntity<String> createPromoCode(@RequestBody PromoCode promoCode) {
    PromoCode createdPromoCode = promoCodeService.createPromoCode(promoCode);
    return ResponseEntity.status(HttpStatus.CREATED).body("Promo Code created successfully with ID: " + createdPromoCode.getPromoCod());
    }

    @GetMapping("/get-all-promcodes")
    public ResponseEntity<List<PromoCode>> getAllPromoCodes() {
        List<PromoCode> promoCodes = promoCodeService.getAllPromoCodes();
        return new ResponseEntity<>(promoCodes, HttpStatus.OK);
    }

    @DeleteMapping("/delete-promoCode/{id}")
    public ResponseEntity<String> deletePromoCode(@PathVariable int id) {
        promoCodeService.deletePromoCode(id);
        return ResponseEntity.ok("Delete Successfully Id number:" + id);
    }
    
}
