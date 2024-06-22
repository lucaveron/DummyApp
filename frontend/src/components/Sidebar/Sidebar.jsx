import React, { useState , useEffect} from "react";
import { FaInfoCircle, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { Dropdown } from "react-bootstrap";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        console.log(user);
        setUserDetails(user);
      });
    };
    useEffect(() => {
      fetchUserData();
    }, []);
  
    async function handleLogout() {
      try {
        await auth.signOut();
        navigate('/login')
      } catch (error) {
        console.error("Error Deslogueandose:", error.message);
      }
    }

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMenuClick = (e) => {
    e.preventDefault(); // para no navegar
    setShowDropdown(false); 
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar-container bg-white d-flex flex-column">
      <div className="sidebar d-flex flex-column flex-grow-1">
        <div>
          <Link
            to="/"
            className="text-decoration-none text-dark d-flex justify-content-center align-items-center my-3">
            <span className="fs-4">Dummy App</span>
          </Link>
          <hr className="text-secondary" />
          <ul className="nav nav-pills flex-column">
            <li className="nav-item my-2">
              <Link to="/" className="nav-link text-dark fs-5">
                <IoHomeSharp />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li className="nav-item my-2">
              <Link to="/about" className="nav-link text-dark fs-5">
                <FaInfoCircle />
                <span className="ms-3">About</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-auto">
          <hr  className="text-secondary"/>
          <div className="ms-3">

          <Dropdown show={showDropdown} onToggle={toggleDropdown} className="mb-3">
            <Dropdown.Toggle
              id="dropdown-perfil"
              className="custom-dropdown-toggle btn btn-close-white d-flex align-items-center"
              onClick={toggleDropdown}
            >
              <FaUser />
              <span className="ms-2">Perfil</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/perfil" onClick={handleMenuClick} className="custom-dropdown-item">
                Ver Perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/configuracion" onClick={handleMenuClick} className="custom-dropdown-item">
                Configuración
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/logout" onClick={handleLogout} className="custom-dropdown-item">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
