/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BankAccount;
import entity.BookingRequest;
import entity.CreditCard;
import entity.Payment;
import entity.PetSitter;
import entity.User;
import enumeration.RequestStatusEnum;
import enumeration.UserStatusEnum;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Schedule;
import javax.ejb.Startup;
import javax.ejb.TimerService;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author rachelang
 */
@Singleton
@LocalBean
@Startup
public class TimerSessionBean {

    @EJB
    private BookingSessionBeanLocal bookingSessionBean;
    @EJB
    private UserSessionBeanLocal userSessionBean;
    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    @Resource
    TimerService timerService;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    /**
     * Every 12am is considered as a new day (1 day has passed)
     */
    @Schedule(hour = "00")
    public void enableUsers() {
        List<User> users = userSessionBean.retrieveAllDisabledUsers();
        for (User u:users) {
            int daysDisabled = u.getDaysDisabled();
            daysDisabled--;
            u.setDaysDisabled(daysDisabled);
            if (daysDisabled == 0) {
                u.setStatus(UserStatusEnum.APPROVED);
            }
        }
    }
    
    @Schedule(hour = "00")
    public void payment() {
        //accepted bookings
        List<BookingRequest> bookings = bookingSessionBean.getCurrentBookings(new Date());
        for (BookingRequest b:bookings) {
            CreditCard cc = b.getParent().getCc();
            BankAccount bankAcc = b.getSitter().getBankAcc();
            Payment payment = new Payment();
            payment.setAmount(b.getCost());
            payment.setBankAcc(bankAcc);
            payment.setCredCard(cc);
            payment.setCreated(new Date());
            payment.setBooking(b);
            em.persist(payment);
        }
        //cancelled booking within 3 days!
    }
    
    //update status of all bookings
    @Schedule(hour = "00") 
    public void updateStatuses() {
        List<BookingRequest> bookings = bookingSessionBean.getPendingBookings();
        Calendar c = Calendar.getInstance();
        Date current = new Date();
        c.setTime(current);
        for (BookingRequest b : bookings) {
            Date start = b.getStartDate();
            Calendar cStart = Calendar.getInstance();
            cStart.setTime(start);
            if (c.compareTo(cStart) >= 0) {
                // if current date is greater than or equal to the start date, automatically archive it
                b.setStatus(RequestStatusEnum.ARCHIVED);
            }
        }
        
        //get upcoming bookings that have already passed
        List<BookingRequest> upcoming = bookingSessionBean.getCurrentBookings(current);
        for (BookingRequest b : upcoming) {
            Date end = b.getEndDate();
            Calendar cStart = Calendar.getInstance();
            cStart.setTime(end);
            if (c.compareTo(cStart) < 0) {
                // if current date is earlier than the end date, automatically archive it
                b.setStatus(RequestStatusEnum.ARCHIVED);
            }
        }
    }
    
    //provide Pet Sitters with payment
    @Schedule(hour = "00")
    public void paySitters() {
        List<BookingRequest> pendingPayment = bookingSessionBean.getFinishedBookings(new Date());
        for (BookingRequest b : pendingPayment) {
            BigDecimal cost = b.getCost();
            BigDecimal payment = new BigDecimal(0.90).multiply(cost);
            PetSitter s = b.getSitter();
            Payment p = new Payment();
            p.setAmount(payment);
            p.setBankAcc(s.getBankAcc());
            p.setBooking(b);
            p.setCreated(new Date());
            em.persist(p);
        }
    }
}
