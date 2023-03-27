import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";

function ResponsiveNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                   PetSociety 
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggle}
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i class="fas fa-bars"></i>

                </button>
                <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Features
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Pricing
                            </a>
                        </li>
                    </ul>
                    <span className="navbar-text">Navbar text with an inline element</span>
                </div>
            </div>
        </nav>
    );
}

export default ResponsiveNavbar;
