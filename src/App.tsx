import { ToastContainer } from "react-toastify";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-4xl">
        <TaskList />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;
