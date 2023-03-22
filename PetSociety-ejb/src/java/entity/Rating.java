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
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.Size;

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
    @Column(nullable = false)
    @Size(max = 5)
    private Integer stars;
    @Column(nullable = false)
    @Size(max = 100)
    private String comment;
    
    //relationship with BookingRequest
    @OneToOne(optional = false)
    private BookingRequest req;
    //relationship with users x 2
    @ManyToOne
    private User rated;
    @ManyToOne 
    private User rater;
    
    public Rating() {
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
