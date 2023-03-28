/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BookingRequest;
import entity.PetParent;
import entity.PetSitter;
import entity.User;
import enumeration.RequestStatusEnum;
import error.NoResultException;
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
    public Long createNewBooking(BookingRequest b, Long parentId, Long sitterId) {
        PetParent p = em.find(PetParent.class, parentId);
        //PetSitter s = em.find(PetSitter.class, sitterId);
        if (p == null) {
            //exception?
        } else {
            b.setParent(p);
            //b.setSitter(s);
            em.persist(b);
            em.flush();
            b.getParent().getBookings().add(b);
            //b.getSitter().getBookings().add(b);
        }
        return b.getBookingReqId();
    }

    @Override
    public List<BookingRequest> getBookings(String status, Long userId) {
        User u = em.find(User.class, userId);
        Query q;
        RequestStatusEnum statusEnum;
        
        if (status.equals("pending")) {
            statusEnum = RequestStatusEnum.PENDING;
        } else if (status.equals("upcoming")) {
            statusEnum = RequestStatusEnum.ACCEPTED;
        } else if (status.equals("rejected")) {
            statusEnum = RequestStatusEnum.REJECTED;
        } else {
            // archived tab
            statusEnum = RequestStatusEnum.ARCHIVED;
        }
                
        if (u instanceof PetParent) {
            //if user is a parent
            q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.parent.userId LIKE :parentId AND b.status = :enum")
                    .setParameter("parentId", userId)
                    .setParameter("enum", statusEnum);
            //check status of required bookings
        } else {
            q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.sitter.userId LIKE :sitterId AND b.status = :enum")
                    .setParameter("sitterId", userId)
                    .setParameter("enum", statusEnum);
        }
        return q.getResultList();
    }
    
    @Override
    public void updateBooking(BookingRequest b) throws NoResultException {
        if (b.getBookingReqId() == null) {
            throw new NoResultException("No booking can be found!");
        } else {
            em.merge(b);
        }
    }
    
    //need to check status, should be pending or upcoming
    public void cancelBooking(Long bookingId) throws NoResultException {
        BookingRequest b = em.find(BookingRequest.class, bookingId);
        if (b == null) {
            throw new NoResultException("No booking can be found!");
        } else {
            //remove relationships with other entities
            b.getParent().getBookings().remove(b);
            b.getSitter().getBookings().remove(b);
            //remove from db
            em.remove(b);
        }
    }
}
