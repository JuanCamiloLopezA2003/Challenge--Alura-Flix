import React from "react";
import '../Footer/footer.css';
import logoimg from '/img/logoAFlix.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className='footer'>
            <img src={logoimg} alt="" />
            <div className="redes">
                <a href="link linkedin" className="redes-icon"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
                <a href="https://github" className="redes-icon"><FontAwesomeIcon icon={faGithub} size="2x" /></a>
                <a href="https://wa" className="redes-icon"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
                <a href="tele" className="redes-icon"><FontAwesomeIcon icon={faTelegram} size="2x" /></a>
            </div>
            <p> Desarrollado por </p>
            <h2>Juan Camilo López 2024</h2>
        </footer>

    );
}