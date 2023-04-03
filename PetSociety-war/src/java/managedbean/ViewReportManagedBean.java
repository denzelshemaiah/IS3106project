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
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.persistence.EntityNotFoundException;
import session.ReportSessionBeanLocal;

/**
 *
 * @author rachelang
 */
@Named(value = "viewReportManagedBean")
@SessionScoped
public class ViewReportManagedBean implements Serializable {

    @EJB(name = "ReportSessionBeanLocal")
    private ReportSessionBeanLocal reportSessionBeanLocal;
    private String reportsAgainstReported;
    private String reportedType;
    private String reportedRatings;
    private String reportsByReporter;
    private String reporterType;
    private String reporterRatings;
    private Report report;
    private Long reportId;
    /**
     * Creates a new instance of ViewReportManagedBean
     */
    public ViewReportManagedBean() {
    }

    public void displayReportDetails() {
        report = reportSessionBeanLocal.getReport(reportId); //for most updated ver
        if (report == null) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error: ",  "Report not found!"));
        }
        User reported = report.getReported();
        if (reported instanceof PetParent) {
            reportedType = "PetParent";
        } else {
            reportedType = "PetSitter";
        }
        List<Report> rAgainstReported = reported.getReportsAgainstUser();
        for (Report r:rAgainstReported) {
            String curr = "{";
            curr += r.getReportDescription();
            curr += "}\n";
            reportsAgainstReported += curr;
        }
        List<Rating> reportedRatingsList = reported.getRatingsForUsers();
        for (Rating r:reportedRatingsList) {
            String curr = "{";
            curr += r.getStars();
            curr += "/5\n";
            curr += r.getComment();
            curr += "}\n";
            reportedRatings += curr;
        }
        User reporter = report.getReporter();
        if (reporter instanceof PetSitter) {
            reporterType = "PetSitter";
        } else {
            reporterType = "PetParent";
        }
        List<Report> rReporterMade = reporter.getReportsUserMade();
        for (Report r:rReporterMade) {
            String curr = "{";
            curr += r.getReportDescription();
            curr += "}\n";
            reportsByReporter += curr;
        }
        List<Rating> reporterRatingsList = reporter.getRatingsForUsers();
        for (Rating r:reporterRatingsList) {
            String curr = "{";
            curr += r.getStars();
            curr += "/5\n";
            curr += r.getComment();
            curr += "}\n";
            reporterRatings += curr;
        }
    }
    
    public String approveReport() {
        try {
            reportSessionBeanLocal.approveReport(reportId);
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "INFO: ",  "Report approved"));
        } catch (EntityNotFoundException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error: ",  "Report not found!"));
            try {
                TimeUnit.SECONDS.sleep(4);
            } catch (InterruptedException ex1) {
                Logger.getLogger(ViewReportManagedBean.class.getName()).log(Level.SEVERE, null, ex1);
                return "generalReports.xhtml?faces-redirect=true";
            }
            return "generalReports.xhtml?faces-redirect=true";
        }
        return "generalReports.xhtml?faces-redirect=true";
    }
    
    public String rejectReport() {
        try {
            reportSessionBeanLocal.rejectReport(reportId);
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "INFO: ",  "Report rejected"));
        } catch (EntityNotFoundException ex) {
            FacesContext context = FacesContext.getCurrentInstance();
            context.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error: ",  "Report not found!"));
            try {
                TimeUnit.SECONDS.sleep(4);
            } catch (InterruptedException ex1) {
                Logger.getLogger(ViewReportManagedBean.class.getName()).log(Level.SEVERE, null, ex1);
                return "generalReports.xhtml?faces-redirect=true";
            }
            return "generalReports.xhtml?faces-redirect=true";
        }
        return "generalReports.xhtml?faces-redirect=true";
    }
    
    public String getReportsAgainstReported() {
        return reportsAgainstReported;
    }

    public void setReportsAgainstReported(String reportsAgainstReported) {
        this.reportsAgainstReported = reportsAgainstReported;
    }

    public String getReportsByReporter() {
        return reportsByReporter;
    }

    public void setReportsByReporter(String reportsByReporter) {
        this.reportsByReporter = reportsByReporter;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    public String getReportedType() {
        return reportedType;
    }

    public void setReportedType(String reportedType) {
        this.reportedType = reportedType;
    }

    public String getReporterType() {
        return reporterType;
    }

    public void setReporterType(String reporterType) {
        this.reporterType = reporterType;
    }

    public String getReportedRatings() {
        return reportedRatings;
    }

    public void setReportedRatings(String reportedRatings) {
        this.reportedRatings = reportedRatings;
    }

    public String getReporterRatings() {
        return reporterRatings;
    }

    public void setReporterRatings(String reporterRatings) {
        this.reporterRatings = reporterRatings;
    }
}
