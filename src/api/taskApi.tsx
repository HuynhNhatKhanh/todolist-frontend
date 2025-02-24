import axiosInstance from "../services/axios/axiosInstance";
import { toast } from "react-toastify";

const API_URL = "/tasks";

// Fetch the task list
export const getTasks = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch tasks. Please try again.");
    throw error;
  }
};

// Add a new task
export const addTask = async (task: {
  title: string;
  description: string;
  completed: boolean;
}) => {
  try {
    const response = await axiosInstance.post(API_URL, task);
    toast.success("Task added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add task. Please try again.");
    throw error;
  }
};

// Update task status
export const updateTask = async (id: number, completed: boolean) => {
  try {
    const response = await axiosInstance.put(`${API_URL}/${id}`, {
      completed: completed,
    });
    toast.success("Task updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update task. Please try again.");
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: number) => {
  try {
    await axiosInstance.delete(`${API_URL}/${id}`);
    toast.success("Task deleted successfully!");
  } catch (error) {
    toast.error("Failed to delete task. Please try again.");
    throw error;
  }
};
