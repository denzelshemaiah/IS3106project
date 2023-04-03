/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.Staff;
import error.EntityAlreadyExistsException;
import javax.inject.Named;
import javax.faces.view.ViewScoped;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import session.StaffSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "staffManagedBean")
@ViewScoped
public class StaffManagedBean implements Serializable {

    @EJB(name = "StaffSessionBeanLocal")
    private StaffSessionBeanLocal staffSessionBeanLocal;
    private String firstName;
    private String lastName;
    private String username;
    private String password;

    /**
     * Creates a new instance of StaffManagedBean
     */
    public StaffManagedBean() {
    }
    
    public String createNewStaff() {
        Staff newStaff = new Staff();
        newStaff.setFirstName(firstName.trim());
        newStaff.setLastName(lastName.trim());
        newStaff.setUsername(username.trim());
        newStaff.setPassword(password.trim());
        try {
            staffSessionBeanLocal.createStaff(newStaff);
        } catch (EntityAlreadyExistsException ex) {
            firstName = "";
            lastName = "";
            username = "";
            password = "";
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error: ",  "Username already taken!"));
            return null;
        }
        return "createStaffSuccess.xhtml?faces-redirect=true";
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }  
}
