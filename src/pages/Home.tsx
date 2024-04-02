import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { getList } from "../redux/post.slice";
import { BASE_URL_IMAGE } from "../utils/http";
import { getListSave, postSave } from "../redux/user.slice";
import { jwtDecode } from "jwt-decode";
import { myToken, token } from "../utils/constant";


export default function Home() {
  const dispatch = useAppDispatch();
  const { listImage } = useSelector((state: RootState) => state.image);
  const { listSave } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getList());
  }, [listImage, dispatch]);

  useEffect(() => {
    dispatch(getListSave(token))
  }, [listSave, dispatch]);
  const renderImage = () => {
    if (token) {
      let { userId }: myToken = jwtDecode(token)
      return listImage.filter(item => !item.isDelete).map((item, index) => {
        let model = { token, imageId: item.image_id }
        const isSave = listSave.some(saveItem => saveItem?.image_id === item.image_id && saveItem?.user_id === userId && saveItem?.isSave);
        return (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg px-2 py-3 pin"
          >
            <Link to={`image/${item.image_id}`} className="block pin-image">
              <img
                src={`${BASE_URL_IMAGE}/${item.url}`}
                alt=""
                className="w-full "
              />
            </Link>
            <div className="px-6 py-4 pin-info">
              <div className="flex items-center mb-4 pin-title">
                <div className="flex-shrink-0">
                  <img
                    src={`${BASE_URL_IMAGE}/${item.user.avatar}`}
                    alt="avt"
                    className="h-10 w-10 rounded-full mr-2"
                  />
                </div>
                <div className="text-sm">
                  <Link
                    to={`/info/${item.user.user_id}`}
                    className="text-blue-500 font-bold"
                  >
                    {item.user.user_name}
                  </Link>
                  <p className="text-gray-700 pin-description">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                dispatch(postSave(model))
              }}>
                {isSave ? 'Đã lưu' : 'Lưu'}
              </button>
            </div>
          </div>
        );
      })
    } else {
      return listImage.filter(item => !item.isDelete).map((item, index) => {
        return (
          <div
            key={index}
            className="max-w-sm rounded overflow-hidden shadow-lg px-2 py-3 pin"
          >
            <Link to={`image/${item.image_id}`} className="block pin-image">
              <img
                src={`${BASE_URL_IMAGE}/${item.url}`}
                alt=""
                className="w-full "
              />
            </Link>
            <div className="px-6 py-4 pin-info">
              <div className="flex items-center mb-4 pin-title">
                <div className="flex-shrink-0">
                  <img
                    src={`${BASE_URL_IMAGE}/${item.user.avatar}`}
                    alt="avt"
                    className="h-10 w-10 rounded-full mr-2"
                  />
                </div>
                <div className="text-sm">
                  <Link
                    to={`/info/${item.user.user_id}`}
                    className="text-blue-500 font-bold"
                  >
                    {item.user.user_name}
                  </Link>
                  <p className="text-gray-700 pin-description">{item.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Lưu
              </button>
            </div>
          </div>

        );
      })
    }
  }

  return <div className="grid grid-cols-6 gap-4 py-3">
    {
      renderImage()
    }
  </div>;
}
