/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

/**
 *
 * @author rachelang
 */
@Named(value = "redirectManagedBean")
@SessionScoped
public class RedirectManagedBean implements Serializable {

    /**
     * Creates a new instance of RedirectManagedBean
     */
    public RedirectManagedBean() {
    }
    
    public String homepage() {
        return "staffHomepage.xhtml?faces-redirect=true";
    }
    
    public String viewAuthenReq() {
        return "viewAuthenReq.xhtml?faces-redirect=true";
    }
    
    public String authenReqs() {
        return "authenReq.xhtml?faces-redirect=true";
    }
    
    public String reports() {
        return "generalReports.xhtml?faces-redirect=true";
    }
    
    public String staff() {
        return "createStaff.xhtml?faces-redirect=true";
    }
    
    public String viewReport() {
        return "viewReport.xhtml?faces-redirect=true";
    }
    
    public String users() {
        return "searchUsers.xhtml?faces-redirect=true";
    }
    
    public String login() {
        return "staffLogin.xhtml?faces-redirect=true";
    }
    
    public String viewUser() {
        return "viewUser.xhtml?faces-redirect=true";
    }
}
