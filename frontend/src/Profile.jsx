import { useEffect, useState } from "react";
import { getProfile } from "./api";
function Profile({ refreshTrigger }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
  loadProfile();
}, [refreshTrigger]);

  const loadProfile = async () => {
  const data = await getProfile();

  console.log(data);

  setProfile(data);
};
  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
  <div
    style={{
      backgroundColor: "#111827",
      padding: "20px",
      borderRadius: "15px",
      width: "400px",
      marginBottom: "30px",
      boxShadow: "0 0 15px rgba(0,255,100,0.2)",
    }}
  >
    <h2>⚔️ Character</h2>

    <p>Level: {profile.level}</p>

    <div
      style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#ddd",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${(profile.current_xp / (profile.level * 100)) * 100}%`,
          height: "100%",
          backgroundColor: "#00ff66",
        }}
      />
    </div>

    <p>
      {profile.current_xp} / {profile.level * 100} XP
    </p>

    <p>
      Total XP: {profile.total_xp}
    </p>
  </div>
);
}

export default Profile;