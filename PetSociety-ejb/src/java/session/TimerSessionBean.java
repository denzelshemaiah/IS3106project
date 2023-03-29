/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
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

}
