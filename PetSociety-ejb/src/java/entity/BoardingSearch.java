/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.AdditionalServiceEnum;
import enumeration.ChildrenEnum;
import enumeration.HousingConditionEnum;
import enumeration.PetEnum;
import enumeration.PetsInTheHouseEnum;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

/**
 *
 * @author chels
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class BoardingSearch extends Search implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Column(nullable = true)
    private HousingConditionEnum housingCondition;
    @Column(nullable = true)
    private PetsInTheHouseEnum petsInTheHouse;
    @Column(nullable = true)
    private ChildrenEnum children;
    @Column(nullable = true)
    private AdditionalServiceEnum additionalService;
    
    public BoardingSearch() {
      
    }

    public BoardingSearch(HousingConditionEnum housingCondition, PetsInTheHouseEnum petsInTheHouse, ChildrenEnum children, AdditionalServiceEnum additionalService, Long id, Date startDate, Date endDate, int numPets, PetEnum petType, int dogSize, double rate, PetParent parent) {
        super(id, startDate, endDate, numPets, petType, dogSize, rate, parent);
        this.housingCondition = housingCondition;
        this.petsInTheHouse = petsInTheHouse;
        this.children = children;
        this.additionalService = additionalService;
    }

    public HousingConditionEnum getHousingCondition() {
        return housingCondition;
    }

    public void setHousingCondition(HousingConditionEnum housingCondition) {
        this.housingCondition = housingCondition;
    }

    public PetsInTheHouseEnum getPetsInTheHouse() {
        return petsInTheHouse;
    }

    public void setPetsInTheHouse(PetsInTheHouseEnum petsInTheHouse) {
        this.petsInTheHouse = petsInTheHouse;
    }

    public ChildrenEnum getChildren() {
        return children;
    }

    public void setChildren(ChildrenEnum children) {
        this.children = children;
    }

    public AdditionalServiceEnum getAdditionalService() {
        return additionalService;
    }

    public void setAdditionalService(AdditionalServiceEnum additionalService) {
        this.additionalService = additionalService;
    }
    
    
}
