/**
 * ChatLayout.jsx
 *
 * A layout for chat interfaces with a sidebar and conversation list.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for sidebar toggle and conversations.
 * SEO Note: Uses Helmet for meta tags to improve searchability.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import styles from "./ChatLayout.module.scss";
import MenuIcon from "@/assets/icons/menu.svg";
import MagnifierIcon from "@/assets/icons/magnifier.svg";
import { useChat } from "@/context/ChatContext";

const ChatLayout = () => {
  const { conversations, handleConversationSelect } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  {
    /* Toggle Sidebar */
  }
  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  {
    /* Handle Conversation Selection */
  }
  const onSelectConversation = useCallback(
    (conversation) => {
      handleConversationSelect(conversation);
      if (isSidebarOpen) setIsSidebarOpen(false);
    },
    [handleConversationSelect, isSidebarOpen]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>CoreUp - Chat with Investors</title>
        <meta
          name="description"
          content={`Chat with investors and startups on CoreUp to grow your network. Last updated: ${new Date().toLocaleDateString()}`}
        />
        <meta
          name="keywords"
          content="chat, startups, networking, investors, CoreUp"
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main
        className={styles.chatLayout}
        role="main"
        aria-label="Chat Interface"
      >
        {/* Menu Toggle Button */}
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
          aria-label={
            isSidebarOpen ? "Close sidebar menu" : "Open sidebar menu"
          }
          aria-expanded={isSidebarOpen}
          type="button"
        >
          <img
            src={MenuIcon}
            alt=""
            className={styles.menuIcon}
            loading="lazy"
            aria-hidden="true"
          />
        </button>

        {/* Sidebar Section */}
        <aside
          className={`${styles.sidebar} ${
            isSidebarOpen ? styles.sidebarOpen : ""
          }`}
          aria-label="Conversations List"
          aria-hidden={!isSidebarOpen}
          role="complementary"
        >
          {/* Sidebar Header */}
          <div className={styles.sidebar__header}>
            <h2 className={styles.sidebar__title}>Messages</h2>
            <img
              src={MenuIcon}
              alt=""
              className={styles.sidebar__menuIcon}
              loading="lazy"
              aria-hidden="true"
            />
          </div>
          {/* Search Input */}
          <div className={styles.sidebar__search}>
            <input
              type="search"
              className={styles.sidebar__searchInput}
              placeholder="Search conversations"
              aria-label="Search conversations"
              aria-autocomplete="list"
            />
            <img
              src={MagnifierIcon}
              alt=""
              className={styles.sidebar__searchIcon}
              loading="lazy"
              aria-hidden="true"
            />
          </div>
          {/* Conversation List */}
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={styles.sidebar__message}
              tabIndex={0}
              role="button"
              aria-label={`Chat with ${conv.name}, last message: ${conv.text}, on ${conv.date}`}
              onClick={() => onSelectConversation(conv)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelectConversation(conv);
                }
              }}
            >
              <img
                src={conv.avatar}
                alt={`${conv.name}'s avatar`}
                className={styles.sidebar__avatar}
                loading="lazy"
              />
              <div className={styles.sidebar__messageContent}>
                <span className={styles.sidebar__messageName}>{conv.name}</span>
                <span className={styles.sidebar__messageText}>{conv.text}</span>
              </div>
              <div className={styles.sidebar__messageMeta}>
                <div className={styles.sidebar__messageDate}>{conv.date}</div>
                {conv.unread && (
                  <div
                    className={styles.sidebar__messageUnread}
                    aria-label="Unread message"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          ))}
        </aside>

        {/* Chat Area */}
        <section
          className={styles.chatArea}
          role="region"
          aria-label="Chat Content"
        >
          <Outlet />
        </section>
      </main>
    </>
  );
};

// PropTypes for type checking
ChatLayout.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      unread: PropTypes.bool,
    })
  ),
  handleConversationSelect: PropTypes.func,
};

// Default props
ChatLayout.defaultProps = {
  conversations: [],
  handleConversationSelect: () => {},
};

export default React.memo(ChatLayout);
