import { useEffect } from 'react'
import { RootState, useAppDispatch } from '../redux/store'
import { useSelector } from 'react-redux'
import { getListSave } from '../redux/user.slice'
import { BASE_URL_IMAGE } from '../utils/http'
import { useNavigate } from 'react-router-dom'
import { token } from '../utils/constant'
import { getList } from '../redux/post.slice'

export default function ImageSave() {

  const dispatch = useAppDispatch()
  const { listSave } = useSelector((state: RootState) => state.user)
  const { listImage } = useSelector((state: RootState) => state.image)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getListSave(token))
    dispatch(getList());

  }, [dispatch])
  return (
    <div className="container mx-auto grid grid-cols-6 gap-3">
      {
        listSave.filter(item => item?.isSave).map((item) => {
          return listImage.filter(image => image.image_id === item.image_id && !image.isDelete).map((image, index) => {
            return <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg px-2 py-3 pin"
            >
              <div className="block pin-image"
                onClick={() => navigate(`image/${image.image_id}`)}
              >
                <img
                  src={`${BASE_URL_IMAGE}/${image.url}`}
                  alt=""
                  className="w-full"
                />
              </div>
              <div className="flex items-center mb-4 pin-info">
                <div className="flex-shrink-0">
                  <img
                    src={`${BASE_URL_IMAGE}/${image.user.avatar}`}
                    alt="avt"
                    className="h-10 w-10 rounded-full mr-2"
                  />
                </div>
                <div className="text-sm">
                  <div
                    className="text-blue-500 font-bold pin-title"
                    onClick={() => navigate(`/info/${image.user.user_id}`)}
                  >
                    {image.user.user_name}
                  </div>
                  <p className="text-gray-700 pin-description">{image.description}</p>
                </div>
              </div>


            </div>
          })

        })

      }

    </div>
  )
}
