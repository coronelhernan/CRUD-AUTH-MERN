import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function LoginPage() {
  const { register, handleSubmit, formState: {errors} } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    signin(data);
  })

  // Aqui se comprueba si el usuario esta autenticado, es redirigido a tasks
  
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  return (
    <>
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {
					signinErrors.map((error, i) => (
						<div className="bg-red-500 p-2 my-2 text-white" key={i}>
							{error.message}
						</div>
					))
				}

        <h1 className='text-2xl text-white font-bold'>Login</h1>
				<form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc text-white px-4 py-2 rounded-md border-2 border-white my-2"
            placeholder="Email"
            autoComplete="off"
          />
					{errors.email && <p className="text-red-500">Username is required</p>}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc text-white px-4 py-2 rounded-md border-2 border-white my-2"
            placeholder="Password"
            autoComplete="off"
          />
					{errors.password && <p className="text-red-500">Password is required</p>}

          <button className="bg-sky-500 text-white px-4 py-2 rounded-md my-2" type="submit">
            Login
          </button>
        </form>

        <p className='flex gap-x-2 justify-between text-white'>
          Don't have an account? <Link to='/register' className='text-sky-500'>Sing up</Link>
        </p>
      </div>
      </div>
    </>
  )
}
