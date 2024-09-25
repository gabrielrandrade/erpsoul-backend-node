import React from "react";
import { Link } from "react-router-dom";
import "./Footers.css";

class Footers extends React.Component {
    render() {
        return(
            <>
                <footer className="footerGeral">
                    <div className="rodape">
                        <div className="sociais">
                            <div className="social">
                                <Link to="#">
                                    <p><i className="fa-brands fa-facebook" /></p>
                                </Link>
                            </div>
                            <div className="social">
                                <Link to="#">
                                    <p><i className="fa-brands fa-instagram" /></p>
                                </Link>
                            </div>
                            <div className="social">
                                <Link to="#">
                                    <p><i className="fa-brands fa-linkedin" /></p>
                                </Link>
                            </div>
                        </div>
                        <br />
                        <div className="texto-rodape">
                            <Link to="#"><p>Termos de uso</p></Link>
                            <Link to="#"><p>Política de privacidade</p></Link>
                            <br />
                            <p>© 2024, Right Solution, All Rights Reserved</p>
                        </div>
                    </div>
                </footer>
            </>
        );
    }
}

export default Footers;