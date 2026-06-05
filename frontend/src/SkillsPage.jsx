import { useEffect, useState } from "react";
import { getSkills } from "./api";
function SkillsPage() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
  const data = await getSkills();

  setSkills(data);
};
      

  return (
    <div>
      <h1>Skills</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {skills.map((skill) => (
          <div
            key={skill.id}
            style={{
              backgroundColor: "#111827",
              borderRadius: "15px",
              padding: "20px",
              width: "350px",
              boxShadow:
                "0 0 10px rgba(0,255,100,0.15)",
            }}
          >
            <h3>{skill.name}</h3>

            <p>Level {skill.level}</p>

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
                  width: `${
                    (skill.current_xp /
                      (skill.level * 100)) *
                    100
                  }%`,
                  height: "100%",
                  backgroundColor: "green",
                }}
              />
            </div>

            <p>
              {skill.current_xp} /{" "}
              {skill.level * 100} XP
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;