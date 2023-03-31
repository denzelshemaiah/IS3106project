/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.User;
import enumeration.UserStatusEnum;
import java.util.List;
import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Schedule;
import javax.ejb.Startup;
import javax.ejb.TimerService;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author rachelang
 */
@Singleton
@LocalBean
@Startup
public class TimerSessionBean {

    @EJB
    private UserSessionBeanLocal userSessionBean;
    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;
    
    @Resource
    TimerService timerService;

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    /**
     * Every 12am is considered as a new day (1 day has passed)
     */
    @Schedule(hour = "00")
    public void enableUsers() {
        List<User> users = userSessionBean.retrieveAllDisabledUsers();
        for (User u:users) {
            int daysDisabled = u.getDaysDisabled();
            daysDisabled--;
            u.setDaysDisabled(daysDisabled);
            if (daysDisabled == 0) {
                u.setStatus(UserStatusEnum.APPROVED);
            }
        }
    }
}
