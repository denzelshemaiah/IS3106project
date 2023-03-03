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
    @Column(nullable = false)
    private Date startDate;
    @Column(nullable = false)
    private Date endDate;
    @Column(length = 500)
    private String desc;
    @Column(precision = 2, scale = 6)
    private BigDecimal cost;
    @Column(nullable = false)
    private RequestStatusEnum status;
    @Column(nullable = false)
    private Date created;
    @Column(nullable = false)
    private int numPets;

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
    public String getDesc() {
        return desc;
    }

    /**
     * @param desc the desc to set
     */
    public void setDesc(String desc) {
        this.desc = desc;
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
    
}
