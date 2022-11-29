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
import useFetchById from "./components/useFetchById";
import UpdateUserInfo from "./components/UpdateUserInfo";
import spinningWheel from "./assets/loading.svg";
import Search from "./components/Search";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [floatingSearch, setFloatingSearch] = useState(false);
  const [themeMode, setThemeMode] = useState(localStorage.getItem("themeMode"));
  const [postOverlay, setPostOverlay] = useState(false);
  const [overlayUpdateInfo, setOverlayUpdateInfo] = useState(false);
  const [mobileMode, setmobileMode] = useState(false);
  const [openSideNavbar, setOpenSideNavbar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const r = document.querySelector(":root");
  const LIGHT = "light";
  const DARK = "dark";

  const fetchedData = useFetch(
    "https://karkade-development-default-rtdb.firebaseio.com/posts.json"
  );

  useEffect(() => {
    if (localStorage.getItem("themeMode") === "dark") {
      setThemeMode(DARK);
    }
  }, []);


  const userData = useFetchById(
    `https://karkade-development-default-rtdb.firebaseio.com/users/${localStorage.getItem(
      "userId"
    )}.json`
  );
  
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
    <Router basename="/karkade">
    <div className="App">
      {!loggedIn && <Login loggedInHandler={loggedInHandler} loadingHandler={setLoading}/>}
      {loggedIn && (
        <>
          <Overlay onClick={() => setPostOverlay(false)} overlay={postOverlay}>
            <InputPost
              onClick={(e) => e.stopPropagation()}
              overlayHandler={setPostOverlay}
              loadingHandler={setLoading}
              userInfo={userData}
            />
          </Overlay>

          <Overlay
            onClick={() => setOverlayUpdateInfo(false)}
            overlay={overlayUpdateInfo}
          >
            <UpdateUserInfo
              onClick={(e) => e.stopPropagation()}
              overlayHandler={setOverlayUpdateInfo}
              userInfo={userData}
              loadingHandler={setLoading}
            />
          </Overlay>

          {mobileMode ? (
            <SideNavbar
              themeModeHandler={themeModeSwitchHandler}
              themeMode={themeMode}
              openSideNavbarHandler={[openSideNavbar, setOpenSideNavbar]}
              loggedInHandler={loggedInHandler}
              userInfo={userData}
            />
          ) : (
            <Navbar
              themeModeHandler={themeModeSwitchHandler}
              postOverlayHandler={setPostOverlay}
              loggedInHandler={loggedInHandler}
              userInfo={userData}
              searchValueHandler = {setSearchValue}
            />
          )}

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
              searchValueHandler = {setSearchValue}
            />
          </Overlay>

          <Overlay overlay={loading}>
            <img src={spinningWheel} className="spinning-wheel" alt="shit" />
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
              <Route exact path="/Connections" element={<Connections user={userData}/>} />
              <Route exact path="/Notifications" element={<Notifications />} />
              <Route
                exact
                path="/Profile/:profileId"
                element={<Profile posts={fetchedData}/>}
              />
              <Route exact path="/Bookmarks" element={<Bookmarks posts={fetchedData}/>} />
              <Route exact path="/Search" element={<Search searchValue={searchValue}/>} />
              <Route
                exact
                path="/Settings"
                element={
                  <Settings
                    userInfo={userData}
                    setOverlayUpdateInfo={setOverlayUpdateInfo}
                  />
                }
              />
              <Route
                exact
                path="/posts/:id"
                element={<PostDetails userData={userData.data}/>}
              />
            </Routes>
          </div>
        </>
      )}
    </div>
    </Router>
  );
}

export default App;
