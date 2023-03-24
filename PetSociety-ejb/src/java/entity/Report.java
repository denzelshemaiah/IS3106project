/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;

/**
 *
 * @author rachelang
 */
@Entity
public class Report implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    @Column(nullable = false)
    @Size(min = 50, max = 1000)
    private String reportDescription;
    @Column(nullable = false)
    private boolean settled = false; // sets default to false
    @Column(nullable = true)
    private boolean valid;
    
    @ManyToOne(optional = false)
    private User reporter;
    @ManyToOne(optional = false)
    private User reported;
    @ManyToOne(optional = true)
    private Staff staff;

    public Report() {
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }

    public User getReporter() {
        return reporter;
    }

    public void setReporter(User reporter) {
        this.reporter = reporter;
    }

    public User getReported() {
        return reported;
    }

    public void setReported(User reported) {
        this.reported = reported;
    }

    public Long getReportId() {
        return reportId;
    }

    public void setReportId(Long reportId) {
        this.reportId = reportId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (reportId != null ? reportId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the reportId fields are not set
        if (!(object instanceof Report)) {
            return false;
        }
        Report other = (Report) object;
        if ((this.reportId == null && other.reportId != null) || (this.reportId != null && !this.reportId.equals(other.reportId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Report[ id=" + reportId + " ]";
    }

    public String getReportDescription() {
        return reportDescription;
    }

    public void setReportDescription(String reportDescription) {
        this.reportDescription = reportDescription;
    }

    public boolean isSettled() {
        return settled;
    }

    public void setSettled(boolean settled) {
        this.settled = settled;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }
}
