import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { isAuthenticated, setIsAuthenticated,loading,setLoading  } = useContext(context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(`${server}/users/login`,{ email, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true,
                })
            toast.success(data.message);
            setIsAuthenticated(true);
            console.log(data);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false);
            setLoading(false);
        }
                 
    }
    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        <div className="login">
            <section>
                <form onSubmit={submitHandler} >
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="Email"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button disabled={loading} type="submit">Login</button>
                    <h4>Or</h4>
                    <Link to="/register">Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login;