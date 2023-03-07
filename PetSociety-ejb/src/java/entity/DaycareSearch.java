/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.AdditionalServiceEnum;
import enumeration.ChildrenEnum;
import enumeration.FreqEnum;
import enumeration.HousingConditionEnum;
import enumeration.PetEnum;
import enumeration.PetsInTheHouseEnum;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

/**
 *
 * @author chels
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class DaycareSearch extends Search implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Column(nullable = false)
    private FreqEnum freq;
    private boolean sitterFullTime;
    @Column(nullable = true)
    private HousingConditionEnum housingCondition;
    @Column(nullable = true)
    private PetsInTheHouseEnum petsInTheHouse;
    @Column(nullable = true)
    private ChildrenEnum children;
    @Column(nullable = true)
    private AdditionalServiceEnum additionalService;

    public DaycareSearch(FreqEnum freq, boolean sitterFullTime, HousingConditionEnum housingCondition, PetsInTheHouseEnum petsInTheHouse, ChildrenEnum children, AdditionalServiceEnum additionalService, Long id, Date startDate, Date endDate, int numPets, PetEnum petType, int dogSize, double rate, Parent parent) {
        super(id, startDate, endDate, numPets, petType, dogSize, rate, parent);
        this.freq = freq;
        this.sitterFullTime = true;
        this.housingCondition = housingCondition;
        this.petsInTheHouse = petsInTheHouse;
        this.children = children;
        this.additionalService = additionalService;
    }

    public FreqEnum getFreq() {
        return freq;
    }

    public void setFreq(FreqEnum freq) {
        this.freq = freq;
    }

    public boolean isSitterFullTime() {
        return sitterFullTime;
    }

    public void setSitterFullTime(boolean sitterFullTime) {
        this.sitterFullTime = sitterFullTime;
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
