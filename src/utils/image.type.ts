import User from "./user.type"

export default interface Image {
    image_id: String
    image_mame: String
    url: String
    description: String
    user_id: String
    create_at: any
    isDelete: Boolean
    user: User
};