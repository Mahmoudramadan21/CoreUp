/**
 * ChatInput.jsx
 *
 * A component for the chat input field with file upload and send actions.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes and keyboard support for sending messages.
 *
 * Props:
 * - value: Current input value
 * - onChange: Handler for input changes
 * - onSend: Handler for sending messages
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./ChatInput.module.scss";
import PaperclipIcon from "@/assets/icons/paperclip.svg";
import FastForwardIcon from "@/assets/icons/fast-forward.svg";

const ChatInput = ({ value, onChange, onSend }) => {
  // Memoize key press handler to prevent unnecessary re-renders
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  return (
    <div
      className={styles.chatInput}
      role="form"
      aria-label="Message input form"
    >
      {/* Input Field */}
      <input
        type="text"
        placeholder="Write your message"
        className={styles.chatInputField}
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        aria-label="Type your message here"
        autoComplete="off"
        maxLength={500}
      />
      {/* Action Buttons */}
      <div className={styles.chatInputActions}>
        <label htmlFor="file-upload" className={styles.chatInputFileLabel}>
          <img
            src={PaperclipIcon}
            alt="Attach a file"
            className={styles.chatInputFileIcon}
            loading="lazy"
          />
          <input
            id="file-upload"
            type="file"
            className={styles.chatInputFile}
            style={{ display: "none" }}
            aria-label="Upload a file"
            accept="image/*,application/pdf"
            onChange={(e) => console.log("File uploaded:", e.target.files[0])}
          />
        </label>
        <button
          type="button"
          className={styles.chatInputSend}
          aria-label="Send message"
          onClick={onSend}
        >
          <img
            src={FastForwardIcon}
            alt="Send message icon"
            className={styles.chatInputSendIcon}
            loading="lazy"
          />
        </button>
      </div>
    </div>
  );
};

// PropTypes for type checking
ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default React.memo(ChatInput);
