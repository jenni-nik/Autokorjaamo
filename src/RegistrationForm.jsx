import React, { useState } from "react";
import "./form.css";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    car: "",
    service: [],
    garage: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => setStep((s) => s - 1);

  const handleChange = (e) => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const handleServiceChange = (e) => {
    const value = e.target.value;
    const updated = formData.service.includes(value)
      ? formData.service.filter((s) => s !== value)
      : [...formData.service, value];
    setFormData({ ...formData, service: updated });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="form-wrapper">
      <div className="sidebar">
        <ul>
          <li className={step === 1 ? "active" : ""}>1. Info</li>
          <li className={step === 2 ? "active" : ""}>2. Service</li>
          <li className={step === 3 ? "active" : ""}>3. Garage</li>
          <li className={step === 4 ? "active" : ""}>4. Contact</li>
        </ul>
      </div>
      <div className="form-content">
        {!submitted ? (
          <>
            {step === 1 && (
              <>
                <h2>Location & Car Info</h2>
                <input name="location" placeholder="Location" onChange={handleChange} />
                <input name="car" placeholder="Car registration" onChange={handleChange} />
                <button onClick={handleNext}>Next →</button>
              </>
            )}
            {step === 2 && (
  <>
    <h2>Select Services</h2>
    <div className="checkbox-group">
      <label className="checkbox-item">
        <span>Wheel Alignment</span>
        <input
          type="checkbox"
          value="Wheel Alignment"
          onChange={handleServiceChange}
          checked={formData.service.includes("Wheel Alignment")}
        />
      </label>
      <label className="checkbox-item">
        <span>Inspection Service</span>
        <input
          type="checkbox"
          value="Inspection Service"
          onChange={handleServiceChange}
          checked={formData.service.includes("Inspection Service")}
        />
      </label>
    </div>
    <div>
      <button onClick={handlePrev}>← Back</button>
      <button onClick={handleNext}>Next →</button>
    </div>
  </>
)}

            {step === 3 && (
              <>
                <h2>Select Garage</h2>
                <select name="garage" onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Kamfix">Kamfix</option>
                  <option value="2X Motors">2X Motors</option>
                </select>
                <div>
                  <button onClick={handlePrev}>← Back</button>
                  <button onClick={handleNext}>Next →</button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h2>Contact Info</h2>
                <input name="name" placeholder="Your name" onChange={handleChange} />
                <input name="phone" placeholder="Phone" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <textarea name="message" placeholder="Message" onChange={handleChange} />
                <div>
                  <button onClick={handlePrev}>← Back</button>
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="success-message">
            <h2>✅ Registered Successfully!</h2>
            <p>Thank you for booking your car service.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
