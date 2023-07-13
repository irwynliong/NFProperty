import useFirebase from "./db.js";
const Schema = useFirebase.Schema;

const userSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String,
    address: String,
    phone: String,
  },
  { collection: 'users' }
);

let User = useFirebase.model('users', userSchema);

export default User;
