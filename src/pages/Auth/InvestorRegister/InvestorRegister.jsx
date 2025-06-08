/**
 * InvestorRegister.jsx
 *
 * A page for investor registration with form inputs for preferences.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for form sections and inputs.
 * SEO Note: Uses Helmet with meta tags for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import styles from "./InvestorRegister.module.scss";
import PriceSlider from "@/components/features/PriceSlider/PriceSlider";
import SleekInputBox from "@/components/common/SleekInputBox/SleekInputBox";
import MultiSelectDropdown from "@/components/features/MultiSelectDropdown/MultiSelectDropdown";
import SectorSelectCheckbox from "@/components/features/SectorSelectCheckbox/SectorSelectCheckbox";
import SpaciousTextarea from "@/components/common/SpaciousTextarea/SpaciousTextarea";
import SleekButton from "@/components/common/SleekButton/SleekButton";

const industriesList = [
  "Agriculture",
  "Business Services",
  "Education & Training",
  "Energy & Natural Resources",
  "Entertainment & Leisure",
  "Fashion & Beauty",
  "Finance",
  "Food & Beverage",
  "Hospitality, Restaurants & Bars",
  "Manufacturing & Engineering",
  "Media",
  "Medical & Sciences",
  "Personal Services",
  "Products & Inventions",
  "Property",
  "Retail",
  "Sales & Marketing",
  "Software",
  "Technology",
  "Transportation",
];

const InvestorRegister = () => {
  const [formData, setFormData] = useState({
    city: "",
    country: [],
    investmentRange: { min: 0, max: 10000 },
    selectedIndustries: [],
    background: "",
  });
  const [formErrors, setFormErrors] = useState({});

  {
    /* Validate Form Data */
  }
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.city.trim()) errors.city = "City is required";
    if (formData.country.length === 0)
      errors.country = "Please select at least one country";
    if (formData.investmentRange.min > formData.investmentRange.max)
      errors.investmentRange = "Minimum investment cannot exceed maximum";
    if (formData.selectedIndustries.length === 0)
      errors.selectedIndustries = "Please select at least one industry";
    if (!formData.background.trim())
      errors.background = "Professional background is required";
    return errors;
  }, [formData]);

  {
    /* Handle Investment Range Change */
  }
  const handleRangeChange = useCallback((min, max) => {
    setFormData((prev) => ({
      ...prev,
      investmentRange: { min, max },
    }));
    setFormErrors((prev) => ({ ...prev, investmentRange: null }));
  }, []);

  {
    /* Handle Form Submission */
  }
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errors = validateForm();
      setFormErrors(errors);
      if (Object.keys(errors).length === 0) {
        console.log("Form submitted:", formData); // TODO: API call
        // TODO: Navigate to next step or show success
      }
    },
    [formData, validateForm]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Investor Registration - CoreUp</title>
        <meta
          name="description"
          content={`Register as an investor on CoreUp to discover tailored investment opportunities. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="keywords" content="investor, registration, CoreUp" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://coreup.com/auth/investor-register"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Investor Registration",
            description: "Register as an investor on CoreUp.",
            url: "https://coreup.com/auth/investor-register",
          })}
        </script>
      </Helmet>
      <form
        className={styles.investorRegister}
        onSubmit={handleSubmit}
        role="form"
        aria-label="Investor registration form"
      >
        {/* Investment Range Section */}
        <section
          className={styles.investmentRange}
          aria-labelledby="investment-range-heading"
          role="region"
        >
          <h2
            id="investment-range-heading"
            className={styles.investmentRange__title}
          >
            How much are you looking to invest?
          </h2>
          <p className={styles.investmentRange__description}>
            Your investment range will help us match you with suitable
            opportunities.
          </p>
          <PriceSlider
            minValue={formData.investmentRange.min}
            maxValue={formData.investmentRange.max}
            onChange={handleRangeChange}
            absoluteMin={0}
            absoluteMax={10000}
            step={1}
          />
          {formErrors.investmentRange && (
            <p className={styles.error} role="alert">
              {formErrors.investmentRange}
            </p>
          )}
        </section>

        {/* Location Input Section */}
        <section
          className={styles.locationInput}
          aria-labelledby="location-input-heading"
          role="region"
        >
          <h2
            id="location-input-heading"
            className={styles.locationInput__title}
          >
            Where are you based?
          </h2>
          <p className={styles.locationInput__description}>
            Your location will help us match you with local opportunities.
          </p>
          <div className={styles.locationInputGroup}>
            <SleekInputBox
              label="City / Town"
              id="city"
              placeholder="Enter your city or town"
              value={formData.city}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, city: e.target.value }));
                setFormErrors((prev) => ({ ...prev, city: null }));
              }}
              error={formErrors.city}
              aria-describedby={formErrors.city ? "city-error" : undefined}
            />
            <MultiSelectDropdown
              label="Country"
              defaultCountries={formData.country}
              onChange={(selected) => {
                setFormData((prev) => ({ ...prev, country: selected }));
                setFormErrors((prev) => ({ ...prev, country: null }));
              }}
              error={formErrors.country}
              aria-describedby={
                formErrors.country ? "country-error" : undefined
              }
            />
          </div>
        </section>

        {/* Industries Selection Section */}
        <section
          className={styles.industriesSelection}
          aria-labelledby="industries-selection-heading"
          role="region"
        >
          <h2
            id="industries-selection-heading"
            className={styles.industriesSelection__title}
          >
            Select up to 3 industries you're interested in
          </h2>
          <p className={styles.industriesSelection__description}>
            You can change your preferences later.
          </p>
          <SectorSelectCheckbox
            industries={industriesList}
            selectedIndustries={formData.selectedIndustries}
            onChange={(selected) => {
              setFormData((prev) => ({
                ...prev,
                selectedIndustries: selected,
              }));
              setFormErrors((prev) => ({ ...prev, selectedIndustries: null }));
            }}
            maxSelections={3}
            error={formErrors.selectedIndustries}
            aria-describedby={
              formErrors.selectedIndustries ? "industries-error" : undefined
            }
          />
        </section>

        {/* Professional Background Section */}
        <section
          className={styles.professionalBackground}
          aria-labelledby="professional-background-heading"
          role="region"
        >
          <h2
            id="professional-background-heading"
            className={styles.professionalBackground__title}
          >
            What's your professional background?
          </h2>
          <p className={styles.professionalBackground__description}>
            Provide details to prioritize your profile for the best deals.
          </p>
          <SpaciousTextarea
            label="Professional background"
            id="background"
            placeholder="Tell us about your professional experience..."
            value={formData.background}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, background: e.target.value }));
              setFormErrors((prev) => ({ ...prev, background: null }));
            }}
            error={formErrors.background}
            aria-describedby={
              formErrors.background ? "background-error" : undefined
            }
          />
        </section>

        {/* Navigation Buttons */}
        <div className={styles.navigationButtons}>
          <SleekButton
            variant="secondary"
            size="medium"
            aria-label="Go back to previous step"
            disabled
            type="button"
          >
            Back
          </SleekButton>
          <SleekButton
            type="submit"
            variant="primary"
            size="medium"
            aria-label="Submit registration form"
          >
            Next
          </SleekButton>
        </div>
      </form>
    </>
  );
};

export default React.memo(InvestorRegister);
