import '../../styles.scss'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../redux/actions/userAction';
import logo from "../../assets/images/Logo.png";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, displayName } = useSelector(state => state.user)

    useEffect(() => {
        if (error) {
            alert('Usuario o contraseña incorrecta')
        }
    }, [error])

    useEffect(() => {
        if (displayName) {
            navigate('/home')
        }
    }, [displayName, navigate])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = (data) => {
        console.log(data);
        dispatch(loginAsync(data.email, data.password1));
    }
    return (
        <div className='container-fluid p-3 text-center'>
            <img className='mt-3' src={logo} alt='page logo' />
            <h2 className='mt-4 px-4'>Sign in</h2>
            <p className='px-4'>Login to your account</p>
            <form className='pagecnt' onSubmit={handleSubmit(submit)}>
                <div>
                    <label className=' d-grid mb-2'>
                        <input
                            className='border-0 border-bottom border-warning py-2'
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: true })}
                        />
                        {errors.phone && <span>El campo del email es requerido</span>}
                    </label>
                    <label className=' d-grid '>
                        <input
                            className='border-0 border-bottom border-warning py-2'
                            type="password"
                            placeholder="Contraseña"
                            {...register("password1")}
                        />
                        {errors.password1 && <span>{errors.password1.message}</span>}
                    </label>
                </div>
                <div className='d-grid'>
                    <button className='btn btn-warning py-2 fw-semibold' type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};


export default Login