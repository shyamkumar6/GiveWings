import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getAcceptedDonations,
  completeDonation
} from "../../services/listingService";


export default function AcceptedDonationsPage() {

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
        await getAcceptedDonations();

      setDonations(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };


  const handleComplete = async (
    listingId: string
  ) => {

    try {

      await completeDonation(
        listingId
      );

      setDonations((prev) =>
        prev.filter(
          (item) =>
            item._id !== listingId
        )
      );

      alert(
        "Donation marked completed"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to complete donation"
      );
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
            Accepted Donations
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Donations currently
            reserved for pickup.
          </p>

        </div>


        {/* Loading */}
        {loading && (
          <p>
            Loading accepted donations...
          </p>
        )}


        {/* Empty State */}
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
              No active pickups
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Accepted donations
              will appear here.
            </p>

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
              <div className="
                mt-4
                inline-block
                px-3
                py-1
                rounded-full
                bg-blue-100
                text-blue-700
                text-sm
                font-medium
              ">
                RESERVED
              </div>


              {/* Complete Button */}
              <button

                onClick={() =>
                  handleComplete(item._id)
                }

                className="
                  mt-6
                  w-full
                  py-3
                  rounded-2xl
                  bg-black
                  hover:bg-zinc-800
                  text-white
                  font-semibold
                  transition
                "
              >
                Mark Pickup Complete
              </button>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}