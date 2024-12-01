import mongoose, {Schema,Document} from "mongoose";

export interface Message extends Document{
    _id: string;
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema ({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema ({
    username: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/,"Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    verifyCode: {
        type: String,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        required: true,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        required: true,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel: mongoose.Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;