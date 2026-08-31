import React from "react";

export default function StudentList({ students, onEdit, onDelete }) {
  if (!students.length) {
    return <p className="empty-state">No students added yet.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Year</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.full_name}</td>
              <td>{s.roll_number}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>
              <td>{s.city || "-"}</td>

              <td className="actions">
                <button onClick={() => onEdit(s)}>
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() => onDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}