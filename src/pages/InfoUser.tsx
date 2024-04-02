import { useEffect } from 'react'
import { Tabs } from 'antd';
import { RootState, useAppDispatch } from "../redux/store";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/user.slice';
import ImageSave from './ImageSave';
import ImageCreate from './ImageCreate';
import { token } from '../utils/constant';

const InfoUser = () => {
  const dispatch = useAppDispatch()
  const { users } = useSelector((state: RootState) => state.user)
  useEffect(() => {
    dispatch(getUser(token))
  }, [token])
  const item = () => {
    return [
      {
        label: 'Ảnh Lưu',
        key: '1',
        children: <ImageSave />
      },
      {
        label: 'Ảnh Tạo',
        key: '2',
        children: <ImageCreate />
      },
    ]
  }

  return (
    <div>
      <div className="max-w-md mx-auto m-4 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Trang cá nhân</h2>
        <div className="mb-4">
          <label htmlFor="username" className="text-3xl text-gray-700 font-bold mb-2 flex justify-center">{users.user_name}</label>
          <div className='grid grid-cols-2 gap-2 pt-3'>
            <div>
              <Link className='' to={'/info/edit'}>Chỉnh sửa hồ sơ</Link>
            </div>
            <div>
              <Link className='' to={'/info/edit-pass'}>Thay đổi mật khẩu</Link>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        defaultActiveKey="1"
        centered
        items={item()}
      />
    </div>

  );
};

export default InfoUser;

