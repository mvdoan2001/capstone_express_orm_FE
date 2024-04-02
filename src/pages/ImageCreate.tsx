import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
import { getListCreate } from '../redux/user.slice'
import { BASE_URL_IMAGE } from '../utils/http'
import { token } from '../utils/constant'
import { delImage } from '../redux/post.slice'

export default function ImageCreate() {
    const dispatch = useAppDispatch()
    const { listCreate } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        dispatch(getListCreate(token))
    }, [dispatch])
    return (
        <div className="container mx-auto grid grid-cols-6 gap-3">
            {listCreate.filter(item => !item.isDelete).map((image, index) => (
                <div key={index} className="max-w-xs rounded overflow-hidden shadow-lg pin">
                    <div className='pin-image'>
                        <img src={`${BASE_URL_IMAGE}/${image.url}`} alt='' className="w-full" />
                    </div>
                    <div className="px-6 py-4 pin-info">
                        <div className="font-bold text-xl mb-2 pin-title">{image.user.user_name}</div>
                        <div className="font-bold text-l mb-2 pin-description">{image.description}</div>
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                            dispatch(delImage(String(image.image_id)))
                        }}>
                            Xoá
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}
