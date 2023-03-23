/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.UserStatusEnum;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

/**
 *
 * @author Andrea
 */
@Entity
public class User implements Serializable {

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
    @Size(max = 50)
    private String email;
    @Column(nullable = false)
    @Size(min = 6, max = 20)
    private String password;
    @Column(nullable = false)
    private int age;
    @Column(length = 8, nullable = false)
    @Size(min = 8)
    private String emergencyContact;
    @Column(nullable = false)
    private String profilePicture;
    @Column(nullable = false)
    private String billingAddress;
    @Column(nullable = false)
    private UserStatusEnum status;

    // relationship with report x 2
    @OneToMany(mappedBy = "reported")
    private List<Report> reportsAgainstUser;
    @OneToMany(mappedBy = "reporter")
    private List<Report> reportsUserMade;
    
    // relationsgip with bank acc
    @OneToOne(optional = false)
    private BankAccount bankAcc;

    // relationship with rating x 2
    @OneToMany(mappedBy = "rated")
    private List<Rating> ratingsForUsers;
    @OneToMany(mappedBy = "rater")
    private List<Rating> ratingsUserMade;
    
    // relationship with credit card
    @OneToOne
    private List<CreditCard> ccList;
    
    // child r/s with Parent
    
    
    // child r/s with Sitter
    
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

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
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
}
