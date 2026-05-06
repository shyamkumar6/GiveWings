import React, {
  useEffect,
  useState,
} from "react";

import DashboardLayout
  from "../../layouts/DashboardLayout";

import {
  getNearbyDonations,
  acceptDonation
} from "../../services/listingService";


export default function NearbyDonationsPage() {

  const [donations, setDonations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);


  /* =========================
     FETCH NEARBY DONATIONS
  ========================= */

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const lat =
            position.coords.latitude;

          const lng =
            position.coords.longitude;

          const data =
            await getNearbyDonations(
              lat,
              lng
            );

          setDonations(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);
        }
      },

      (error) => {

        console.error(
          "Location error:",
          error
        );

        setLoading(false);
      }

    );

  }, []);


  /* =========================
     ACCEPT DONATION
  ========================= */

  const handleAccept = async (
    listingId: string
  ) => {

    try {

      await acceptDonation(
        listingId
      );

      // Remove accepted donation
      // instantly from UI
      setDonations((prev) =>
        prev.filter(
          (item) =>
            item._id !== listingId
        )
      );

      alert(
        "Donation accepted successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to accept donation"
      );
    }
  };


  return (
    <DashboardLayout>

      <div>

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-8">

          <h1 className="
            text-4xl
            font-bold
            text-black
          ">
            Nearby Donations
          </h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Live donations available
            around your area.
          </p>

        </div>


        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <p className="
            text-lg
            text-gray-500
          ">
            Loading nearby donations...
          </p>
        )}


        {/* =========================
            EMPTY STATE
        ========================= */}

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
              No nearby donations found
            </h2>

            <p className="
              text-gray-500
              mt-2
            ">
              Try again later.
            </p>

          </div>

        )}


        {/* =========================
            DONATION CARDS
        ========================= */}

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
                bg-yellow-100
                text-yellow-700
                text-sm
                font-medium
              ">
                {item.status}
              </div>


              {/* Accept Button */}
              <button

                onClick={() =>
                  handleAccept(item._id)
                }

                className="
                  mt-6
                  w-full
                  py-3
                  rounded-2xl
                  bg-green-500
                  hover:bg-green-600
                  text-white
                  font-semibold
                  transition
                "
              >
                Accept Donation
              </button>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}