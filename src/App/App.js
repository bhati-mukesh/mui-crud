import { createTheme, MuiThemeProvider } from "@material-ui/core";
import Navbar from "../components/Navbar/Navbar";
import SideMenu from "../components/SideMenu/SideMenu";
import "./App.css";
import Employees from "../pages/Employess/Employees";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f4f5fd",
    },
  },
});

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <SideMenu />
        <div className="app-main-container">
          <Navbar />
          <Employees />
        </div>
      </MuiThemeProvider>
    </>
  );
}

export default App;
