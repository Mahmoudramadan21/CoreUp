/**
 * InvestmentCriteriaEdit.jsx
 *
 * A profile settings page for editing investment preferences.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for checkboxes and sliders.
 * SEO Note: Uses Helmet with noindex for private content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import ChoiceTickBox from "@/components/features/ChoiceTickBox/ChoiceTickBox";
import PriceSlider from "@/components/features/PriceSlider/PriceSlider";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import styles from "./InvestmentCriteriaEdit.module.scss";

const initialState = {
  locations: {
    selectAll: false,
    options: {
      afghanistan: false,
      armenia: false,
      azerbaijan: false,
      bahrain: false,
      brunei: false,
      egypt: false,
      iraq: false,
      iran: false,
      jordan: false,
      kyrgyzstan: false,
      kuwait: false,
      kazakhstan: false,
      lebanon: false,
      oman: false,
      palestine: false,
      qatar: false,
      saudiArabia: false,
      syria: false,
      turkmenistan: false,
      uzbekistan: false,
      yemen: false,
    },
  },
  stages: {
    selectAll: false,
    options: {
      achievingSales: false,
      breakingEven: false,
      mvpFinishedProduct: false,
      preStartupRD: false,
      profitable: false,
      other: false,
    },
  },
  industries: {
    selectAll: false,
    options: {
      agriculture: false,
      businessServices: false,
      educationAndTraining: false,
      energyAndNaturalResources: false,
      finance: false,
      media: false,
      property: false,
      foodAndBeverage: false,
      medicalAndSciences: false,
      entertainmentAndLeisure: false,
      retail: false,
      software: false,
      technology: false,
      salesAndMarketing: false,
      productsAndInventions: false,
      manufacturingAndEngineering: false,
      transportation: false,
      hospitalityRestaurantsAndBars: false,
      fashionAndBeauty: false,
    },
  },
  languages: {
    options: {
      arabic: false,
      english: false,
      french: false,
      german: false,
      italian: false,
      russian: false,
      spanish: false,
      japanese: false,
    },
  },
  investmentRange: {
    min: 0,
    max: 6000,
  },
};

const InvestmentCriteriaEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Update checkbox state
  const handleCheckboxChange = useCallback(
    (category, key) => (checked) => {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          options: {
            ...prev[category].options,
            [key]: checked,
          },
          selectAll: checked
            ? Object.values({
                ...prev[category].options,
                [key]: checked,
              }).every((val) => val)
            : false,
        },
      }));
      setErrors((prev) => ({ ...prev, [category]: "" }));
    },
    []
  );

  // Toggle all checkboxes
  const handleSelectAllChange = useCallback(
    (category) => (checked) => {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          selectAll: checked,
          options: Object.keys(prev[category].options).reduce(
            (acc, key) => ({ ...acc, [key]: checked }),
            {}
          ),
        },
      }));
      setErrors((prev) => ({ ...prev, [category]: "" }));
    },
    []
  );

  // Update investment range
  const handleRangeChange = useCallback((min, max) => {
    setFormData((prev) => ({
      ...prev,
      investmentRange: { min, max },
    }));
    setErrors((prev) => ({ ...prev, investmentRange: "" }));
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!Object.values(formData.locations.options).some((v) => v))
      newErrors.locations = "Select at least one location";
    if (!Object.values(formData.stages.options).some((v) => v))
      newErrors.stages = "Select at least one stage";
    if (!Object.values(formData.industries.options).some((v) => v))
      newErrors.industries = "Select at least one industry";
    if (formData.investmentRange.max <= formData.investmentRange.min)
      newErrors.investmentRange = "Maximum must be greater than minimum";
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

      // TODO: Implement API call for criteria update
      console.log("Submitting:", formData);
      navigate("/investor/profile/investment");
      setIsSubmitting(false);
    },
    [formData, validateForm, navigate]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Edit Investment Criteria - CoreUp</title>
        <meta
          name="description"
          content="Customize your investment preferences on CoreUp."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://coreup.com/investor/profile/investment-criteria"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Edit Investment Criteria",
            description: "Customize investment preferences on CoreUp.",
            url: "https://coreup.com/investor/profile/investment-criteria",
          })}
        </script>
      </Helmet>
      <section
        className={styles.investmentCriteriaEdit}
        role="main"
        aria-label="Edit Investment Criteria Form"
      >
        {/* Error Message Placeholder */}
        {errors.general && (
          <div
            className={styles.investmentCriteriaEdit__error}
            role="alert"
            aria-live="polite"
          >
            {errors.general}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={styles.investmentCriteriaEdit__form}
          aria-labelledby="investment-criteria-legend"
        >
          <fieldset className={styles.investmentCriteriaEdit__fieldset}>
            <legend
              id="investment-criteria-legend"
              className={styles.investmentCriteriaEdit__visuallyHidden}
            >
              Investment Criteria
            </legend>
            <p
              id="form-description"
              className={styles.investmentCriteriaEdit__visuallyHidden}
            >
              Customize your investment preferences using the fields below.
            </p>
            {/* Investment Range Section */}
            <fieldset
              className={styles.investmentCriteriaEdit__subFieldset}
              aria-describedby="investment-range-error"
            >
              <legend className={styles.investmentCriteriaEdit__visuallyHidden}>
                Investment Range
              </legend>
              <h3
                className={styles.investmentCriteriaEdit__sectionTitle}
                aria-hidden="true"
              >
                Investment Range ($1 - $10,000,000)
              </h3>
              <p>
                ${formData.investmentRange.min.toLocaleString()} - $
                {formData.investmentRange.max.toLocaleString()}
              </p>
              <PriceSlider
                minValue={formData.investmentRange.min}
                maxValue={formData.investmentRange.max}
                min={0}
                max={10000000}
                onChange={handleRangeChange}
                aria-label="Investment range slider"
              />
              {errors.investmentRange && (
                <span
                  id="investment-range-error"
                  className={styles.investmentCriteriaEdit__error}
                  role="alert"
                >
                  {errors.investmentRange}
                </span>
              )}
            </fieldset>

            {/* Locations Section */}
            <fieldset
              className={styles.investmentCriteriaEdit__subFieldset}
              aria-describedby="locations-error"
            >
              <legend className={styles.investmentCriteriaEdit__visuallyHidden}>
                What locations are you interested in ?
              </legend>
              <h3
                className={styles.investmentCriteriaEdit__sectionTitle}
                aria-hidden="true"
              >
                What locations are you interested in ?
              </h3>
              <div className={styles.investmentCriteriaEdit__checkboxGroup}>
                <ChoiceTickBox
                  id="locations-selectAll"
                  label="Select All"
                  checked={formData.locations.selectAll}
                  onChange={handleSelectAllChange("locations")}
                  aria-label="Select all locations"
                />
                {Object.entries(formData.locations.options).map(
                  ([key, value]) => (
                    <ChoiceTickBox
                      key={key}
                      id={`location-${key}`}
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      checked={value}
                      onChange={handleCheckboxChange("locations", key)}
                      aria-label={`Select ${key}`}
                    />
                  )
                )}
              </div>
              {errors.locations && (
                <span
                  id="locations-error"
                  className={styles.investmentCriteriaEdit__error}
                  role="alert"
                >
                  {errors.locations}
                </span>
              )}
            </fieldset>

            {/* Stages Section */}
            <fieldset
              className={styles.investmentCriteriaEdit__subFieldset}
              aria-describedby="stages-error"
            >
              <legend className={styles.investmentCriteriaEdit__visuallyHidden}>
                What stages of business are you interested in?
              </legend>
              <h3
                className={styles.investmentCriteriaEdit__sectionTitle}
                aria-hidden="true"
              >
                What stages of business are you interested in?
              </h3>
              <div className={styles.investmentCriteriaEdit__checkboxGroup}>
                <ChoiceTickBox
                  id="stages-selectAll"
                  label="Select All"
                  checked={formData.stages.selectAll}
                  onChange={handleSelectAllChange("stages")}
                  aria-label="Select all stages"
                />
                {Object.entries(formData.stages.options).map(([key, value]) => (
                  <ChoiceTickBox
                    key={key}
                    id={`stage-${key}`}
                    label={key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/RD/g, "R&D")
                      .replace(/^./, (str) => str.toUpperCase())}
                    checked={value}
                    onChange={handleCheckboxChange("stages", key)}
                    aria-label={`Select ${key}`}
                  />
                ))}
              </div>
              {errors.stages && (
                <span
                  id="stages-error"
                  className={styles.investmentCriteriaEdit__error}
                  role="alert"
                >
                  {errors.stages}
                </span>
              )}
            </fieldset>

            {/* Industries Section */}
            <fieldset
              className={styles.investmentCriteriaEdit__subFieldset}
              aria-describedby="industries-error"
            >
              <legend className={styles.investmentCriteriaEdit__visuallyHidden}>
                Which industries are you interested in?
              </legend>
              <h3
                className={styles.investmentCriteriaEdit__sectionTitle}
                aria-hidden="true"
              >
                Which industries are you interested in?
              </h3>
              <div className={styles.investmentCriteriaEdit__checkboxGroup}>
                <ChoiceTickBox
                  id="industries-selectAll"
                  label="Select All"
                  checked={formData.industries.selectAll}
                  onChange={handleSelectAllChange("industries")}
                  aria-label="Select all industries"
                />
                {Object.entries(formData.industries.options).map(
                  ([key, value]) => (
                    <ChoiceTickBox
                      key={key}
                      id={`industry-${key}`}
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/And/g, "&")
                        .replace(/^./, (str) => str.toUpperCase())}
                      checked={value}
                      onChange={handleCheckboxChange("industries", key)}
                      aria-label={`Select ${key}`}
                    />
                  )
                )}
              </div>
              {errors.industries && (
                <span
                  id="industries-error"
                  className={styles.investmentCriteriaEdit__error}
                  role="alert"
                >
                  {errors.industries}
                </span>
              )}
            </fieldset>

            {/* Languages Section */}
            <fieldset
              className={styles.investmentCriteriaEdit__subFieldset}
              aria-describedby="languages-error"
            >
              <legend className={styles.investmentCriteriaEdit__visuallyHidden}>
                Languages
              </legend>
              <h3
                className={styles.investmentCriteriaEdit__sectionTitle}
                aria-hidden="true"
              >
                Languages
              </h3>
              <div className={styles.investmentCriteriaEdit__checkboxGroup}>
                {Object.entries(formData.languages.options).map(
                  ([key, value]) => (
                    <ChoiceTickBox
                      key={key}
                      id={`language-${key}`}
                      label={key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      checked={value}
                      onChange={handleCheckboxChange("languages", key)}
                      aria-label={`Select ${key}`}
                    />
                  )
                )}
              </div>
            </fieldset>
          </fieldset>
          <button
            type="submit"
            className={styles.investmentCriteriaEdit__submitButton}
            disabled={isSubmitting}
            aria-label={
              isSubmitting ? "Saving changes..." : "Save investment criteria"
            }
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </section>
    </>
  );
};

export default React.memo(InvestmentCriteriaEdit);
