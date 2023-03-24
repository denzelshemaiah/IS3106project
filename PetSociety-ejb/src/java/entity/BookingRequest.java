/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.RequestStatusEnum;
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
public class BookingRequest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingReqId;
    //need to capture time as well for pet taxi
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date startDate;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date endDate;
    @Column(length = 500)
    private String description;
    @Column(precision = 2, scale = 6)
    private BigDecimal cost;
    @Column(nullable = false)
    private RequestStatusEnum status;
    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date created;
    @Column(nullable = false)
    private int numPets;
    
    //relationships
    @ManyToOne
    private PetParent parent;
    @ManyToOne
    private PetSitter sitter;
    @OneToOne
    private Payment payment;
    @OneToOne(optional=true)
    private Rating rating;
    

    public BookingRequest() {
    }

    public Long getBookingReqId() {
        return bookingReqId;
    }

    public void setBookingReqId(Long bookingReqId) {
        this.bookingReqId = bookingReqId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (bookingReqId != null ? bookingReqId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the bookingReqId fields are not set
        if (!(object instanceof BookingRequest)) {
            return false;
        }
        BookingRequest other = (BookingRequest) object;
        if ((this.bookingReqId == null && other.bookingReqId != null) || (this.bookingReqId != null && !this.bookingReqId.equals(other.bookingReqId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.BookingRequest[ id=" + bookingReqId + " ]";
    }

    /**
     * @return the startDate
     */
    public Date getStartDate() {
        return startDate;
    }

    /**
     * @param startDate the startDate to set
     */
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    /**
     * @return the endDate
     */
    public Date getEndDate() {
        return endDate;
    }

    /**
     * @param endDate the endDate to set
     */
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    /**
     * @return the desc
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param desc the desc to set
     */
    public void setDescription(String desc) {
        this.description = desc;
    }

    /**
     * @return the cost
     */
    public BigDecimal getCost() {
        return cost;
    }

    /**
     * @param cost the cost to set
     */
    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    /**
     * @return the status
     */
    public RequestStatusEnum getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(RequestStatusEnum status) {
        this.status = status;
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
     * @return the numPets
     */
    public int getNumPets() {
        return numPets;
    }

    /**
     * @param numPets the numPets to set
     */
    public void setNumPets(int numPets) {
        this.numPets = numPets;
    }

    /**
     * @return the parent
     */
    public PetParent getParent() {
        return parent;
    }

    /**
     * @param parent the parent to set
     */
    public void setParent(PetParent parent) {
        this.parent = parent;
    }

    /**
     * @return the sitter
     */
    public PetSitter getSitter() {
        return sitter;
    }

    /**
     * @param sitter the sitter to set
     */
    public void setSitter(PetSitter sitter) {
        this.sitter = sitter;
    }

    /**
     * @return the transaction
     */
    public Payment getPayment() {
        return payment;
    }

    /**
     */
    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    /**
     * @return the rating
     */
    public Rating getRating() {
        return rating;
    }

    /**
     * @param rating the rating to set
     */
    public void setRating(Rating rating) {
        this.rating = rating;
    }
    
}
