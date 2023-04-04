/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Report;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.EntityNotFoundException;

/**
 *
 * @author rachelang
 */
@Local
public interface ReportSessionBeanLocal {

    Long createReport(Report report, Long reportedId, Long reporterId);

    void markReportAsResolved(Long reportId);

    List<Report> getAllUnassignedReports();

    void assignReportToStaff(Long staffId, Long reportId) throws EntityNotFoundException;

    List<Report> retrieveUnresolvedReportsByStaff(Long staffId) throws EntityNotFoundException;

    Report getReport(Long reportId);

    void rejectReport(Long reportId) throws EntityNotFoundException;

    void approveReport(Long reportId) throws EntityNotFoundException;
    
}
