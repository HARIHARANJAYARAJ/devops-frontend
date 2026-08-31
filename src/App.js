import React, { useEffect, useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import { getStudents, createStudent, updateStudent, deleteStudent } from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await getStudents();
      setStudents(res.data);
      setLoadError("");
    } catch (err) {
      setLoadError("Could not connect to the backend API. Make sure the FastAPI server is running on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (data) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
      setEditingStudent(null);
    } else {
      await createStudent(data);
    }
    fetchStudents();
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Student  MAngement System</h1>
        <p>React + FastAPI + PostgreSQL</p>
      </header>

      <main>
        <StudentForm
          onSubmit={handleSubmit}
          editingStudent={editingStudent}
          onCancelEdit={() => setEditingStudent(null)}
        />

        <section className="list-section">
          <h2>Students</h2>
          {loadError && <div className="form-error">{loadError}</div>}
          {loading ? <p>Loading...</p> : <StudentList students={students} onEdit={handleEdit} onDelete={handleDelete} />}
        </section>
      </main>
    </div>
  );
}

export default App;
