import{ Schema ,Document,model} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const SALT_WORK_FACTOR = 10;
interface IUserDocument extends Document{
    name: string;
    email:string;
    password:string;
}
const UserSchema=new Schema<IUserDocument>({
    name:{
        type:String,
        required:[true,"Please provide your name"],
        maxlength:[30,"Name can't be more than 30 characters"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide your email"],
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type:String,
        minlength:[6,"Password should have at least 6 characters"],
        required:[true,"Please enter a valid password"]
    },
},
{timestamps: true});
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    }
    next();
   });

const Users=model("Users",UserSchema)

export const setUsers=async(values:Record<string,any>)=>{
    await new Users(values).save().then((user)=>user.toObject())
}
export const getUsers=async()=> Users.find()
export const deleteUser=(id:string)=> Users.deleteOne({_id: id}).exec()
// export const updateUser = async (id:string , values: Record<string, any>) => {
//     let updatedValues={}
//     return Users.updateOne({_id:id},updatedValues).exec()
// }
export const getUserById=async(id:string)=> Users.findById({_id:id})
export const getUsersByEmail=async(email:string)=>await Users.findOne({email:email})

export default Users