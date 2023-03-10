/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Report;
import entity.Staff;
import error.EntityAlreadyExistsException;
import error.InvalidLoginCredentialsException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author rachelang
 */
@Local
public interface StaffSessionBeanLocal {

    Long createStaff(Staff staff) throws EntityAlreadyExistsException;

    List<Staff> retrieveAllStaff();

    Staff staffLogin(String username, String password) throws InvalidLoginCredentialsException;
    
}
