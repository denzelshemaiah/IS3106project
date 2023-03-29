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
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.persistence.EntityNotFoundException;
import session.ReportSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "allReportsManagedBean")
@ViewScoped
public class AllReportsManagedBean implements Serializable {

    @EJB(name = "ReportSessionBeanLocal")
    private ReportSessionBeanLocal reportSessionBeanLocal;
    private List<Report> unassignedReports;
    private Long staffId = null;
    private Long selectedReportId;
    private int numRes;

    /**
     * Creates a new instance of AllReportsManagedBean
     */
    public AllReportsManagedBean() {
    }
    
    @PostConstruct
    public void getAllUnassignedReports() {
        unassignedReports = reportSessionBeanLocal.getAllUnassignedReports();
        numRes = unassignedReports.size();
    }
    
    public String assignReportToStaff() {
        try {
            reportSessionBeanLocal.assignReportToStaff(staffId, selectedReportId);
        } catch (EntityNotFoundException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error: ",  "Unable to assign report to staff!"));
        }
        return "allReports.xhtml?faces-redirect=true"; //reloads the reports page,, the unassigned reports will be refreshed?
    }

    public List<Report> getUnassignedReports() {
        return unassignedReports;
    }

    public void setUnassignedReports(List<Report> unassignedReports) {
        this.unassignedReports = unassignedReports;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
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
