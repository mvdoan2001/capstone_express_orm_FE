import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import { editPass, getUser } from '../redux/user.slice';
import { token } from '../utils/constant';

interface UserProfile {
  email: string;
  password: string;
}

const EditPassword = () => {
  const dispatch = useAppDispatch()
  const { users } = useSelector((state: RootState) => state.user)
  console.log(users)
  useEffect(() => {
    dispatch(getUser(token))
  }, [dispatch])
  const [profile, setProfile] = useState<UserProfile>({
    email: 'example@example.com',
    password: '12345678'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
    console.log(profile)
  };

  const navigate = useNavigate()
  const handleSave = () => {
    if(profile.email !== users.email) {
      alert('Email không đúng')
      return
    }
    dispatch(editPass({ newPassword: profile.password, token}))
  }


  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Đổi mật khẩu</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" placeholder={profile.email} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Mật khẩu Mới</label>
          <input type="password" id="password" name="password" placeholder={profile.password} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate('/')}>
           Quay lại trang chủ
            </button>
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick= {handleSave}>
            Lưu thay đổi
            </button>
        </div>
      </form>
    </div>
  );
};

export default EditPassword;
