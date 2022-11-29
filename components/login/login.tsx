import { useRouter } from 'next/router';
import { useAuthContext } from '../../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const loginWithGoogle = async () => {
    try {
      await login();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto grid place-content-center h-screen">
      <span className="mb-10 text-xl font-medium tracking-wide">
        Login to your account
      </span>
      <div className="bg-gray-100 py-16 px-6 rounded-xl">
        <div onClick={loginWithGoogle}>
          <GoogleIcon className='button_google'/>
        </div>
      </div>
    </div>
  );
};

export default Login;
