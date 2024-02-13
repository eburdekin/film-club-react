import Profile from "../../routes/Profile";
import { useUser } from "../UserContext";

export default function Settings() {
  const { user } = useUser();
  return (
    <Profile>
      <div>Location: {user.bio}</div>
      <div>Bio: {user.bio}</div>
    </Profile>
  );
}
