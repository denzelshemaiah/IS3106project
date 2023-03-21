/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 *
 * @author rachelrphy
 */
@Entity
public class Rating implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;
    
    //relationship with BookingRequest
    @OneToOne(optional = false)
    private BookingRequest req;

    
    @Column
    private User rater;
    @Column
    private User rated;
    @Column(nullable = false)
    private Integer stars;
    @Column(nullable = false)
    private String comment;
    
    public Rating() {
    }

    public Rating(User rater, User rated, Integer stars, String comment) {
        this.rater = rater;
        this.rated = rated;
        this.stars = stars;
        this.comment = comment;
    }

    
    public Long getRatingId() {
        return ratingId;
    }

    public void setRatingId(Long ratingId) {
        this.ratingId = ratingId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ratingId != null ? ratingId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the ratingId fields are not set
        if (!(object instanceof Rating)) {
            return false;
        }
        Rating other = (Rating) object;
        if ((this.ratingId == null && other.ratingId != null) || (this.ratingId != null && !this.ratingId.equals(other.ratingId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Rating[ id=" + ratingId + " ]";
    }

    /**
     * @return the req
     */
    public BookingRequest getReq() {
        return req;
    }

    /**
     * @param req the req to set
     */
    public void setReq(BookingRequest req) {
        this.req = req;
    }

    /**
     * @return the rater
     */
    public User getRater() {
        return rater;
    }

    /**
     * @param rater the rater to set
     */
    public void setRater(User rater) {
        this.rater = rater;
    }

    /**
     * @return the rated
     */
    public User getRated() {
        return rated;
    }

    /**
     * @param rated the rated to set
     */
    public void setRated(User rated) {
        this.rated = rated;
    }

    /**
     * @return the stars
     */
    public Integer getStars() {
        return stars;
    }

    /**
     * @param stars the stars to set
     */
    public void setStars(Integer stars) {
        this.stars = stars;
    }

    /**
     * @return the comment
     */
    public String getComment() {
        return comment;
    }

    /**
     * @param comment the comment to set
     */
    public void setComment(String comment) {
        this.comment = comment;
    }
    
}
