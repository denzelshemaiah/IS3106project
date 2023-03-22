/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package error;

/**
 *
 * @author Andrea
 */
public class ParentNotFoundException extends Exception {

    /**
     * Creates a new instance of <code>ParentNotFoundException</code> without
     * detail message.
     */
    public ParentNotFoundException() {
    }

    /**
     * Constructs an instance of <code>ParentNotFoundException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public ParentNotFoundException(String msg) {
        super(msg);
    }
}
