import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Controls from "../../components/controls";
import useForm, { Form } from "../../hooks/useForm";
import * as employeeService from "../../services/employee";

const initialValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  city: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const radioOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const EmployeeForm = ({ addOrEditEmployee, recordForEdit }) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile?.length >= 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId = fieldValues.departmentId
        ? ""
        : "This field is required.";
    setErrors({ ...temp });
    if (fieldValues === values)
      return Object.values(temp).every((error) => error === "");
  };

  const { handleInputChange, values, errors, setErrors, resetForm, setValues } =
    useForm(initialValues, true, validate);

  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({ ...recordForEdit });
    }
  }, [recordForEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      addOrEditEmployee(values, resetForm);

      // employeeService.insertEmployee(values);
      // resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            name="mobile"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Controls.Input
            name="city"
            label="City"
            value={values.city}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            label="Gender"
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            options={radioOptions}
          ></Controls.RadioGroup>
          <Controls.Select
            label="Department"
            name="departmentId"
            value={values.departmentId}
            onChange={handleInputChange}
            options={employeeService.getDepartmentCollection()}
            error={errors.departmentId}
          ></Controls.Select>
          <Controls.DatePicker
            label="Hire Date"
            name="hireDate"
            value={values.hireDate}
            onChange={handleInputChange}
          ></Controls.DatePicker>
          <Controls.CheckBox
            label="Permanent Employee"
            name="isPermanent"
            value={values.isPermanent}
            onChange={handleInputChange}
          ></Controls.CheckBox>
          <div>
            <Controls.Button text="Submit" type="submit"></Controls.Button>
            <Controls.Button
              text="Reset"
              color="default"
              onClick={resetForm}
            ></Controls.Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmployeeForm;
