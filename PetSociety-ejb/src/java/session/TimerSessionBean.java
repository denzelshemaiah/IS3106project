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
import entity.User;
import enumeration.UserStatusEnum;
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
    }
}
