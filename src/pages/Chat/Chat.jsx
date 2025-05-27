/**
 * Chat.jsx
 *
 * A page for displaying chat conversations with a selected user.
 * Optimized with React.memo and useCallback for performance.
 * Accessibility Note: Includes ARIA attributes for chat content and navigation.
 * SEO Note: Uses Helmet for meta tags to prevent indexing of private chats.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import React, { Suspense, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";
import ChatContent from "@/components/features/ChatContent/ChatContent";
import { useChat } from "@/routes/ChatRoutes";

const Chat = () => {
  const {
    conversations,
    memoizedMessages,
    selectedConversation,
    handleSendMessage,
    newMessage,
    setNewMessage,
    getAvatarSrc,
    chatEndRef,
    setConversationMessages,
    selectedConversationId,
  } = useChat();
  const { username } = useParams();
  const navigate = useNavigate();

  {
    /* Redirect if conversation not found */
  }
  const checkConversation = useCallback(() => {
    const conv = conversations.find((c) => c.username === username);
    if (!conv && username) {
      navigate("/chats", { replace: true });
    }
  }, [username, conversations, navigate]);

  useEffect(() => {
    checkConversation();
  }, [checkConversation]);

  {
    /* Handle message input change */
  }
  const handleNewMessageChange = useCallback(
    (e) => setNewMessage(e.target.value),
    [setNewMessage]
  );

  {
    /* Handle chat deletion */
  }
  const handleDeleteChat = useCallback(
    () =>
      setConversationMessages((prev) => ({
        ...prev,
        [selectedConversationId]: [],
      })),
    [setConversationMessages, selectedConversationId]
  );

  if (!selectedConversation) {
    return null;
  }

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Chat - CoreUp</title>
        <meta
          name="description"
          content={`Private chat with ${selectedConversation.name} on CoreUp.`}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Suspense fallback={<LoadingFallback />}>
        <ChatContent
          messages={memoizedMessages}
          selectedConversation={selectedConversation}
          onSendMessage={handleSendMessage}
          newMessage={newMessage}
          onNewMessageChange={handleNewMessageChange}
          onDeleteChat={handleDeleteChat}
          getAvatarSrc={getAvatarSrc}
          chatEndRef={chatEndRef}
          role="region"
          aria-label={`Chat with ${selectedConversation.name}`}
        />
      </Suspense>
    </>
  );
};

// PropTypes for type checking
Chat.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  memoizedMessages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ),
  selectedConversation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  handleSendMessage: PropTypes.func.isRequired,
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  getAvatarSrc: PropTypes.func.isRequired,
  chatEndRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  setConversationMessages: PropTypes.func.isRequired,
  selectedConversationId: PropTypes.string.isRequired,
};

// Default props
Chat.defaultProps = {
  conversations: [],
  memoizedMessages: [],
  selectedConversation: null,
  chatEndRef: null,
};

export default React.memo(Chat);
