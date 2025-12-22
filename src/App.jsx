import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ErrorFallback({ error }) {
  return (
    <div role="alert" style={{ padding: 20 }}>
      <h2>Đã xảy ra lỗi!</h2>
      <p>{error.message}</p>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        pauseOnHover
        closeOnClick
      />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
