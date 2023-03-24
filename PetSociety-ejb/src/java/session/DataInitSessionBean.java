/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Staff;
import error.EntityAlreadyExistsException;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;

/**
 *
 * @author rachelang
 */
@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {

    @EJB(name = "StaffSessionBeanLocal")
    private StaffSessionBeanLocal staffSessionBeanLocal;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    @PostConstruct
    public void postConstruct() {
        List<Staff> staffs = staffSessionBeanLocal.retrieveAllStaff();
        if (staffs.isEmpty()) {
            dataInit();
        }
    }
    
    private void dataInit() {
        try {
            Staff staff1 = new Staff();
            staff1.setUsername("staff1");
            staff1.setPassword("password");
            staffSessionBeanLocal.createStaff(staff1);
        } catch (EntityAlreadyExistsException ex) {
            ex.printStackTrace();
        }
    }
}
