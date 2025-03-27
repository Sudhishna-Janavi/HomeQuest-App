import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateListingForm.css";

const CreateListingForm = () => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    rentPrice: "",
    location: "",
    amenities: "",
    address: "",
    description: "",
  });

  const navigate = useNavigate();

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input change
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate sending data to admin dashboard
    console.log("Listing Submitted:", { ...formData, image });

    // Redirect to admin settings dashboard
    navigate("/admin-dashboard");
  };

  return (
    <div className="create-listing-form">
      <button className="back-button" onClick={() => navigate("/landlord-dashboard")}>
        ← Back to Dashboard
      </button>
      <h1 className="create-listing-form__title">Create Listing</h1>

      {/* Image Upload */}
      <div className="image-upload">
        <label htmlFor="file-input">
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <div className="upload-placeholder">📷 Click to Upload</div>
          )}
        </label>
        <input id="file-input" type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="rentPrice" placeholder="Rent Price" value={formData.rentPrice} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="text" name="amenities" placeholder="Amenities" value={formData.amenities} onChange={handleChange} required />
        <textarea name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />

        <button type="submit" className="submit-button">Submit Listing</button>
      </form>
    </div>
  );
};

export default CreateListingForm;
