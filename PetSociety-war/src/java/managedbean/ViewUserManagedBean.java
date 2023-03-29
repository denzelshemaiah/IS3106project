/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.PetParent;
import entity.User;
import enumeration.UserStatusEnum;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.persistence.EntityNotFoundException;
import session.UserSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "viewUserManagedBean")
@SessionScoped
public class ViewUserManagedBean implements Serializable {

    @EJB(name = "UserSessionBeanLocal")
    private UserSessionBeanLocal userSessionBeanLocal;
    private User user;
    private String disabledDuration;

    /**
     * Creates a new instance of ViewUserManagedBean
     */
    public ViewUserManagedBean() {
    }

    public String disableUser() {
        try {
            int disableDuration = Integer.parseInt(disabledDuration.trim());
            if (disableDuration <= 0) {
                FacesContext context = FacesContext.getCurrentInstance();
                context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Note: ", "You have to pass a number more than 0 for disable duration"));
                return "";
            }
            userSessionBeanLocal.disableUser(user.getUserId(), disableDuration);
        } catch (NumberFormatException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Note: ", "You have to pass a number more than 0 for disable duration"));
            return "";
        } catch (EntityNotFoundException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error! ", "User cannot be retrieved from database."));
            return "viewUser.xhtml?faces-redirect=true";
        }
        return "viewUser.xhtml?faces-redirect=true";
    }

    public String enableUser() {
        try {
            userSessionBeanLocal.enableUser(user.getUserId());
        } catch (EntityNotFoundException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error! ", "User cannot be retrieved from database."));
        }
        return "viewUser.xhtml?faces-redirect=true"; //refresh page
    }

    public boolean canDisable() {
        if (user == null) {
            return true;
        } // tesing only,, remove 
        // returns opposite booleans to set disabled for disable button
        UserStatusEnum status = user.getStatus();
        if (status == UserStatusEnum.APPROVED) {
            return false;
        } else {
            return true; // cannot disable a pending account
        }
    }

    public boolean canEnable() {
        if (user == null) {
            return true;
        } // testing only,, remove
        // returns opposite booleans to set disabled for enable button
        UserStatusEnum status = user.getStatus();
        if (status == UserStatusEnum.DISABLED) {
            return false;
        } else {
            return true; // cannot enable a pending account
        }
    }

    public String getUserStatus() {
        if (user == null) {
            return "";
        } // testing only,, remove
        UserStatusEnum status = user.getStatus();
        if (status == UserStatusEnum.DISABLED) {
            return "Disabled";
        } else if (status == UserStatusEnum.APPROVED) {
            return "Approved";
        } else if (status == UserStatusEnum.PENDING) {
            return "Pending";
        } else {
            return "Not Set";
        }
    }

    public String getUserType() {
        if (user == null) {
            return "null";
        } // testing only,, remove
        if (user instanceof PetParent) {
            return "PetParent";
        } else {
            return "PetSitter";
        }
    }

    public String back() {
        this.user = null;
        this.disabledDuration = null;
        return "searchUsers.xhtml?faces-redirect=true";
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getDisabledDuration() {
        return disabledDuration;
    }

    public void setDisabledDuration(String disabledDuration) {
        this.disabledDuration = disabledDuration;
    }
}
