import React from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold text-[#111111]">
            Welcome Back 👋
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Manage donations, impact, and rescue operations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-10">
          <div className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          ">
            <p className="text-gray-500">
              Donations Created
            </p>

            <h2 className="text-4xl font-bold mt-4">
              24
            </h2>
          </div>

          <div className="
            bg-green-100
            rounded-3xl
            p-6
            shadow-sm
          ">
            <p className="text-green-700">
              Meals Rescued
            </p>

            <h2 className="text-4xl font-bold mt-4 text-green-700">
              1,240
            </h2>
          </div>

          <div className="
            bg-white
            rounded-3xl
            p-6
            shadow-sm
          ">
            <p className="text-gray-500">
              CO₂ Avoided
            </p>

            <h2 className="text-4xl font-bold mt-4">
              480kg
            </h2>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}