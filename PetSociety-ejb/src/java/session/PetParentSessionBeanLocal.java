/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetParent;
import error.ParentNotFoundException;
import javax.ejb.Local;

/**
 *
 * @author Andrea
 */
@Local
public interface PetParentSessionBeanLocal {

    public PetParent createNewParent(PetParent parent);

    public PetParent retrieveParentByParentId(Long parentId) throws ParentNotFoundException;
    
}
