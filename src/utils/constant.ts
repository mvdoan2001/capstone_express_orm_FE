import Image from "./image.type"
import User from './user.type';

export default interface Comment {
    comment_id: String
    content: String
    user_id: String
    image_id: String
    create_at: any
    isDelete: Boolean
    user: User
};

export default interface Save {
    save_id: String
    user_id: String
    image_id: String
    create_at: any
    isSave: Boolean
    image: Image
};

export interface typeLogin {
    email: string
    password: string
}
export interface typeRegister {
    fullName: String
    age: String
    email: string
    password: string
}

export interface myToken {
    userId: String
    key: Number
}

export const token: any = localStorage.getItem("LOGIN_USER")

