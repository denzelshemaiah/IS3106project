/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Rating;
import entity.User;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author rachelrphy
 */
@Stateless
public class RatingSessionBean implements RatingSessionBeanLocal {

    @PersistenceContext(unitName = "PetSociety-ejbPU")
    private EntityManager em;

    @Override
    public Long createNewRating(Rating rating, Long raterId, Long ratedId) {
        User rater = em.find(User.class, raterId);
        User rated = em.find(User.class, ratedId);
        rater.getRatingsUserMade().add(rating);
        rated.getRatingsForUsers().add(rating);
        em.persist(rating);
        em.flush();
        return rating.getRatingId();
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
    
    
}
