import { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { uploadImange } from '../redux/user.slice';

export default function Upload() {
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const dispatch = useAppDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setDesc(value);
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('description', desc);
      let model = {
        image: image,
        description: desc
      }
      console.log(model)
      dispatch(uploadImange(model))
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className=" bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Tạo ảnh mới</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <div className="bg-gray-200 h-64 flex justify-center items-center rounded-lg">
              <div>
                <img className="rounded-circle" src='../img/12.png' alt='' width="100%" />
                <input className="form-control" type="file" id="formFile" onChange={handleFile} />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <textarea placeholder="Mô tả" rows={5} className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500" onChange={handleChange}></textarea>
                <button type='submit' className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Tạo ảnh</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
