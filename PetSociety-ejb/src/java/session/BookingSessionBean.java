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
import enumeration.ServiceEnum;
import error.NoAccessException;
import error.NoResultException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
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
    public void createNewBooking(BookingRequest b, Long parentId, Long sitterId, String repeatBasis) {
        PetParent p = em.find(PetParent.class, parentId);
        PetSitter s = em.find(PetSitter.class, sitterId);
        List<Integer> days = b.getRepeatDays();
        System.out.println("BOOKING BEING CREATED: " + b);
        if (p == null || s == null) {
            //exception?
        } else {
            if (repeatBasis.equals("weekly")) {
                Date startDate = b.getStartDate();
                Date endDate = b.getEndDate();
                
                System.out.println("start Date:" + startDate);
                Calendar start = Calendar.getInstance();
                start.setTime(startDate);
                
                Calendar end = Calendar.getInstance();
                end.setTime(endDate);
                
                while (start.compareTo(end) < 0) {
                    int day = start.get(Calendar.DAY_OF_WEEK);
                    //starting day, make a new booking with this as start day!!!
                    System.out.println(day);
                    if (day == days.get(0)) {
                        Date newStart = start.getTime();
                        int diffDays = days.get(days.size() - 1);
                        start.add(Calendar.DATE, diffDays);
                        //end of repeat cycle
                        Date newEnd = start.getTime();
                        //create a new booking for this cycle
                        BookingRequest newB = new BookingRequest();
                        newB.setCreated(new Date());
                        newB.setDescription(b.getDescription());
                        newB.setEndDate(newEnd);
                        newB.setFreq(b.getFreq());
                        newB.setNumPets(b.getNumPets());
                        newB.setParent(p);
                        newB.setSitter(s);
                        newB.setStartDate(newStart);
                        //default pending
                        newB.setStatus(RequestStatusEnum.PENDING);
                        newB.setRepeatDays(b.getRepeatDays());
                        //calculate cost for this cycle
                        if (s.getService().equals(ServiceEnum.DROP_IN) || s.getService().equals(ServiceEnum.WALKING)) {
                            newB.setCost(s.getRate().multiply(BigDecimal.valueOf(b.getFreq())).multiply(BigDecimal.valueOf(days.size())).
                                    multiply(new BigDecimal(newB.getNumPets())));
                        } else {
                            newB.setCost(s.getRate().multiply(BigDecimal.valueOf(days.size())).
                                    multiply(new BigDecimal(newB.getNumPets())));
                        }
                        //set relations for this new booking
                        p.getBookings().add(newB);
                        s.getBookings().add(newB);
                        em.persist(newB);
                        em.flush();
                    }
                    //keep adding 1 day
                    start.add(Calendar.DATE, 1);
                }
            } else if (repeatBasis.equals("once")) {
                b.setStatus(RequestStatusEnum.PENDING);
                b.setParent(p);
                b.setSitter(s);
                em.persist(b);
                em.flush();
            }
        }
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
            System.out.println("is a parent");
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
        BookingRequest old = em.find(BookingRequest.class, b.getBookingReqId());
        System.out.println("updating....");
        if (old == null) {
            throw new NoResultException("No booking can be found!");
        } else {
            old.setDescription(b.getDescription());
            old.setStartDate(b.getStartDate());
            old.setEndDate(b.getEndDate());
            if (b.getCost() != null) {
                old.setCost(b.getCost());
            }
            old.setNumPets(b.getNumPets());
            em.merge(old);
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
            int daysDiff = (int) TimeUnit.DAYS.convert(timeDiff, TimeUnit.MILLISECONDS);

            if (daysDiff <= 3) {
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
        BigDecimal penalty = calculatePenalty(bookingId);

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
            //cancelled within 3 days!
            Date startDate = b.getStartDate();
            Date currDate = new Date();

            long dateBeforeInMs = startDate.getTime();
            long dateAfterInMs = currDate.getTime();

            long timeDiff = Math.abs(dateAfterInMs - dateBeforeInMs);

            long daysDiff = timeDiff/(1000 * 24 * 60 * 60);
            
            System.out.println("Days diff" + daysDiff);
            
            if (daysDiff <= 3) {
                //must charge the penalty!
                b.setCost(penalty);
                b.setPenalty(true);
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
        
        System.out.println("Accepted booking!");
        System.out.println(u);

        if (u == null) {
            System.out.println("Accepted 1!");
            throw new NoResultException("User could not be found!");
        } else if (b == null) {
            System.out.println("Accepted 2!");
            throw new NoResultException("Booking could not be found!");
        } else if (u instanceof PetParent) {
            System.out.println("Accepted 3!");
            throw new NoAccessException("Only Pet Sitters can accept booking!");
        } else {
            if (result < 0) {
                System.out.println("Accepted booking 3!");
                throw new NoAccessException("Booking has already started and cannot be accepted!");
            }
            System.out.println("Accepted booking!");
            b.setStatus(RequestStatusEnum.ACCEPTED);
            em.merge(b);
        }
    }

    @Override
    public List<BookingRequest> getCurrentBookings(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, 1);
        Date endOfDay = c.getTime();
        Query q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.status = :enum "
                + "AND b.startDate >= :date "
                + "AND b.startDate < :endOfDate");
        q.setParameter("enum", RequestStatusEnum.ACCEPTED);
        q.setParameter("date", date);
        q.setParameter("endOfDate", endOfDay);
        List<BookingRequest> accepted =  q.getResultList();
        
        //account for penalty
        Query q2 = em.createQuery("SELECT b FROM BookingRequest b WHERE b.status = :enum "
                + "AND b.startDate >= :date "
                + "AND b.startDate < :endOfDate"
                + "AND b.penalty = TRUE")
                .setParameter("enum", RequestStatusEnum.ARCHIVED)
                .setParameter("date", date)
                .setParameter("endOfDate", endOfDay);
        List<BookingRequest> archived = q2.getResultList();
        
        accepted.addAll(archived);
        
        return accepted;
    }
    
    @Override
    public List<BookingRequest> getPendingBookings() {
        Query q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.status = :enum")
                .setParameter("enum", RequestStatusEnum.PENDING);
        return q.getResultList();
    }
    
    @Override
    public List<BookingRequest> getAcceptedBookings() {
        Query q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.status = :enum")
                .setParameter("enum", RequestStatusEnum.ACCEPTED);
        return q.getResultList();
    }
    
    public List<BookingRequest> getFinishedBookings(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        // only pay 1 day after end date
        c.add(Calendar.DATE, -1);
        Date bookingEnd = c.getTime();
        
        Query q = em.createQuery("SELECT b FROM BookingRequest b WHERE b.status = :enum "
                + "AND b.endDate >= :dayBefore "
                + "AND b.endDate < :currDate")
                .setParameter("enum", RequestStatusEnum.ACCEPTED)
                .setParameter("dayBefore", bookingEnd)
                .setParameter("currDate", date);
        

        return q.getResultList();
    }
}
