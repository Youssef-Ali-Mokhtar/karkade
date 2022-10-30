import Navbar from "./components/Navbar";
import SideNavbar from "./components/SideNavbar";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import Home from "./components/pages/home/Home";
import Connections from "./components/pages/connections/Connections";
import Notifications from "./components/pages/notifications/Notifications";
import Profile from "./components/pages/profile/Profile";
import Bookmarks from "./components/pages/bookmarks/Bookmarks";
import Settings from "./components/pages/settings/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overlay from "./components/Overlay";
import InputPost from "./components/InputPost";
import Login from "./components/login/Login";
import FloatingSearch from "./components/FloatingSearch";
import PostDetails from "./components/pages/home/PostDetails";
import useFetch from "./components/useFetch";
import { getUserInfo } from "./firebase";
//
function App() {
  const [floatingSearch, setFloatingSearch] = useState(false);
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode"));
  const [postOverlay, setPostOverlay] = useState(false);
  const [mobileMode, setmobileMode] = useState(false);
  const [openSideNavbar, setOpenSideNavbar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const r = document.querySelector(":root");
  const LIGHT = "light";
  const DARK = "dark";
  const fetchedData = useFetch(
    "https://test-blog-bdc36-default-rtdb.firebaseio.com/posts.json"
  );
  // console.log(getUserInfo().uid);
  useEffect(() => {
    if (localStorage.getItem("themeMode") === "dark") {
      setThemeMode(DARK);
    }
  }, []);

  const changeThemeMode = () => {
    if (localStorage.getItem("themeMode") === DARK) {
      r.style.setProperty("--contentBackgroundTheme", "rgb(242,242,242)");
      r.style.setProperty("--navbarBackgroundTheme", "white");
      r.style.setProperty("--navbarBorderTheme", "rgb(200,200,200)");
      r.style.setProperty("--searchBackgroundTheme", "white");
      r.style.setProperty("--dropdownMenuColor", "rgb(40, 40, 40)");
      r.style.setProperty("--postBorderTheme", "rgb(217, 219, 220)");
      r.style.setProperty("--postBehindPictureTheme", "rgb(230, 230, 226)");
      r.style.setProperty("--inputPostTheme", "white");
      r.style.setProperty("--hoverTextTheme", "black");
    } else {
      r.style.setProperty("--contentBackgroundTheme", "rgb(24,24,24)");
      r.style.setProperty("--navbarBackgroundTheme", "rgb(38,38,38)");
      r.style.setProperty("--navbarBorderTheme", "rgb(100,100,100)");
      r.style.setProperty("--searchBackgroundTheme", "rgb(24,24,24)");
      r.style.setProperty("--dropdownMenuColor", "rgb(205, 205, 205)");
      r.style.setProperty("--postBorderTheme", "rgb(38,38,38)");
      r.style.setProperty("--postBehindPictureTheme", "rgb(26, 31, 29)");
      r.style.setProperty("--inputPostTheme", "rgb(24,24,24)");
      r.style.setProperty("--hoverTextTheme", "white");
    }
  };

  changeThemeMode();
  const themeModeSwitchHandler = () => {
    setThemeMode(themeMode === LIGHT ? DARK : LIGHT);
    changeThemeMode();
    localStorage.setItem("themeMode", themeMode === LIGHT ? DARK : LIGHT);
  };
  console.log(localStorage.getItem("useId"));
  useEffect(() => {
    if (window.innerWidth <= 1020) {
      setmobileMode(true);
    } else {
      setmobileMode(false);
    }
    const windowEvent = window.addEventListener("resize", (event) => {
      if (window.innerWidth <= 1020) {
        setmobileMode(true);
      } else {
        setmobileMode(false);
      }
    });
    return () => {
      window.removeEventListener("resize", windowEvent);
    };
  }, []);

  const loggedInHandler = (state) => {
    console.log("pressed!");
    setLoggedIn(state);
    localStorage.setItem("loggedIn", state);
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
      // navigate("/");
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      {!loggedIn && <Login loggedInHandler={loggedInHandler} />}
      {loggedIn && (
        <Router>
          <Overlay onClick={() => setPostOverlay(false)} overlay={postOverlay}>
            <InputPost
              onClick={(e) => e.stopPropagation()}
              overlayHandler={setPostOverlay}
            />
          </Overlay>

          {mobileMode ? (
            <SideNavbar
              themeModeHandler={themeModeSwitchHandler}
              themeMode={themeMode}
              openSideNavbarHandler={[openSideNavbar, setOpenSideNavbar]}
              loggedInHandler={loggedInHandler}
            />
          ) : (
            <Navbar
              themeModeHandler={themeModeSwitchHandler}
              postOverlayHandler={setPostOverlay}
              loggedInHandler={loggedInHandler}
            />
          )}

          {/* <Overlay
            onClick={() => setOverlayUpdateInfo(false)}
            overlay={overlayUpdateInfo}
          >

          </Overlay> */}

          <Overlay
            onClick={() => setOpenSideNavbar(false)}
            overlay={openSideNavbar}
          />

          <Overlay
            onClick={() => setFloatingSearch(false)}
            overlay={floatingSearch}
          >
            <FloatingSearch
              onClick={(e) => e.stopPropagation()}
              overlayHandler={setFloatingSearch}
            />
          </Overlay>

          {mobileMode && (
            <AiOutlineMenu
              onClick={() => {
                setOpenSideNavbar(true);
              }}
              className="floating-menu-icon"
              size={25}
            />
          )}
          {mobileMode && (
            <AiOutlineSearch
              onClick={() => {
                setFloatingSearch(true);
              }}
              className="floating-search-icon"
              size={25}
            />
          )}

          <div className="content">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Home
                    data={fetchedData}
                    mobileMode={mobileMode}
                    postOverlayHandler={setPostOverlay}
                  />
                }
              />
              <Route exact path="/Connections" element={<Connections />} />
              <Route exact path="/Notifications" element={<Notifications />} />
              <Route exact path="/Profile/*" element={<Profile />} />
              <Route exact path="/Bookmarks" element={<Bookmarks />} />
              <Route exact path="/Settings" element={<Settings />} />
              <Route
                exact
                path="/posts/:id"
                element={<PostDetails data={fetchedData} />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}

export default App;
