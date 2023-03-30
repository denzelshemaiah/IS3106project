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
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Andrea
 */
@Entity
public class PetParent extends User implements Serializable {

    private static final long serialVersionUID = 1L;
    
    //relationships
    @OneToMany(mappedBy = "parent")
    private List<Search> searches;
    
    @OneToMany(mappedBy = "parent")
    private List<MeetAndGreetRequest> mgRequests;
    
    @OneToMany(mappedBy = "parent")
    private List<BookingRequest> bookings;
    
    private User user;

    public PetParent() {
    }
    
    public PetParent(User user, List<Search> searches, List<MeetAndGreetRequest> mgRequests, List<BookingRequest> bookings) {
        this.user = user;
        this.searches = searches;
        this.mgRequests = mgRequests;
        this.bookings = bookings;
        
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
}
