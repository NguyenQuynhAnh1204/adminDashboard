// theme.js
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
          body: {
            transition: "background-color 0.5s ease-in-out, color 0.4s ease",
          },
          // "#root": {
          //   transition: "background-color 1s ease, color 0.5s ease",
          // },
        },
      },

      MuiDataGrid: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "light" ? "#f8fafc" : "#282626ff",
            color: mode === "light" ? "#555" : "#ccc",
            border: "none",
          },

          row: {
              "&.MuiDataGrid-row:hover": {
                backgroundColor:
                  mode === "light"
                    ? "rgba(164, 163, 163, 0.25)"
                    : "rgba(255, 255, 255, 0.15)",
            },
          },


          columnHeaders: {
            backgroundColor:
              mode === "light" ? "#eaeff5" : "#24282dff",
            color: mode === "light" ? "#1e293b" : "#ffffff",
            fontWeight: "bold",
          },
        },
      },
    },
  });
