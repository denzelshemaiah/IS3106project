/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.Staff;
import error.InvalidLoginCredentialsException;
import java.io.IOException;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpSession;
import session.StaffSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "authenticationManagedBean")
@SessionScoped
public class AuthenticationManagedBean implements Serializable {

    @EJB(name = "StaffSessionBeanLocal")
    private StaffSessionBeanLocal staffSessionBeanLocal;
    
    private String username = null;
    private String password = null;
    private Long staffId = -1L;
    private Staff staff;

    /**
     * Creates a new instance of AuthenticationManagedBean
     */
    public AuthenticationManagedBean() {
    }
    
    public String login() {
        try {
            System.out.println("Logging in with: " + username + ", " + password);
            this.staff = staffSessionBeanLocal.staffLogin(username.trim(), password.trim());
            staffId = staff.getStaffId();
            return "/secret/staffHomepage.xhtml?faces-redirect=true";
        } catch (InvalidLoginCredentialsException ex) {
            //login failed
            username = null;
            password = null;
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error:", "Invalid Login Details!"));
            return "staffLogin.xhtml";
        }
    } //end login
        
    public String logout() {
        
        return "../staffLogin.xhtml?faces-redirect=true";
    } //end logout
    
    public void sessionTimedOut() {
//        FacesContext context = FacesContext.getCurrentInstance();
//        context.addMessage(null, new FacesMessage("Warning: ", "Session timed out! Please login again!"));
//        try {
//            TimeUnit.SECONDS.sleep(4);
//        } catch (InterruptedException ex) {
//            Logger.getLogger(AuthenticationManagedBean.class.getName()).log(Level.SEVERE, null, ex);
//        }
//        return "/staffLogin.xhtml?faces-redirect=true";
        if (staff == null) {
            try {
                FacesContext.getCurrentInstance().getExternalContext().redirect("sessionExpired.xhtml");
            } catch (IOException ex) {
                Logger.getLogger(AuthenticationManagedBean.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }
}
