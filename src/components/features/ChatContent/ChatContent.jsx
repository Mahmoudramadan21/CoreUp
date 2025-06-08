/**
 * ChatContent.jsx
 *
 * A component for rendering the chat interface, including header, messages, and input.
 * Optimized with React.memo and Suspense for lazy-loaded components.
 * Accessibility Note: Includes ARIA attributes for live regions and screen reader support.
 *
 * Props:
 * - messages: Array of message objects to display
 * - selectedConversation: Object containing conversation details (avatar, name)
 * - onSendMessage: Handler for sending messages
 * - newMessage: Current input message text
 * - onNewMessageChange: Handler for updating input message text
 * - onDeleteChat: Handler for deleting the chat
 * - getAvatarSrc: Function to get avatar source for a sender
 * - chatEndRef: Reference to scroll to the end of messages
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React from "react";
import PropTypes from "prop-types";
import styles from "./ChatContent.module.scss";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";
import ChatMessage from "@/components/features/ChatMessage/ChatMessage";
import ChatInput from "@/components/features/ChatInput/ChatInput";
import TrashIcon from "@/assets/icons/chat-trash.svg";

const ChatContent = ({
  messages,
  selectedConversation,
  onSendMessage,
  newMessage,
  onNewMessageChange,
  onDeleteChat,
  getAvatarSrc,
  chatEndRef,
}) => {
  return (
    <>
      {/* Chat Header Section */}
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderUser}>
          <img
            src={selectedConversation?.avatar}
            alt="User avatar"
            className={styles.chatHeaderAvatar}
            loading="lazy"
          />
          <span className={styles.chatHeaderName}>
            {selectedConversation?.name || "Unknown User"}
          </span>
        </div>
        <div className={styles.chatHeaderActions}>
          <button
            type="button"
            className={`${styles.chatHeaderAction} ${styles.chatHeaderActionTrash}`}
            aria-label="Delete chat"
            onClick={onDeleteChat}
          >
            <img
              src={TrashIcon}
              alt="Delete icon"
              className={styles.chatHeaderActionIcon}
              loading="lazy"
            />
          </button>
          <button
            type="button"
            className={`${styles.chatHeaderAction} ${styles.chatHeaderActionInfo}`}
            aria-label="More info"
          >
            <span className={styles.chatHeaderActionIcon}>!</span>
          </button>
        </div>
      </div>

      {/* Messages Container with Live Region */}
      <div className={styles.messagesContainer} aria-live="polite">
        <React.Suspense fallback={<LoadingFallback />}>
          {messages.map((message, index) => {
            const isSameSenderAsPrevious =
              index > 0 && message.sender === messages[index - 1].sender;
            return (
              <ChatMessage
                key={message.id}
                sender={message.sender}
                text={message.text}
                timestamp={message.timestamp}
                isSent={message.isSent}
                isSameSenderAsPrevious={isSameSenderAsPrevious}
                avatarSrc={getAvatarSrc(message.sender)}
              />
            );
          })}
        </React.Suspense>
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Footer */}
      <footer className={styles.chatFooter}>
        <React.Suspense fallback={<LoadingFallback />}>
          <ChatInput
            value={newMessage}
            onChange={onNewMessageChange}
            onSend={onSendMessage}
          />
        </React.Suspense>
      </footer>
    </>
  );
};

// PropTypes for type checking
ChatContent.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      isSent: PropTypes.bool.isRequired,
    })
  ).isRequired,
  selectedConversation: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
  }),
  onSendMessage: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired,
  onNewMessageChange: PropTypes.func.isRequired,
  onDeleteChat: PropTypes.func.isRequired,
  getAvatarSrc: PropTypes.func.isRequired,
  chatEndRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default React.memo(ChatContent);
