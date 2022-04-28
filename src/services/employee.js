import { v4 as uuidv4 } from "uuid";

const KEYS = {
  employees: "employees",
  employeeId: "employeeId",
};

export const getDepartmentCollection = () => [
  { id: 1, title: "Development" },
  { id: 2, title: "Marketing" },
  { id: 3, title: "Accounting" },
  { id: 4, title: "HR" },
];

export const insertEmployee = (data) => {
  let allEmployees = getAllEmployees();
  allEmployees.push({ ...data, id: uuidv4() });
  localStorage.setItem(KEYS.employees, JSON.stringify(allEmployees));
};

export const updateEmployee = (data) => {
  let allEmployees = getAllEmployees();
  let recordIndex = allEmployees.findIndex(x => x.id === data.id)
  allEmployees[recordIndex] = {...data}
  localStorage.setItem(KEYS.employees, JSON.stringify(allEmployees));
};

export const deleteEmployee = (employeeId) => {
  let allEmployees = getAllEmployees();
  let recordIndex = allEmployees.filter(x => x.id !== employeeId)
  localStorage.setItem(KEYS.employees, JSON.stringify(recordIndex));
};

export const getAllEmployees = () => {
  if (localStorage.getItem(KEYS.employees) === null)
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  const departments = getDepartmentCollection();
  const employees = JSON.parse(localStorage.getItem(KEYS.employees)).map(
    (employee) => {
      return {
      ...employee,
      department: departments[employee.departmentId - 1].title,
    }}
  );
  return employees;
};
