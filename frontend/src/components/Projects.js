import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://your-backend.onrender.com/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

 return (
  <section id="projects">
    <h2>My Projects</h2>

    <div style={{ display: "grid", gap: "15px" }}>
      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  </section>
);
}

export default Projects;