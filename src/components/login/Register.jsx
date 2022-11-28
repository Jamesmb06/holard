import '../../styles.scss'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthenticationSync, actionRegisterAsync, actionUserLogOutAsync } from '../../redux/actions/userAction';


const Register = () => {
    const navigate = useNavigate()
    const {uid} = useParams()
    const dispatch = useDispatch();
    const userStore = useSelector((store) => store.userStore);

    useEffect(() => {
        if (userStore.name) {
          navigate("/home")
        }
      }, [navigate, userStore])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = (data) => {

            console.log(data);
            dispatch(actionRegisterAsync(data))
            dispatch(actionAuthenticationSync())
            navigate('/home')

    }
    const LogOutUser=()=>{
        dispatch(actionUserLogOutAsync())
        }
      
    const ValidatePass = (value) => {
        if (value.length < 8) {
            return "La contraseña debería contener al menos 8 caracteres";
        } else if (value.length > 16) {
            return "La contraseña debe contener menos de 16 de caracteres";
        } else {
            return true;
        }
    };

    return (
        <div className='container-fluid text-center'>
            <h1 className='mt-5'>Create account</h1>
        <span className='d-none'>{uid}</span>
        <button onClick={LogOutUser} className='btn btn-warning'> Log Out</button>
            <form className='pagecnt__register' onSubmit={handleSubmit(submit)}>
            <div> 
                <label className=' d-grid mb-2 mt-5'>
                    <input
                        className='border-0 border-bottom border-warning py-2'
                        type="text"
                        placeholder="Nombre"
                        {...register("name", { required: true })}
                    />
                    {errors.name && <span>El campo del nombre es requerido</span>}
                </label>
                <label className=' d-grid mb-2'>
                    <input
                        className='border-0 border-bottom border-warning py-2'
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: true })}
                    />
                    {errors.phone && <span>El campo del email es requerido</span>}
                </label>
                <label className='d-grid mb-2'>
                <input
                        className='border-0 border-bottom border-warning py-2'
                        type="password"
                        placeholder="Contraseña"
                        {...register("password1", { validate: ValidatePass })}
                    />
                    {errors.password1 && <span>{errors.password1.message}</span>}
                </label>
                <label className=' d-grid mb-2'>
                    <input
                        className='border-0 border-bottom border-warning py-2'
                        type="password"
                        placeholder="Confirmar contraseña"
                        {...register("password2", { validate: ValidatePass })}
                    />
                    {errors.password2 && <span>{errors.password2.message}</span>}
                </label>
                </div>
                <div className='d-grid'>
                    <button className='btn btn-warning py-2 fw-semibold' type='submit'>Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register