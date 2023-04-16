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
import entity.ExperienceForm;
import entity.MeetAndGreetRequest;
import entity.PetParent;
import entity.PetSitter;
import entity.Rating;
import entity.Report;
import entity.SafetyForm;
import entity.Staff;
import entity.User;
import enumeration.RegionEnum;
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
import java.text.SimpleDateFormat;
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
    private MeetAndGreetSessionBeanLocal mgSessionBean;

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

    @EJB
    private ExperienceFormSessionBeanLocal experienceFormSessionBean;

    @EJB
    private SafetyFormSessionBeanLocal safetyFormSessionBean;

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
        
        CreditCard cc4 = new CreditCard();
        cc4.setCcName("Susan Tan");
        cc4.setCcNum("2345678901234567");
        cc4.setCvv(155);
        cc4.setExpDate("03/2026");
        cc4.setPayments(new ArrayList<>());

        BankAccount acc = new BankAccount();
        acc.setAccName("first");
        acc.setBankAccNum("123456789101112");
        acc.setBankName("UOB");
        acc.setTransactions(new ArrayList<>());
        
        BankAccount acc4 = new BankAccount();
        acc4.setAccName("first");
        acc4.setBankAccNum("1234567891234567");
        acc4.setBankName("UOB");
        acc4.setTransactions(new ArrayList<>());

        bankAccountSessionBean.addNewBankAcc(acc);
        creditCardSessionBean.addNewCreditCard(cc);

        AuthenticationRequest authen = new AuthenticationRequest();
        authen.setCreatedDate(new Date());
        authen.setDocument(null);

        ExperienceForm expForm = new ExperienceForm();
        expForm.setYearsOfExperience(2);
        expForm.setHeadline("Vet Assistant");
        expForm.setExperience("I have been taking care of my friends' pets.");
        
        SafetyForm safetyform = new SafetyForm();
        safetyform.setQ1("I am a student.");
        safetyform.setQ2("Yes.");
        safetyform.setQ3("No.");

        authenticationReqSessionBean.createAuthenticationReq(authen);
        experienceFormSessionBean.createNewExperienceForm(expForm);
        safetyFormSessionBean.createNewSafetyForm(safetyform);

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
        
        PetParent p2 = new PetParent();
        p2.setAge(35);
        p2.setBillingAddress("19 Banana Avenue");
        p2.setBookings(new ArrayList<>());
        p2.setContactNum("92000000");
        p2.setEmergencyContact("91000000");
        p2.setEmail("parent2@gmail.com");
        p2.setPassword("password2");
        p2.setFirstName("Susan");
        p2.setLastName("Tan");
        p2.setUsername("susanTan2");
        p2.setStatus(UserStatusEnum.APPROVED);
        p2.setRatingsForUsers(new ArrayList<>());
        p2.setRatingsUserMade(new ArrayList<>());
        p2.setReportsAgainstUser(new ArrayList<>());
        p2.setReportsUserMade(new ArrayList<>());
        p2.setMgRequests(new ArrayList<>());
        p2.setCc(cc4);
        p2.setBankAcc(acc4);
        
        petParentSessionBean.createNewParent(p2);

        PetSitter s = new PetSitter();
        s.setAge(21);
        s.setBillingAddress("123 Orange Lane");
        s.setServiceAddress("123 Orange Lane");
        s.setRegion(RegionEnum.NORTH);
        s.setRate(new BigDecimal(20));
        s.setFirstName("first");
        s.setLastName("last");
        s.setService(ServiceEnum.BOARDING);
        s.setEmail("petsitter1@mail.com");
        s.setUsername("petsitter");
        s.setPassword("password");
        s.setContactNum("12345678");
        s.setEmergencyContact("87654321");
        s.setPetPreference("Dogs only");
        s.setMaxNumPets(3);
        s.setMaxWeightPreference(30);
        s.setStatus(UserStatusEnum.PENDING);
        List<Date> schedule1 = new ArrayList<Date>();
        schedule1.add(new Date(10/04/2023));
        schedule1.add(new Date(11/04/2023));
        schedule1.add(new Date(12/04/2023));
        schedule1.add(new Date(13/04/2023));
        s.setSchedule(schedule1);
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
        s.setAuthenReq(authen);
        s.setExpForm(expForm);
        s.setSafetyForm(safetyform);
        
        PetSitter s2 = new PetSitter();
        s2.setAge(21);
        s2.setBillingAddress("234 Orange Lane");
        s2.setServiceAddress("234 Orange Lane");
        s2.setRegion(RegionEnum.SOUTH);
        s2.setRate(new BigDecimal(30));
        s2.setFirstName("chris");
        s2.setLastName("tan");
        s2.setService(ServiceEnum.DAYCARE);
        s2.setEmail("petsitter2@mail.com");
        s2.setUsername("petsitter2");
        s2.setPassword("password2");
        s2.setContactNum("88888888");
        s2.setEmergencyContact("90123456");
        s2.setPetPreference("Dogs and Cats");
        s2.setMaxNumPets(3);
        s2.setMaxWeightPreference(20);
        s2.setStatus(UserStatusEnum.APPROVED);
        List<Date> schedule2 = new ArrayList<Date>();
        schedule2.add(new Date(01/04/2023));
        schedule2.add(new Date(02/04/2023));
        schedule2.add(new Date(03/04/2023));
        schedule2.add(new Date(04/04/2023));
        s2.setSchedule(schedule2);
        BankAccount acc2 = new BankAccount();
        acc2.setAccName("sitteracc2");
        acc2.setBankAccNum("11111111");
        acc2.setBankName("DBS");
        bankAccountSessionBean.addNewBankAcc(acc2);
        s2.setBankAcc(acc2);
        CreditCard cc2 = new CreditCard();
        cc2.setCcName("SitterCard2");
        cc2.setCcNum("1212121212121212");
        cc2.setCvv(234);
        cc2.setExpDate("12/28");
        creditCardSessionBean.addNewCreditCard(cc2);
        s2.setCc(cc2);
        // assuming schedule is empty (no unavail dates)
        petSitterSessionBean.createNewSitter(s2);
        
        PetSitter s3 = new PetSitter();
        s3.setAge(20);
        s3.setBillingAddress("234 Bishan st23");
        s3.setServiceAddress("234 Bishan st23");
        s3.setRegion(RegionEnum.WEST);
        s3.setRate(new BigDecimal(30));
        s3.setFirstName("mary");
        s3.setLastName("lim");
        s3.setService(ServiceEnum.DROP_IN);
        s3.setEmail("petsitter3@mail.com");
        s3.setUsername("petsitter3");
        s3.setPassword("password3");
        s3.setContactNum("81818181");
        s3.setEmergencyContact("91919191");
        s3.setPetPreference("Dogs only");
        s3.setMaxNumPets(3);
        s3.setMaxWeightPreference(30);
        s3.setStatus(UserStatusEnum.APPROVED);
        List<Date> schedule3 = new ArrayList<Date>();
        schedule3.add(new Date(01/04/2023));
        schedule3.add(new Date(02/04/2023));
        schedule3.add(new Date(03/04/2023));
        schedule3.add(new Date(04/04/2023));
        s2.setSchedule(schedule3);
        BankAccount acc3 = new BankAccount();
        acc3.setAccName("sitteracc3");
        acc3.setBankAccNum("22222222");
        acc3.setBankName("DBS");
        bankAccountSessionBean.addNewBankAcc(acc3);
        s3.setBankAcc(acc3);
        CreditCard cc3 = new CreditCard();
        cc3.setCcName("SitterCard3");
        cc3.setCcNum("1234561234561212");
        cc3.setCvv(345);
        cc3.setExpDate("12/29");
        creditCardSessionBean.addNewCreditCard(cc3);
        s3.setCc(cc3);
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
        reportSessionBean.createReport(report, s.getUserId(), p.getUserId());
        Report report2 = new Report();
        report2.setReportDescription("This is a another test report. Test test test test test test test test test");
        report2.setReported(s);
        report2.setReporter(p);
        reportSessionBean.createReport(report2, s.getUserId(), p.getUserId());

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
            b.setFreq(2);
            bookingSessionBean.createNewBooking(b, p.getUserId(), s.getUserId(), "once");

            Rating rating = new Rating();
            rating.setRated(s);
            rating.setRater(p);
            rating.setComment("This is a test rating.");
            rating.setReq(b);
            rating.setStars(3);
            ratingSessionBean.createNewRating(rating, p.getUserId(), s.getUserId());
            
        } if (p.getMgRequests().isEmpty()) {
            MeetAndGreetRequest mg = new MeetAndGreetRequest();
            mg.setMgDate(new Date(2023, 04, 20, 00, 00, 00));
            mg.setCreatedDate(new Date());
            mg.setMgDesc("Hello there! I would really like to meet you with my puppy Oreo!");
            mg.setParent(p);
            mg.setSitter(s);
            mg.setStatus(RequestStatusEnum.PENDING);
            mgSessionBean.createNewMeetAndGreet(mg, p.getUserId(), s.getUserId());
            
            MeetAndGreetRequest mg2 = new MeetAndGreetRequest();
            mg2.setMgDate(new Date(2023, 04, 18, 00, 00, 00));
            mg2.setCreatedDate(new Date());
            mg2.setMgDesc("Hello there! I would really like to meet you with my puppy Oreo!");
            mg2.setParent(p);
            mg2.setSitter(s2);
            mg2.setStatus(RequestStatusEnum.PENDING);
            mgSessionBean.createNewMeetAndGreet(mg, p.getUserId(), s2.getUserId());
        }
    }
}
