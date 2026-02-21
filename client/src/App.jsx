import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TasksFormPage from "./pages/TasksFormPage";
import TasksPage from "./pages/TasksPage";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Nabvar";

function App() {
  return (
    <>
      <BrowserRouter>
        <TaskProvider>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              {/* públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* privadas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/add-task" element={<TasksFormPage />} />
                <Route path="/tasks/:id" element={<TasksFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </TaskProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
