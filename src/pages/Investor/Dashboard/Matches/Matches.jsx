/**
 * Matches.jsx
 *
 * A dashboard page displaying tailored investment opportunities.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for grid and cards.
 * SEO Note: Uses Helmet with noindex for private dashboard content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styles from "./Matches.module.scss";
import InvestmentCard from "@/components/features/InvestmentCard/InvestmentCard";
import placeholderImage from "@/assets/placeholder-cover.png";
import placeholderLogo from "@/assets/placeholder-logo.png";

const opportunities = [
  {
    id: "1",
    title: "Exclusive Real Estate Fund",
    location: "Bayern, Germany",
    description: "A premium real estate investment opportunity in Bavaria.",
    highlights: [
      "High-yield commercial properties.",
      "Stable rental income.",
      "Experienced management team.",
      "Low-risk profile.",
    ],
    totalRequired: 2100000,
    minPerInvestor: 150000,
    badgeText: "Executive",
    logoUrl: placeholderImage,
    logoAlt: "Exclusive Real Estate Fund logo",
    imageUrl: placeholderLogo,
    imageAlt: "Exclusive Real Estate Fund opportunity",
  },
  {
    id: "2",
    title: "Organic Craft Cocktails",
    location: "Toronto, Canada",
    description: "A startup producing organic, artisanal cocktails.",
    highlights: [
      "Sustainable ingredients.",
      "Growing market demand.",
      "Award-winning recipes.",
      "Scalable distribution.",
    ],
    totalRequired: 1400000,
    minPerInvestor: 35000,
    badgeText: "Executive",
    logoUrl: placeholderImage,
    logoAlt: "Organic Craft Cocktails logo",
    imageUrl: placeholderLogo,
    imageAlt: "Organic Craft Cocktails opportunity",
  },
  {
    id: "3",
    title: "Property Investment Trust",
    location: "Bayern, Germany",
    description: "A diversified real estate investment trust.",
    highlights: [
      "Mixed-use properties.",
      "High occupancy rates.",
      "Tax-efficient structure.",
      "Long-term growth potential.",
    ],
    totalRequired: 2100000,
    minPerInvestor: 150000,
    badgeText: "Executive",
    logoUrl: placeholderImage,
    logoAlt: "Property Investment Trust logo",
    imageUrl: placeholderLogo,
    imageAlt: "Property Investment Trust opportunity",
  },
  {
    id: "4",
    title: "Food SME Accelerator SEA",
    location: "Singapore",
    description: "Supporting food SMEs in Southeast Asia.",
    highlights: [
      "High-growth food sector.",
      "Regional expansion support.",
      "Strong local partnerships.",
      "Impact-driven model.",
    ],
    totalRequired: 375000,
    minPerInvestor: 55000,
    badgeText: "Executive",
    logoUrl: placeholderImage,
    logoAlt: "Food SME Accelerator SEA logo",
    imageUrl: placeholderLogo,
    imageAlt: "Food SME Accelerator SEA opportunity",
  },
  {
    id: "5",
    title: "IO-Bean Tech",
    location: "Vienna, Austria",
    description: "A tech startup focused on IoT solutions.",
    highlights: [
      "Innovative IoT platform.",
      "Enterprise-grade solutions.",
      "Patent-pending technology.",
      "Global market potential.",
    ],
    totalRequired: 1100000,
    minPerInvestor: 200000,
    badgeText: "Executive",
    logoUrl: placeholderImage,
    logoAlt: "IO-Bean Tech logo",
    imageUrl: placeholderLogo,
    imageAlt: "IO-Bean Tech opportunity",
  },
];

const Matches = () => {
  const navigate = useNavigate();

  {
    /* Navigate to opportunity details */
  }
  const handleFindOutMore = useCallback(
    (opportunityId) => {
      navigate(`/investor/opportunity/${opportunityId}`);
    },
    [navigate]
  );

  {
    /* Remove opportunity from matches */
  }
  const handleRemoveOpportunity = useCallback((opportunityId) => {
    console.log(`Remove opportunity ${opportunityId} from matches`);
    // TODO: Implement API call to remove opportunity
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Investment Matches - CoreUp</title>
        <meta
          name="description"
          content={`Explore ${
            opportunities.length
          } tailored investment opportunities on CoreUp. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/investor/matches" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Investment Matches",
            description: "View tailored investment opportunities on CoreUp.",
            url: "https://coreup.com/investor/matches",
          })}
        </script>
      </Helmet>
      <>
        <div
          className={styles.matches}
          role="main"
          aria-label="Matches Dashboard"
        >
          <section
            className={styles.matches__opportunities}
            aria-labelledby="matches-opportunities-heading"
            role="region"
          >
            <h2
              id="matches-opportunities-heading"
              className={styles.matches__visuallyHidden}
            >
              Investment Opportunities
            </h2>
            {opportunities.length > 0 ? (
              <div className={styles.matches__grid} role="grid">
                {opportunities.map((opp) => (
                  <InvestmentCard
                    key={`opportunity-${opp.id}`}
                    id={opp.id}
                    title={opp.title}
                    location={opp.location}
                    logoUrl={opp.logoUrl}
                    logoAlt={opp.logoAlt}
                    imageUrl={opp.imageUrl}
                    imageAlt={opp.imageAlt}
                    description={opp.description}
                    highlights={opp.highlights}
                    totalRequired={opp.totalRequired}
                    minPerInvestor={opp.minPerInvestor}
                    badgeText={opp.badgeText}
                    onActionClick={() => handleFindOutMore(opp.id)}
                    onDeleteClick={() => handleRemoveOpportunity(opp.id)}
                    actionButtonText="View Details"
                    deleteButtonText="Remove"
                    loading="lazy"
                    aria-labelledby={`opportunity-title-${opp.id}`}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.matches__noResults}>
                No investment opportunities available.
              </p>
            )}
          </section>
        </div>
      </>
    </>
  );
};

export default React.memo(Matches);
