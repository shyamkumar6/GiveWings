import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getMyDonations
} from "../../services/listingService";


export default function MyDonationsPage() {

  const [donations, setDonations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetchDonations();

  }, []);


  const fetchDonations = async () => {

    try {

      const data =
        await getMyDonations();

      setDonations(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };


  const getStatusColor = (
  status: string
) => {

  switch (status) {

    case "AVAILABLE":
      return "bg-yellow-100 text-yellow-700";

    case "RESERVED":
      return "bg-blue-100 text-blue-700";

    case "COMPLETED":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};


  return (
    <DashboardLayout>

      <div>

        {/* Header */}
        <div className="mb-8">

          <h1 className="
            text-4xl
            font-bold
          ">
            My Donations
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Track the status
            of your donations.
          </p>

        </div>


        {/* Loading */}
        {loading && (
          <p>
            Loading donations...
          </p>
        )}


        {/* Empty */}
        {!loading &&
          donations.length === 0 && (

          <div className="
            bg-white
            rounded-3xl
            p-10
            shadow-sm
            text-center
          ">

            <h2 className="
              text-2xl
              font-semibold
            ">
              No donations yet
            </h2>

          </div>

        )}


        {/* Cards */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        ">

          {donations.map((item) => (

            <div
              key={item._id}
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-sm
              "
            >

              {/* Category */}
              <div className="
                inline-block
                px-3
                py-1
                rounded-full
                bg-green-100
                text-green-700
                text-sm
                font-medium
              ">
                {item.category}
              </div>


              {/* Title */}
              <h2 className="
                text-2xl
                font-bold
                mt-4
              ">
                {item.title}
              </h2>


              {/* Description */}
              <p className="
                text-gray-600
                mt-3
              ">
                {item.description}
              </p>


              {/* Quantity */}
              <div className="
                mt-6
                text-lg
                font-semibold
              ">
                {item.quantity}
                {" "}
                {item.unit}
              </div>


              {/* Status */}
              <div className={`
                mt-5
                inline-block
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${getStatusColor(
                  item.status
                )}
              `}>
                {item.status}
              </div>


              {/* Created */}
              <div className="
                mt-5
                text-sm
                text-gray-500
              ">
                Created:
                {" "}

                {
                  new Date(
                    item.created_at
                  ).toLocaleString()
                }
              </div>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}