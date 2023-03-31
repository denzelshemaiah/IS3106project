/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.User;
import javax.inject.Named;
import javax.faces.view.ViewScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import session.UserSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "searchUserManagedBean")
@ViewScoped
public class SearchUserManagedBean implements Serializable {

    @EJB(name = "UserSessionBeanLocal")
    private UserSessionBeanLocal userSessionBeanLocal;
    private String searchVal = null;
    private String param = null;
    private List<User> searchRes;
    private int numRes;
    private User selectedUser;

    /**
     * Creates a new instance of SearchUserManagedBean
     */
    public SearchUserManagedBean() {
    }
    
    public void searchUsers() {
        param = param.trim();
        searchVal = searchVal.trim();
        if (param.equals("username")) {
            searchRes = userSessionBeanLocal.searchUsersByUsername(searchVal);
        } else if (param.equals("email")) {
            searchRes = userSessionBeanLocal.searchUsersByEmail(searchVal);
        } else if (param.equals("id")) {
            Long userId = -1L;
            try {
                userId = Long.parseLong(searchVal);
            } catch (NumberFormatException ex) {
                FacesContext context = FacesContext.getCurrentInstance();
                context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Note: ",  "You have to pass a number to search by User ID"));
                return;
            }
            User user = userSessionBeanLocal.getUser(userId);
            searchRes = new ArrayList<>();
            searchRes.add(user);
        } else if (param.equals("contactNum")) {
            searchRes = userSessionBeanLocal.searchUsersByContactNum(searchVal);
        } else {
            searchRes = userSessionBeanLocal.retrieveAllUsers();
        }
        numRes = searchRes.size();
        if (numRes == 0) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Note: ",  "There are no users found!"));
        }
    }
    
    public int getIcon() {
        Random ran = new Random();
        return ran.nextInt(10 - 1 + 1) + 1;
    }

    public String getSearchVal() {
        return searchVal;
    }

    public void setSearchVal(String searchVal) {
        this.searchVal = searchVal;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

    public List<User> getSearchRes() {
        return searchRes;
    }

    public void setSearchRes(List<User> searchRes) {
        this.searchRes = searchRes;
    }

    public int getNumRes() {
        return numRes;
    }

    public void setNumRes(int numRes) {
        this.numRes = numRes;
    }

    public User getSelectedUser() {
        return selectedUser;
    }

    public void setSelectedUser(User selectedUser) {
        this.selectedUser = selectedUser;
    }
}
