/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.PetParent;
import entity.PetSitter;
import entity.Rating;
import entity.Report;
import entity.User;
import enumeration.UserStatusEnum;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.List;
import javax.ejb.EJB;
import javax.faces.annotation.ManagedProperty;
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
    private String userIdStr;
    //@ManagedProperty("#{param.objUser}")
    private User user;
    private String disabledDuration;
    private String userStatus;
    private boolean canEnable;
    private boolean canDisable;
    private String userType;

    /**
     * Creates a new instance of ViewUserManagedBean
     */
    public ViewUserManagedBean() {
    }
    
    public String generateUserDetails() {
        //Long userId = Long.parseLong(userIdStr);
        //user = userSessionBeanLocal.getUser(userId);
        user = userSessionBeanLocal.getUser(user.getUserId());
        System.out.println("viewing user: " + user);
        UserStatusEnum status = user.getStatus();
        if (status == UserStatusEnum.DISABLED) {
            this.userStatus = "Disabled";
        } else if (status == UserStatusEnum.APPROVED) {
            this.userStatus = "Approved";
        } else if (status == UserStatusEnum.PENDING) {
            this.userStatus = "Pending";
        } else {
            this.userStatus = "not set";
        }
        // returns opposite booleans to set disabled for disable button
        if (status == UserStatusEnum.APPROVED) {
            this.canDisable = false;
        } else {
            this.canDisable = true; // cannot disable a pending account
        }
        // returns opposite booleans to set disabled for enable button
        if (status == UserStatusEnum.DISABLED) {
            this.canEnable = false;
        } else {
            this.canEnable = true; // cannot enable a pending account
        }
        
        if (user instanceof PetParent) {
            this.userType = "PetParent";
        } else if (user instanceof PetSitter) {
            this.userType = "PetSitter";
        }
        
        return "viewUser.xhtml?faces-redirect=true";
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
            generateUserDetails();
            return "disabledUnsuccessful.xhtml?faces-redirect=true";
        }
        generateUserDetails();
        return "disabledSuccessful.xhtml?faces-redirect=true";
    }

    public String enableUser() {
        try {
            userSessionBeanLocal.enableUser(user.getUserId());
        } catch (EntityNotFoundException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error! ", "User cannot be retrieved from database."));
        }
        generateUserDetails();
        return "enableSuccessful.xhtml?faces-redirect=true"; //refresh page
    }

    public String retrieveUserStatus() {
        System.out.println(user);
        System.out.println(user.getStatus());
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

    public String back() {
        //this.user = null;
        //this.disabledDuration = null;
        return "searchUsers.xhtml?faces-redirect=true";
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
        System.out.println("User is set: " + this.user);
        generateUserDetails();
    }

    public String getDisabledDuration() {
        return disabledDuration;
    }

    public void setDisabledDuration(String disabledDuration) {
        this.disabledDuration = disabledDuration;
    }

    public String getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(String userStatus) {
        this.userStatus = userStatus;
    }

    public boolean isCanEnable() {
        return canEnable;
    }

    public void setCanEnable(boolean canEnable) {
        this.canEnable = canEnable;
    }

    public boolean isCanDisable() {
        return canDisable;
    }

    public void setCanDisable(boolean canDisable) {
        this.canDisable = canDisable;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUserIdStr() {
        return userIdStr;
    }

    public void setUserIdStr(String userIdStr) {
        this.userIdStr = userIdStr;
    }
}
