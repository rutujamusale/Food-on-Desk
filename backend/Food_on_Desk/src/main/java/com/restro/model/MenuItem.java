package com.restro.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class MenuItem {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int itemId;
    private String itemName;
    private Double itemPrice;
    private String itemType;
    private String description;
    @Lob
    @Column(name = "image", columnDefinition = "LONGTEXT")
    private String itemImage;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private MenuCategory menuCategory;
}
