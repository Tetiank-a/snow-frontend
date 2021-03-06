import logo from "../img/icon.png";
import "../App.css";
import { NavLink } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { isAdmin, isAuthorized, isInstructor } from "../Utils/Common";
import { useTranslation } from "react-i18next";
import i18n from "../services/i18n";

const handleLangChange = (evt: { target: { value: any; }; }) => {
    const lang = evt.target.value;
    i18n.changeLanguage(lang);
  };

function Header() {
  const { t } = useTranslation();
  const isLoggedIn: boolean = isAuthorized();
  const isAdminRole: boolean = isAdmin();
  const isInstructorRole: boolean = isInstructor();
  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Container>
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="TripleS logo"
          />
          <Navbar.Brand href="/">Snow*School</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isLoggedIn && isAdminRole && (
                <div>
                  <NavLink to="/users">{t("Users")}</NavLink>
                  <NavLink to="/tasks">{t("Tasks")}</NavLink>
                  <NavLink to="/sessions">{t("Find sessions")}</NavLink>
                  <NavLink to="/sessions/my">{t("My sessions")}</NavLink>
                  <NavLink to="/statistics">{t("Statistics")}</NavLink>
                  <NavLink to="/backup">{t("Settings")}</NavLink>
                </div>
              )}
              {isLoggedIn && isInstructorRole && (
                <div>
                  <NavLink to="/tasks">{t("Tasks")}</NavLink>
                  <NavLink to="/sessions/my">{t("My sessions")}</NavLink>
                  <NavLink to="/sessions/create">{t("Create session")}</NavLink>
                  <NavLink to="/sessions">{t("Find sessions")}</NavLink>
                </div>
              )}
              {isLoggedIn && !isInstructorRole && !isAdminRole && (
                <div>
                  <NavLink to="/tasks">{t("Tasks")}</NavLink>
                  <NavLink to="/sessions/my">{t("My sessions")}</NavLink>
                  <NavLink to="/sessions">{t("Find session")}</NavLink>
                </div>
              )}
            </Nav>
            <div className="lang">
          <select onChange={handleLangChange} value={i18n.language}>
            <option value="ua">ua</option>
            <option value="en">en</option>
          </select>
          </div>
            <Nav>
              {isLoggedIn ? (
                <NavLink to="/logout">{t("Log Out")}</NavLink>
              ) : (
                <div>
                  <NavLink to="/signin">{t("Sign In")}</NavLink>
                  <NavLink to="/signup">{t("Sign Up")}</NavLink>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
