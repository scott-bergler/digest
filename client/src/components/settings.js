import { googleLogout } from "@react-oauth/google";
// make sure the user has an active profile with our app
// if a profile is present display
/**
 * name
 * email
 * avatar
 * logout
 * additional stuff coming soon
 */

function Settings({ profile, setProfile }) {
  const logOut = () => {
    googleLogout();
    setProfile();
  };
  return (
    <div className="settings">
      <img src={profile.picture} alt="user selected" />
      <h3>User Logged in</h3>
      <p>Name: {profile.name}</p>
      <p>Email Address: {profile.email}</p>
      <br />
      <br />
      <button onClick={logOut}>Log out</button>
    </div>
  );
}
export default Settings;
