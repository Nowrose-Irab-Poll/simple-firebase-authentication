import logo from './logo.svg';
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut  } from "firebase/auth";
import initializeAuthentication from './firebase/firebase.initialize';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {

  const auth = getAuth();

  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, photoURL, email, uid} = result.user;
      const loggeinUser = {
        name: displayName,
        email: email,
        photo: photoURL,
        id: uid
      }
      setUser(loggeinUser)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const {displayName, photoURL, email, uid} = result.user;
      const loggeinUser = {
        name: displayName,
        email: email,
        photo: photoURL,
        id: uid
      }
      setUser(loggeinUser)
    })
    .catch( error => {
      console.log(error)
    })
  }

const handleSignOut = () => {
  signOut(auth)
  .then( () => {
    setUser({})
  })
  .catch( error => {
    console.log(error)
  })
}

  return (
    <div className="App">
      {
        user.id ? 
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div> 
        :
        <div>
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
          <br />
          <button onClick={handleGithubSignIn}>Github Sign In</button>
          <br />
        </div> 
      }
      {
        user.id && <div>
          <h2>Welcome {user.name}</h2>
          <h4>Email: {user.email}</h4>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
