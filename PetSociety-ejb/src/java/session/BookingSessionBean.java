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
import error.NoAccessException;
import error.NoResultException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
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
            p.getBookings().add(b);
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
    
    @Override
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
    
    @Override
    public void rejectBooking(Long userId, Long bookingId) throws NoResultException, NoAccessException {
        User u = em.find(User.class, userId);
        BookingRequest b = em.find(BookingRequest.class, bookingId);
        
        if (u == null) {
            throw new NoResultException("User could not be found!");
        } else if (b == null) {
            throw new NoResultException("Booking Request could not be found!");
        } else if (u instanceof PetParent) {
            throw new NoAccessException("Only Pet Sitters can reject bookings!");
        } else {
            b.setStatus(RequestStatusEnum.REJECTED);
            em.merge(b);
        }
    }
    
    @Override
    public BigDecimal calculatePenalty(Long bookingId) throws NoAccessException {
        BookingRequest b = em.find(BookingRequest.class, bookingId);
        Date bookingStart = b.getStartDate();
        Date now = new Date();
        int result = bookingStart.compareTo(now);
        
        if (result < 0) {
            throw new NoAccessException("Booking has already started and cannot be cancelled!");
        } else {
            long startInMs = bookingStart.getTime();
            long nowInMs = now.getTime();
            
            long timeDiff = Math.abs(startInMs - nowInMs);
            int daysDiff = (int)TimeUnit.DAYS.convert(timeDiff, TimeUnit.MILLISECONDS);
            
            if(daysDiff <= 3) {
                //must charge penalty
                BigDecimal cost = b.getCost();
                //75% charged
                return cost.multiply(new BigDecimal(0.75));
            } else {
                return BigDecimal.ZERO;
            }
        }
    }
    
    @Override
    public void cancelBooking(Long userId, Long bookingId) throws NoResultException, NoAccessException {
        User u = em.find(User.class, userId);
        BookingRequest b = em.find(BookingRequest.class, bookingId);
        Date bookingStart = b.getStartDate();
        Date current = new Date();
        
        int result = bookingStart.compareTo(current);
        
        if (u == null) {
            throw new NoResultException("User could not be found!");
        } else if (b == null) {
            throw new NoResultException("Booking could not be found!");
        } else if (u instanceof PetSitter) {
            throw new NoAccessException("Only Pet Parents can cancel bookings!");
        } else {
            if (result < 0) {
                throw new NoAccessException("Booking has already started and cannot be cancelled!");
            }
            b.setStatus(RequestStatusEnum.ARCHIVED);
        }
    }
    
    @Override
    public void acceptBooking(Long userId, Long bookingId) throws NoResultException, NoAccessException {
        User u = em.find(User.class, userId);
        BookingRequest b = em.find(BookingRequest.class, bookingId);
        Date bookingStart = b.getStartDate();
        Date current = new Date();
        
        int result = bookingStart.compareTo(current);
        
        if (u == null) {
            throw new NoResultException("User could not be found!");
        } else if (b == null) {
            throw new NoResultException("Booking could not be found!");
        } else if (u instanceof PetParent) {
            throw new NoAccessException("Only Pet Sitters can accept booking!");
        } else {
            if (result < 0) {
                throw new NoAccessException("Booking has already started and cannot be accepted!");
            }
            b.setStatus(RequestStatusEnum.ACCEPTED);
            em.merge(b);
        }
    }
}
