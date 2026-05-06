import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-[#F7F7F7]">

      {/* Sidebar */}
      <div className="w-72 bg-black text-white flex flex-col px-6 py-8">

        {/* Logo */}
        <div>
          <h1 className="text-4xl font-bold">
            GiveWings
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Transform surplus into impact.
          </p>
        </div>

        {/* Role Badge */}
        <div className="mt-6">
          <span className="
            bg-green-500
            text-black
            text-xs
            font-bold
            px-3
            py-1
            rounded-full
          ">
            {user?.role}
          </span>
        </div>

        {/* Navigation */}
        <div className="mt-14 flex flex-col gap-3">

          {/* Common */}
          <Link
            to="/dashboard"
            className="
              text-left
              px-4
              py-3
              rounded-xl
              bg-green-500
              text-black
              font-medium
            "
          >
            Dashboard
          </Link>

          {/* DONOR NAVIGATION */}
          {user?.role === "DONOR" && (
            <>
              <Link
                to="/create-donation"
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  hover:bg-zinc-900
                  transition
                "
              >
                Create Donation
              </Link>

              <Link
                to="/my-donations"
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  hover:bg-zinc-900
                  transition
                "
              >
                My Donations
              </Link>
            </>
          )}

          {/* NGO NAVIGATION */}
          {user?.role === "NGO" && (
            <>
              <Link
                to="/nearby-donations"
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  hover:bg-zinc-900
                  transition
                "
              >
                Nearby Donations
              </Link>

              <Link
                to="/accepted-donations"
                className="
                  text-left
                  px-4
                  py-3
                  rounded-xl
                  hover:bg-zinc-900
                  transition
                "
              >
                Accepted Donations
              </Link>
            </>
          )}

        </div>

        {/* Bottom Section */}
        <div className="mt-auto">

          {/* Impact Card */}
          <div className="
            bg-zinc-900
            rounded-2xl
            p-4
          ">
            <p className="text-sm text-gray-400">
              Impact this month
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              1,240 Meals
            </h2>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              mt-4
              w-full
              py-3
              rounded-xl
              bg-zinc-800
              hover:bg-zinc-700
              transition
            "
          >
            Logout
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {children}
      </div>

    </div>
  );
}