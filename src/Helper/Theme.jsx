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
            transition: "background-color 0.5s ease-in-out, color 0.4s ease",
          },
          ".MuiDataGrid-main": {
            transition: "background-color 0.5s ease-in-out, color 0.4s ease",
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



// MuiDataGrid: {
//         styleOverrides: {
//           root: {
//             backgroundColor: mode === "light" ? "#f8fafc" : "#282626ff",
//             color: mode === "light" ? "#555" : "#ccc",
//             border: "none",
//           },

//           columnHeaders: {
//             backgroundColor: mode === "light" ? "#eaeff5" : "#24282dff",
//             color: mode === "light" ? "#1e293b" : "#fff",
//             fontWeight: "bold",
//           },

//           cell: {
//             borderBottom:
//               mode === "light"
//                 ? "1px solid #e2e8f0"
//                 : "1px solid #3a3f45",
//           },

//           footerContainer: {
//             backgroundColor: mode === "light" ? "#f1f5f9" : "#24282dff",
//           },
//         },
//       },