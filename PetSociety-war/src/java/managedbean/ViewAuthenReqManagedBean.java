/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.AuthenticationRequest;
import helper.GetProperties;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.swing.JFileChooser;
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
    private String filepath;
    private GetProperties getProperties;
    //private File documents;

    /**
     * Creates a new instance of ViewAuthenReqManagedBean
     */
    public ViewAuthenReqManagedBean() {
    }

    public void findAuthenReq() {
        try {
            getProperties = new GetProperties();
        } catch (FileNotFoundException ex) {
            ex.printStackTrace(System.out);
        }
        this.authenReq = authenticationReqSessionBeanLocal.findAuthenReqById(authenReq.getAuthenticationId());
        this.authenId = authenReq.getAuthenticationId();
        System.out.println("AuthenReq found.");
        //filepath = System.getProperty("user.home") + "/Desktop/authenReqId" + authenReq.getAuthenticationId().toString() + ".pdf";
        String pdfName = "authenReqId" + authenReq.getAuthenticationId().toString() + ".pdf";
        filepath = getProperties.getImgPath() + "/" + pdfName;
        System.out.println("filepath set: " + filepath);
        byte[] docBytes = authenReq.getDocument();
        File file = new File(filepath);
        try {
            OutputStream os = new FileOutputStream(filepath);
            System.out.println("FileOutputStream created");
            os.write(docBytes);
            System.out.println("Document generated");
            System.out.println(file.getAbsolutePath());
            os.close();
        } catch (IOException e) {
            e.printStackTrace(System.out);
        }
        //this.documents = file;
    }

    public String approve() {
        //approve
        authenticationReqSessionBeanLocal.acceptAuthenReq(authenId, staffId);
        authenId = -1L;
        authenReq = null;
        //documents = null;
        return "authenReq.xhtml?faces-redirect=true";
    }

    public String reject() {
        //reject 
        authenticationReqSessionBeanLocal.markAuthenReqAsResolved(authenId, staffId);
        authenId = -1L;
        authenReq = null;
        //documents = null;
        return "authenReq.xhtml?faces-redirect=true";
    }

    public String back() {
        //authenId = -1L;
        //authenReq = null;
        //documents = null;
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
        findAuthenReq();
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

//    public File getDocuments() {
//        return documents;
//    }
//
//    public void setDocuments(File documents) {
//        this.documents = documents;
//    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }
}
