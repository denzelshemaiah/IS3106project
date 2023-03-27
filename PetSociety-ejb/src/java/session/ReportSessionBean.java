/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Report;
import entity.Staff;
import entity.User;
import enumeration.UserStatusEnum;
import java.util.ArrayList;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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

    @Override
    public List<Report> getAllUnassignedReports() {
        Query q = em.createQuery("SELECT r FROM Report r WHERE r.staff IS NULL");
        return q.getResultList();
    }

    @Override
    public void assignReportToStaff(Long staffId, Long reportId) throws EntityNotFoundException {
        Staff staff = em.find(Staff.class, staffId);
        if (staff == null) {
            throw new EntityNotFoundException("No Staff found with this staffId");
        }
        Report report = em.find(Report.class, reportId);
        if (report == null) {
            throw new EntityNotFoundException("No Report found with this reportId");
        }
        report.setStaff(staff);
        staff.getReports().add(report);
    }

    @Override
    public List<Report> retrieveUnresolvedReportsByStaff(Long staffId) throws EntityNotFoundException {
        Staff staff = em.find(Staff.class, staffId);
        if (staff == null) {
            throw new EntityNotFoundException("No Staff found with this staffId");
        }
        List<Report> res = new ArrayList<>();
        List<Report> allStaffReports = staff.getReports();
        for (Report r:allStaffReports) {
            if (!r.isSettled()) {
                res.add(r);
            }
        }
        return res;
    }

    @Override
    public Report getReport(Long reportId) {
        return em.find(Report.class, reportId);
    }

    @Override
    public void rejectReport(Long reportId) throws EntityNotFoundException {
        Report report = em.find(Report.class, reportId);
        if (report == null) {
            throw new EntityNotFoundException("No report found with this reportId");
        }
        report.setSettled(true);
        report.setValid(false);
    }

    @Override
    public void approveReport(Long reportId) throws EntityNotFoundException {
        Report report = em.find(Report.class, reportId);
        if (report == null) {
            throw new EntityNotFoundException("No report found with this reportId");
        }
        User reported = em.find(User.class, report.getReported().getUserId());
        reported.setStatus(UserStatusEnum.DISABLED);
        report.setSettled(true);
        report.setValid(true);
    }
}
