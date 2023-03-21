/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
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
public class ExperienceForm implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expFormId;
    @Column()
    private Integer yearsOfExperience;
    @Column
    private String headline;
    @Column
    private String experience;
    
    //relationships
    @OneToOne
    private Sitter sitter;

    public ExperienceForm() {
    }

    public ExperienceForm(Integer yearsOfExperience, String headline, String experience) {
        this.yearsOfExperience = yearsOfExperience;
        this.headline = headline;
        this.experience = experience;
    }

    
    public Long getExpFormId() {
        return expFormId;
    }

    public void setExpFormId(Long expFormId) {
        this.expFormId = expFormId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (expFormId != null ? expFormId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the expFormId fields are not set
        if (!(object instanceof ExperienceForm)) {
            return false;
        }
        ExperienceForm other = (ExperienceForm) object;
        if ((this.expFormId == null && other.expFormId != null) || (this.expFormId != null && !this.expFormId.equals(other.expFormId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.ExperienceForm[ id=" + expFormId + " ]";
    }

    /**
     * @return the yearsOfExperience
     */
    public Integer getYearsOfExperience() {
        return yearsOfExperience;
    }

    /**
     * @param yearsOfExperience the yearsOfExperience to set
     */
    public void setYearsOfExperience(Integer yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    /**
     * @return the headline
     */
    public String getHeadline() {
        return headline;
    }

    /**
     * @param headline the headline to set
     */
    public void setHeadline(String headline) {
        this.headline = headline;
    }

    /**
     * @return the experience
     */
    public String getExperience() {
        return experience;
    }

    /**
     * @param experience the experience to set
     */
    public void setExperience(String experience) {
        this.experience = experience;
    }
    
}
