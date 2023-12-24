import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
export default function PrivateRoute({ children }: {children: JSX.Element}) {
    return children;
    // const { user } = useUser();
    // return !user || user.username ? children : <Navigate to="/auth/"/>
}
