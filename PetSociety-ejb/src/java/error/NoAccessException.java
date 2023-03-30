/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author cally
 */
public class NoAccessException extends Exception {

    /**
     * Creates a new instance of <code>NoAccessException</code> without detail
     * message.
     */
    public NoAccessException() {
    }

    /**
     * Constructs an instance of <code>NoAccessException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public NoAccessException(String msg) {
        super(msg);
    }
}
