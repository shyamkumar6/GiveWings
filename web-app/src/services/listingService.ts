const API =
  "http://127.0.0.1:8000/api/v1/listings";


/* =========================
   CREATE DONATION
========================= */

export const createListing = async (
  data: any
) => {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${API}/`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {

    const err =
      await response.json();

    throw new Error(err.detail);
  }

  return await response.json();
};


/* =========================
   GET NEARBY DONATIONS
========================= */

export const getNearbyDonations =
  async (
    lat: number,
    lng: number
  ) => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${API}/nearby?lat=${lat}&lng=${lng}`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {

      const err =
        await response.json();

      throw new Error(err.detail);
    }

    return await response.json();
};


/* =========================
   ACCEPT DONATION
========================= */

export const acceptDonation =
  async (
    listingId: string
  ) => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${API}/accept/${listingId}`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {

      const err =
        await response.json();

      throw new Error(err.detail);
    }

    return await response.json();
};


/* =========================
   COMPLETE DONATION
========================= */

export const completeDonation =
  async (
    listingId: string
  ) => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${API}/complete/${listingId}`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {

      const err =
        await response.json();

      throw new Error(err.detail);
    }

    return await response.json();
};

export const getAcceptedDonations =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${API}/accepted`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {

      const err =
        await response.json();

      throw new Error(err.detail);
    }

    return await response.json();
};

export const getMyDonations =
  async () => {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `${API}/my-donations`,
      {
        method: "GET",

        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {

      const err =
        await response.json();

      throw new Error(err.detail);
    }

    return await response.json();
};