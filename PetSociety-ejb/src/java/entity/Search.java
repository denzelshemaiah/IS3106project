/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.PetEnum;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 *
 * @author chels
 */
@Entity
public class Search implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date startDate;
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date endDate;
    @Column(nullable = false)
    private int numPets;
    @Column(nullable = false)
    private PetEnum petType;
    @Column(nullable = false)
    @Min(0)
    private int dogSize;
    @Column(nullable = false, precision = 11, scale = 2)
    @NotNull
    @DecimalMin("0.00")
    @Digits(integer = 9, fraction = 2)
    private double rate;
    
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private PetParent parent;
    
    public Search() {
        
    }

    public Search(Long id, Date startDate, Date endDate, int numPets, PetEnum petType, int dogSize, double rate, PetParent parent) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numPets = numPets;
        this.petType = petType;
        this.dogSize = dogSize;
        this.rate = rate;
        this.parent = parent;
    }
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getNumPets() {
        return numPets;
    }

    public void setNumPets(int numPets) {
        this.numPets = numPets;
    }

    public PetEnum getPetType() {
        return petType;
    }

    public void setPetType(PetEnum petType) {
        this.petType = petType;
    }

    public int getDogSize() {
        return dogSize;
    }

    public void setDogSize(int dogSize) {
        this.dogSize = dogSize;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Search)) {
            return false;
        }
        Search other = (Search) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Search[ id=" + id + " ]";
    }
    
}
