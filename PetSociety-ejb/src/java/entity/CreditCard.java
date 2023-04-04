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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

/**
 *
 * @author rachelrphy
 */
@Entity
public class CreditCard implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ccId;
    @Column(nullable = false)
    @Size(min = 16, max = 19)
    private String ccNum;
    @Column(nullable = false)
    @Size(max = 40)
    private String ccName;
    @Column(nullable = false)
    private String expDate;
    @Column(nullable = false)
    @Min(001)
    @Max(999)
    private Integer cvv;
   
    //relationship with transactions
    @OneToOne
    private List<Payment> payments;

    public CreditCard() {
    }

    public Long getCcId() {
        return ccId;
    }

    public void setCcId(Long ccId) {
        this.ccId = ccId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (getCcId() != null ? getCcId().hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the ccId fields are not set
        if (!(object instanceof CreditCard)) {
            return false;
        }
        CreditCard other = (CreditCard) object;
        if ((this.getCcId() == null && other.getCcId() != null) || (this.getCcId() != null && !this.ccId.equals(other.ccId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.CreditCard[ id=" + getCcId() + " ]";
    }

    /**
     * @return the transactions
     */
    public List<Payment> getPayments() {
        return payments;
    }

    /**
     * @param transactions the transactions to set
     */
    public void setPayments(List<Payment> transactions) {
        this.payments = transactions;
    }

    /**
     * @return the ccNum
     */
    public String getCcNum() {
        return ccNum;
    }

    /**
     * @param ccNum the ccNum to set
     */
    public void setCcNum(String ccNum) {
        this.ccNum = ccNum;
    }

    /**
     * @return the ccName
     */
    public String getCcName() {
        return ccName;
    }

    /**
     * @param ccName the ccName to set
     */
    public void setCcName(String ccName) {
        this.ccName = ccName;
    }

    /**
     * @return the expDate
     */
    public String getExpDate() {
        return expDate;
    }

    /**
     * @param expDate the expDate to set
     */
    public void setExpDate(String expDate) {
        this.expDate = expDate;
    }

    /**
     * @return the cvv
     */
    public Integer getCvv() {
        return cvv;
    }

    /**
     * @param cvv the cvv to set
     */
    public void setCvv(Integer cvv) {
        this.cvv = cvv;
    }

   
}