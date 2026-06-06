import { useState } from "react";

function ActivityForm({ onActivityLogged }) {
  const [skillName, setSkillName] = useState("Football");
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(
  `${API_URL}/log-activity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skill_name: skillName,
          value: Number(value),
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    onActivityLogged();

    setValue("");
  };

  return (
    <div>
      <h2>Log Activity</h2>

      <select
        value={skillName}
        onChange={(e) => setSkillName(e.target.value)}
      >
        <option>Football</option>
        <option>Academics</option>
        <option>Finance</option>
        <option>Gym</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Log Activity
      </button>
    </div>
  );
}

export default ActivityForm;