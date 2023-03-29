/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BankAccount;
import entity.BookingRequest;
import entity.CreditCard;
import entity.PetParent;
import entity.Staff;
import entity.User;
import enumeration.RequestStatusEnum;
import error.EntityAlreadyExistsException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;

/**
 *
 * @author rachelang
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB
    private UserSessionBeanLocal userSessionBean;

    @EJB
    private BookingSessionBeanLocal bookingSessionBean;

    @EJB
    private PetParentSessionBeanLocal petParentSessionBean;

    @EJB
    private CreditCardSessionBeanLocal creditCardSessionBean;

    @EJB
    private BankAccSessionBeanLocal bankAccountSessionBean;
    

    @EJB(name = "StaffSessionBeanLocal")
    private StaffSessionBeanLocal staffSessionBeanLocal;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    @PostConstruct
    public void postConstruct() {
        List<Staff> staffs = staffSessionBeanLocal.retrieveAllStaff();
        if (staffs.isEmpty()) {
            staffInit();
        }
        List<User> users = userSessionBean.retrieveAllUsers();
        if (users.isEmpty()) {
            usersInit();
        }
    }

    private void staffInit() {
        Staff staff1 = new Staff();
        staff1.setFirstName("staff1");
        staff1.setLastName("s1");
        staff1.setUsername("staff1");
        staff1.setPassword("password");
        try {
            staffSessionBeanLocal.createStaff(staff1);
        } catch (EntityAlreadyExistsException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void usersInit() {
        //create new user, bank acc and cred card
        CreditCard cc = new CreditCard();
        cc.setCcName("first");
        cc.setCcNum("1234567891012134");
        cc.setCvv(123);
        cc.setExpDate(new Date());
        cc.setPayments(new ArrayList<>());

        BankAccount acc = new BankAccount();
        acc.setAccName("first");
        acc.setBankAccNum("123456789101112");
        acc.setBankName("UOB");
        acc.setTransactions(new ArrayList<>());

        bankAccountSessionBean.addNewBankAcc(acc);
        creditCardSessionBean.addNewCreditCard(cc);

        PetParent p = new PetParent();
        p.setAge(21);
        p.setBillingAddress("8 Apple Street");
        p.setBookings(new ArrayList<>());
        p.setContactNum("91234567");
        p.setEmergencyContact("92345678");
        p.setEmail("parent@gmail.com");
        p.setPassword("password");
        p.setFirstName("first");
        p.setLastName("last");
        p.setUsername("username");
        p.setRatingsForUsers(new ArrayList<>());
        p.setRatingsUserMade(new ArrayList<>());
        p.setReportsAgainstUser(new ArrayList<>());
        p.setReportsUserMade(new ArrayList<>());
        p.setMgRequests(new ArrayList<>());
        p.setCc(cc);
        p.setBankAcc(acc);

        petParentSessionBean.createNewParent(p);

        if (p.getBookings().isEmpty()) {
            //create new booking
            BookingRequest b = new BookingRequest();
            b.setCost(BigDecimal.ONE);
            b.setCreated(new Date());
            b.setDescription("Hello there! This is a new booking");
            b.setEndDate(new Date());
            b.setNumPets(2);
            b.setParent(p);
            b.setStartDate(new Date());
            b.setStatus(RequestStatusEnum.PENDING);
            //ok nvm i rl that thrs no sitter yet T-T
            bookingSessionBean.createNewBooking(b, p.getUserId(), new Long(3));
        }
    }
}
