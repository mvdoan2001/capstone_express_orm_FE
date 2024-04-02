import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { editInfo, getUser } from '../redux/user.slice';
import { token } from '../utils/constant';

interface UserProfile {
  username: string;
  email: string
}

const EditProfile = () => {
  const dispatch = useAppDispatch()
  const { users } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    dispatch(getUser(token))
  }, [dispatch])
  const [profile, setProfile] = useState<UserProfile>({
    username: 'example_username',
    email: 'example@example.com'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSave = () => {
    if(profile.email !== users.email) {
      alert('Email không đúng')
      return
    }
    dispatch(editInfo({ userName: profile.username, token }))
  }

  const navigate = useNavigate()
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Chỉnh sửa hồ sơ</h2>
      <form>
      <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input type="email" id="email" name="email" placeholder={profile.email} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Tên người dùng</label>
          <input type="text" id="username" name="username" placeholder={profile.username} onChange={handleChange} className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick= {() => navigate('/')}>
            Quay lại trang chủ
            </button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave} >Lưu thay đổi</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
