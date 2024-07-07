import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
    let userSelect = useSelector(state => state.auth.user)
    console.log(userSelect);
    const isLogin = userSelect
    return isLogin ? <Outlet /> : <Navigate replace to={"/login"} />
}

export default Auth