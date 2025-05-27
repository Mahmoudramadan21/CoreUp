/**
 * Home.jsx
 *
 * The landing page for CoreUp with hero, success metrics, steps, testimonials, pricing, and CTA.
 * Optimized with React.memo, lazy loading, and Suspense for performance.
 * Accessibility Note: Includes ARIA attributes for sections and images.
 * SEO Note: Uses Helmet with schema.org structured data for crawlability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import styles from "./Home.module.scss";
import Button from "@/components/common/Button/Button";
import PlanButton from "@/components/features/PlanButton/PlanButton";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";

// Lazy load feature components
const Plan = React.lazy(() => import("@/components/features/Plan/Plan"));
const Step = React.lazy(() => import("@/components/features/Step/Step"));
const Testimonial = React.lazy(() =>
  import("@/components/features/Testimonial/Testimonial")
);
const Card = React.lazy(() => import("@/components/common/Card/Card"));

// Assets
import heroGraphics from "@/assets/hero-graphics.png";
import userIcon from "@/assets/icons/user.svg";
import documentIcon from "@/assets/icons/document.svg";
import envelopeIcon from "@/assets/icons/envelope.svg";
import connectorLine from "@/assets/icons/connector-line.svg";
import connectorReversedLine from "@/assets/icons/connector-reversed-line.svg";
import blob from "@/assets/blob.svg";
import spiral from "@/assets/spiral.svg";
import avatar1 from "@/assets/avatars/avatar1.svg";
import avatar2 from "@/assets/avatars/avatar2.svg";
import avatar3 from "@/assets/avatars/avatar3.svg";

const stepsData = [
  {
    icon: userIcon,
    title: "Create account",
    description: "Quickly sign up to start exploring opportunities.",
    connector: connectorLine,
  },
  {
    icon: documentIcon,
    title: "Complete your profile",
    description: "Add details to enhance your visibility.",
    connector: connectorReversedLine,
  },
  {
    icon: envelopeIcon,
    title: "Find an investor",
    description: "Discover investors matching your goals.",
    connector: connectorLine,
  },
  {
    icon: envelopeIcon,
    title: "Apply now",
    description: "Submit your pitch to secure funding.",
  },
];

const plans = [
  {
    title: "Basic",
    description: "Ideal for new startups exploring the platform.",
    price: "$19",
    period: "/Month",
    features: [
      "Profile creation",
      "Basic search access",
      "Limited matches",
      "Email support",
      "Monthly reports",
      "Community access",
    ],
    isRecommended: false,
    buttonVariant: "default",
  },
  {
    title: "Standard",
    description: "Perfect for growing startups seeking more opportunities.",
    price: "$39",
    period: "/Month",
    features: [
      "All Basic features",
      "Advanced search filters",
      "Unlimited matches",
      "Priority support",
      "Weekly reports",
      "Networking events",
    ],
    isRecommended: true,
    buttonVariant: "primary",
  },
  {
    title: "Premium",
    description: "Comprehensive tools for established startups.",
    price: "$59",
    period: "/Month",
    features: [
      "All Standard features",
      "Premium profile badge",
      "Dedicated account manager",
      "Custom analytics",
      "Exclusive events",
      "API access",
    ],
    isRecommended: false,
    buttonVariant: "default",
  },
];

const cards = [
  {
    title: "Startups Onboarded",
    subtitle: "Startup founders & team members",
    description: "Startups have joined CoreUp to find investors and grow.",
    className: styles["success__card--startup"],
    role: "region",
  },
  {
    title: "Investors Connected",
    subtitle: "VC Funds, Angel Syndicates & Networks",
    description: "Investors are actively connecting with startups on CoreUp.",
    className: styles["success__card--investor"],
    role: "region",
  },
];

const testimonials = [
  {
    avatar: avatar1,
    name: "John Doe",
    role: "Startup Founder",
    text: "CoreUp helped me connect with the right investors to grow my startup.",
    isFeatured: false,
  },
  {
    avatar: avatar2,
    name: "Jane Smith",
    role: "Investor",
    text: "I found amazing startups to invest in through CoreUp’s matching algorithm.",
    isFeatured: true,
  },
  {
    avatar: avatar3,
    name: "Alex Brown",
    role: "Job Seeker",
    text: "CoreUp helped me land my dream job at a startup. Highly recommend!",
    isFeatured: false,
  },
];

const Home = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - Connect Startups and Investors</title>
        <meta
          name="description"
          content={`Join CoreUp to connect startups with investors and grow your network. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="startups, investors, networking, CoreUp"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://coreup.com" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CoreUp Home",
            description: "Connect startups with investors on CoreUp.",
            url: "https://coreup.com",
          })}
        </script>
      </Helmet>
      <>
        <Suspense fallback={<LoadingFallback />}>
          {/* Hero Section */}
          <section
            className={`${styles.hero} container`}
            aria-labelledby="hero-title"
            role="banner"
          >
            <div className={styles.hero__content}>
              <h1 id="hero-title" className={styles.hero__title}>
                All-In-One Platform For{" "}
                <span className={styles["hero__title--highlight"]}>
                  Startups
                </span>
              </h1>
              <p className={styles.hero__subtitle}>
                Connect with investors, grow your network, and accelerate your
                startup’s success with CoreUp.
              </p>
              <Button to="/signup" aria-label="Join CoreUp now">
                Join Now
              </Button>
            </div>
            <div className={styles.hero__graphic}>
              <img
                src={heroGraphics}
                alt="Illustration of a startup workspace"
                width="430"
                height="400"
                loading="eager"
                fetchpriority="high"
              />
            </div>
          </section>

          {/* Success Section */}
          <section
            className={`${styles.success} container`}
            aria-label="Success Metrics"
            role="region"
          >
            <div className={styles.success__cards}>
              {cards.map((card, index) => (
                <Card
                  key={`card-${index}`}
                  className={card.className}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  role={card.role}
                  aria-labelledby={`card-title-${index}`}
                />
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section
            className={`${styles["how-it-works"]}`}
            aria-label="How CoreUp Works"
            role="region"
          >
            <div className={`${styles["how-it-works-container"]} container`}>
              <h2
                id="how-it-works-title"
                className={styles["how-it-works__title"]}
              >
                How CoreUp Works
              </h2>
              <div className={styles["how-it-works__steps"]}>
                {stepsData.map((step, index) => (
                  <Step
                    key={`step-${index}`}
                    icon={step.icon}
                    title={step.title}
                    description={step.description}
                    connector={step.connector}
                    connectorClassName={
                      step.connector === connectorReversedLine
                        ? styles["how-it-works__step-connector--reversed"]
                        : styles["how-it-works__step-connector"]
                    }
                    isDocument={step.icon === documentIcon}
                    loading="lazy"
                    aria-labelledby={`step-title-${index}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            className={`${styles.testimonials} container`}
            aria-label="Client Testimonials"
            role="region"
          >
            <div className={styles.testimonials__header}>
              <h2
                id="testimonials-title"
                className={styles.testimonials__title}
              >
                What Our Clients Say
              </h2>
              <p className={styles.testimonials__description}>
                Hear from startups, investors, and job seekers who succeeded
                with CoreUp.
              </p>
            </div>
            <div className={styles.testimonials__list}>
              {testimonials.map((testimonial, index) => (
                <Testimonial
                  key={`testimonial-${index}`}
                  avatar={testimonial.avatar}
                  name={testimonial.name}
                  role={testimonial.role}
                  text={testimonial.text}
                  isFeatured={testimonial.isFeatured}
                  loading="lazy"
                  aria-labelledby={`testimonial-title-${index}`}
                />
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section
            className={`${styles.pricing} container`}
            aria-label="Pricing Plans"
            role="region"
          >
            <img
              src={blob}
              alt=""
              className={styles.pricing__blob}
              loading="lazy"
              aria-hidden="true"
            />
            <img
              src={spiral}
              alt=""
              className={`${styles.pricing__spiral} ${styles["pricing__spiral--left"]}`}
              loading="lazy"
              aria-hidden="true"
            />
            <img
              src={spiral}
              alt=""
              className={`${styles.pricing__spiral} ${styles["pricing__spiral--right"]}`}
              loading="lazy"
              aria-hidden="true"
            />
            <div className={styles.pricing__plans}>
              {plans.map((plan, index) => (
                <Plan
                  key={`plan-${index}`}
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  period={plan.period}
                  features={plan.features}
                  isRecommended={plan.isRecommended}
                  button={
                    <PlanButton
                      variant={plan.buttonVariant}
                      to="/signup"
                      aria-label={`Choose ${plan.title} plan`}
                    >
                      Choose Plan
                    </PlanButton>
                  }
                  aria-labelledby={`plan-title-${index}`}
                />
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section
            className={`${styles.cta} container`}
            aria-label="Call to Action"
            role="region"
          >
            <div className={styles.cta__content}>
              <h2 id="cta-title" className={styles.cta__title}>
                Join CoreUp
              </h2>
              <p className={styles.cta__description}>
                The leading platform for startups, investors, and corporates to
                connect and grow.
              </p>
              <Button
                className="btn--primary btn--primary-lg"
                to="/signup"
                aria-label="Join CoreUp now"
              >
                Join Now
              </Button>
            </div>
          </section>
        </Suspense>
      </>
    </>
  );
};

export default React.memo(Home);
