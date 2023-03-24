/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Report;
import javax.ejb.Local;

/**
 *
 * @author rachelang
 */
@Local
public interface ReportSessionBeanLocal {

    Long createReport(Report report);

    void markReportAsResolved(Long reportId);
    
}
