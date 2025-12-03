// src/component/SubjectList.jsx
import React, { useEffect, useState } from "react";

const SubjectList = ({ semester }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/${semester}.json`)
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching JSON:", err);
        setLoading(false);
      });
  }, [semester]);

  if (loading) return <p>Loading...</p>;
  if (!subjects.length) return <p>No data found for {semester}</p>;

  return (
    <div>
      <h2>{semester} Subjects</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Type</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub, index) => (
            <tr key={index}>
              <td>{sub.code}</td>
              <td>{sub.name}</td>
              <td>{sub.type}</td>
              <td>{sub.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;
