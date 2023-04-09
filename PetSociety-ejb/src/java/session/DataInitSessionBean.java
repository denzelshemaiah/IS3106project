/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.AuthenticationRequest;
import entity.BankAccount;
import entity.BookingRequest;
import entity.CreditCard;
import entity.PetParent;
import entity.PetSitter;
import entity.Rating;
import entity.Report;
import entity.Staff;
import entity.User;
import enumeration.RequestStatusEnum;
import enumeration.ServiceEnum;
import enumeration.UserStatusEnum;
import error.EntityAlreadyExistsException;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
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
    private RatingSessionBeanLocal ratingSessionBean;

    @EJB
    private ReportSessionBeanLocal reportSessionBean;

    @EJB
    private AuthenticationReqSessionBeanLocal authenticationReqSessionBean;

    @EJB
    private PetSitterSessionBeanLocal petSitterSessionBean;

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
        cc.setExpDate("03/2026");
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
        p.setStatus(UserStatusEnum.APPROVED);
        p.setRatingsForUsers(new ArrayList<>());
        p.setRatingsUserMade(new ArrayList<>());
        p.setReportsAgainstUser(new ArrayList<>());
        p.setReportsUserMade(new ArrayList<>());
        p.setMgRequests(new ArrayList<>());
        p.setCc(cc);
        p.setBankAcc(acc);

        petParentSessionBean.createNewParent(p);

        PetSitter s = new PetSitter();
        s.setAge(21);
        s.setBillingAddress("123 Orange Lane");
        s.setServiceAddress("123 Orange Lane");
        s.setRegion("north");
        s.setRate(new BigDecimal(20));
        s.setFirstName("first");
        s.setLastName("last");
        s.setService(ServiceEnum.BOARDING);
        s.setEmail("petsitter1@mail.com");
        s.setUsername("petsitter");
        s.setPassword("password");
        s.setContactNum("12345678");
        s.setEmergencyContact("87654321");
        s.setPreference("preference");
        s.setStatus(UserStatusEnum.PENDING);
        BankAccount acc1 = new BankAccount();
        acc1.setAccName("sitteracc1");
        acc1.setBankAccNum("88888888");
        acc1.setBankName("DBS");
        bankAccountSessionBean.addNewBankAcc(acc1);
        s.setBankAcc(acc1);
        CreditCard cc1 = new CreditCard();
        cc1.setCcName("SitterCard1");
        cc1.setCcNum("1616161616161616");
        cc1.setCvv(123);
        cc1.setExpDate("12/28");
        creditCardSessionBean.addNewCreditCard(cc1);
        s.setCc(cc1);
        // assuming schedule is empty (no unavail dates)
        petSitterSessionBean.createNewSitter(s);
        
        PetSitter s2 = new PetSitter();
        s2.setAge(21);
        s2.setBillingAddress("234 Orange Lane");
        s2.setServiceAddress("234 Orange Lane");
        s2.setRegion("south");
        s2.setRate(new BigDecimal(30));
        s2.setFirstName("chris");
        s2.setLastName("tan");
        s2.setService(ServiceEnum.DAYCARE);
        s2.setEmail("petsitter2@mail.com");
        s2.setUsername("petsitter2");
        s2.setPassword("password2");
        s2.setContactNum("88888888");
        s2.setEmergencyContact("90123456");
        s2.setPreference("preference");
        s2.setStatus(UserStatusEnum.APPROVED);
        BankAccount acc2 = new BankAccount();
        acc2.setAccName("sitteracc2");
        acc2.setBankAccNum("1111111");
        acc2.setBankName("DBS");
        bankAccountSessionBean.addNewBankAcc(acc2);
        s.setBankAcc(acc2);
        CreditCard cc2 = new CreditCard();
        cc2.setCcName("SitterCard2");
        cc2.setCcNum("1212121212121212");
        cc2.setCvv(234);
        cc2.setExpDate("12/28");
        creditCardSessionBean.addNewCreditCard(cc2);
        s.setCc(cc2);
        // assuming schedule is empty (no unavail dates)
        petSitterSessionBean.createNewSitter(s2);
        
        PetSitter s3 = new PetSitter();
        s3.setAge(20);
        s3.setBillingAddress("234 Bishan st23");
        s3.setServiceAddress("234 Bishan st23");
        s3.setRegion("west");
        s3.setRate(new BigDecimal(30));
        s3.setFirstName("mary");
        s3.setLastName("lim");
        s3.setService(ServiceEnum.DROP_IN);
        s3.setEmail("petsitter3@mail.com");
        s3.setUsername("petsitter3");
        s3.setPassword("password3");
        s3.setContactNum("81818181");
        s3.setEmergencyContact("91919191");
        s3.setPreference("preference");
        s3.setStatus(UserStatusEnum.APPROVED);
        BankAccount acc3 = new BankAccount();
        acc3.setAccName("sitteracc3");
        acc3.setBankAccNum("2222222");
        acc3.setBankName("DBS");
        bankAccountSessionBean.addNewBankAcc(acc3);
        s.setBankAcc(acc3);
        CreditCard cc3 = new CreditCard();
        cc3.setCcName("SitterCard3");
        cc3.setCcNum("1234561234561212");
        cc3.setCvv(345);
        cc3.setExpDate("12/29");
        creditCardSessionBean.addNewCreditCard(cc3);
        s.setCc(cc3);
        // assuming schedule is empty (no unavail dates)
        petSitterSessionBean.createNewSitter(s3);

        AuthenticationRequest aReq = new AuthenticationRequest();
        aReq.setCreatedDate(new Date());
        aReq.setResolved(Boolean.FALSE);
        aReq.setSitter(s);
        byte[] data = new byte[]{37, 80, 68, 70, 45, 49, 46, 49, 10, 37, -62, -91, -62, -79, -61,
            -85, 10, 10, 49, 32, 48, 32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 47, 84, 121, 112, 101, 32, 47, 67, 97, 116,
            97, 108, 111, 103, 10, 32, 32, 32, 32, 32, 47, 80, 97, 103, 101, 115, 32, 50, 32, 48, 32, 82, 10, 32, 32, 62,
            62, 10, 101, 110, 100, 111, 98, 106, 10, 10, 50, 32, 48, 32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 47, 84, 121,
            112, 101, 32, 47, 80, 97, 103, 101, 115, 10, 32, 32, 32, 32, 32, 47, 75, 105, 100, 115, 32, 91, 51, 32, 48, 32,
            82, 93, 10, 32, 32, 32, 32, 32, 47, 67, 111, 117, 110, 116, 32, 49, 10, 32, 32, 32, 32, 32, 47, 77, 101, 100,
            105, 97, 66, 111, 120, 32, 91, 48, 32, 48, 32, 51, 48, 48, 32, 49, 52, 52, 93, 10, 32, 32, 62, 62, 10, 101,
            110, 100, 111, 98, 106, 10, 10, 51, 32, 48, 32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 32, 47, 84, 121, 112,
            101, 32, 47, 80, 97, 103, 101, 10, 32, 32, 32, 32, 32, 32, 47, 80, 97, 114, 101, 110, 116, 32, 50, 32, 48, 32,
            82, 10, 32, 32, 32, 32, 32, 32, 47, 82, 101, 115, 111, 117, 114, 99, 101, 115, 10, 32, 32, 32, 32, 32, 32, 32,
            60, 60, 32, 47, 70, 111, 110, 116, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 60, 60, 32, 47, 70, 49, 10,
            32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 60, 60, 32, 47, 84, 121, 112, 101, 32, 47, 70, 111,
            110, 116, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 47, 83, 117, 98, 116,
            121, 112, 101, 32, 47, 84, 121, 112, 101, 49, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
            32, 32, 32, 47, 66, 97, 115, 101, 70, 111, 110, 116, 32, 47, 84, 105, 109, 101, 115, 45, 82, 111, 109, 97, 110,
            10, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 62, 62, 10, 32, 32, 32, 32, 32, 32, 32, 32, 32,
            32, 32, 62, 62, 10, 32, 32, 32, 32, 32, 32, 32, 62, 62, 10, 32, 32, 32, 32, 32, 32, 47, 67, 111, 110, 116, 101,
            110, 116, 115, 32, 52, 32, 48, 32, 82, 10, 32, 32, 62, 62, 10, 101, 110, 100, 111, 98, 106, 10, 10, 52, 32, 48,
            32, 111, 98, 106, 10, 32, 32, 60, 60, 32, 47, 76, 101, 110, 103, 116, 104, 32, 53, 53, 32, 62, 62, 10, 115,
            116, 114, 101, 97, 109, 10, 32, 32, 66, 84, 10, 32, 32, 32, 32, 47, 70, 49, 32, 49, 56, 32, 84, 102, 10, 32,
            32, 32, 32, 48, 32, 48, 32, 84, 100, 10, 32, 32, 32, 32, 40, 72, 101, 108, 108, 111, 32, 87, 111, 114, 108,
            100, 41, 32, 84, 106, 10, 32, 32, 69, 84, 10, 101, 110, 100, 115, 116, 114, 101, 97, 109, 10, 101, 110, 100,
            111, 98, 106, 10, 10, 120, 114, 101, 102, 10, 48, 32, 53, 10, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 32, 54,
            53, 53, 51, 53, 32, 102, 32, 10, 48, 48, 48, 48, 48, 48, 48, 48, 49, 56, 32, 48, 48, 48, 48, 48, 32, 110, 32,
            10, 48, 48, 48, 48, 48, 48, 48, 48, 55, 55, 32, 48, 48, 48, 48, 48, 32, 110, 32, 10, 48, 48, 48, 48, 48, 48,
            48, 49, 55, 56, 32, 48, 48, 48, 48, 48, 32, 110, 32, 10, 48, 48, 48, 48, 48, 48, 48, 52, 53, 55, 32, 48, 48,
            48, 48, 48, 32, 110, 32, 10, 116, 114, 97, 105, 108, 101, 114, 10, 32, 32, 60, 60, 32, 32, 47, 82, 111, 111,
            116, 32, 49, 32, 48, 32, 82, 10, 32, 32, 32, 32, 32, 32, 47, 83, 105, 122, 101, 32, 53, 10, 32, 32, 62, 62, 10,
            115, 116, 97, 114, 116, 120, 114, 101, 102, 10, 53, 54, 53, 10, 37, 37, 69, 79, 70, 10};
        aReq.setDocument(data);
        authenticationReqSessionBean.createAuthenticationReq(aReq, s.getUserId());

        Report report = new Report();
        report.setReportDescription("This is a test report. Test test test test test test test test test test");
        report.setReported(s);
        report.setReporter(p);
        report.setValid(true);
        reportSessionBean.createReport(report, s.getUserId(), p.getUserId());

        if (p.getBookings().isEmpty()) {
            //create new booking
            BookingRequest b = new BookingRequest();
            b.setCost(BigDecimal.ONE);
            b.setCreated(new Date());
            b.setDescription("Hello there! This is a new booking");
            b.setEndDate(new Date());
            b.setNumPets(2);
            b.setParent(p);
            b.setSitter(s);
            b.setStartDate(new Date());
            b.setStatus(RequestStatusEnum.PENDING);
            bookingSessionBean.createNewBooking(b, p.getUserId(), s.getUserId(), "once");

            Rating rating = new Rating();
            rating.setRated(s);
            rating.setRater(p);
            rating.setComment("This is a test rating.");
            rating.setReq(b);
            rating.setStars(3);
            ratingSessionBean.createNewRating(rating, p.getUserId(), s.getUserId());
        }
    }
}
