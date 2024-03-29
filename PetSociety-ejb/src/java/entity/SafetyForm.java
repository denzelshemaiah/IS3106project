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
    
    private String q1;
    private String q2;
    private String q3;
    
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

    /**
     * @return the q1
     */
    public String getQ1() {
        return q1;
    }

    /**
     * @param q1 the q1 to set
     */
    public void setQ1(String q1) {
        this.q1 = q1;
    }

    /**
     * @return the q2
     */
    public String getQ2() {
        return q2;
    }

    /**
     * @param q2 the q2 to set
     */
    public void setQ2(String q2) {
        this.q2 = q2;
    }

    /**
     * @return the q3
     */
    public String getQ3() {
        return q3;
    }

    /**
     * @param q3 the q3 to set
     */
    public void setQ3(String q3) {
        this.q3 = q3;
    }
    
}
