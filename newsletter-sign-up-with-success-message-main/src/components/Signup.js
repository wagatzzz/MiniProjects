import "./Signup.css";
import React, {useRef, useState} from "react";
import iconList from "../images/icon-list.svg"
import illustrationDesktop from "../images/illustration-sign-up-desktop.svg";
import illustrationMobile from "../images/illustration-sign-up-mobile.svg"
import iconSuccess from "../images/icon-success.svg";

function Signup(){
    const[errorEmail, setErrorEmail] = useState("");
    const[isActiveError, setIsActiveError] = useState(false);
    const[showState, setShowState] = useState(false);
    const inputRefEmail = useRef(null);

    function isValidEmail(email){
        return /\S+@\S+\.\S+/.test(email);
    }

    const switchToSignup = () => {
        setShowState(false);
    }

    const currentEmailValue = () => {
        return inputRefEmail.current.value;
    }

    const submitEmail = (event) => {
        event.preventDefault();
        if(inputRefEmail.current.value === "" || !isValidEmail(inputRefEmail.current.value)){
            setErrorEmail("Valid Email Required");
            setIsActiveError(true);
            setShowState(false);

        }else{
            setErrorEmail("");
            setIsActiveError(false);
            setShowState(true);

        }
    }


    const thankState = () => {
        return(
            <div className="container-thank">
                <div>
                    <div><img src={iconSuccess} alt=""></img></div>
                    <h1>Thanks for subscribing!</h1>
                    <p>
                    A confirmation email has been sent to<span>{currentEmailValue()}</span>. 
                    Please open it and click the button inside to confirm your subscription.
                    </p>
                </div>
                <button onClick={switchToSignup}>Dismiss message</button>
            </div>
        )
    }


    const signupState = () => {
        return(
            <div className="container-signup">
                <div className="side">
                    <h1>Stay updated!</h1>
                    <p>Join 60,000+ product managers receiving monthly updates on:</p>
                    <div className="list-box">
                        <div className="single-list">
                            <img src={iconList} alt=""></img>
                            <p> Product discovery and building what matters</p>
                        </div>
                        <div className="single-list">
                            <img src={iconList} alt=""></img>
                            <p> Measuring to ensure updates are a success</p>
                        </div>
                        <div className="single-list">
                            <img src={iconList} alt=""></img>
                            <p> And much more!</p>
                        </div>
                    </div>
                    <div className="form">
                        <div className="label-box">
                            <div className="label-state" ref={inputRefEmail}>Email Address</div>
                            <div className="error-state">{errorEmail}</div>
                        </div>
                        <input 
                        type="email"
                        placeholder="email@company.com"
                        ref={inputRefEmail}
                        style={{
                            borderColor: isActiveError ? "hsl(4, 100%, 67%)" : "",
                            backgroundColor: isActiveError ? "hsla(4, 100%, 67%, 0.2)" : "",
                            color: isActiveError ? "hsl(4, 100%, 67%)" : "",
                        }}
                        />
                        <button onClick={submitEmail}>Subscribe to monthly newsletter</button>
                    </div>

                </div>
                <picture className="side">
                    <source media="(max-width: 950px)" srcSet={illustrationMobile}/>
                    <img src={illustrationDesktop} alt="" />
                </picture>
            </div>
        )
    }
    return(
        <div className="main">
            {showState ? <div>{thankState()}</div> : <div>{signupState()}</div>}
        </div>
    );
}

export default Signup;
