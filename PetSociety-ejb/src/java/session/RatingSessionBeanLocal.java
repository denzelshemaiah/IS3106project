/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Rating;
import javax.ejb.Local;

/**
 *
 * @author rachelrphy
 */
@Local
public interface RatingSessionBeanLocal {

    public Long createNewRating(Rating rating, Long raterId, Long ratedId);
    
}
