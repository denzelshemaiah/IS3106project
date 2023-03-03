/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import enumeration.RequestStatusEnum;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author cally
 */
@Entity
public class MeetAndGreetRequest implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mgReqId;
    @Column(nullable = false)
    private Date mgDate;
    //length?
    @Column(length = 500)
    private String mgDesc;
    @Column()
    private RequestStatusEnum status;
    @Column(nullable = false)
    private Date createdDate;

    public MeetAndGreetRequest() {
    }
    
    public Long getMgReqId() {
        return mgReqId;
    }

    public void setMgReqId(Long mgReqId) {
        this.mgReqId = mgReqId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mgReqId != null ? mgReqId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the mgReqId fields are not set
        if (!(object instanceof MeetAndGreetRequest)) {
            return false;
        }
        MeetAndGreetRequest other = (MeetAndGreetRequest) object;
        if ((this.mgReqId == null && other.mgReqId != null) || (this.mgReqId != null && !this.mgReqId.equals(other.mgReqId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.MeetAndGreetRequest[ id=" + mgReqId + " ]";
    }

    /**
     * @return the mgDate
     */
    public Date getMgDate() {
        return mgDate;
    }

    /**
     * @param mgDate the mgDate to set
     */
    public void setMgDate(Date mgDate) {
        this.mgDate = mgDate;
    }

    /**
     * @return the mgDesc
     */
    public String getMgDesc() {
        return mgDesc;
    }

    /**
     * @param mgDesc the mgDesc to set
     */
    public void setMgDesc(String mgDesc) {
        this.mgDesc = mgDesc;
    }

    /**
     * @return the status
     */
    public RequestStatusEnum getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(RequestStatusEnum status) {
        this.status = status;
    }

    /**
     * @return the createdDate
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * @param createdDate the createdDate to set
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }
    
}
