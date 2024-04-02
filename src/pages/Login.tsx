import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../redux/user.slice';
import { useAppDispatch } from '../redux/store';
import { typeLogin } from '../utils/constant';

const Login = () => {
  const [formData, setFormData] = useState<typeLogin>({
    email: '',
    password: ''
  });
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logIn(formData))
  };


  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email  </label>
          <input type="text" id="email" name="email" placeholder='example@gmail.com' onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Mật khẩu</label>
          <input type="password" id="password" name="password" placeholder='1234' onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Đăng nhập</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate('/')}>Trở về trang chủ</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
