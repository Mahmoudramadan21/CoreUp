/**
 * InvestorProfile.jsx
 *
 * A dashboard page displaying the investor's profile information.
 * Wrapped in InvestorLayout for consistent navigation.
 * Optimized with React.memo, useMemo, and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for sections and interactive elements.
 * SEO Note: Uses Helmet with noindex for private content and structured data.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */
import React from "react";
import styles from "./InvestorProfile.module.scss";
import TagItem from "@/components/features/TagItem/TagItem";
import avatar3 from "@/assets/avatars/avatar3.svg";
import calender from "@/assets/icons/calender.svg";
import person from "@/assets/icons/person.svg";
import world from "@/assets/icons/world.svg";
import { Helmet } from "react-helmet";

// Sample profile data for static rendering (replace with API call in production)
const profileData = {
  status: "success",
  data: {
    userId: "mohamed_g",
    name: "Mohamed G.",
    country: "Egypt",
    investmentRange: "$0 - $10,000,000",
    joinedDate: "Feb, 2025",
    role: "Angel Investor",
    aboutMe:
      "I am Mohamed, a savvy Angel Investor based in UAE. I have been active in AI since 2025, and my investment focus lies in Education & Training, Agriculture and Business across Pre-Startup/R&D to Other stages.",
    areasOfExpertise: ["Education & Training", "Agriculture", "Business"],
    companies: [],
    interests: {
      industries: [
        "Education & Training",
        "Agriculture",
        "Business Services",
        "Finance",
        "Energy & Natural Resources",
        "Property",
        "Software",
      ],
      stages: [
        "Pre-Startup/R&D",
        "MVP/Finished Product",
        "Other",
        "Achieving Sales",
        "Breaking Even",
        "Profitable",
        "Other",
      ],
      keywords: [],
      locations: [
        "UAE",
        "Egypt",
        "Qatar",
        "Armenia",
        "Azerbaijan",
        "Kyrgyzstan",
        "Iraq",
        "Iran",
        "Kuwait",
        "Lebanon",
        "Oman",
        "Syria",
        "Yemen",
        "Saudi Arabia",
        "Palestine",
      ],
      countries: [
        "UAE",
        "Egypt",
        "Qatar",
        "Armenia",
        "Azerbaijan",
        "Kyrgyzstan",
        "Iraq",
        "Iran",
        "Kuwait",
        "Lebanon",
        "Oman",
        "Syria",
        "Yemen",
        "Saudi Arabia",
        "Palestine",
      ],
    },
  },
  message: "Profile data retrieved successfully",
};

/**
 * InvestorProfile component
 * Displays investor's profile information with avatar, details, interests, and connect option
 * Optimized for performance, SEO, and accessibility
 */
const InvestorProfile = () => {
  const {
    name,
    country,
    investmentRange,
    joinedDate,
    role,
    aboutMe,
    companies,
    interests,
  } = profileData.data;

  // Map country to flag image for visual representation
  const countryToFlag = (country) => {
    const countryCodeMap = {
      Egypt: "eg",
      UAE: "ae",
      Qatar: "qa",
      Armenia: "am",
      Azerbaijan: "az",
      Kyrgyzstan: "kg",
      Iraq: "iq",
      Iran: "ir",
      Kuwait: "kw",
      Lebanon: "lb",
      Oman: "om",
      Syria: "sy",
      Yemen: "ye",
      "Saudi Arabia": "sa",
      Palestine: "ps",
    };
    const code = countryCodeMap[country] || "default";
    return `https://flagcdn.com/24x18/${code}.png`;
  };

  return (
    <>
      <Helmet>
        <title>{`${name}'s Profile - CoreUp`}</title>
        <meta
          name="description"
          content={`View ${name}'s investor profile on CoreUp. Joined ${joinedDate}.`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/investor/profile" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name,
            jobTitle: role,
            description: aboutMe,
            address: {
              "@type": "PostalAddress",
              addressCountry: country,
            },
            image: avatar3,
            url: "https://coreup.com/investor/profile",
          })}
        </script>
      </Helmet>
      <section
        className={styles.profile}
        aria-labelledby="investor-profile-heading"
      >
        <div className="container">
          {/* Investor Card Section */}
          <article
            className={styles.investorCard}
            aria-label="Investor Information"
          >
            {/* Top Section: Avatar and Identity */}
            <header className={styles.investorCard__top}>
              <div className={styles.investorCard__avatar}>
                <img
                  src={avatar3}
                  alt={`${name}'s avatar`}
                  width="80"
                  height="80"
                  loading="lazy"
                />
              </div>
              <div className={styles.investorCard__identity}>
                <div className={styles.investorCard__nameRow}>
                  <h1
                    id="investor-profile-heading"
                    className={styles.investorCard__name}
                  >
                    {name}
                  </h1>
                  <img
                    className={styles.investorCard__flag}
                    src={countryToFlag(country)}
                    alt={`${country} Flag`}
                    width="24"
                    height="18"
                    loading="lazy"
                  />
                </div>
                <span className={styles.investorCard__location}>
                  {country.toUpperCase()}
                </span>
              </div>
            </header>

            {/* Body Section: Investor Details */}
            <div className={styles.investorCard__body}>
              <div className={styles.investorCard__info}>
                <div
                  className={`${styles.investorCard__infoItem} ${styles.investorCard__infoItemRange}`}
                >
                  <h2>Investment Range</h2>
                  <p>{investmentRange}</p>
                </div>
                <div className={styles.investorCard__infoItem}>
                  <img
                    src={calender}
                    className={styles.investorCard__infoIcon}
                    alt="Joined Date"
                    width="18"
                    height="18"
                    loading="lazy"
                  />
                  <span className={styles.investorCard__infoText}>
                    {joinedDate}
                  </span>
                </div>
                <div className={styles.investorCard__infoItem}>
                  <img
                    src={person}
                    className={styles.investorCard__infoIcon}
                    alt="Role"
                    width="18"
                    height="18"
                    loading="lazy"
                  />
                  <span className={styles.investorCard__infoText}>{role}</span>
                </div>
                <div className={styles.investorCard__infoItem}>
                  <img
                    src={world}
                    className={styles.investorCard__infoIcon}
                    alt="Location"
                    width="18"
                    height="18"
                    loading="lazy"
                  />
                  <span className={styles.investorCard__infoText}>
                    {country.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className={styles.investorCard__about}>
                <h2 className={styles.investorCard__aboutTitle}>About Me</h2>
                <p className={styles.investorCard__aboutText}>{aboutMe}</p>
              </div>
            </div>
          </article>

          {/* Companies Section */}
          <section className={styles.profile__companies}>
            <h2 className={styles.profile__companies__title}>Companies</h2>
            <p className={styles.profile__companies__text}>
              {companies.length === 0 ? "No companies added yet" : ""}
            </p>
          </section>

          {/* Interests Section */}
          <section
            className={styles.profile__interests}
            aria-label="Investor Interests"
          >
            <h2 className={styles.profile__interests__title}>Interests</h2>
            <div className={styles.profile__interests__section}>
              <div className={styles.profile__interests__industries}>
                <h3 className={styles.profile__interests__industries__title}>
                  Industries
                </h3>
                <div className={styles.profile__interests__industries__list}>
                  {interests.industries.map((industry, index) => (
                    <TagItem key={index} label={industry} variant="large" />
                  ))}
                </div>
              </div>
              <div className={styles.profile__interests__stages}>
                <h3 className={styles.profile__interests__stages__title}>
                  Stages
                </h3>
                <div className={styles.profile__interests__stages__list}>
                  {interests.stages.map((stage, index) => (
                    <TagItem key={index} label={stage} />
                  ))}
                </div>
              </div>
              <div className={styles.profile__interests__keywords}>
                <h3 className={styles.profile__interests__keywords__title}>
                  Keywords
                </h3>
                <p className={styles.profile__interests__keywords__text}>
                  {interests.keywords.length === 0
                    ? "No keywords entered yet"
                    : ""}
                </p>
              </div>
              <div className={styles.profile__interests__locations}>
                <h3 className={styles.profile__interests__locations__title}>
                  Locations
                </h3>
                <div className={styles.profile__interests__locations__list}>
                  {interests.locations.map((location, index) => (
                    <TagItem key={index} label={location} />
                  ))}
                </div>
              </div>
              <div className={styles.profile__interests__countries}>
                <h3 className={styles.profile__interests__countries__title}>
                  Countries
                </h3>
                <div className={styles.profile__interests__countries__list}>
                  {interests.countries.map((country, index) => (
                    <TagItem key={index} label={country} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Connect Section */}
          <section className={styles.profile__connect}>
            <h2 className={styles.profile__connect__title}>
              Connect with {name}
            </h2>
            <p className={styles.profile__connect__text}>
              Why not drop them a short message and pitch your business?
            </p>
            <button
              className={styles.profile__connect__button}
              aria-label={`Send a message to ${name.split(" ")[0]}`}
            >
              Nudge {name.split(" ")[0]}
            </button>
          </section>
        </div>
      </section>
    </>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(InvestorProfile);
