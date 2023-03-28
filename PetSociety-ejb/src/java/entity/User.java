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
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
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
    @Column(nullable = true)
    private UserStatusEnum status;

    // relationship with report x 2
    @OneToMany(mappedBy = "reported")
    private List<Report> reportsAgainstUser;
    @OneToMany(mappedBy = "reporter")
    private List<Report> reportsUserMade;
    
    // relationship with bank acc
    @OneToOne(optional = false)
    private BankAccount bankAcc;

    // relationship with rating x 2
    @OneToMany(mappedBy = "rated")
    private List<Rating> ratingsForUsers;
    @OneToMany(mappedBy = "rater")
    private List<Rating> ratingsUserMade;
    
    // relationship with credit card
    @OneToOne
    private CreditCard cc;
    
   
    
    public User() {
        this.reportsAgainstUser = new ArrayList<>();
        this.reportsUserMade = new ArrayList<>();
        this.ratingsUserMade = new ArrayList<>();
        this.ratingsForUsers = new ArrayList<>();
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
}
