/**
 * InvestorProfileSettings.jsx
 *
 * A profile settings page for editing investor profile details.
 * Wrapped in InvestorLayout for consistent navigation.
 * Optimized with React.memo, useCallback, and useMemo for performance.
 * Accessibility Note: Includes ARIA attributes for form fields, errors, and live regions.
 * SEO Note: Uses Helmet with noindex for private content and structured data.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import SingleSelectDropdown from "@/components/features/SingleSelectDropdown/SingleSelectDropdown";
import SleekInputBox from "@/components/common/SleekInputBox/SleekInputBox";
import SpaciousTextarea from "@/components/common/SpaciousTextarea/SpaciousTextarea";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import styles from "./InvestorProfileSettings.module.scss";

// Initial form state
const initialState = {
  investorType: null,
  linkedin: "",
  twitter: "",
  facebook: "",
  website: "",
  aboutMe: "",
  expertise: "",
  investmentCount: 0,
  companies: [],
};

// Memoized dropdown options
const investorTypeOptions = [
  { value: "angel", label: "Angel Investor" },
  { value: "venture", label: "Venture Capitalist" },
  { value: "private", label: "Private Equity" },
];

const InvestorProfileSettings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const companyInputRefs = useRef([]);

  // Memoized investment count options
  const investmentCountOptions = useMemo(
    () =>
      Array.from({ length: 21 }, (_, i) => ({
        value: i,
        label: `${i}`,
      })),
    []
  );

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Simulate fetching initial data (replace with API call)
  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchedData = {
      investorType: { value: "angel", label: "Angel Investor" },
      aboutMe: "Experienced investor in tech startups.",
      expertise: "Fintech, AI, SaaS",
      investmentCount: 5,
      companies: [{ id: Date.now(), name: "TechCorp" }],
    };
    setFormData(fetchedData);
  }, []);

  // Handle input changes for text fields
  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    []
  );

  // Handle investor type dropdown change
  const handleInvestorTypeChange = useCallback((selected) => {
    setFormData((prev) => ({ ...prev, investorType: selected }));
    setErrors((prev) => ({ ...prev, investorType: "" }));
  }, []);

  // Handle investment count dropdown change
  const handleInvestmentCountChange = useCallback((selected) => {
    setFormData((prev) => ({
      ...prev,
      investmentCount: selected ? selected.value : 0,
    }));
    setErrors((prev) => ({ ...prev, investmentCount: "" }));
  }, []);

  // Add a new company
  const handleAddCompany = useCallback(() => {
    const newCompany = { id: Date.now(), name: "" };
    setFormData((prev) => ({
      ...prev,
      companies: [...prev.companies, newCompany],
    }));
    // Focus on the new input
    setTimeout(() => {
      const newIndex = formData.companies.length;
      if (companyInputRefs.current[newIndex]) {
        companyInputRefs.current[newIndex].focus();
      }
    }, 0);
  }, [formData.companies.length]);

  // Remove a company
  const handleRemoveCompany = useCallback((id) => {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.filter((company) => company.id !== id),
    }));
    setErrors((prev) => ({ ...prev, companies: "" }));
  }, []);

  // Update company name
  const handleCompanyChange = useCallback((id, value) => {
    setFormData((prev) => ({
      ...prev,
      companies: prev.companies.map((company) =>
        company.id === id ? { ...company, name: value } : company
      ),
    }));
    setErrors((prev) => ({ ...prev, companies: "" }));
  }, []);

  // Validate URL format
  const validateUrl = useCallback((url) => {
    if (!url) return "";
    try {
      new URL(url);
      return "";
    } catch {
      return "Invalid URL format";
    }
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.investorType)
      newErrors.investorType = "Investor type is required";
    if (!formData.aboutMe.trim()) newErrors.aboutMe = "About Me is required";
    if (!formData.expertise.trim())
      newErrors.expertise = "Expertise is required";
    if (formData.linkedin) newErrors.linkedin = validateUrl(formData.linkedin);
    if (formData.twitter) newErrors.twitter = validateUrl(formData.twitter);
    if (formData.facebook) newErrors.facebook = validateUrl(formData.facebook);
    if (formData.website) newErrors.website = validateUrl(formData.website);
    if (
      formData.companies.some((company) => company.name && !company.name.trim())
    )
      newErrors.companies = "Company names cannot be empty";
    return newErrors;
  }, [formData, validateUrl]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      // TODO: Implement API call for profile settings update
      console.log("Submitting:", formData);
      setIsSubmitting(false);
      navigate("/investor/profile");
    },
    [formData, validateForm, navigate]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Edit Investor Profile - CoreUp</title>
        <meta
          name="description"
          content="Update your investor profile settings on CoreUp to showcase your expertise and preferences."
        />
        <meta
          name="keywords"
          content="investor profile, settings, CoreUp, investment preferences"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="canonical"
          href="https://coreup.com/investor/profile/settings"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Edit Investor Profile",
            description:
              "Update investor profile settings on CoreUp to showcase expertise and preferences.",
            url: "https://coreup.com/investor/profile/settings",
          })}
        </script>
      </Helmet>
      <main
        className={styles.investorProfileSettings}
        aria-labelledby="settings-title"
      >
        <h1
          id="settings-title"
          className={styles.investorProfileSettings__visuallyHidden}
        >
          Investor Profile Settings
        </h1>
        <section
          className={styles.investorProfileSettings__container}
          aria-label="Investor Profile Settings Form"
        >
          <form
            onSubmit={handleSubmit}
            className={styles.investorProfileSettings__form}
            noValidate
          >
            <fieldset
              className={styles.investorProfileSettings__fieldset}
              aria-describedby="form-description"
            >
              <legend
                className={styles.investorProfileSettings__visuallyHidden}
              >
                Profile Details
              </legend>
              <p
                id="form-description"
                className={styles.investorProfileSettings__visuallyHidden}
              >
                Update your investor profile details below. Fields marked with *
                are required.
              </p>
              <SingleSelectDropdown
                label="Investor Type *"
                id="investor-type"
                options={investorTypeOptions}
                value={formData.investorType}
                onChange={handleInvestorTypeChange}
                placeholder="Select investor type..."
                isInvalid={!!errors.investorType}
                errorMessage={errors.investorType}
                aria-required="true"
                aria-describedby="investor-type-error"
                aria-invalid={!!errors.investorType}
              />
              <SleekInputBox
                label="LinkedIn"
                id="linkedin"
                placeholder="Enter your LinkedIn URL"
                value={formData.linkedin}
                onChange={handleInputChange("linkedin")}
                type="url"
                isInvalid={!!errors.linkedin}
                errorMessage={errors.linkedin}
                aria-describedby="linkedin-error"
                aria-invalid={!!errors.linkedin}
              />
              <SleekInputBox
                label="Twitter"
                id="twitter"
                placeholder="Enter your Twitter URL"
                value={formData.twitter}
                onChange={handleInputChange("twitter")}
                type="url"
                isInvalid={!!errors.twitter}
                errorMessage={errors.twitter}
                aria-describedby="twitter-error"
                aria-invalid={!!errors.twitter}
              />
              <SleekInputBox
                label="Facebook"
                id="facebook"
                placeholder="Enter your Facebook URL"
                value={formData.facebook}
                onChange={handleInputChange("facebook")}
                type="url"
                isInvalid={!!errors.facebook}
                errorMessage={errors.facebook}
                aria-describedby="facebook-error"
                aria-invalid={!!errors.facebook}
              />
              <SleekInputBox
                label="Website"
                id="website"
                placeholder="Enter your website URL"
                value={formData.website}
                onChange={handleInputChange("website")}
                type="url"
                isInvalid={!!errors.website}
                errorMessage={errors.website}
                aria-describedby="website-error"
                aria-invalid={!!errors.website}
              />
              <SpaciousTextarea
                label="About Me *"
                id="about-me"
                placeholder="Tell us about yourself..."
                value={formData.aboutMe}
                onChange={handleInputChange("aboutMe")}
                isInvalid={!!errors.aboutMe}
                errorMessage={errors.aboutMe}
                aria-required="true"
                aria-describedby="about-me-error"
                aria-invalid={!!errors.aboutMe}
              />
              <SpaciousTextarea
                label="Areas of Expertise *"
                id="expertise"
                placeholder="Explain how you add value..."
                value={formData.expertise}
                onChange={handleInputChange("expertise")}
                isInvalid={!!errors.expertise}
                errorMessage={errors.expertise}
                aria-required="true"
                aria-describedby="expertise-error"
                aria-invalid={!!errors.expertise}
              />
              <SingleSelectDropdown
                label="Number of Previous Investments"
                id="investment-count"
                options={investmentCountOptions}
                value={investmentCountOptions.find(
                  (opt) => opt.value === formData.investmentCount
                )}
                onChange={handleInvestmentCountChange}
                placeholder="Select number..."
                aria-label="Select number of previous investments"
                aria-describedby="investment-count-error"
              />
            </fieldset>
            <fieldset
              className={styles.investorProfileSettings__companiesSection}
              aria-describedby="companies-error"
            >
              <legend className={styles.investorProfileSettings__sectionTitle}>
                Companies
              </legend>
              <p className={styles.investorProfileSettings__subtitle}>
                Add companies you have invested in, founded, or worked for.
              </p>
              {formData.companies.length > 0 ? (
                <div
                  className={styles.investorProfileSettings__companiesList}
                  role="list"
                >
                  {formData.companies.map((company, index) => (
                    <div
                      key={company.id}
                      className={styles.investorProfileSettings__companyItem}
                      role="listitem"
                    >
                      <SleekInputBox
                        id={`company-${company.id}`}
                        placeholder="Enter company name"
                        value={company.name}
                        onChange={(e) =>
                          handleCompanyChange(company.id, e.target.value)
                        }
                        aria-label={`Company ${index + 1}`}
                        aria-describedby="companies-error"
                        inputRef={(el) =>
                          (companyInputRefs.current[index] = el)
                        }
                      />
                      <SleekButton
                        type="button"
                        variant="danger"
                        onClick={() => handleRemoveCompany(company.id)}
                        aria-label={`Remove company ${
                          company.name || index + 1
                        }`}
                        className={styles.investorProfileSettings__removeButton}
                      >
                        Remove
                      </SleekButton>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className={styles.investorProfileSettings__noCompanies}
                  role="alert"
                  aria-live="polite"
                >
                  No companies added yet.
                </p>
              )}
              {errors.companies && (
                <span
                  id="companies-error"
                  className={styles.investorProfileSettings__error}
                  role="alert"
                  aria-live="polite"
                >
                  {errors.companies}
                </span>
              )}
              <SleekButton
                type="button"
                variant="secondary"
                onClick={handleAddCompany}
                aria-label="Add a new company"
                className={styles.investorProfileSettings__addButton}
              >
                + Add Company
              </SleekButton>
            </fieldset>
            <div className={styles.investorProfileSettings__submitContainer}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.investorProfileSettings__submitButton}
                aria-label={
                  isSubmitting ? "Saving..." : "Save profile settings"
                }
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default React.memo(InvestorProfileSettings);
