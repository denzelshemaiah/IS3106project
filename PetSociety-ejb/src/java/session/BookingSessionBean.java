/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BookingRequest;
import entity.PetParent;
import entity.User;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author cally
 */
@Stateless
public class BookingSessionBean implements BookingSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public Long createNewBooking(BookingRequest b) {
        if (b.getParent() == null || b.getSitter() == null) {
            //exception?
        } else {
            em.persist(b);
            em.flush();
            b.getParent().getBookings().add(b);
            b.getSitter().getBookings().add(b);
        }
        return b.getBookingReqId();
    }
    
    //UPDATE THIS FUNCTION
    @Override
    public List<BookingRequest> getPendingRequests(Long userId) {
        //User u = em.find(User.class, userId);
        Query q = em.createQuery("SELECT b FROM BookingRequest b");
        
        //    if (u instanceof Parent) {
                // if user is a parent
        //        Query q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.parent.parentId LIKE :parentId")
        //                .setParameter("parentId", u.getUserId());
        //    } else {
        //        Query q = em.createQuery("SELECT b FROM BookingRequest b");
        //    }
        return q.getResultList();
    }
    
    //UPDATE THIS FUNCTION
    @Override
    public List<BookingRequest> getUpcomingRequests(Long userId) {
        //User u = em.find(User.class, userId);
        Query q = em.createQuery("SELECT b FROM BookingRequest b");
        
        //if (u instanceOf Parent) {
        //  Query q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.parent.parentId LIKE :parentId AND b.endDate
        return q.getResultList();
    }
    
    @Override
    public List<BookingRequest> getArchivedRequests(Long userId) {
        return new ArrayList<>();
    }
    
    @Override
    public List<BookingRequest> getRejectedRequests(Long userId) {
        return new ArrayList<>();
    }
}
