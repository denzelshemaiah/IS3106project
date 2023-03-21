/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author rachelrphy
 */
@Entity
public class AuthenticationRequest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long authenticationId;
    @Column(nullable = false)
    private Date createdDate;
    @Column(nullable = false)
    private Sitter petSitter;
    @Column(nullable = false)
    private List<String> documents;

    public Long getAuthenticationId() {
        return authenticationId;
    }

    public void setAuthenticationId(Long authenticationId) {
        this.authenticationId = authenticationId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (authenticationId != null ? authenticationId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the authenticationId fields are not set
        if (!(object instanceof AuthenticationRequest)) {
            return false;
        }
        AuthenticationRequest other = (AuthenticationRequest) object;
        if ((this.authenticationId == null && other.authenticationId != null) || (this.authenticationId != null && !this.authenticationId.equals(other.authenticationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.AuthenticationRequest[ id=" + authenticationId + " ]";
    }

    /**
     * @return the createdDate
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * @param createdDate the createdDate to set
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * @return the petSitter
     */
    public Sitter getPetSitter() {
        return petSitter;
    }

    /**
     * @param petSitter the petSitter to set
     */
    public void setPetSitter(Sitter petSitter) {
        this.petSitter = petSitter;
    }

    /**
     * @return the documents
     */
    public List<String> getDocuments() {
        return documents;
    }

    /**
     * @param documents the documents to set
     */
    public void setDocuments(List<String> documents) {
        this.documents = documents;
    }
    
}
