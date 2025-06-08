/**
 * Search.jsx
 *
 * A dashboard page for searching investment opportunities with filters.
 * Optimized with React.memo, useCallback, and useMemo for performance.
 * Accessibility Note: Includes ARIA attributes for filters and pagination.
 * SEO Note: Uses Helmet with noindex for private dashboard content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import InvestorLayout from "@/layouts/InvestorLayout/InvestorLayout";
import styles from "./Search.module.scss";
import InvestmentCard from "@/components/features/InvestmentCard/InvestmentCard";
import SingleSelectDropdown from "@/components/features/SingleSelectDropdown/SingleSelectDropdown";
import SleekInputBox from "@/components/common/SleekInputBox/SleekInputBox";
import SleekButton from "@/components/common/SleekButton/SleekButton";
import placeholderImage from "@/assets/placeholder-cover.png";
import placeholderLogo from "@/assets/placeholder-logo.png";

const investmentRangeOptions = [
  { value: "0-500000", label: "0 - 500,000" },
  { value: "500000-1000000", label: "500,000 - 1,000,000" },
  { value: "1000000-2000000", label: "1,000,000 - 2,000,000" },
  { value: "2000000-3000000", label: "2,000,000 - 3,000,000" },
];

const countryOptions = [
  { value: "Germany", label: "Germany" },
  { value: "Canada", label: "Canada" },
  { value: "Singapore", label: "Singapore" },
  { value: "Austria", label: "Austria" },
];

const locationOptions = [
  { value: "Bayern", label: "Bayern" },
  { value: "Toronto", label: "Toronto" },
  { value: "Singapore", label: "Singapore" },
  { value: "Vienna", label: "Vienna" },
];

const industryOptions = [
  { value: "real estate", label: "Real Estate" },
  { value: "food", label: "Food & Beverage" },
  { value: "tech", label: "Technology" },
];

const stagesOptions = [{ value: "executive", label: "Executive" }];

const fundingTypeOptions = [
  { value: "seed", label: "Seed" },
  { value: "series a", label: "Series A" },
];

const opportunities = [
  {
    id: "1",
    title: "Exclusive Real Estate Fund",
    location: "Bayern, Germany",
    description: "A premium real estate investment opportunity in Bavaria.",
    highlights: ["High-yield commercial properties.", "Stable rental income."],
    totalRequired: 2100000,
    minPerInvestor: 150000,
    badgeText: "Executive",
    industry: "real estate",
    fundingType: "series a",
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
    highlights: ["Sustainable ingredients.", "Award-winning recipes."],
    totalRequired: 1400000,
    minPerInvestor: 35000,
    badgeText: "Executive",
    industry: "food",
    fundingType: "seed",
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
    highlights: ["Mixed-use properties.", "Tax-efficient structure."],
    totalRequired: 2100000,
    minPerInvestor: 150000,
    badgeText: "Executive",
    industry: "real estate",
    fundingType: "series a",
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
    highlights: ["High-growth food sector.", "Impact-driven model."],
    totalRequired: 375000,
    minPerInvestor: 55000,
    badgeText: "Executive",
    industry: "food",
    fundingType: "seed",
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
    highlights: ["Innovative IoT platform.", "Global market potential."],
    totalRequired: 1100000,
    minPerInvestor: 200000,
    badgeText: "Executive",
    industry: "tech",
    fundingType: "seed",
    logoUrl: placeholderLogo,
    logoAlt: "IO-Bean Tech logo",
    imageUrl: placeholderImage,
    imageAlt: "IO-Bean Tech opportunity",
  },
];

const Search = () => {
  const [filters, setFilters] = useState({
    investmentRange: null,
    country: null,
    location: null,
    industry: null,
    stages: null,
    fundingType: null,
    searchQuery: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  {
    /* Update filter values */
  }
  const handleFilterChange = useCallback((selected, { name }) => {
    setFilters((prev) => ({ ...prev, [name]: selected }));
    setCurrentPage(1);
  }, []);

  {
    /* Update search query */
  }
  const handleSearchChange = useCallback((e) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
    setCurrentPage(1);
  }, []);

  {
    /* Apply filters and reset page */
  }
  const handleApplyFilters = useCallback(() => {
    console.log("Filters applied:", filters);
    setCurrentPage(1);
  }, [filters]);

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
    /* Remove opportunity from search */
  }
  const handleRemoveOpportunity = useCallback((opportunityId) => {
    console.log(`Remove opportunity ${opportunityId} from search`);
    // TODO: Implement API call to remove opportunity
  }, []);

  {
    /* Filter opportunities based on criteria */
  }
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const investmentRange = filters.investmentRange?.value
        ? parseInt(filters.investmentRange.value.split("-")[0]) <=
            opp.totalRequired &&
          opp.totalRequired <=
            parseInt(filters.investmentRange.value.split("-")[1])
        : true;
      const country = filters.country?.value
        ? opp.location
            .toLowerCase()
            .includes(filters.country.value.toLowerCase())
        : true;
      const location = filters.location?.value
        ? opp.location
            .toLowerCase()
            .includes(filters.location.value.toLowerCase())
        : true;
      const industry = filters.industry?.value
        ? opp.industry.toLowerCase() === filters.industry.value.toLowerCase()
        : true;
      const stages = filters.stages?.value
        ? opp.badgeText
            .toLowerCase()
            .includes(filters.stages.value.toLowerCase())
        : true;
      const fundingType = filters.fundingType?.value
        ? opp.fundingType.toLowerCase() ===
          filters.fundingType.value.toLowerCase()
        : true;
      const searchQuery = filters.searchQuery
        ? opp.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          opp.description
            .toLowerCase()
            .includes(filters.searchQuery.toLowerCase())
        : true;

      return (
        investmentRange &&
        country &&
        location &&
        industry &&
        stages &&
        fundingType &&
        searchQuery
      );
    });
  }, [filters]);

  {
    /* Paginate opportunities */
  }
  const totalPages = Math.ceil(filteredOpportunities.length / itemsPerPage);
  const paginatedOpportunities = filteredOpportunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  {
    /* Navigate to previous page */
  }
  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  {
    /* Navigate to next page */
  }
  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Search Investments - CoreUp</title>
        <meta
          name="description"
          content={`Search through ${
            opportunities.length
          } investment opportunities on CoreUp. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="investment, opportunities, search, startups, CoreUp"
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/investor/search" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Search Investments",
            description: "Search investment opportunities on CoreUp.",
            url: "https://coreup.com/investor/search",
          })}
        </script>
      </Helmet>
      <>
        <div
          className={styles.search}
          role="main"
          aria-label="Search Investments Dashboard"
        >
          {/* Filters Section */}
          <fieldset className={styles.search__filters} role="search">
            <legend className={styles.search__visuallyHidden}>
              Search Investment Filters
            </legend>
            <SingleSelectDropdown
              id="investmentRange"
              options={investmentRangeOptions}
              value={filters.investmentRange}
              onChange={(selected) =>
                handleFilterChange(selected, { name: "investmentRange" })
              }
              placeholder="Investment Range"
              aria-label="Select investment range"
            />
            <SingleSelectDropdown
              id="country"
              options={countryOptions}
              value={filters.country}
              onChange={(selected) =>
                handleFilterChange(selected, { name: "country" })
              }
              placeholder="Country"
              aria-label="Select country"
            />
            <SingleSelectDropdown
              id="location"
              options={locationOptions}
              value={filters.location}
              onChange={(selected) =>
                handleFilterChange(selected, { name: "location" })
              }
              placeholder="Location"
              aria-label="Select location"
            />
            <SingleSelectDropdown
              id="industry"
              options={industryOptions}
              value={filters.industry}
              onChange={(selected) =>
                handleFilterChange(selected, { name: "industry" })
              }
              placeholder="Industry"
              aria-label="Select industry"
            />
            <SingleSelectDropdown
              id="stages"
              options={stagesOptions}
              value={filters.stages}
              onChange={(selected) =>
                handleFilterChange(selected, { name: "stages" })
              }
              placeholder="Stage"
              aria-label="Select investment stage"
            />
            <SingleSelectDropdown
              id="fundingType"
              options={fundingTypeOptions}
              value={filters.fundingType}
              onChange={(selected) =>
                handleFilterChange(selected, { name: "fundingType" })
              }
              placeholder="Funding Type"
              aria-label="Select funding type"
            />
            <div className={styles.search__filtersButtons}>
              <SleekButton
                variant="secondary"
                onClick={() =>
                  setFilters({
                    investmentRange: null,
                    country: null,
                    location: null,
                    industry: null,
                    stages: null,
                    fundingType: null,
                    searchQuery: "",
                  })
                }
                aria-label="Clear all search filters"
              >
                Clear Filters
              </SleekButton>
              <SleekButton
                onClick={handleApplyFilters}
                aria-label="Apply search filters"
              >
                Apply
              </SleekButton>
            </div>
          </fieldset>

          {/* Search Bar */}
          <div className={styles.search__searchBox}>
            <SleekInputBox
              id="searchQuery"
              placeholder="Search by name or description"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              type="text"
              aria-label="Search investment opportunities by name or description"
            />
            <SleekButton
              onClick={handleApplyFilters}
              aria-label="Apply search filters"
            >
              Apply
            </SleekButton>
          </div>

          {/* Results Section */}
          <section
            className={styles.search__results}
            aria-labelledby="search-results-heading"
            role="region"
          >
            <h2 id="search-results-heading" className={styles.search__title}>
              Recent Business Opportunities
            </h2>
            <p className={styles.search__description}>
              Explore a diverse range of investments, from startups to
              established businesses.
            </p>
            <div className={styles.search__resultsHeader}>
              <p className={styles.search__count}>
                {filteredOpportunities.length} investments found
              </p>
              <div className={styles.search__display}>
                <span>Sort by:</span>
                <SleekButton
                  variant="secondary"
                  size="small"
                  aria-label="Sort by featured"
                >
                  Featured
                </SleekButton>
              </div>
            </div>
            {paginatedOpportunities.length > 0 ? (
              <div className={styles.search__cardsWrapper}>
                {paginatedOpportunities.map((opp) => (
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
              <div className={styles.search__noResults}>
                <p>
                  No opportunities match your criteria. Try adjusting filters.
                </p>
              </div>
            )}
          </section>

          {/* Pagination */}
          <nav
            className={styles.search__pagination}
            aria-label="Search results pagination"
          >
            <span>Per Page: {itemsPerPage}</span>
            <SleekButton
              variant="secondary"
              size="small"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              Previous
            </SleekButton>
            <span aria-current={currentPage ? "page" : undefined}>
              {currentPage} of {totalPages}
            </span>
            <SleekButton
              variant="secondary"
              size="small"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next
            </SleekButton>
          </nav>
        </div>
      </>
    </>
  );
};

export default React.memo(Search);
