import React, { useState, useEffect } from "react";

const emptyForm = {
  full_name: "",
  roll_number: "",
  email: "",
  phone: "",
  date_of_birth: "",
  department: "",
  year: "",
  address: "",
  city: "",
};

export default function StudentForm({
  onSubmit,
  editingStudent,
  onCancelEdit,
}) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setForm({ ...emptyForm, ...editingStudent });
    } else {
      setForm(emptyForm);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.full_name ||
      !form.roll_number ||
      !form.email ||
      !form.phone ||
      !form.department ||
      !form.year
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await onSubmit({
        ...form,
        year: parseInt(form.year, 10),
      });

      setForm(emptyForm);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? "Edit Student" : "Add Student Details"}</h2>

      {error && <div className="form-error">{error}</div>}

      <div className="form-row">
        <label>Full Name *</label>
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="e.g. Priya Sharma"
        />
      </div>

      <div className="form-row">
        <label>Roll Number *</label>
        <input
          type="text"
          name="roll_number"
          value={form.roll_number}
          onChange={handleChange}
          placeholder="e.g. CS2023045"
        />
      </div>

      <div className="form-row">
        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="e.g. priya@example.com"
        />
      </div>

      <div className="form-row">
        <label>Phone *</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
        />
      </div>

      <div className="form-row">
        <label>Date of Birth</label>
        <input
          type="date"
          name="date_of_birth"
          value={form.date_of_birth || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <label>Department *</label>
        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="e.g. Computer Science"
        />
      </div>

      <div className="form-row">
        <label>Year *</label>
        <select
          name="year"
          value={form.year}
          onChange={handleChange}
        >
          <option value="">Select year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      {/* NEW CITY FIELD */}
      <div className="form-row">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={form.city || ""}
          onChange={handleChange}
          placeholder="e.g. Chennai"
        />
      </div>

      <div className="form-row">
        <label>Address</label>
        <textarea
          name="address"
          value={form.address || ""}
          onChange={handleChange}
          placeholder="Street, City, State"
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingStudent ? "Update Student" : "Add Student"}
        </button>

        {editingStudent && (
          <button
            type="button"
            className="secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}