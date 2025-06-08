/**
 * NewsFeed.jsx
 *
 * A dashboard page for viewing and creating social posts.
 * Optimized with React.memo, useCallback, and useMemo for performance.
 * Accessibility Note: Includes ARIA attributes for posts and input.
 * SEO Note: Uses Helmet with noindex for private dashboard content.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { formatDistanceToNow } from "date-fns";
import InvestorLayout from "@/layouts/InvestorLayout/InvestorLayout";
import styles from "./NewsFeed.module.scss";
import NewsFeedCard from "@/components/features/NewsFeedCard/NewsFeedCard";
import NewsFeedPostInput from "@/components/features/NewsFeedPostInput/NewsFeedPostInput";
import placeholderImage from "@/assets/placeholder-cover.png";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  {
    /* Fetch posts from API */
  }
  useEffect(() => {
    setLoading(true);
    setError(null);

    const mockPosts = [
      {
        id: "1",
        userName: "Mohamed G",
        userInitial: "MG",
        postTime: "2025-06-01T13:09:00",
        mainText: "Excited to share our latest startup milestone!",
        sideText: "Our AI platform just hit 10,000 active users.",
        imageUrl: placeholderImage,
        imageAlt: "Mohamed G post image",
      },
      {
        id: "2",
        userName: "Ahmed",
        userInitial: "A",
        postTime: "2025-06-01T14:04:00",
        mainText: "New investment opportunity in green tech.",
        sideText: "Looking for partners to scale our solar solutions.",
        imageUrl: placeholderImage,
        imageAlt: "Ahmed post image",
      },
      {
        id: "3",
        userName: "Abdo",
        userInitial: "A",
        postTime: "2025-06-01T13:39:00",
        mainText: "Just closed a seed round!",
        sideText: "Thanks to CoreUp for connecting us with investors.",
        imageUrl: placeholderImage,
        imageAlt: "Abdo post image",
      },
    ];

    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  {
    /* Submit new post */
  }
  const handlePostSubmit = useCallback((text) => {
    if (!text.trim()) return;
    const newPost = {
      id: Date.now().toString(),
      userName: "Current User",
      userInitial: "CU",
      postTime: new Date().toISOString(),
      mainText: text,
      imageUrl: "",
      imageAlt: "New post image",
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }, []);

  {
    /* Add image to post */
  }
  const handleAddImage = useCallback(() => {
    console.log("Add image clicked");
    // TODO: Implement image upload logic
  }, []);

  {
    /* Share link in post */
  }
  const handleShareLink = useCallback(() => {
    console.log("Share link clicked");
    // TODO: Implement link sharing logic
  }, []);

  {
    /* Handle more actions for post */
  }
  const handleMoreClick = useCallback((postId) => {
    console.log(`More clicked for post ${postId}`);
    // TODO: Implement post actions (e.g., edit, delete)
  }, []);

  const renderedPosts = useMemo(() => {
    return posts.map((post) => (
      <NewsFeedCard
        key={post.id}
        userName={post.userName}
        userInitial={post.userInitial}
        postTime={formatDistanceToNow(new Date(post.postTime), {
          addSuffix: true,
        })}
        mainText={post.mainText}
        sideText={post.sideText}
        imageUrl={post.imageUrl}
        imageAlt={post.imageAlt}
        onMoreClick={() => handleMoreClick(post.id)}
        loading="lazy"
        aria-labelledby={`post-title-${post.id}`}
      />
    ));
  }, [posts, handleMoreClick]);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>News Feed - CoreUp</title>
        <meta
          name="description"
          content={`Stay updated with ${
            posts.length
          } community posts on CoreUp. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://coreup.com/investor/newsfeed" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "News Feed",
            description: "View and create community posts on CoreUp.",
            url: "https://coreup.com/investor/newsfeed",
          })}
        </script>
      </Helmet>
      <>
        <div
          className={styles.newsFeed}
          role="main"
          aria-label="News Feed Dashboard"
        >
          {/* Post Input Section */}
          <section
            className={styles.newsFeed__inputSection}
            aria-labelledby="news-feed-input-heading"
            role="region"
          >
            <h2
              id="news-feed-input-heading"
              className={styles.newsFeed__visuallyHidden}
            >
              Create a New Post
            </h2>
            <NewsFeedPostInput
              onPostSubmit={handlePostSubmit}
              onAddImage={handleAddImage}
              onShareLink={handleShareLink}
              aria-label="Post input form"
            />
          </section>

          {/* Posts Section */}
          <section
            className={styles.newsFeed__posts}
            aria-labelledby="news-feed-posts-heading"
            aria-live="polite"
            role="region"
          >
            <h2
              id="news-feed-posts-heading"
              className={styles.newsFeed__visuallyHidden}
            >
              Recent Posts
            </h2>
            {error ? (
              <div className={styles.newsFeed__error} role="alert">
                {error}
              </div>
            ) : loading ? (
              <div className={styles.newsFeed__loading}>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className={styles.newsFeed__skeleton} />
                ))}
              </div>
            ) : posts.length > 0 ? (
              renderedPosts
            ) : (
              <div className={styles.noPosts}>
                <p>No posts available yet. Be the first to post!</p>
              </div>
            )}
          </section>
        </div>
      </>
    </>
  );
};

export default React.memo(NewsFeed);
