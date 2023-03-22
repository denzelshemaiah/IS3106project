/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author rachelrphy
 */
@Entity
public class SafetyForm implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long safetyId;
    
    //relationship with sitter
    @OneToOne
    private PetSitter sitter;

    public Long getSafetyId() {
        return safetyId;
    }

    public void setSafetyId(Long safetyId) {
        this.safetyId = safetyId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (safetyId != null ? safetyId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the safetyId fields are not set
        if (!(object instanceof SafetyForm)) {
            return false;
        }
        SafetyForm other = (SafetyForm) object;
        if ((this.safetyId == null && other.safetyId != null) || (this.safetyId != null && !this.safetyId.equals(other.safetyId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.SafetyForm[ id=" + safetyId + " ]";
    }
    
}
