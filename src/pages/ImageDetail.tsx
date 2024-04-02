import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../redux/store';
import { BASE_URL_IMAGE } from '../utils/http';
import { delComment, getComment, getList, postComment } from '../redux/post.slice';

const ImageDetail = () => {
  const { id } = useParams()
  const { listImage } = useSelector((state: RootState) => state.image)
  const { commentList } = useSelector((state: RootState) => state.image)
  const imageDetail = listImage.find(item => item.image_id === String(id))
  const dispatch = useAppDispatch()
  const [data, setData] = useState('')
  const model = {
    imageId: String(id),
    content: data
  }

  useEffect(() => {
    dispatch(getList())
    dispatch(getComment(`${id}`))
  }, [commentList, id, dispatch])

  const renderComment = () => (
    commentList.filter(item => !item.isDelete).map((item, index) => (
      <div key={index}>
        <div className="text-l font-bold">
          <p className="text-gray-700">{item?.user?.user_name}</p>
        </div>
        <div className="bg-gray-100 p-3 mb-4 rounded-lg flex justify-between items-center">
          <p className="text-gray-700">{item.content}</p>
          <div className='flex items-end'>
            <button className="text-sm text-gray-500 mr-2">Chỉnh sửa</button>
            <button className="text-sm text-gray-500" onClick={() => {
              dispatch(delComment(String(item.comment_id)))
            }} >Xoá</button>
          </div>
        </div>
      </div>
    ))
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setData(value)
    
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(model)
    dispatch(postComment(model))
    e.currentTarget.reset()
  };


  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <img src={`${BASE_URL_IMAGE}/${imageDetail?.url}`} alt='' className="w-full mb-6 rounded-lg shadow-md" />
        <h1 className="text-2xl font-bold mb-4">{imageDetail?.user?.user_name}</h1>
        <h1 className="text-l font-bold mb-4" >{imageDetail?.description}</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <input type="text" id='content' name="content" placeholder="Thêm bình luận" className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handleChange} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">Gửi</button>
        </form>
        <div>
          <h2 className="text-lg font-semibold mb-2">Bình luận</h2>
          {
            renderComment()
          }
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
