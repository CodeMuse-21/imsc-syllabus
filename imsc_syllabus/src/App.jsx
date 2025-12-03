// src/App.jsx
import React, { useState } from "react";
import SubjectList from "./component/SubjectList"; // ✅ match your folder name

function App() {
  const [semester, setSemester] = useState("Semester1"); // default

  return (
    <div className="App">
      <h1>IMSc Syllabus Viewer</h1>

      <label htmlFor="semester">Choose Semester: </label>
      <select
        id="semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <option key={i} value={`Semester${i + 1}`}>
            Semester {i + 1}
          </option>
        ))}
      </select>

      {/* Pass selected semester to SubjectList */}
      <SubjectList semester={semester} />
    </div>
  );
}

export default App;
