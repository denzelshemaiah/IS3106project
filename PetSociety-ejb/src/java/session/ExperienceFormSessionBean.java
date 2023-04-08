/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.ExperienceForm;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author rachelrphy
 */
@Stateless
public class ExperienceFormSessionBean implements ExperienceFormSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public ExperienceForm createNewExperienceForm(ExperienceForm expForm) {
        em.persist(expForm);
        em.flush();
        return expForm;
    }
    
    @Override
    public ExperienceForm getExperienceForm() {
        Query q = em.createQuery("SELECT e FROM ExperienceForm e");
        return (ExperienceForm) q.getResultList().get(0);
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
