import { useEffect, useState } from "react";
import { getHistory } from "./api";
function History({ refreshTrigger }) {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
  loadHistory();
}, [refreshTrigger]);

 const loadHistory = async () => {
  const data = await getHistory();

  console.log(data);

  setActivities(data);
};

  return (
    <div>
      <h2>Recent Activity</h2>

      {activities.map((activity, index) => (
        <div
          key={index}
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #333",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>{activity.skill}</strong>
          </p>

          <p>+{activity.xp} XP</p>

          <p>{activity.description}</p>
        </div>
      ))}
    </div>
  );
}

export default History;