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


  /* =========================
     FETCH ACCEPTED DONATIONS
  ========================= */

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


  /* =========================
     COMPLETE PICKUP
  ========================= */

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


  /* =========================
     OPEN GOOGLE MAPS
  ========================= */

  const openInMaps = (
    lat: number,
    lng: number
  ) => {

    const url =
      `https://www.google.com/maps?q=${lat},${lng}`;

    window.open(
      url,
      "_blank"
    );
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


        {/* =========================
            LOADING
        ========================= */}

        {loading && (

          <p className="
            text-gray-500
          ">
            Loading accepted donations...
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


        {/* =========================
            DONATION GRID
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
                overflow-hidden
                shadow-sm
                border
                border-gray-100
              "
            >

              {/* =========================
                  IMAGE
              ========================= */}

              {
                item.image_url && (

                  <img
                    src={item.image_url}
                    alt={item.title}

                    className="
                      w-full
                      h-56
                      object-cover
                    "
                  />

                )
              }


              <div className="p-6">

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


                {/* Donor Details */}

                <div className="
                  mt-6
                  space-y-2
                  text-sm
                  text-gray-700
                ">

                  <p>

                    <span className="
                      font-semibold
                    ">
                      Donor:
                    </span>

                    {" "}

                    {item.donor?.name}

                  </p>

                  <p>

                    <span className="
                      font-semibold
                    ">
                      Email:
                    </span>

                    {" "}

                    {item.donor?.email}

                  </p>

                </div>


                {/* Contact Number */}

                {
                  item.phone_number && (

                    <div className="
                      mt-4
                      text-sm
                      text-gray-700
                    ">

                      <span className="
                        font-semibold
                      ">
                        Contact:
                      </span>

                      {" "}

                      {item.phone_number}

                    </div>

                  )
                }


                {/* Pickup Instructions */}

                {
                  item.pickup_instructions && (

                    <div className="
                      mt-5
                      bg-gray-50
                      border
                      border-gray-200
                      rounded-2xl
                      p-4
                    ">

                      <p className="
                        font-semibold
                        text-sm
                        text-gray-700
                      ">
                        Pickup Instructions
                      </p>

                      <p className="
                        mt-2
                        text-sm
                        text-gray-600
                        leading-relaxed
                      ">

                        {
                          item.pickup_instructions
                        }

                      </p>

                    </div>

                  )
                }


                {/* Location */}

                <div className="
                  mt-5
                  text-sm
                  text-gray-500
                ">

                  📌 {item.location_label}

                </div>


                {/* Coordinates */}

                <div className="
                  mt-4
                  text-sm
                  text-gray-500
                ">

                  <p className="
                    font-semibold
                  ">
                    Pickup Coordinates
                  </p>

                  <p>
                    Lat:
                    {" "}
                    {
                      item.location.coordinates[1]
                    }
                  </p>

                  <p>
                    Lng:
                    {" "}
                    {
                      item.location.coordinates[0]
                    }
                  </p>

                </div>


                {/* Status */}

                <div className="
                  mt-5
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


                {/* Open Maps */}

                <button

                  onClick={() =>
                    openInMaps(
                      item.location.coordinates[1],
                      item.location.coordinates[0]
                    )
                  }

                  className="
                    mt-6
                    w-full
                    py-3
                    rounded-2xl
                    border
                    border-green-500
                    text-green-600
                    hover:bg-green-50
                    font-semibold
                    transition
                  "
                >

                  Open in Maps

                </button>


                {/* Complete Button */}

                <button

                  onClick={() =>
                    handleComplete(item._id)
                  }

                  className="
                    mt-4
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

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );
}