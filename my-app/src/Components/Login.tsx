import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
const google = window.google;

function Login() {

    const navigate = useNavigate();
    const [ user, setUser ] = useState({});
    
    function dogSubmit (e:any) {
        e.preventDefault()
        navigate('/Search')

    };

    function handleCallbackResponse(response: any) {
        console.log('Endocded JWT ID token: ' + response.credential);
        var useObject = jwt_decode(response.credential);
        console.log(useObject);
        setUser(useObject);
        document.getElementById("signInDiv").hidden = true;
    };

    function handleSignOut(event) {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
    };

    useEffect(() => {
        /* Global google */
        google.accounts.id.initialize({
            client_id: "200583476302-o2kfrf01dg909e845v91lutsphhn345o.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
        google.accounts.id.prompt();
    }, []);


    return (
            <motion.div 
                animate={{rotate: [0, 50, -20, 20, -10, 50, -30, 40, 0, 20, -25, 360], scale:1.5}} 
                transition={{duration: 5}}
                >
                    <div className="form-container">
                        <form>
                            <h4>Welcome</h4>
                            <div className="signInDiv">
                            { Object.keys(user).length !==0 && 
                                <button onClick={ (e) => handleSignOut(e) }>Sign Out</button>
                            }
                            {user &&
                                <div>
                                <img src={user.picture} alt=""></img>
                                <h3>{user.name}</h3>
                                </div>
                            }
                            </div>
                            <button 
                                type="submit" 
                                className="form-button"
                                onClick={dogSubmit}
                            >
                                Dog Search
                            </button>
                        </form>

                        <footer>
                            MSA Phase 3 | Front-end | tsoukent97@outlook.com | <a href="https://github.com/tsoukent97" target="blank">Github</a> 
                        </footer>
                    </div>
            </motion.div>
    )
  }

export default Login;