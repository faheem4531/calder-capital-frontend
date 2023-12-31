import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClients } from "./client.thunk";
import axios from "axios";
import { toast } from 'react-toastify';

export const getPayments = createAsyncThunk("payments/getPayments", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res?.data) {
      dispatch(getClients());
    }
    return res?.data;
  } catch (error) {
    console.error(error);
  }
});

export const deletePayment = createAsyncThunk("payments/deletePayment", async ({ id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPayments());
    toast("Payment deleted successfully", { type: "success" })
  } catch (error) {
    console.error(error);
    toast(`Failed to delete payment: ${error.message}`, { type: "error" })
  }
});

export const updatePayment = createAsyncThunk("payments/updatePayment", async ({ data, id }, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    if (res?.data) {
      dispatch(getPayments());
      toast("Payment updated successfully", { type: "success" })
    }
    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to update payment: ${error.message}`, { type: "error" })
  }
});

export const addPayment = createAsyncThunk("payments/addClient", async (data, { dispatch }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getPayments());
    toast("Payment added successfully", { type: "success" })
    return res?.data;
  } catch (error) {
    console.error(error);
    toast(`Failed to add payment: ${error.message}`, { type: "error" })
  }
});