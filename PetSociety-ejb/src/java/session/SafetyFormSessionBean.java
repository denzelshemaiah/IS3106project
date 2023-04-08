/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.SafetyForm;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author rachelrphy
 */
@Stateless
public class SafetyFormSessionBean implements SafetyFormSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public SafetyForm createNewSafetyForm(SafetyForm safetyForm) {
        em.persist(safetyForm);
        em.flush();
        return safetyForm;
    }

    @Override
    public SafetyForm getSafetyForm() {
        Query q = em.createQuery("SELECT s FROM SafetyForm s");
        return (SafetyForm) q.getResultList().get(0);
    }

   
}
