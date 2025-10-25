"use client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../spa/App";

export default function SPAApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
