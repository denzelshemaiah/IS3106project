/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.AuthenticationRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import javax.ejb.EJB;
import javax.faces.annotation.ManagedProperty;
import session.AuthenticationReqSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "viewAuthenReqManagedBean")
@SessionScoped
public class ViewAuthenReqManagedBean implements Serializable {

    @EJB(name = "AuthenticationReqSessionBeanLocal")
    private AuthenticationReqSessionBeanLocal authenticationReqSessionBeanLocal;
    private Long authenId;
    private AuthenticationRequest authenReq;
    private Long staffId;
    private File documents;

    /**
     * Creates a new instance of ViewAuthenReqManagedBean
     */
    public ViewAuthenReqManagedBean() {
    }

    public void findAuthenReq() {
        this.authenReq = authenticationReqSessionBeanLocal.findAuthenReqById(authenId);
        byte[] docBytes = authenReq.getDocument();
        String filepath = "";
        File file = new File(filepath);
        try {
            OutputStream os = new FileOutputStream(file);
            os.write(docBytes);
            System.out.println("Document generated");
            os.close();
        } catch (IOException e) {
            PrintWriter s = new PrintWriter(System.out);
            e.printStackTrace(s);
        }
        this.documents = file;
    }

    public String approve() {
        //approve
        authenticationReqSessionBeanLocal.acceptAuthenReq(authenId, staffId);
        authenId = -1L;
        authenReq = null;
        return "authenReq.xhtml?faces-redirect=true";
    }

    public String reject() {
        //reject 
        authenticationReqSessionBeanLocal.markAuthenReqAsResolved(authenId, staffId);
        authenId = -1L;
        authenReq = null;
        return "authenReq.xhtml?faces-redirect=true";
    }

    public Long getAuthenId() {
        return authenId;
    }

    public void setAuthenId(Long authenId) {
        this.authenId = authenId;
    }

    public AuthenticationRequest getAuthenReq() {
        return authenReq;
    }

    public void setAuthenReq(AuthenticationRequest authenReq) {
        this.authenReq = authenReq;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public File getDocuments() {
        return documents;
    }

    public void setDocuments(File documents) {
        this.documents = documents;
    }
}
