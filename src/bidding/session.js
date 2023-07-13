import useFirebase from "./db.js";
const Schema = useFirebase.Schema;

const sessionSchema = new Schema(
  {
    _id: String,
    expires: String,
    session: String,
  },
  { collection: 'sessions' }
);

let Sessions = useFirebase.model('sessions', sessionSchema);

export default Sessions;
