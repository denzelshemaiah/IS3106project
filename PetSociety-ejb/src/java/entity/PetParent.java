/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;

/**
 *
 * @author Andrea
 */
@Entity
public class PetParent implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parentId;
    
    //relationships
    @OneToMany(mappedBy = "parent")
    private List<Search> searches;
    
    @OneToMany(mappedBy = "parent")
    private List<MeetAndGreetRequest> mgRequests;
    
    @OneToMany(mappedBy = "parent")
    private List<BookingRequest> bookings;

    public PetParent() {
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (parentId != null ? parentId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the parentId fields are not set
        if (!(object instanceof PetParent)) {
            return false;
        }
        PetParent other = (PetParent) object;
        if ((this.parentId == null && other.parentId != null) || (this.parentId != null && !this.parentId.equals(other.parentId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Parent[ id=" + parentId + " ]";
    }

    /**
     * @return the searches
     */
    public List<Search> getSearches() {
        return searches;
    }

    /**
     * @param searches the searches to set
     */
    public void setSearches(List<Search> searches) {
        this.searches = searches;
    }

    /**
     * @return the mgRequests
     */
    public List<MeetAndGreetRequest> getMgRequests() {
        return mgRequests;
    }

    /**
     * @param mgRequests the mgRequests to set
     */
    public void setMgRequests(List<MeetAndGreetRequest> mgRequests) {
        this.mgRequests = mgRequests;
    }

    /**
     * @return the bookings
     */
    public List<BookingRequest> getBookings() {
        return bookings;
    }

    /**
     * @param bookings the bookings to set
     */
    public void setBookings(List<BookingRequest> bookings) {
        this.bookings = bookings;
    }
    
}
