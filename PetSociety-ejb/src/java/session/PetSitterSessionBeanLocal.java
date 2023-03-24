/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.PetSitter;
import error.NoResultException;
import error.SitterNotFoundException;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author rachelrphy
 */
@Local
public interface PetSitterSessionBeanLocal {

    public Long createNewSitter(PetSitter sitter);

    public PetSitter retrieveSitterBySitterId(Long sitterId) throws SitterNotFoundException;

    public List<PetSitter> retrieveAllSitters();

    public void updateSitter(PetSitter sitter) throws SitterNotFoundException;

    public void deleteSitter(Long sitterId) throws NoResultException, SitterNotFoundException;
    
}
