/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Report;
import entity.User;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author rachelang
 */
@Stateless
public class ReportSessionBean implements ReportSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")

    @Override
    public Long createReport(Report report) {
        User reporter = report.getReporter();
        User reported = report.getReported();
        reporter.getReportsUserMade().add(report);
        reported.getReportsAgainstUser().add(report);
        em.persist(report);
        return report.getReportId();
    }

    @Override
    public void markReportAsResolved(Long reportId) {
        Report report = em.find(Report.class, reportId);
        report.setSettled(true);
    }
}
