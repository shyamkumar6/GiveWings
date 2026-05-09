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
     FETCH DONATIONS
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


  /* =========================
     URGENCY LOGIC
  ========================= */

  const getUrgency = (
    expiryTime: string
  ) => {

    if (!expiryTime)
      return null;

    const expiry =
      new Date(expiryTime);

    const now =
      new Date();

    const diffHours =
      (
        expiry.getTime()
        -
        now.getTime()
      ) / (1000 * 60 * 60);

    if (diffHours <= 2) {
      return "URGENT";
    }

    if (diffHours <= 6) {
      return "HIGH PRIORITY";
    }

    return "NORMAL";
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


                {/* Distance */}

                <div className="
                  mt-4
                  text-sm
                  text-green-600
                  font-semibold
                ">
                  📍 {item.distance_km} km away
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


                {/* Donor Info */}

                <div className="
                  mt-5
                  space-y-2
                  text-sm
                  text-gray-600
                ">

                  <p>
                    <span className="font-semibold">
                      Donor:
                    </span>

                    {" "}
                    {item.donor?.name}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Email:
                    </span>

                    {" "}
                    {item.donor?.email}
                  </p>

                </div>


                {/* Location */}

                <div className="
                  mt-4
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

                  <p className="font-semibold">
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


                {/* Expiry */}

                {
                  item.expiry_time && (

                    <div className="
                      mt-4
                      text-sm
                      text-red-500
                      font-medium
                    ">

                      Expires:
                      {" "}

                      {
                        new Date(
                          item.expiry_time
                        ).toLocaleString()
                      }

                    </div>

                  )
                }


                {/* Urgency */}

                {
                  item.expiry_time && (

                    <div className="
                      mt-3
                      inline-block
                      px-3
                      py-1
                      rounded-full
                      bg-red-100
                      text-red-700
                      text-xs
                      font-semibold
                    ">

                      {
                        getUrgency(
                          item.expiry_time
                        )
                      }

                    </div>

                  )
                }


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


                {/* Maps Button */}

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


                {/* Accept Button */}

                <button

                  onClick={() =>
                    handleAccept(item._id)
                  }

                  className="
                    mt-4
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

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>

  );
}