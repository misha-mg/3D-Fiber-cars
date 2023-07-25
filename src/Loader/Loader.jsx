import React, { Suspense } from "react";
import "./loader.css";
import { CircularProgress } from "@mui/material";
import load from "./loading.webp";

export default function Loader() {
  return (
    <div className="loader-wrapper">
      {/* <CircularProgress /> */}

      <img src={load} alt="" />
    </div>
  );
}
