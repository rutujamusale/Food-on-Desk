package com.restro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restro.model.PromoCode;
import com.restro.repository.PromoCodeRepository;

@Service
public class PromoCodeService {
    
    @Autowired
    PromoCodeRepository promoCodeRepository;

    //create promo code
    public PromoCode createPromoCode(PromoCode promoCode) {
        return promoCodeRepository.save(promoCode);
    }

    // get all promo codes
    public List<PromoCode> getAllPromoCodes() {
        return promoCodeRepository.findAll();
    }

    // delete promo code
    public void deletePromoCode(int promoId) {
        Optional<PromoCode> promoCodeOpt = promoCodeRepository.findById(promoId);
        
        if (promoCodeOpt.isPresent()) {
            promoCodeRepository.deleteById(promoId);
        } else {
            throw new RuntimeException("This Promo code Id is not found : " + promoId);
        }
    }

}
