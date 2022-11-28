import '../../styles.scss'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { actionSignPhoneAsync } from '../../redux/actions/userAction';
import logo from "../../assets/images/Logo.png";


const Verification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const user = useSelector(store => store.userStore);

    const validateCode = ({ target }) => {
        const codigo = target.value;
        setCode(codigo);
        if (codigo.length === 6) {
            dispatch(actionSignPhoneAsync(codigo));
            if (!user.name && !user.email) {
                navigate(`/register/${user.uid}`)
            } else {
                navigate('/home')
            }
        }
    }
    return (
        <div className='container-fluid text-center'>
            <img className='mt-5' src={logo} alt='page logo' />
            <h2 className='mt-4 px-4'>Verification</h2>
            <p className='px-4 mb-0'>Enter the four-digit code from SMS</p>
            <form className='pagecnt'>
                <label>
                    <input
                        className='border-0 border-bottom border-warning'
                        type="number"
                        onChange={validateCode}
                        value={code}
                    />
                </label>

                <div className='btn_login'>
                    <button className='btn' type='submit'>Verify code</button>
                </div>
            </form>
        </div>
    );
};

export default Verification