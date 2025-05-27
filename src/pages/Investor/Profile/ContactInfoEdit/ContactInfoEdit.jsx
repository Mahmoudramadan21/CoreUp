/**
 * ContactInfoEdit.jsx
 *
 * A profile settings page for editing contact information and images.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form fields and uploads.
 * SEO Note: Uses Helmet with noindex for private content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import SleekInputBox from "@/components/common/SleekInputBox/SleekInputBox";
import SingleSelectDropdown from "@/components/features/SingleSelectDropdown/SingleSelectDropdown";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import PersonIcon from "@/assets/icons/person.svg";
import styles from "./ContactInfoEdit.module.scss";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: { value: "UAE", label: "UAE" },
  city: "",
};

const countryOptions = [
  { value: "UAE", label: "UAE" },
  { value: "Egypt", label: "Egypt" },
  { value: "Qatar", label: "Qatar" },
];

const ContactInfoEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (profileImage) URL.revokeObjectURL(profileImage);
      if (coverImage) URL.revokeObjectURL(coverImage);
    };
  }, [profileImage, coverImage]);

  // Handle input changes
  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    []
  );

  // Handle country change
  const handleCountryChange = useCallback((selected) => {
    setFormData((prev) => ({
      ...prev,
      country: selected || initialState.country,
    }));
    setErrors((prev) => ({ ...prev, country: "" }));
  }, []);

  // Validate image file
  const validateImage = useCallback((file) => {
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (!file.type.match(/image\/(jpeg|png)/)) {
      return "Only JPG or PNG files are allowed";
    }
    if (file.size > maxSize) {
      return "File size must be less than 1MB";
    }
    return "";
  }, []);

  // Handle image uploads
  const handleImageUpload = useCallback(
    (e, type) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const error = validateImage(file);
      if (error) {
        setErrors((prev) => ({ ...prev, [type]: error }));
        return;
      }

      const url = URL.createObjectURL(file);
      if (type === "profile") setProfileImage(url);
      else setCoverImage(url);
      setErrors((prev) => ({ ...prev, [type]: "" }));
    },
    [validateImage]
  );

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{8,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    return newErrors;
  }, [formData]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
      }

      // TODO: Implement API call for contact info update
      console.log("Submitting:", { formData, profileImage, coverImage });
      setIsSubmitting(false);
      navigate("/investor/profile/contact");
    },
    [formData, profileImage, coverImage, validateForm, navigate]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Edit Contact Information - CoreUp</title>
        <meta
          name="description"
          content="Update your contact details and profile images on CoreUp."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://coreup.com/investor/profile/contact-edit"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Edit Contact Information",
            description: "Update contact details on CoreUp.",
            url: "https://coreup.com/investor/profile/contact-edit",
          })}
        </script>
      </Helmet>
      <section
        className={styles.contactInfoEdit}
        role="main"
        aria-label="Edit Contact Information Form"
      >
        {/* Error or Success Message Placeholder */}
        {errors.general && (
          <div
            className={styles.contactInfoEdit__error}
            role="alert"
            aria-live="polite"
          >
            {errors.general}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={styles.contactInfoEdit__form}
          aria-labelledby="contact-info-legend"
        >
          <fieldset className={styles.contactInfoEdit__fieldset}>
            <legend
              id="contact-info-legend"
              className={styles.contactInfoEdit__visuallyHidden}
            >
              Contact Information
            </legend>
            <p
              id="form-description"
              className={styles.contactInfoEdit__visuallyHidden}
            >
              Update your contact details and images using the fields below.
            </p>
            <SleekInputBox
              label="First Name *"
              id="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName}
              aria-required="true"
              aria-describedby="firstName-error"
            />
            <SleekInputBox
              label="Last Name *"
              id="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName}
              aria-required="true"
              aria-describedby="lastName-error"
            />
            <SleekInputBox
              label="Email *"
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              aria-required="true"
              aria-describedby="email-error"
            />
            <SleekInputBox
              label="Phone Number *"
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleInputChange("phone")}
              isInvalid={!!errors.phone}
              errorMessage={errors.phone}
              aria-required="true"
              aria-describedby="phone-error"
            />
            <SingleSelectDropdown
              id="country"
              options={countryOptions}
              value={formData.country}
              onChange={handleCountryChange}
              placeholder="Select country"
              isInvalid={!!errors.country}
              errorMessage={errors.country}
              aria-required="true"
              aria-label="Select country"
            />
            <SleekInputBox
              label="City / Town *"
              id="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleInputChange("city")}
              isInvalid={!!errors.city}
              errorMessage={errors.city}
              aria-required="true"
              aria-describedby="city-error"
            />
            <div className={styles.contactInfoEdit__upload}>
              <label
                htmlFor="profileImage"
                className={styles.contactInfoEdit__label}
              >
                Profile Image
              </label>
              <div className={styles.contactInfoEdit__uploadWrapper}>
                <div
                  className={styles.contactInfoEdit__profilePreview}
                  aria-label="Profile image preview"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile preview"
                      className={styles.contactInfoEdit__profileImage}
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={PersonIcon}
                      alt="Default profile icon"
                      className={styles.contactInfoEdit__profileIcon}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className={styles.contactInfoEdit__uploadActions}>
                  <span
                    className={styles.contactInfoEdit__uploadPlaceholder}
                    aria-label="Profile image requirements"
                  >
                    JPG or PNG. Max file size 1MB.
                  </span>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/jpeg,image/png"
                    className={styles.contactInfoEdit__uploadInput}
                    onChange={(e) => handleImageUpload(e, "profile")}
                    aria-label="Upload profile image"
                    aria-describedby="profileImage-error"
                  />
                  <label
                    htmlFor="profileImage"
                    className={styles.contactInfoEdit__uploadButton}
                  >
                    Upload an image
                  </label>
                  {errors.profile && (
                    <span
                      id="profileImage-error"
                      className={styles.contactInfoEdit__error}
                    >
                      {errors.profile}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.contactInfoEdit__upload}>
              <label
                htmlFor="coverImage"
                className={styles.contactInfoEdit__label}
              >
                Cover Image
              </label>
              <div className={styles.contactInfoEdit__uploadArea}>
                <span
                  className={styles.contactInfoEdit__uploadPlaceholder}
                  aria-label="Cover image requirements"
                >
                  {coverImage
                    ? "Image selected"
                    : "JPG or PNG. Max file size 1MB."}
                </span>
                <input
                  type="file"
                  id="coverImage"
                  accept="image/jpeg,image/png"
                  className={styles.contactInfoEdit__uploadInput}
                  onChange={(e) => handleImageUpload(e, "cover")}
                  aria-label="Upload cover image"
                  aria-describedby="coverImage-error"
                />
                <label
                  htmlFor="coverImage"
                  className={styles.contactInfoEdit__uploadButton}
                >
                  Upload an image
                </label>
                {errors.cover && (
                  <span
                    id="coverImage-error"
                    className={styles.contactInfoEdit__error}
                  >
                    {errors.cover}
                  </span>
                )}
              </div>
            </div>
          </fieldset>
          <button
            type="submit"
            className={styles.contactInfoEdit__submitButton}
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Saving changes..." : "Save contact information"
            }
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </>
  );
};

export default React.memo(ContactInfoEdit);
