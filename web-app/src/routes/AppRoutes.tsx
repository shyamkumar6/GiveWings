import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/common/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import CreateListingPage from "../pages/donor/CreateListingPage";
import NearbyDonationsPage from "../pages/ngo/NearbyDonationsPage";
import AcceptedDonationsPage from "../pages/ngo/AcceptedDonationsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
            path="/create-donation"
            element={
                <ProtectedRoute>
                <CreateListingPage />
                </ProtectedRoute>
            }
            />

        <Route
            path="/nearby-donations"
            element={
                <ProtectedRoute>
                <NearbyDonationsPage />
                </ProtectedRoute>
            }
            />
            <Route
            path="/accepted-donations"
            element={
              <ProtectedRoute>
                <AcceptedDonationsPage />
              </ProtectedRoute>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}