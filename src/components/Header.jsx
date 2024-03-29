import { useContext } from "react";
import { Link } from "react-router-dom";
import { context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {

    const { isAuthenticated, setIsAuthenticated,loading,setLoading } = useContext(context);

    const logoutHandler = async () => {
        setLoading(true);
        try {
            await axios.get(`${server}/users/logout`, {
                withCredentials: true
            })
            toast.success("Logged Out Successfully");
            setIsAuthenticated(false);
            setLoading(false)
        } catch (error) {
            toast.error("Something went wrong");
            setIsAuthenticated(true);
            setLoading(false)
        }

    }

    return (
        <nav className="header">
            <div>
                <h2>TODO APP</h2>
            </div>
            <article>
                <Link to={"/"}>Home</Link>
                <Link to={"/profile"}>Profile</Link>
                {
                    isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button> : (<Link to={"/login"}>Login</Link>)

                }

            </article>
        </nav>
    )
}

export default Header