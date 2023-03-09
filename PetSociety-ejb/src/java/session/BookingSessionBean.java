/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BookingRequest;
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
    
    @Override
    public List<BookingRequest> getAllRequests() {
        Query q = em.createQuery("SELECT b FROM BookingRequest b");
        return q.getResultList();
    }

    
}
