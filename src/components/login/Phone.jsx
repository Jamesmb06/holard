import '../../styles.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import Swal from 'sweetalert2'
import logo from "../../assets/images/Logo.png";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';


const Phone = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("")

    const validatePhoneNumber = (numberPhone, lengthString) => {
        if (!numberPhone) {
            return false
        }
        const value = numberPhone.replace(/\D/g, "");
        const valueLength = value.length
        return {
            isValid: valueLength === lengthString,
            value
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { isValid, value: validNumber } = validatePhoneNumber(phoneNumber, 10);
        console.log(isValid, validNumber);
        if (!isValid) {
            Swal.fire(
                'Ups',
                'El número debe tener 10 caracteres',
                'error'
            )
        }
        generateReCaptcha()
        const reCaptcha = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+57${validNumber}`, reCaptcha)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult);
                navigate("/verification");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const generateReCaptcha = () => {
        try {
            window.recaptchaVerifier = new RecaptchaVerifier("recaptch-container", {
                size: 'invisible',
                callback: (response) => {
                    // reCAPTCHA solver, allow signInWithPhoneNumber,
                    // onSignInSubmit();
                    // console.log(response);
                },
            }, auth)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container-fluid text-center'>
            <img className='mt-5' src={logo} alt='page logo' />
            <h2 className='mt-4 px-4'>Sign in</h2>
            <p className='px-4'>Login or create an account with your phone number to start ordering</p>
            <form className='pagecnt' onSubmit={handleSubmit}>
                <div>
                    <label className=' d-grid '>
                        <input
                            className='border-0 border-bottom border-warning'
                            type="number"
                            placeholder="+57"
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                            value={phoneNumber}
                        />
                    </label>
                </div>
                <div className='d-grid btn_login'>
                    <button className='btn btn-warning mb-3 py-2 fw-semibold' type='submit'>Login</button>
                </div>
                <div id="recaptch-container"></div>
            </form>
        </div>
    );
};


export default Phone