import React, { useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import EmployeeForm from "./EmployeeForm";
import {
  InputAdornment,
  makeStyles,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import useTable from "../../hooks/useTable";
import { getAllEmployees } from "../../services/employee";
import Controls from "../../components/controls";
import {
  Add,
  Close as CloseIcon,
  EditOutlined,
  Search,
} from "@material-ui/icons";
import * as employeeService from "../../services/employee";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "fullName", label: "Employee Name" },
  { id: "email", label: "Email Address(Personal)" },
  { id: "mobile", label: "Mobile Number" },
  { id: "department", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Employees = () => {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(getAllEmployees());
  const [filterFn, setFilterFn] = useState({ fn: (item) => item });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "success",
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPaginationAndSorting,
  } = useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter((x) => x.fullName.includes(target.value));
        }
      },
    });
  };

  const addEmployeeHandler = () => {
    setRecordForEdit(null);
    setOpenPopup(true);
  };

  const addOrEditEmployee = (employee, resetForm) => {
    if (employee.id === 0) {
      employeeService.insertEmployee(employee);
    } else {
      employeeService.updateEmployee(employee);
      setRecordForEdit(null);
    }
    resetForm();
    setOpenPopup(false);
    setRecords(getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Record Submitted Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const handleDelete = (employeeId) =>{
    employeeService.deleteEmployee(employeeId);
    setRecords(getAllEmployees());
    setNotify({
      isOpen: true,
      message: "Record Deleted Successfully",
      type: "error",
    });
  }

  return (
    <>
      <PageHeader
        title="New Employee"
        subTitle="Form design with Validation"
        icon={<PeopleOutlineIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Employees"
            className={classes.searchInput}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Controls.Button
            text="Add New"
            className={classes.newButton}
            variant="outlined"
            startIcon={<Add />}
            onClick={addEmployeeHandler}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPaginationAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlined fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="secondary"
                    onClick={()=>{handleDelete(item.id)}}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Controls.Popup
        title="Add New Employee"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm
          addOrEditEmployee={addOrEditEmployee}
          recordForEdit={recordForEdit}
        />
      </Controls.Popup>
      <Controls.Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Employees;
