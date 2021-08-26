import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Magic } from 'magic-sdk';
import { MAGIC_PUBLIC_KEY } from '../utils/urls';

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  /**
   * Adds email to user
   * @param {string} email
   */
  const loginUser = async (email) => {
    try {
      await magic.auth.loginWithMagicLink({ email });
      setUser({ email });
      router.push('/');
    } catch (error) {
      setUser(null);
    }
  };

  /**
   * Sets the user to null
   */
  const logoutUser = async () => {
    try {
      await magic.user.logout();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserLoggedIn = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const { email } = magic.user.getMetadata();
        setUser({ email });

        // just for testing
        const token = await getToken();
        console.log('check user logged in', token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Retrieves the Magic Issud Bearer Token
   * This allows User to make authenticated reqests
   * @returns
   */
  const getToken = async () => {
    try {
      const token = await magic.user.getIdToken();
      return token;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    magic = new Magic(MAGIC_PUBLIC_KEY);

    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, loginUser, logoutUser, getToken,
    }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
