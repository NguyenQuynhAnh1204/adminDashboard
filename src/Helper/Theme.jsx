// theme.js
import { colors } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode, // 👈 Bắt buộc để MUI tự hiểu light/dark
      ...(mode === "light"
        ? {
            background: {
              default: "#f8fafc",
              paper: "#ffffff",
            },
            text: {
              primary: "#1e293b",
            },
          }
        : {
            background: {
              default: "#282626ff",
              paper: "#24282dff",
            },
            text: {
              primary: "#ffffff",
            },
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-row:hover": {
              backgroundColor:
                mode === "light"
                  ? "#cfcdcdff"
                  : "rgba(255,255,255,0.15)",
            },
          },
          body: {
            transition: "background-color 0.5s ease-in, color 0.4s ease",
          },
          ".MuiDataGrid-main": {
            transition: "background-color 0.5s ease-in, color 0.5s ease",
            backgroundColor: mode === "light" ? "#f8fafc" : "#282626ff",
            color: mode === "light" ? "#555" : "#fff",
          }
        },
      }

    },

    MUIDataGrid: {
      headerBg: '#eaeff5',
    }

  });



