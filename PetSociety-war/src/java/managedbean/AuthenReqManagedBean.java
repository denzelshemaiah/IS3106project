/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.AuthenticationRequest;
import javax.inject.Named;
import javax.faces.view.ViewScoped;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.servlet.http.HttpSession;
import session.AuthenticationReqSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "authenReqManagedBean")
@ViewScoped
public class AuthenReqManagedBean implements Serializable {

    @EJB(name = "AuthenticationReqSessionBeanLocal")
    private AuthenticationReqSessionBeanLocal authenticationReqSessionBeanLocal;
    private List<AuthenticationRequest> unresolvedAReq;
    private AuthenticationRequest selectedAreq;
    private int numRes = 0;

    /**
     * Creates a new instance of AuthenReqManagedBean
     */
    public AuthenReqManagedBean() {
    }

    @PostConstruct
    public void getAllUnresolvedAReq() {
        unresolvedAReq = authenticationReqSessionBeanLocal.getAllUnresolvedAuthenReq();
        numRes = unresolvedAReq.size();
        System.out.println("all unresolved areqs loaded " + numRes);
    }

    public List<AuthenticationRequest> getUnresolvedAReq() {
        return unresolvedAReq;
    }

    public void setUnresolvedAReq(List<AuthenticationRequest> unresolvedAReq) {
        this.unresolvedAReq = unresolvedAReq;
    }

    public AuthenticationRequest getSelectedAreq() {
        return selectedAreq;
    }

    public void setSelectedAreq(AuthenticationRequest selectedAreq) {
        this.selectedAreq = selectedAreq;
    }

    public int getNumRes() {
        return numRes;
    }

    public void setNumRes(int numRes) {
        this.numRes = numRes;
    }
}
