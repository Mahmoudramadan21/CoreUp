/**
 * InvestmentCard.jsx
 *
 * A component for displaying investment opportunity details.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and semantic structure.
 *
 * Props:
 * - id: Unique identifier for the card
 * - title: Investment opportunity title
 * - location: Location of the company
 * - logoUrl: URL for the company logo
 * - logoAlt: Alt text for the logo
 * - imageUrl: URL for the cover image
 * - imageAlt: Alt text for the cover image
 * - industry: Industry of the company
 * - fundingGoal: Funding goal amount
 * - minInvestment: Minimum investment amount
 * - equityOffered: Equity percentage offered
 * - projectedROI: Projected return on investment
 * - fundingStage: Current funding stage
 * - companySize: Number of employees
 * - yearsInOperation: Years the company has been operating
 * - traction: Array of traction metrics
 * - description: Company description
 * - highlights: Array of highlight points
 * - founders: Founders' names
 * - requestDate: Date of the investment request
 * - totalRequired: Total funding required
 * - minPerInvestor: Minimum investment per investor
 * - badgeText: Optional badge text
 * - onActionClick: Handler for action button
 * - onDeleteClick: Handler for delete button
 * - actionButtonText: Text for action button
 * - deleteButtonText: Text for delete button
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./InvestmentCard.module.scss";
import LocationIcon from "@/assets/icons/location.svg";
import TrashIcon from "@/assets/icons/trash.svg";

const InvestmentCard = ({
  id,
  title,
  location,
  logoUrl,
  logoAlt,
  imageUrl,
  imageAlt,
  industry,
  fundingGoal,
  minInvestment,
  equityOffered,
  projectedROI,
  fundingStage,
  companySize,
  yearsInOperation,
  traction,
  description,
  highlights,
  founders,
  requestDate,
  totalRequired,
  minPerInvestor,
  badgeText,
  onActionClick,
  onDeleteClick,
  actionButtonText,
  deleteButtonText,
}) => {
  // Memoize action handlers
  const handleActionClick = useCallback(() => {
    if (onActionClick) onActionClick();
  }, [onActionClick]);

  const handleDeleteClick = useCallback(() => {
    if (onDeleteClick) onDeleteClick();
  }, [onDeleteClick]);

  // Format request date with error handling
  const formattedRequestDate = useCallback(() => {
    if (!requestDate) return "";
    try {
      return new Date(requestDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  }, [requestDate])();

  return (
    <article
      className={styles.investmentCard}
      role="article"
      aria-labelledby={`investment-card-title-${id}`}
    >
      {/* Badge Section */}
      {badgeText && (
        <span
          className={styles.investmentCard__badge}
          aria-label={`Status: ${badgeText}`}
        >
          {badgeText}
        </span>
      )}

      {/* Image Section */}
      <div className={styles.investmentCard__imageSection}>
        {imageUrl && (
          <div className={styles.investmentCard__coverImageWrapper}>
            <img
              src={imageUrl}
              alt={imageAlt}
              className={styles.investmentCard__coverImage}
              loading="lazy"
            />
          </div>
        )}
        {logoUrl && (
          <div className={styles.investmentCard__logoWrapper}>
            <img
              src={logoUrl}
              alt={logoAlt}
              className={styles.investmentCard__logo}
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={styles.investmentCard__content}>
        <header className={styles.investmentCard__header}>
          <h3
            id={`investment-card-title-${id}`}
            className={styles.investmentCard__title}
          >
            {title}
          </h3>
          <p className={styles.investmentCard__location}>
            <img
              src={LocationIcon}
              alt=""
              className={styles.investmentCard__locationIcon}
              aria-hidden="true"
            />
            {location}
          </p>
          {(industry || fundingStage) && (
            <div className={styles.investmentCard__industryStage}>
              {industry && (
                <span className={styles.investmentCard__industry}>
                  Industry: {industry}
                </span>
              )}
              {fundingStage && (
                <span className={styles.investmentCard__fundingStage}>
                  Stage: {fundingStage}
                </span>
              )}
            </div>
          )}
        </header>

        {/* Meta Information */}
        {(founders || companySize || yearsInOperation || requestDate) && (
          <div className={styles.investmentCard__meta}>
            {founders && (
              <p className={styles.investmentCard__founders}>{founders}</p>
            )}
            {(companySize || yearsInOperation) && (
              <p className={styles.investmentCard__companyInfo}>
                {companySize && `${companySize} employees`}
                {companySize && yearsInOperation && " • "}
                {yearsInOperation && `${yearsInOperation} years in operation`}
              </p>
            )}
            {requestDate && (
              <p className={styles.investmentCard__requestDate}>
                Requested on: {formattedRequestDate}
              </p>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className={styles.investmentCard__description}>{description}</p>
        )}

        {/* Financial Details */}
        {(totalRequired > 0 ||
          minPerInvestor > 0 ||
          fundingGoal > 0 ||
          minInvestment > 0 ||
          equityOffered > 0 ||
          projectedROI > 0) && (
          <div className={styles.investmentCard__financials}>
            {(totalRequired > 0 || fundingGoal > 0) && (
              <div className={styles.investmentCard__financialItem}>
                <span className={styles.investmentCard__financialValue}>
                  ${(totalRequired || fundingGoal).toLocaleString()}
                </span>
                <span className={styles.investmentCard__financialLabel}>
                  {totalRequired > 0 ? "Total Required" : "Funding Goal"}
                </span>
              </div>
            )}
            {(minPerInvestor > 0 || minInvestment > 0) && (
              <div className={styles.investmentCard__financialItem}>
                <span className={styles.investmentCard__financialValue}>
                  ${(minPerInvestor || minInvestment).toLocaleString()}
                </span>
                <span className={styles.investmentCard__financialLabel}>
                  {minPerInvestor > 0 ? "Min per Investor" : "Min Investment"}
                </span>
              </div>
            )}
            {equityOffered > 0 && (
              <div className={styles.investmentCard__financialItem}>
                <span className={styles.investmentCard__financialValue}>
                  {equityOffered}%
                </span>
                <span className={styles.investmentCard__financialLabel}>
                  Equity Offered
                </span>
              </div>
            )}
            {projectedROI > 0 && (
              <div className={styles.investmentCard__financialItem}>
                <span className={styles.investmentCard__financialValue}>
                  {projectedROI}%/yr
                </span>
                <span className={styles.investmentCard__financialLabel}>
                  Projected ROI
                </span>
              </div>
            )}
          </div>
        )}

        {/* Highlights Section */}
        {highlights && highlights.length > 0 && (
          <div className={styles.investmentCard__section}>
            <h4 className={styles.investmentCard__sectionTitle}>Highlights</h4>
            <ul className={styles.investmentCard__highlights}>
              {highlights.map((highlight, index) => (
                <li
                  key={`highlight-${id}-${index}`}
                  className={styles.investmentCard__highlight}
                >
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Traction Section */}
        {traction && traction.length > 0 && (
          <div className={styles.investmentCard__section}>
            <h4 className={styles.investmentCard__sectionTitle}>Traction</h4>
            <ul className={styles.investmentCard__traction}>
              {traction.map((metric, index) => (
                <li
                  key={`traction-${id}-${index}`}
                  className={styles.investmentCard__tractionItem}
                >
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.investmentCard__actions}>
          <button
            type="button"
            className={styles.investmentCard__button}
            onClick={handleActionClick}
            aria-label={`${
              actionButtonText || "Find out more"
            } about ${title} investment opportunity`}
            disabled={!onActionClick}
          >
            {actionButtonText || "Find Out More"}
          </button>
          <button
            type="button"
            className={styles.investmentCard__deleteButton}
            onClick={handleDeleteClick}
            aria-label={`${
              deleteButtonText || "Delete"
            } ${title} investment opportunity`}
            disabled={!onDeleteClick}
          >
            {deleteButtonText ? (
              deleteButtonText
            ) : (
              <img
                src={TrashIcon}
                alt=""
                className={styles.investmentCard__deleteIcon}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

// PropTypes for type checking
InvestmentCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  logoAlt: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  industry: PropTypes.string,
  fundingGoal: PropTypes.number,
  minInvestment: PropTypes.number,
  equityOffered: PropTypes.number,
  projectedROI: PropTypes.number,
  fundingStage: PropTypes.string,
  companySize: PropTypes.number,
  yearsInOperation: PropTypes.number,
  traction: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  highlights: PropTypes.arrayOf(PropTypes.string),
  founders: PropTypes.string,
  requestDate: PropTypes.string,
  totalRequired: PropTypes.number,
  minPerInvestor: PropTypes.number,
  badgeText: PropTypes.string,
  onActionClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  actionButtonText: PropTypes.string,
  deleteButtonText: PropTypes.string,
};

// Default props
InvestmentCard.defaultProps = {
  logoUrl: "",
  logoAlt: "Company logo",
  imageUrl: "",
  imageAlt: "Investment opportunity image",
  industry: "",
  fundingGoal: 0,
  minInvestment: 0,
  equityOffered: 0,
  projectedROI: 0,
  fundingStage: "",
  companySize: 0,
  yearsInOperation: 0,
  traction: [],
  description: "",
  highlights: [],
  founders: "",
  requestDate: "",
  totalRequired: 0,
  minPerInvestor: 0,
  badgeText: "",
  onActionClick: null,
  onDeleteClick: null,
  actionButtonText: "",
  deleteButtonText: "",
};

export default React.memo(InvestmentCard);
