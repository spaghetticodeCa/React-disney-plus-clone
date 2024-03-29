import React, { useEffect, useState } from "react";
import { provider, auth } from "../firebase";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function Header() {
  const [showMobileNavLinks, setShowMobileNavLinks] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        console.log(user);
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signOutBtn = () => {
    signOut(auth)
      .then(() => {
        dispatch(setSignOut());
        history.push("/login");
        console.log("sign out successfull");
      })
      .catch((error) => {
        console.log("sign out error");
      });
  };

  return (
    <>
      <Nav>
        <HamButton
          onClick={() => {
            setShowMobileNavLinks(!showMobileNavLinks);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </HamButton>
        <Logo src="/images/logo.svg" />
        {!userName ? (
          <LoginContainer>
            <Login onClick={signIn}>Login</Login>
          </LoginContainer>
        ) : (
          <>
            <NavMenu>
              <Link to="/">
                <a>
                  <img src="/images/home-icon.svg" />
                  <span>HOME</span>
                </a>
              </Link>
              <a>
                <img src="/images/search-icon.svg" />
                <span>SEARCH</span>
              </a>
              <a>
                <img src="/images/watchlist-icon.svg" />
                <span>WATCH LIST</span>
              </a>
              <a>
                <img src="/images/original-icon.svg" />
                <span>ORIGINALS</span>
              </a>
              <a>
                <img src="/images/movie-icon.svg" />
                <span>MOVIES</span>
              </a>
              <a>
                <img src="/images/series-icon.svg" />
                <span>SERIES</span>
              </a>
            </NavMenu>
            <UserImg onClick={signOutBtn} src={userPhoto} />
          </>
        )}
      </Nav>
      {showMobileNavLinks && (
        <NavMenuMobile>
          <Link to="/">
            {/* <img src="/images/home-icon.svg" /> */}
            <span>HOME</span>
          </Link>
          <a>
            {/* <img src="/images/search-icon.svg" /> */}
            <span>SEARCH</span>
          </a>
          <a>
            {/* <img src="/images/watchlist-icon.svg" /> */}
            <span>WATCH LIST</span>
          </a>
          <a>
            {/* <img src="/images/original-icon.svg" /> */}
            <span>ORIGINALS</span>
          </a>
          <a>
            {/* <img src="/images/movie-icon.svg" /> */}
            <span>MOVIES</span>
          </a>
          <a>
            {/* <img src="/images/series-icon.svg" /> */}
            <span>SERIES</span>
          </a>
        </NavMenuMobile>
      )}
    </>
  );
}

export default Header;

const Nav = styled.nav`
  position: relative;
  min-height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    color: white;
    text-decoration: none;
    @media (max-width: 768px) {
      display: none;
    }
    img {
      height: 20px;
    }

    span {
      position: relative;
      font-size: 13px;
      letter-spacing: 1.42px;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const HamButton = styled.div`
  display: none;
  height: 26px;
  width: 36px;
  margin-right: 36px;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  & span {
    background-color: #f9f9f9;
    height: 4px;
    width: 100%;
    border-radius: 4px;
  }
`;

const NavMenuMobile = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  z-index: 3;
  /* background: #090b13; */
  background: #000;

  @media (min-width: 768px) {
    display: none;
  }

  a {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin: 1.2rem 0;
    color: white;
    text-decoration: none;
    img {
      height: 2.5rem;
    }

    span {
      position: relative;
      font-size: 1.6rem;
      letter-spacing: 1.42px;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;
