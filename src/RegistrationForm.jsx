import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./form.css";
import { set } from "react-hook-form";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState("light");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    car: "",
    plate: "",
    mileage: "",
    country: "fi",
    service: [],
    garage: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });



  const [errors, setErrors] = useState({});

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    const updated = formData.service.includes(value)
      ? formData.service.filter((s) => s !== value)
      : [...formData.service, value];
    setFormData({ ...formData, service: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "⚠️ Please enter your name";
    }
    if (!/^\+?\d{7,}$/.test(formData.phone)) {
      newErrors.phone = "⚠️ Please enter a valid phone number";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "⚠️ Invalid email format (must contain '@')";
    }
    return newErrors;
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setSubmitted(true);
  playSound();

  const serviceID = 'service_rzosfqv';
  const templateID = 'template_x346h1n';
  const publicKey = 'd3jhxJ4JZxxiYZGWO';

  // Преобразуем mileage и service перед отправкой
  const transformedData = {
    ...formData,
    mileage: String(Number(formData.mileage) * 1000), // Преобразуем в 4000, если введено 4
    service: formData.service.join(", "), // Превращаем массив в строку
    date: new Date().toLocaleString(),
    message: formData.message || "Ми з вами зв'яжемося найближчим часом!",
  };

  emailjs.send(serviceID, templateID, transformedData, publicKey)
    .then(() => setSubmitted(true))
    .catch((err) => console.error('Email failed:', err));
};

const playSound = () => {
  const audio = new Audio("car-sound.mp3");  
  audio.play();
};

  const getDialCode = (countryCode) => {
    const dialMap = {
      at: "+43", be: "+32", bg: "+359", hr: "+385", cy: "+357",
      cz: "+420", dk: "+45", ee: "+372", fi: "+358", fr: "+33",
      de: "+49", gr: "+30", hu: "+36", ie: "+353", it: "+39",
      lv: "+371", lt: "+370", lu: "+352", mt: "+356", nl: "+31",
      no: "+47", pl: "+48", pt: "+351", ro: "+40", sk: "+421",
      si: "+386", es: "+34", se: "+46", ch: "+41", ua: "+380",
      gb: "+44", us: "+1"
    };
    return dialMap[countryCode] || "";
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`form-wrapper ${theme}`}>
      <div className="sidebar">
        <ul>
          <li className={step === 1 ? "active" : ""}>1. Info</li>
          <li className={step === 2 ? "active" : ""}>2. Service</li>
          <li className={step === 3 ? "active" : ""}>3. Garage</li>
          <li className={step === 4 ? "active" : ""}>4. Contact</li>
        </ul>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      <div className="form-content">
        {!submitted ? (
          <>
            {step === 1 && (
              <>
                <h2>Location & Car Info</h2>
                <label htmlFor="location">City or postcode</label>
                <input name="location" placeholder="Search by street address" onChange={handleChange} />

                <label htmlFor="car">Car details</label>
                <div className="plate-km-row">
                  <div className="plate-wrapper">
                    <div className="plate-combined">
                      <select name="plateCountry" onChange={handleChange} className="garage-select" defaultValue="FIN">
                        {/* Country options */}
                        <option value="FIN">FIN</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="BG">BG</option>
                        <option value="H">H</option>
                        <option value="D">D</option>
                        <option value="GR">GR</option>
                        <option value="DK">DK</option>
                        <option value="IRL">IRL</option>
                        <option value="E">E</option>
                        <option value="I">I</option>
                        <option value="CY">CY</option>
                        <option value="LV">LV</option>
                        <option value="LT">LT</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="NL">NL</option>
                        <option value="PL">PL</option>
                        <option value="P">P</option>
                        <option value="RO">RO</option>
                        <option value="SK">SK</option>
                        <option value="SLO">SLO</option>
                        <option value="UA">UA</option>
                        <option value="F">F</option>
                        <option value="HR">HR</option>
                        <option value="S">S</option>
                        <option value="EST">EST</option>
                      </select>
                      <input name="plate" placeholder="ABC-123" onChange={handleChange} maxLength={7} pattern="[A-Z]{3}-[0-9]{3}" />
                    </div>
                  </div>
                </div>

                <div className="km-wrapper">
                  <label htmlFor="mileage">Mileage</label>
                  <div className="km-group">
                    <input name="mileage" placeholder="0" onChange={handleChange} maxLength={4} type="number" min="0" step="1" className="km-input" />
                    <div className="km-suffix">000 km</div>
                  </div>
                </div>

                <button onClick={handleNext}>Next →</button>
              </>
            )}

            {step === 2 && (
              <>
                <h2>Select Services</h2>
                <div className="checkbox-group">
                  {[
                    "Oil Change", "Brake Service", "Battery Service", "Tyre Change",
                    "Engine Service", "Interior Cleaning", "Exterior Cleaning", "Detailing Service",
                    "Paint Protection", "Wheel Alignment", "Inspection Service", "Transmission Service",
                    "Exhaust System", "Suspension Service", "Cooling System Service",
                    "Air Conditioning Service", "Fuel System Service", "Electrical System Service", "Window Tinting"
                  ].map((service) => (
                    <label key={service} className="checkbox-item">
                      <span>{service}</span>
                      <input type="checkbox" value={service} onChange={handleServiceChange} checked={formData.service.includes(service)} />
                    </label>
                  ))}
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
                <select name="garage" onChange={handleChange} className="garage-select">
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
                {errors.name && <div className="error">{errors.name}</div>}

                <div className="phone-input-container">
                  <div className="flag-dropdown">
                    <img src={`https://flagcdn.com/w40/${formData.country}.png`} alt={formData.country} className="flag-icon" />
                    <span className="dial-code">{getDialCode(formData.country)}</span>
                    <select name="country" value={formData.country} onChange={handleChange} className="country-select">
                      {/* Country options... */}
                      <option value="at">+43</option>
                      <option value="be">+32</option>
                      <option value="bg">+359</option>
                      <option value="hr">+385</option>
                      <option value="cy">+357</option>
                      <option value="cz">+420</option>
                      <option value="dk">+45</option>
                      <option value="ee">+372</option>
                      <option value="fi">+358</option>
                      <option value="fr">+33</option>
                      <option value="de">+49</option>
                      <option value="gr">+30</option>
                      <option value="hu">+36</option>
                      <option value="ie">+353</option>
                      <option value="it">+39</option>
                      <option value="lv">+371</option>
                      <option value="lt">+370</option>
                      <option value="lu">+352</option>
                      <option value="mt">+356</option>
                      <option value="nl">+31</option>
                      <option value="no">+47</option>
                      <option value="pl">+48</option>
                      <option value="pt">+351</option>
                      <option value="ro">+40</option>
                      <option value="sk">+421</option>
                      <option value="si">+386</option>
                      <option value="es">+34</option>
                      <option value="se">+46</option>
                      <option value="ch">+41</option>
                      <option value="ua">+380</option>
                      <option value="gb">+44</option>
                      <option value="us">+1</option>
                      {/* Додай інші, якщо треба */}
                    </select>
                  </div>

                  <input name="phone" placeholder="Phone number" onChange={handleChange} className="phone-input" />
                  {errors.phone && <div className="error">{errors.phone}</div>}
                </div>

                <input name="email" placeholder="Email" onChange={handleChange} />
                {errors.email && <div className="error">{errors.email}</div>}

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
