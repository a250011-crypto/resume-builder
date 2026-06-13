import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import styles from "./Education.module.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, setEducationStep, setFormData } from "../../Redux/formSlice";

export default function Education() {
  const [errors, setErrors] = useState({});
  const formData = useSelector((state) => state.form.formData);
  const educationStep = useSelector((state) => state.form.educationStep);

  const [activeForm, setActiveForm] = useState(educationStep || "HSC");
  const dispatch = useDispatch();
  console.log("formData", formData);
  const [educationData, setEducationData] = useState({
    HSC: { board: "", school: "", stream: "", passingYear: "", percentage: "" },
    SSC: { board: "", school: "", passingYear: "", percentage: "" },
    Degree: { degreeName: "", collegeName: "", university: "", passingYear: "", percentage: "" },
  });
  
  useEffect(() => {
  if (!formData) return;

  setEducationData((prev) => ({
    HSC:
      formData?.HSC && Object.values(formData?.HSC).some(Boolean)
        ? { ...prev.HSC, ...formData?.HSC }
        : prev.HSC,

    SSC:
      formData?.SSC && Object.values(formData?.SSC).some(Boolean)
        ? { ...prev.SSC, ...formData?.SSC }
        : prev.SSC,

    Degree:
      formData?.Degree && Object.values(formData?.Degree).some(Boolean)
        ? { ...prev.Degree, ...formData?.Degree }
        : prev.Degree,
  }));
// 👇 IMPORTANT: run ONLY when redux formData changes (page load / refresh)
}, [formData]);


  // ✅ BOARD LIST DATA
  const boardList = [
    { id: 1, name: "CENTRAL BOARD OF SECONDARY EDUCATION", location: "NEW DELHI" },
    { id: 2, name: "NATIONAL INSTITUTE OF OPEN SCHOOLING", location: "NEW DELHI" },
    { id: 3, name: "COUNCIL FOR THE INDIAN SCHOOL CERTIFICATE EXAMINATIONS", location: "NEW DELHI" },
    { id: 4, name: "BOARD OF INTERMEDIATE EDUCATION", location: "ANDHRA PRADESH" },
    { id: 5, name: "BOARD OF SECONDARY EDUCATION", location: "ANDHRA PRADESH" },
    { id: 6, name: "A.P. OPEN SCHOOL SOCIETY", location: "ANDHRA PRADESH" },
    { id: 7, name: "ASSAM HIGHER SECONDARY EDUCATION COUNCIL", location: "ASSAM" },
    { id: 8, name: "BOARD OF SECONDARY EDUCATION", location: "ASSAM" },
    { id: 9, name: "BIHAR SCHOOL EXAMINATION BOARD", location: "BIHAR" },
    { id: 10, name: "BIHAR BOARD OF OPEN SCHOOLING AND EXAMINATION (BBOSE)", location: "BIHAR" },
    { id: 11, name: "CHHATISGARH BOARD OF SECONDARY EDUCATION", location: "CHHATISGARH" },
    { id: 12, name: "CHHATISGARH STATE OPEN SCHOOL", location: "CHHATISGARH" },
    { id: 13, name: "GOA BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION", location: "GOA" },
    { id: 14, name: "GUJARAT SECONDARY AND HIGHER SECONDARY EDUCATION BOARD", location: "GUJARAT" },
    { id: 15, name: "BOARD OF SCHOOL EDUCATION", location: "HARYANA" },
    { id: 16, name: "H. P. BOARD OF SCHOOL EDUCATION", location: "HIMACHAL PRADESH" },
    { id: 17, name: "THE J & K STATE BOARD OF SCHOOL EDUCATION", location: "JAMMU" },
    { id: 18, name: "JHARKHAND ACADEMIC COUNCIL", location: "RANCHI" },
    { id: 19, name: "GOVT. OF KARNATAKA DEPT. OF PRE-UNIVERSITY EDUCATION", location: "KARNATAKA" },
    { id: 20, name: "KARNATAKA SECONDARY EDUCATION, EXAMINATION BOARD", location: "KARNATAKA" },
    { id: 21, name: "KERALA BOARD OF PUBLIC EXAMINATION", location: "KERALA" },
    { id: 22, name: "KERALA BOARD OF HIGHER SECONDARY EDUCATION", location: "KERALA" },
    { id: 23, name: "BOARD OF VOCATIONAL HIGHER SECONDARY EDUCATION", location: "KERALA" },
    { id: 24, name: "MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION", location: "MAHARASHTRA" },
    { id: 25, name: "BOARD OF SECONDARY EDUCATION", location: "MADHYA PRADESH" },
    { id: 26, name: "M. P. STATE OPEN SCHOOL EDUCATION BOARD", location: "MADHYA PRADESH" },
    { id: 27, name: "BOARD OF SECONDARY EDUCATION", location: "MANIPUR" },
    { id: 28, name: "COUNCIL OF HIGHER SECONDARY EDUCATION", location: "MANIPUR" },
    { id: 29, name: "MEGHALAYA BOARD OF SCHOOL EDUCATION", location: "MEGHALAYA" },
    { id: 30, name: "MIZORAM BOARD OF SCHOOL EDUCATION", location: "MIZORAM" },
    { id: 31, name: "NAGALAND BOARD OF SCHOOL EDUCATION", location: "NAGALAND" },
    { id: 32, name: "BOARD OF SECONDARY EDUCATION", location: "ODISHA" },
    { id: 33, name: "COUNCIL OF HIGHER SECONDARY EDUCATION", location: "ODISHA" },
    { id: 34, name: "PUNJAB SCHOOL EDUCATION BOARD", location: "PUNJAB" },
    { id: 35, name: "BOARD OF SECONDARY EDUCATION", location: "RAJASTHAN" },
    { id: 36, name: "RAJASTHAN STATE OPEN SCHOOL", location: "RAJASTHAN" },
    { id: 37, name: "STATE BOARD OF SCHOOL EXAMINATIONS (SEC.) & BOARD OF HIGHER SECONDARY", location: "TAMIL NADU" },
    { id: 38, name: "BOARD OF SECONDARY EDUCATION", location: "TELANGANA STATE" },
    { id: 39, name: "TELANGANA STATE BOARD OF INTERMEDIATE EDUCATION", location: "TELANGANA" },
    { id: 40, name: "TELANGANA OPEN SCHOOL SOCIETY", location: "TELANGANA" },
    { id: 41, name: "TRIPURA BOARD OF SECONDARY EDUCATION", location: "TRIPURA" },
    { id: 42, name: "U.P. BOARD OF HIGH SCHOOL & INTERMEDIATE EDUCATION", location: "UTTAR PRADESH" },
    { id: 43, name: "BOARD OF SCHOOL EDUCATION", location: "UTTARAKHAND" },
    { id: 44, name: "WEST BENGAL BOARD OF SECONDARY EDUCATION", location: "WEST BENGAL" },
    { id: 45, name: "WEST BENGAL COUNCIL OF HIGHER SECONDARY EDUCATION", location: "WEST BENGAL" },
    { id: 46, name: "THE WEST BENGAL COUNCIL OF RABINDRA OPEN SCHOOLING", location: "WEST BENGAL" },
    { id: 47, name: "WEST BENGAL STATE COUNCIL OF TECHNICAL & VOCATIONAL EDUCATION & SKILL DEVELOPMENT", location: "WEST BENGAL" },
    { id: 48, name: "MAHARISHI PATANJALI SANSKRIT SANSTHAN", location: "NEW DELHI" },
    { id: 49, name: "URDU EDUCATION BOARD", location: "NEW DELHI" },
    { id: 50, name: "BIHAR SANSKRIT SHIKSHA BOARD", location: "BIHAR" },
    { id: 51, name: "U.P. BOARD OF SEC. SANSKRIT EDUCATION SANSKRIT BHAWAN", location: "UTTAR PRADESH" },
    { id: 52, name: "ASSAM SANSKRIT BOARD", location: "ASSAM" },
    { id: 53, name: "JAMIA MILIA ISLAMIA", location: "NEW DELHI" },
    { id: 54, name: "UTTRAKHAND SANSKRIT SHIKSHA PARISHAD", location: "UTTRAKHAND" },
    { id: 55, name: "STATE MADRASSA EDUCATION BOARD", location: "ASSAM" },
    { id: 56, name: "BIHAR STATE MADRASA EDUCATION BOARD", location: "BIHAR" },
    { id: 57, name: "WEST BENGAL BOARD OF MADRASAH EDUCATION", location: "WEST BENGAL" },
    { id: 58, name: "CHHATTISGARH MADRASA BOARD", location: "CHHATTISGARH" },
    { id: 59, name: "UTTARAKHAND MADRASA EDUCATION BOARD", location: "UTTARAKHAND" },
    { id: 60, name: "ALIGARH MUSLIM UNIVERSITY BOARD OF SECONDARY & SR. SECONDARY EDUCATION", location: "UTTAR PARDESH" },
    { id: 61, name: "INDIAN COUNCIL FOR HINDI & SANSKRIT EDUCATION", location: "NEW DELHI" },
    { id: 62, name: "DAYALBAGH EDUCATIONAL INSTITUTE", location: "AGRA" },
    { id: 63, name: "BANASTHALI VIDYAPITH P.O.", location: "RAJASTHAN" },
    { id: 64, name: "BHUTAN COUNCIL FOR SCHOOL EXAMINATIONS & ASSESSMENT", location: "BHUTAN" },
    { id: 65, name: "CAMBRIDGE ASSESSMENT INTERNATIONAL EXAMINATIONS", location: "UK" },
    { id: 66, name: "CHHATTISGARH SANSKRIT BOARD", location: "RAIPUR" },
    { id: 67, name: "MAURITIUS EXAMINATION SYNDICATE", location: "MAURITIUS" },
    { id: 68, name: "NATIONAL EXAMINATIONS BOARD", location: "NEPAL" },
    { id: 69, name: "PEARSON EDEXCEL LTD.", location: "UK" },
    { id: 70, name: "INTERNATIONAL BACCALAUREATE", location: "GENEVA" },
    { id: 71, name: "NORTHWEST ACCREDITATION COMMISSION (NWAC)", location: "USA" },
    { id: 72, name: "SAMPURNANAND SANSKRIT VISHWAVIDYALAY", location: "VARANASI" },
  ];

  // Map the boardList for Autocomplete options
  const boardOptions = boardList.map((board) => ({
    label: `${board.name} (${board.location})`, // Display format
    value: board.name, // Actual value to store
  }));

  const [universityOptions, setUniversityOptions] = useState([]);
  const [uniLoading, setUniLoading] = useState(false);

  useEffect(() => {
    dispatch(setEducationStep(activeForm));
  }, [activeForm, dispatch]);

  const fetchUniversities = async (search) => {
    try {
      setUniLoading(true);
      const res = await axios.get(
        // `https://universities.hipolabs.com/search?name=${encodeURIComponent(search)}`
        `http://universities.hipolabs.com/search?country=India`
      );
      const names = res.data.map((u) => ({
        label: u.name,
        value: u.name,
      }));
      console.log("res", names);
      setUniversityOptions(names);
    } catch (err) {
      console.error("University fetch error", err);
    } finally {
      setUniLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  const handleChange = (section, field, value) => {
    setEducationData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const requiredFields = {
  HSC: ["board", "school", "passingYear", "percentage"], // stream NOT required
  SSC: ["board", "school", "passingYear", "percentage"],
  Degree: ["degreeName", "collegeName", "university", "passingYear", "percentage"],
};

const isRequired = (section, field) =>
  requiredFields[section]?.includes(field);


  const validate = (section) => {
    const formData = educationData[section];
    const newErrors = {};

    // Object.entries(formData).forEach(([key, value]) => {
    //   // Check for empty string/null for required fields
    //   if (!value || (typeof value === 'string' && !value.trim())) {
    //       newErrors[key] = "This field is required";
    //   }
    // });
    requiredFields[section].forEach((field) => {
  if (!formData[field] || !formData[field].toString().trim()) {
    newErrors[field] = "This field is required";
  }
});


    if (formData.passingYear && !/^\d{4}$/.test(formData.passingYear)) {
      newErrors.passingYear = "Enter a valid 4-digit year";
    }

    if (
      formData.percentage &&
      (isNaN(formData.percentage) ||
        formData.percentage < 0 ||
        formData.percentage > 100)
    ) {
      newErrors.percentage = "Percentage must be between 0 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (section) => {
    // if (!validate(section)) return;

    console.log("✅ Submitted:", educationData[section]);

    const updatedFormData = {
      ...formData,
      [section]: educationData[section],
    };

    dispatch(setFormData(updatedFormData));

    // if (section === "HSC") {
    //   setActiveForm("SSC");
    //   dispatch(setEducationStep("SSC"));
    // } else if (section === "SSC") {
    //   setActiveForm("Degree");
    //   dispatch(setEducationStep("Degree"));
    // } else {
    //   dispatch(setEducationStep("Completed"));
    //   dispatch(nextStep());
    // }

     if (section === "SSC") {
      setActiveForm("HSC");
      dispatch(setEducationStep("HSC"));
    } else if (section === "HSC") {
      setActiveForm("Degree");
      dispatch(setEducationStep("Degree"));
    } else {
      dispatch(setEducationStep("Completed"));
      dispatch(nextStep());
    }
  };

  const shouldDisableYear = (section, year) => {
  const y = year.getFullYear();

  if (section === "HSC" && educationData.SSC.passingYear) {
    return y <= Number(educationData.SSC.passingYear);
  }

  if (section === "Degree" && educationData.HSC.passingYear) {
    return y <= Number(educationData.HSC.passingYear);
  }

  return false;
};


  // ✅ NEW FUNCTION FOR BOARD AUTOCOMPLETE
  const renderBoardAutocomplete = (section, field, label) => (
    <FormGroup className={styles.fieldContainer}>
      <Label>
  {label}
  {isRequired(section, field) && (
    <span className={styles.required}> *</span>
  )}
</Label>

      <Autocomplete
        options={boardOptions}
        // Group the boards by location for better UX
        groupBy={(option) => option.label.match(/\(([^)]+)\)$/)?.[1] || "Other"}
        onChange={(event, newValue) => {
          // Store only the board name (the 'value' field)
          handleChange(section, field, newValue ? newValue.value : ""); 
        }}
        // Set the value of the Autocomplete based on the state data
        value={
          boardOptions.find(
            (opt) => opt.value === educationData[section][field]
          ) || null
        }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            // label={label}
            fullWidth
            size="small"
            placeholder="Select Board Name"
            error={!!errors[field]}
            helperText={errors[field]}
            sx={{
              "& .MuiInputBase-root": { borderRadius: "8px", height: "40px" },
            }}
          />
        )}
      />
    </FormGroup>
  );

  // Existing renderInput (used for generic text fields)
  const renderInput = (section, field, label, type = "text") => (
    <FormGroup className={styles.fieldContainer}>
      <Label>
  {label}
  {isRequired(section, field) && (
    <span className={styles.required}> *</span>
  )}
</Label>

      <Input
        type={type}
        value={educationData[section][field]}
        onChange={(e) => handleChange(section, field, e.target.value)}
        className={`${styles.input} ${errors[field] ? styles.errorInput : ""}`}
      />
      {errors[field] && <p className={styles.errorText}>{errors[field]}</p>}
    </FormGroup>
  );

  const renderDate = (section, field, label) => {
      const currentYear = new Date().getFullYear();
  let minYear;

  // Set minimum year based on previous education
  if (section === "HSC" && educationData.SSC.passingYear) {
    minYear = Number(educationData.SSC.passingYear) + 1; // HSC must be after SSC
  } else if (section === "Degree" && educationData.HSC.passingYear) {
    minYear = Number(educationData.HSC.passingYear) + 1; // Degree must be after HSC
  }

   return ( <FormGroup className={styles.fieldContainer}>
      <Label>
  {label}
  {isRequired(section, field) && (
    <span className={styles.required}> *</span>
  )}
</Label>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
         shouldDisableYear={(year) => shouldDisableYear(section, year)}
         
          views={["year"]}
          // label={label}
          value={
            educationData[section][field]
              ? new Date(educationData[section][field], 0)
              : null
          }
          onChange={(newValue) => {
            if (newValue)
              handleChange(section, field, newValue.getFullYear().toString());
          }}
           minDate={minYear ? new Date(minYear, 0) : undefined} // earliest selectable year
          maxDate={new Date(currentYear, 11)} // prevent future years
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              placeholder: "Select Year",
              error: !!errors[field],
              helperText: errors[field],
              sx: {
                "& .MuiInputBase-root": {
                  borderRadius: "8px",
                  height: "40px",
                },
                "& .MuiInputBase-input": {
                  padding: "8px 10px",
                  fontSize: "0.95rem",
                },
              },
            },
          }}
        />
      </LocalizationProvider>
      {/* {errors[field] && <p className={styles.errorText}>{errors[field]}</p>} */}
    </FormGroup>)
};

  const renderForm = (section) => {
    const forms = {
      SSC: (
        <>
          <Row>
            {/* ✅ MODIFIED: Using Autocomplete for Board Name */}
            <Col md={6}>{renderBoardAutocomplete("SSC", "board", "Board Name")}</Col>
            <Col md={6}>{renderInput("SSC", "school", "School Name")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderDate("SSC", "passingYear", "Passing Year")}</Col>
            <Col md={6}>{renderInput("SSC", "percentage", "Percentage")}</Col>
          </Row>
          <div className={styles.buttonContainer}>
            <Button color="primary" onClick={() => handleSubmit("SSC")}>
              Save & Next
            </Button>
          </div>
        </>
      ),
      HSC: (
        <>
          <Row>
            {/* ✅ MODIFIED: Using Autocomplete for Board Name */}
            <Col md={6}>{renderBoardAutocomplete("HSC", "board", "Board Name")}</Col>
            <Col md={6}>{renderInput("HSC", "school", "School Name")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderInput("HSC", "stream", "Stream")}</Col>
            <Col md={6}>{renderDate("HSC", "passingYear", "Passing Year")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderInput("HSC", "percentage", "Percentage")}</Col>
          </Row>
          <div className={styles.buttonContainer}>
            <Button color="primary" onClick={() => handleSubmit("HSC")}>
              Save & Next
            </Button>
          </div>
        </>
      ),
      Degree: (
        <>
          <Row>
            <Col md={6}>{renderInput("Degree", "degreeName", "Degree Name")}</Col>
            <Col md={6}>{renderInput("Degree", "collegeName", "College Name")}</Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup className={styles.fieldContainer}>
                <Label>University</Label>
                <Autocomplete
                  options={universityOptions}
                  loading={uniLoading}
                  onInputChange={(event, newInputValue) => {
                    // Only fetch if input is long enough
                    if (newInputValue.length > 2) fetchUniversities(newInputValue);
                  }}
                  onChange={(event, newValue) => {
                    handleChange("Degree", "university", newValue?.label || "");
                  }}
                  value={
                    universityOptions.find(
                      (opt) => opt.label === educationData.Degree.university
                    ) || null
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // label="University"
                      fullWidth
                      size="small"
                      placeholder="Select University"
                      error={!!errors.university}
                      helperText={errors.university}
                      sx={{
                        "& .MuiInputBase-root": { borderRadius: "8px", height: "40px" },
                      }}
                    />
                  )}
                />
              </FormGroup>
            </Col>
            <Col md={6}>{renderInput("Degree", "percentage", "Percentage")}</Col>
          </Row>
          <Row>
            <Col md={6}>{renderDate("Degree", "passingYear", "Passing Year")}</Col>
          </Row>
          <div className={styles.buttonContainer}>
            <Button color="success" onClick={() => handleSubmit("Degree")}>
              Finish
            </Button>
          </div>
        </>
      ),
    };
    return <Form>{forms[section]}</Form>;
  };

  return (
    <div className={styles.container}>
      {["SSC", "HSC", "Degree"].map((section) => (
        <div key={section} className={styles.section}>
          <div
            className={styles.header}
            onClick={() => setActiveForm(section)}
          >
            <span>{section}</span>
            <span>{activeForm === section ? "▲" : "▼"}</span>
          </div>
          {activeForm === section && (
            <div className={styles.formContainer}>{renderForm(section)}</div>
          )}
        </div>
      ))}
    </div>
  );
}