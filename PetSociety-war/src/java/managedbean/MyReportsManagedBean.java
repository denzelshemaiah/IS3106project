/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package managedbean;

import entity.Report;
import javax.inject.Named;
import javax.faces.view.ViewScoped;
import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.annotation.ManagedProperty;
import session.ReportSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "myReportsManagedBean")
@ViewScoped
public class MyReportsManagedBean implements Serializable {
    @EJB(name = "ReportSessionBeanLocal")
    private ReportSessionBeanLocal reportSessionBeanLocal;
    private List<Report> myReports;
    private Long staffId;
    private Long selectedReportId;
    private int numRes;
    /**
     * Creates a new instance of MyReportsManagedBean
     */
    public MyReportsManagedBean() {
    }
    
    public void retrieveMyReports() {
        myReports = reportSessionBeanLocal.retrieveUnresolvedReportsByStaff(staffId);
        numRes = myReports.size();
        System.out.println("My Reports populated.");
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public List<Report> getMyReports() {
        return myReports;
    }

    public void setMyReports(List<Report> myReports) {
        this.myReports = myReports;
    }

    public Long getSelectedReportId() {
        return selectedReportId;
    }

    public void setSelectedReportId(Long selectedReportId) {
        this.selectedReportId = selectedReportId;
    }

    public int getNumRes() {
        return numRes;
    }

    public void setNumRes(int numRes) {
        this.numRes = numRes;
    }
    
    
}
