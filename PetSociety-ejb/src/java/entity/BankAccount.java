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
import javax.persistence.OneToMany;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

/**
 *
 * @author rachelrphy
 */
@Entity
public class BankAccount implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bankAccId;
    @Column(nullable = false)
    @Size(min = 8, max = 17)
    private String bankAccNum;
    @Column(nullable = false)
    private String bankName;
    @Column(nullable = false)
    @Size(max = 40)
    private String accName;
    

    //relationship with transactions
    @OneToMany(mappedBy = "bankAcc")
    private List<Transaction> transactions;
    //relationship with user
    @OneToOne(optional = false)
    private User user;

    public BankAccount(String bankAccNum, String bankName, String accName) {
        this.bankAccNum = bankAccNum;
        this.bankName = bankName;
        this.accName = accName;
    }

    public BankAccount() {
    }

    public Long getBankAccId() {
        return bankAccId;
    }

    public void setBankAccId(Long bankAccId) {
        this.bankAccId = bankAccId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bankAccId != null ? bankAccId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the bankAccId fields are not set
        if (!(object instanceof BankAccount)) {
            return false;
        }
        BankAccount other = (BankAccount) object;
        if ((this.bankAccId == null && other.bankAccId != null) || (this.bankAccId != null && !this.bankAccId.equals(other.bankAccId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.BankAccount[ id=" + bankAccId + " ]";
    }

    /**
     * @return the transactions
     */
    public List<Transaction> getTransactions() {
        return transactions;
    }

    /**
     * @param transactions the transactions to set
     */
    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    /**
     * @return the bankAccNum
     */
    public String getBankAccNum() {
        return bankAccNum;
    }

    /**
     * @param bankAccNum the bankAccNum to set
     */
    public void setBankAccNum(String bankAccNum) {
        this.bankAccNum = bankAccNum;
    }

    /**
     * @return the bankName
     */
    public String getBankName() {
        return bankName;
    }

    /**
     * @param bankName the bankName to set
     */
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    /**
     * @return the accName
     */
    public String getAccName() {
        return accName;
    }

    /**
     * @param accName the accName to set
     */
    public void setAccName(String accName) {
        this.accName = accName;
    }
    
}
