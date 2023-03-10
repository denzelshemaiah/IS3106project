/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author cally
 */
@Entity
public class Transaction implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;
    @Column(precision = 2, scale = 6)
    private BigDecimal amount;
    @Temporal(TemporalType.DATE)
    private Date created;
    
    //relationship with bookings
    @OneToOne(optional = false)
    private BookingRequest booking;
    
    //relationship with bank account
    @ManyToOne(optional = true)
    private BankAccount bankAcc;
    
    //relationship with creditcard
    @ManyToOne(optional = true)
    private CreditCard credCard;

    public Transaction() {
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (transactionId != null ? transactionId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the transactionId fields are not set
        if (!(object instanceof Transaction)) {
            return false;
        }
        Transaction other = (Transaction) object;
        if ((this.transactionId == null && other.transactionId != null) || (this.transactionId != null && !this.transactionId.equals(other.transactionId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Transaction[ id=" + transactionId + " ]";
    }

    /**
     * @return the amount
     */
    public BigDecimal getAmount() {
        return amount;
    }

    /**
     * @param amount the amount to set
     */
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    /**
     * @return the created
     */
    public Date getCreated() {
        return created;
    }

    /**
     * @param created the created to set
     */
    public void setCreated(Date created) {
        this.created = created;
    }

    /**
     * @return the booking
     */
    public BookingRequest getBooking() {
        return booking;
    }

    /**
     * @param booking the booking to set
     */
    public void setBooking(BookingRequest booking) {
        this.booking = booking;
    }

    /**
     * @return the bankAcc
     */
    public BankAccount getBankAcc() {
        return bankAcc;
    }

    /**
     * @param bankAcc the bankAcc to set
     */
    public void setBankAcc(BankAccount bankAcc) {
        this.bankAcc = bankAcc;
    }

    /**
     * @return the credCard
     */
    public CreditCard getCredCard() {
        return credCard;
    }

    /**
     * @param credCard the credCard to set
     */
    public void setCredCard(CreditCard credCard) {
        this.credCard = credCard;
    }
    
}
