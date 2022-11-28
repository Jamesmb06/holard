
import '../../styles.scss'
import Header from "./Header";
import Main from './Menu';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
      } 
      else{
        navigate(`/register/${user.uid}`)
        console.log(user);
      }
    });
  }, [navigate]);
     

    return (
      <div className="darkcolor">
      <Header/>
      <Main/>
      <Footer/>
    </div>
    );
  };


