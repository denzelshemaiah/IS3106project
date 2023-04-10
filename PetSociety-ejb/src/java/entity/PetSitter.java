/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.RegionEnum;
import enumeration.ServiceEnum;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Andrea
 */
@Entity
public class PetSitter extends User implements Serializable {

    private static final long serialVersionUID = 1L;
    //@Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long sitterId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String serviceAddress;
    @Column(nullable = false)
    private RegionEnum region;
    @Column(nullable = false)
    private String petPreference;
    @Column(nullable = false)
    private int maxWeightPreference;
    @Column(nullable = false)
    @Max(3)
    private int maxNumPets;
    @Column(nullable = false)
    private List<Date> schedule;
    @Column(nullable = false)
    private BigDecimal rate;
    @Column(nullable = false)
    private ServiceEnum service;

    //relationships
    @OneToOne(optional = true)
    private AuthenticationRequest authenReq;
    @OneToOne(optional = true)
    private ExperienceForm expForm;
    @OneToOne(optional = true)
    private SafetyForm safetyForm;
    @OneToMany(mappedBy = "sitter")
    private List<BookingRequest> bookings;
    @OneToMany(mappedBy = "sitter")
    private List<MeetAndGreetRequest> mgRequests;

    
    public PetSitter() {
        this.bookings = new ArrayList<>();
        this.mgRequests = new ArrayList<>();
        this.schedule = new ArrayList<>();
    }

    public PetSitter(String serviceAddress, RegionEnum region, String petPreference, List<Date> schedule, BigDecimal rate, ServiceEnum service, AuthenticationRequest authenReq, ExperienceForm expForm, SafetyForm safetyForm, List<BookingRequest> bookings, List<MeetAndGreetRequest> mgRequests, User user) {
        this.serviceAddress = serviceAddress;
        this.region = region;
        this.petPreference = petPreference;
        this.schedule = schedule;
        this.rate = rate;
        this.service = service;
        this.authenReq = authenReq;
        this.expForm = expForm;
        this.safetyForm = safetyForm;
        this.bookings = bookings;
        this.mgRequests = mgRequests;
        this.user = user;
    }

    public String getServiceAddress() {
        return serviceAddress;
    }

    public void setServiceAddress(String serviceAddress) {
        this.serviceAddress = serviceAddress;
    }

    public List<Date> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<Date> schedule) {
        this.schedule = schedule;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public ServiceEnum getService() {
        return service;
    }

    public void setService(ServiceEnum service) {
        this.service = service;
    }

    /**
     * @return the bookings
     */
    @JsonbTransient
    public List<BookingRequest> getBookings() {
        return bookings;
    }

    /**
     * @param bookings the bookings to set
     */
    public void setBookings(List<BookingRequest> bookings) {
        this.bookings = bookings;
    }

    /**
     * @return the mgRequests
     */
    @JsonbTransient
    public List<MeetAndGreetRequest> getMgRequests() {
        return mgRequests;
    }

    /**
     * @param mgRequests the mgRequests to set
     */
    public void setMgRequests(List<MeetAndGreetRequest> mgRequests) {
        this.mgRequests = mgRequests;
    }

    public AuthenticationRequest getAuthenReq() {
        return authenReq;
    }

    public void setAuthenReq(AuthenticationRequest authenReq) {
        this.authenReq = authenReq;
    }

    public ExperienceForm getExpForm() {
        return expForm;
    }

    public void setExpForm(ExperienceForm expForm) {
        this.expForm = expForm;
    }

    public SafetyForm getSafetyForm() {
        return safetyForm;
    }

    public void setSafetyForm(SafetyForm safetyForm) {
        this.safetyForm = safetyForm;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    /**
     * @return the region
     */
    public RegionEnum getRegion() {
        return region;
    }

    /**
     * @param region the region to set
     */
    public void setRegion(RegionEnum region) {
        this.region = region;
    }

    public String getPetPreference() {
        return petPreference;
    }

    public void setPetPreference(String petPreference) {
        this.petPreference = petPreference;
    }

    public int getMaxWeightPreference() {
        return maxWeightPreference;
    }

    public void setMaxWeightPreference(int maxWeightPreference) {
        this.maxWeightPreference = maxWeightPreference;
    }

    public int getMaxNumPets() {
        return maxNumPets;
    }

    public void setMaxNumPets(int maxNumPets) {
        this.maxNumPets = maxNumPets;
    }

}
