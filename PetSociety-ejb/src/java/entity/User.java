/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.UserStatusEnum;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

/**
 *
 * @author Andrea
 */
@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public class User implements Serializable  {


    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(nullable = false)
    @Size(max = 20)
    private String firstName;
    @Column(nullable = false)
    @Size(max = 20)
    private String lastName;
    @Column(unique = true, nullable = false)
    @Size(min = 6, max = 20)
    private String username;
    @Column(length = 8, unique = true, nullable = false)
    @Size(min = 8)
    private String contactNum;
    @Column(unique = true, nullable = false)
    @Size(min = 10)
    private String email;
    @Column(nullable = false)
    @Size(min = 6, max = 20)
    private String password;
    @Column(nullable = false)
    private int age;
    @Column(length = 8, nullable = false)
    @Size(min = 8)
    private String emergencyContact;
    @Column(nullable = true)
    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte [] profilePicture;
    @Column(nullable = false)
    private String billingAddress;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatusEnum status;
    @Column(nullable = false)
    private int daysDisabled;

    // relationship with report x 2
    @OneToMany(mappedBy = "reported")
    private List<Report> reportsAgainstUser;
    @OneToMany(mappedBy = "reporter")
    private List<Report> reportsUserMade;
    
    // unidirectional relationship with bank acc
    @OneToOne(optional = false, cascade=CascadeType.PERSIST)
    @JoinColumn(name="bankacc_ID")
    private BankAccount bankAcc;

    // relationship with rating x 2
    @OneToMany(mappedBy = "rated")
    private List<Rating> ratingsForUsers;
    @OneToMany(mappedBy = "rater")
    private List<Rating> ratingsUserMade;
    
    // unidirectional relationship with credit card
    @OneToOne(optional = false, cascade=CascadeType.PERSIST)
    @JoinColumn(name="cc_ID")
    private CreditCard cc;
    
    // getting PetParent and PetSitter
    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private PetParent petParent;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST)
    private PetSitter petSitter;
    
    public User() {
        this.reportsAgainstUser = new ArrayList<>();
        this.reportsUserMade = new ArrayList<>();
        this.ratingsUserMade = new ArrayList<>();
        this.ratingsForUsers = new ArrayList<>();
        this.daysDisabled = 0;
    }

    public User(String firstName, String lastName, String username, String contactNum, String email, String password, int age, String emergencyContact, byte[] profilePicture, String billingAddress, UserStatusEnum status) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.contactNum = contactNum;
        this.email = email;
        this.password = password;
        this.age = age;
        this.emergencyContact = emergencyContact;
        this.profilePicture = profilePicture;
        this.billingAddress = billingAddress;
        this.status = status;
        this.daysDisabled = 0;
    }

    
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (userId != null ? userId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the userId fields are not set
        if (!(object instanceof User)) {
            return false;
        }
        User other = (User) object;
        if ((this.userId == null && other.userId != null) || (this.userId != null && !this.userId.equals(other.userId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.User[ id=" + userId + " ]";
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContactNum() {
        return contactNum;
    }

    public void setContactNum(String contactNum) {
        this.contactNum = contactNum;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }


    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public UserStatusEnum getStatus() {
        return status;
    }

    public void setStatus(UserStatusEnum status) {
        this.status = status;
    }

        public List<Report> getReportsAgainstUser() {
        return reportsAgainstUser;
    }

    public void setReportsAgainstUser(List<Report> reportsAgainstUser) {
        this.reportsAgainstUser = reportsAgainstUser;
    }

    public List<Report> getReportsUserMade() {
        return reportsUserMade;
    }

    public void setReportsUserMade(List<Report> reportsUserMade) {
        this.reportsUserMade = reportsUserMade;
    }

    public BankAccount getBankAcc() {
        return bankAcc;
    }

    public void setBankAcc(BankAccount bankAcc) {
        this.bankAcc = bankAcc;
    }

    public List<Rating> getRatingsForUsers() {
        return ratingsForUsers;
    }

    public void setRatingsForUsers(List<Rating> ratingsForUsers) {
        this.ratingsForUsers = ratingsForUsers;
    }

    public List<Rating> getRatingsUserMade() {
        return ratingsUserMade;
    }

    public void setRatingsUserMade(List<Rating> ratingsUserMade) {
        this.ratingsUserMade = ratingsUserMade;
    }

    public CreditCard getCc() {
        return cc;
    }

    public void setCc(CreditCard cc) {
        this.cc = cc;
    }

    public byte[] getProfilePicture() {
        return profilePicture;
    }
    
    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public int getDaysDisabled() {
        return daysDisabled;
    }

    public void setDaysDisabled(int daysDisabled) {
        this.daysDisabled = daysDisabled;
    }
    
    @JsonbTransient
    public PetParent getPetParent() {
        return petParent;
    }

    public void setPetParent(PetParent petParent) {
        this.petParent = petParent;
    }

    public PetSitter getPetSitter() {
        return petSitter;
    }

    public void setPetSitter(PetSitter petSitter) {
        this.petSitter = petSitter;
    }
}
