import React, {
  useState,
  useEffect
} from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

import Input from "../../components/ui/input/Input";
import Button from "../../components/ui/button/Button";

import CategoryCard from "../../components/listing/CategoryCard";

import { createListing, uploadDonationImage } from "../../services/listingService";

const categories = [
  "FOOD",
  "CLOTHES",
  "BOOKS",
  "TOYS",
  "FURNITURE",
  "ELECTRONICS",
];

export default function CreateListingPage() {
  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [quantity, setQuantity] =
    useState<number>(0);

  const [category, setCategory] =
    useState("FOOD");

  const [expiryTime, setExpiryTime] =
    useState("");

  const [location, setLocation] =
    useState({
      latitude: 0,
      longitude: 0,
    });

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  useEffect(() => {

  navigator.geolocation.getCurrentPosition(
    (position) => {

      setLocation({
        latitude:
          position.coords.latitude,

        longitude:
          position.coords.longitude,
      });

    },

    (error) => {
      console.error(
        "Location error:",
        error
      );
    }
  );

}, []);

  const handleSubmit = async () => {
    // ✅ SAFETY CHECK
    if (
        !location.latitude ||
        !location.longitude
    ) {
        alert(
        "Unable to fetch location"
        );

        return;
    }
    let imageUrl = "";

    if (imageFile) {

      const uploadResult =
        await uploadDonationImage(
          imageFile
        );

      imageUrl =
        uploadResult.image_url;
    }
    try {
      await createListing({
        title,
        description,
        quantity: Number(quantity),

        category,

        unit:
          category === "FOOD"
            ? "meals"
            : "items",

        expiry_time: expiryTime
            ? new Date(expiryTime).toISOString()
            : new Date().toISOString(),

        location: {
            type: "Point",

            coordinates: [
                location.longitude,
                location.latitude,
            ],
        },
        image_url: imageUrl,
      });

      alert("Donation  created successfully");
    } catch {
      alert("Failed to create donation");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-5xl font-bold">
            Create Donation
          </h1>

          <p className="mt-3 text-gray-500">
            Turn surplus into meaningful impact.
          </p>
        </div>

        {/* Form */}
        <div className="
          bg-white
          rounded-3xl
          p-8
          mt-10
          shadow-sm
        ">
          {/* Categories */}
          <div>
            <p className="font-semibold mb-4">
              Category
            </p>

            <div className="
              flex
              flex-wrap
              gap-4
            ">
              {categories.map((item) => (
                <CategoryCard
                  key={item}
                  title={item}
                  selected={
                    category === item
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                />
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="
            grid
            grid-cols-2
            gap-6
            mt-8
          ">
            <div>
              <p className="mb-2 font-medium">
                Title
              </p>

              <Input
                placeholder="Ex: 50 Meal Boxes"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <p className="mb-2 font-medium">
                Quantity
              </p>

              <Input
                placeholder="50"
                value={String(quantity)}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="mb-2 font-medium">
              Description
            </p>

            <textarea
              placeholder="
Fresh surplus food from event
              "
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="
                w-full
                h-32
                p-4
                rounded-2xl
                border
                border-gray-200
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
              "
            />
          </div>

          {/* Expiry */}
          <div className="mt-6">
            <p className="mb-2 font-medium">
              Expiry Time
            </p>

            <Input
              type="datetime-local"
              value={expiryTime}
              onChange={(e) =>
                setExpiryTime(
                  e.target.value
                )
              }
            />
          </div>
          <div className="mt-6">

            <label className="
              block
              mb-2
              font-medium
            ">
              Donation Image
            </label>

            <input
              type="file"
              accept="image/*"

              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (!file) return;

                setImageFile(file);

                setImagePreview(
                  URL.createObjectURL(file)
                );
              }}
            />
              {
                imagePreview && (

                  <img
                    src={imagePreview}
                    alt="Preview"

                    className="
                      mt-4
                      rounded-2xl
                      h-52
                      object-cover
                      w-full
                    "
                  />

                )
              }
          </div>
          {/* Submit */}
          <div className="mt-10">
            <Button
              title="Create Donation"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}