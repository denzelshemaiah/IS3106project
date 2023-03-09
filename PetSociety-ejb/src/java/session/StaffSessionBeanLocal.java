/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import error.EntityAlreadyExistsException;
import javax.ejb.Local;

/**
 *
 * @author rachelang
 */
@Local
public interface StaffSessionBeanLocal {

    Long createStaff(Long staff) throws EntityAlreadyExistsException;
    
}
