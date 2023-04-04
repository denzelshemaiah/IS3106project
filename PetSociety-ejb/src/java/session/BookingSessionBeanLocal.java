/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.BookingRequest;
import error.NoAccessException;
import error.NoResultException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import javax.ejb.Local;

/**
 *
 * @author cally
 */
@Local
public interface BookingSessionBeanLocal {
    public void createNewBooking(BookingRequest b, Long parentId, Long sitterId, String repeatBasis, List<Integer> days);
    public List<BookingRequest> getBookings(String status, Long userId);
    public void updateBooking(BookingRequest b) throws NoResultException;
    public void rejectBooking(Long userId, Long bookingId) throws NoResultException, NoAccessException;
    public BigDecimal calculatePenalty(Long bookingId) throws NoAccessException;
    public void cancelBooking(Long userId, Long bookingId) throws NoResultException, NoAccessException;
    public void acceptBooking(Long userId, Long bookingId) throws NoResultException, NoAccessException;

    List<BookingRequest> getCurrentBookings(Date date);
}
