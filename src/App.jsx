import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

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
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
