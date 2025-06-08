/**
 * Portfolio.jsx
 *
 * A dashboard page for managing investment portfolio and connection requests.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for tabs and cards.
 * SEO Note: Uses Helmet with noindex for private dashboard content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styles from "./Portfolio.module.scss";
import StatCard from "@/components/features/StatCard/StatCard";
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
    ],
    totalRequired: 2100000,
    minPerInvestor: 150000,
    badgeText: "Executive",
    logoUrl: placeholderLogo,
    logoAlt: "Exclusive Real Estate Fund logo",
    imageUrl: placeholderImage,
    imageAlt: "Exclusive Real Estate Fund opportunity",
  },
  {
    id: "2",
    title: "Organic Craft Cocktails",
    location: "Toronto, Canada",
    description: "A startup producing organic, artisanal cocktails.",
    highlights: [
      "Sustainable organic ingredients.",
      "Award-winning recipes.",
      "Scalable distribution model.",
    ],
    totalRequired: 1400000,
    minPerInvestor: 35000,
    badgeText: "Executive",
    logoUrl: placeholderLogo,
    logoAlt: "Organic Craft Cocktails logo",
    imageUrl: placeholderImage,
    imageAlt: "Organic Craft Cocktails opportunity",
  },
  {
    id: "3",
    title: "Property Investment Trust",
    location: "Bayern, Germany",
    description: "A diversified real estate investment trust.",
    highlights: [
      "Mixed-use property portfolio.",
      "High occupancy rates.",
      "Tax-efficient structure.",
    ],
    totalRequired: 2100000,
    minPerInvestor: 150000,
    badgeText: "Executive",
    logoUrl: placeholderLogo,
    logoAlt: "Property Investment Trust logo",
    imageUrl: placeholderImage,
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
      "Impact-driven business model.",
    ],
    totalRequired: 375000,
    minPerInvestor: 55000,
    badgeText: "Executive",
    logoUrl: placeholderLogo,
    logoAlt: "Food SME Accelerator SEA logo",
    imageUrl: placeholderImage,
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
    ],
    totalRequired: 1100000,
    minPerInvestor: 200000,
    badgeText: "Executive",
    logoUrl: placeholderLogo,
    logoAlt: "IO-Bean Tech logo",
    imageUrl: placeholderImage,
    imageAlt: "IO-Bean Tech opportunity",
  },
];

const connectionRequests = [
  {
    id: "1",
    title: "Tech Startup A",
    location: "Berlin, Germany",
    industry: "Technology",
    fundingGoal: 500000,
    minInvestment: 50000,
    equityOffered: 10,
    projectedROI: 15,
    fundingStage: "Seed",
    companySize: 12,
    yearsInOperation: 2,
    traction: [
      "Annual revenue: $100K",
      "5,000 active users",
      "Partnerships with 3 tech firms",
    ],
    description: "A tech startup specializing in AI solutions.",
    highlights: [
      "AI-driven healthcare solutions.",
      "Experienced tech team.",
      "Secured $200K pre-seed.",
    ],
    founders: "Dr. Anna Schmidt, Mark Weber",
    requestDate: "2025-05-28T00:00:00Z",
    status: "pending",
    logoUrl: placeholderLogo,
    logoAlt: "Tech Startup A logo",
    imageUrl: placeholderImage,
    imageAlt: "Tech Startup A opportunity",
  },
  {
    id: "2",
    title: "Green Energy B",
    location: "London, UK",
    industry: "Renewable Energy",
    fundingGoal: 750000,
    minInvestment: 100000,
    equityOffered: 8,
    projectedROI: 12,
    fundingStage: "Series A",
    companySize: 25,
    yearsInOperation: 4,
    traction: [
      "Annual revenue: $350K",
      "500+ solar installations",
      "Government grants: $150K",
    ],
    description: "A solar panel innovation project.",
    highlights: [
      "20% more efficient solar tech.",
      "Government-backed pilots.",
      "12% ROI projected.",
    ],
    founders: "Sarah Johnson, Liam Brown",
    requestDate: "2025-05-25T00:00:00Z",
    status: "rejected",
    logoUrl: placeholderLogo,
    logoAlt: "Green Energy B logo",
    imageUrl: placeholderImage,
    imageAlt: "Green Energy B opportunity",
  },
];

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState("connectionRequests");
  const navigate = useNavigate();

  {
    /* Change active tab */
  }
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  {
    /* Accept connection request */
  }
  const handleAcceptRequest = useCallback((requestId) => {
    console.log(`Accepting request ${requestId}`);
    // TODO: Implement API call for accepting request
  }, []);

  {
    /* Reject connection request or remove opportunity */
  }
  const handleReject = useCallback((id) => {
    console.log(`Rejecting/removing ${id}`);
    // TODO: Implement API call for rejecting request or removing opportunity
  }, []);

  {
    /* Navigate to opportunity details */
  }
  const handleFindOutMore = useCallback(
    (id) => {
      navigate(`/investor/opportunity/${id}`);
    },
    [navigate]
  );

  {
    /* Memoized stats rendering */
  }
  const statsContent = useMemo(
    () => (
      <>
        <StatCard
          title="Awaiting Responses"
          value={connectionRequests
            .filter((r) => r.status === "pending")
            .length.toString()}
          buttonText="View Messages"
          onButtonClick={() => navigate("/investor/messages")}
          infoTooltip="Number of pending connection requests."
          aria-label="View messages awaiting response"
        />
        <StatCard
          title="Response Rate"
          value="N/A"
          infoTooltip="Percentage of responded requests."
          aria-label="Response rate statistics"
        />
        <StatCard
          title="Daily Connections"
          value="3/10"
          buttonText="Get More Connections"
          progress={30}
          onButtonClick={() => navigate("/investor/search")}
          infoTooltip="Daily connection progress."
          aria-label="Daily connections progress"
        />
      </>
    ),
    [navigate]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Investor Portfolio - CoreUp</title>
        <meta
          name="description"
          content={`Manage your portfolio with ${
            connectionRequests.length
          } connection requests and ${
            opportunities.length
          } opportunities on CoreUp. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/investor/portfolio" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Investor Portfolio",
            description: "Manage investment portfolio on CoreUp.",
            url: "https://coreup.com/investor/portfolio",
          })}
        </script>
      </Helmet>
      <>
        <div
          className={styles.portfolio}
          role="main"
          aria-label="Portfolio Dashboard"
        >
          {/* Stats Section */}
          <section
            className={styles.portfolio__stats}
            aria-labelledby="portfolio-stats-heading"
            role="region"
          >
            <h2
              id="portfolio-stats-heading"
              className={styles.portfolio__visuallyHidden}
            >
              Portfolio Statistics
            </h2>
            {statsContent}
          </section>

          {/* Connections Section */}
          <section
            className={styles.portfolio__requests}
            aria-labelledby="portfolio-requests-heading"
            role="region"
          >
            <h2
              id="portfolio-requests-heading"
              className={styles.portfolio__visuallyHidden}
            >
              Portfolio Management
            </h2>
            <div className={styles.portfolio__tabs} role="tablist">
              <button
                className={`${styles.portfolio__tab} ${
                  activeTab === "connectionRequests"
                    ? styles.portfolio__tabActive
                    : ""
                }`}
                aria-selected={activeTab === "connectionRequests"}
                role="tab"
                id="tab-connection-requests"
                aria-controls="panel-connection-requests"
                onClick={() => handleTabChange("connectionRequests")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    handleTabChange("connections");
                  }
                }}
              >
                Connection Requests
              </button>
              <button
                className={`${styles.portfolio__tab} ${
                  activeTab === "connections" ? styles.portfolio__tabActive : ""
                }`}
                aria-selected={activeTab === "connections"}
                role="tab"
                id="tab-connections"
                aria-controls="panel-connections"
                onClick={() => handleTabChange("connections")}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") {
                    handleTabChange("connectionRequests");
                  }
                }}
              >
                Connections
              </button>
            </div>
            <div
              id="panel-connection-requests"
              role="tabpanel"
              aria-labelledby="tab-connection-requests"
              hidden={activeTab !== "connectionRequests"}
              className={styles.portfolio__tabpanel}
            >
              {activeTab === "connectionRequests" && (
                <div className={styles.portfolio__connectionRequests}>
                  {connectionRequests.length > 0 ? (
                    connectionRequests.map((request) => (
                      <InvestmentCard
                        key={`connection-request-${request.id}`}
                        title={request.title}
                        location={request.location}
                        logoUrl={request.logoUrl}
                        logoAlt={request.logoAlt}
                        imageUrl={request.imageUrl}
                        imageAlt={request.imageAlt}
                        industry={request.industry}
                        fundingGoal={request.fundingGoal}
                        minInvestment={request.minInvestment}
                        equityOffered={request.equityOffered}
                        projectedROI={request.projectedROI}
                        fundingStage={request.fundingStage}
                        companySize={request.companySize}
                        yearsInOperation={request.yearsInOperation}
                        traction={request.traction}
                        description={request.description}
                        highlights={request.highlights}
                        founders={request.founders}
                        requestDate={request.requestDate}
                        badgeText={
                          request.status === "pending" ? "Pending" : "Rejected"
                        }
                        onActionClick={
                          request.status === "pending"
                            ? () => handleAcceptRequest(request.id)
                            : null
                        }
                        onDeleteClick={
                          request.status === "pending"
                            ? () => handleReject(request.id)
                            : null
                        }
                        actionButtonText={
                          request.status === "pending" ? "Accept" : ""
                        }
                        deleteButtonText={
                          request.status === "pending" ? "Reject" : ""
                        }
                        loading="lazy"
                        aria-labelledby={`request-title-${request.id}`}
                      />
                    ))
                  ) : (
                    <div className={styles.portfolio__noRequests}>
                      <p>
                        No connection requests found. Explore opportunities to
                        connect.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div
              id="panel-connections"
              role="tabpanel"
              aria-labelledby="tab-connections"
              hidden={activeTab !== "connections"}
              className={styles.portfolio__tabpanel}
            >
              {activeTab === "connections" && (
                <div className={styles.portfolio__connections}>
                  {opportunities.length > 0 ? (
                    opportunities.map((opp) => (
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
                        onDeleteClick={() => handleReject(opp.id)}
                        actionButtonText="View Details"
                        deleteButtonText="Remove"
                        loading="lazy"
                        aria-labelledby={`opportunity-title-${opp.id}`}
                      />
                    ))
                  ) : (
                    <div className={styles.portfolio__noConnections}>
                      <p>
                        No connections found. Accept requests to build your
                        portfolio.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </>
    </>
  );
};

export default React.memo(Portfolio);
