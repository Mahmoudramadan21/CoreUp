/**
 * context/ChatContext.jsx
 *
 * Chat context for managing conversation state and logic.
 * Separated from chatRoutes for better modularity.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import Avatar1Icon from "@/assets/avatars/avatar1.svg";
import Avatar2Icon from "@/assets/avatars/avatar2.svg";
import Avatar3Icon from "@/assets/avatars/avatar3.svg";
import Avatar4Icon from "@/assets/avatars/avatar3.svg";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const { username } = useParams();

  const [conversations, setConversations] = useState([
    {
      id: "conv_001",
      name: "Mohamed G.",
      username: "mohamedg",
      text: "Let’s discuss the project timeline.",
      date: "2025-06-05",
      unread: false,
      avatar: Avatar2Icon,
    },
    {
      id: "conv_002",
      name: "Jane Smith",
      username: "janesmith",
      text: "Can we review the funding details?",
      date: "2025-06-04",
      unread: true,
      avatar: Avatar3Icon,
    },
    {
      id: "conv_003",
      name: "Alex Johnson",
      username: "alexjohnson",
      text: "I have some ideas for the pitch deck.",
      date: "2025-06-03",
      unread: false,
      avatar: Avatar4Icon,
    },
    {
      id: "conv_004",
      name: "Sarah Lee",
      username: "sarahlee",
      text: "Looking forward to our meeting!",
      date: "2025-06-02",
      unread: true,
      avatar: Avatar2Icon,
    },
  ]);

  const [conversationMessages, setConversationMessages] = useState({
    conv_001: [
      {
        id: 1,
        sender: "Mohamed G.",
        text: "Hey! How’s it going?",
        timestamp: new Date("2025-06-05T14:50:00Z").toISOString(),
        isSent: false,
        avatar: Avatar2Icon,
      },
      {
        id: 2,
        sender: "You",
        text: "Good, thanks! How about you?",
        timestamp: new Date("2025-06-05T14:51:00Z").toISOString(),
        isSent: true,
        avatar: Avatar1Icon,
      },
      {
        id: 3,
        sender: "Mohamed G.",
        text: "Let’s discuss the project timeline.",
        timestamp: new Date("2025-06-05T14:52:00Z").toISOString(),
        isSent: false,
        avatar: Avatar2Icon,
      },
    ],
    conv_002: [
      {
        id: 1,
        sender: "Jane Smith",
        text: "Hi! Can we review the funding details?",
        timestamp: new Date("2025-06-04T10:30:00Z").toISOString(),
        isSent: false,
        avatar: Avatar3Icon,
      },
      {
        id: 2,
        sender: "You",
        text: "Sure, let’s set up a time.",
        timestamp: new Date("2025-06-04T10:31:00Z").toISOString(),
        isSent: true,
        avatar: Avatar1Icon,
      },
    ],
    conv_003: [
      {
        id: 1,
        sender: "Alex Johnson",
        text: "I have some ideas for the pitch deck.",
        timestamp: new Date("2025-06-03T14:30:00Z").toISOString(),
        isSent: false,
        avatar: Avatar4Icon,
      },
      {
        id: 2,
        sender: "You",
        text: "Great! Send them over.",
        timestamp: new Date("2025-06-03T14:31:00Z").toISOString(),
        isSent: true,
        avatar: Avatar1Icon,
      },
    ],
    conv_004: [
      {
        id: 1,
        sender: "Sarah Lee",
        text: "Looking forward to our meeting!",
        timestamp: new Date("2025-06-02T16:30:00Z").toISOString(),
        isSent: false,
        avatar: Avatar2Icon,
      },
    ],
  });

  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  /* Sync selected conversation with URL */
  useEffect(() => {
    if (username) {
      const conv = conversations.find((c) => c.username === username);
      if (conv && conv.id !== selectedConversationId) {
        setSelectedConversationId(conv.id);
        setConversations((prev) =>
          prev.map((item) =>
            item.id === conv.id ? { ...item, unread: false } : item
          )
        );
      }
    }
  }, [username, conversations, selectedConversationId]);

  /* Scroll to bottom of chat */
  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages, selectedConversationId, scrollToBottom]);

  /* Send new message */
  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedConversationId) return;

    const newMsg = {
      id: (conversationMessages[selectedConversationId]?.length || 0) + 1,
      sender: "You",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isSent: true,
      avatar: Avatar1Icon,
    };

    setConversationMessages((prev) => ({
      ...prev,
      [selectedConversationId]: [
        ...(prev[selectedConversationId] || []),
        newMsg,
      ],
    }));

    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              text: newMsg.text,
              date: new Date().toLocaleDateString("en-CA"),
              unread: false,
            }
          : conv
      )
    );

    setNewMessage("");
    scrollToBottom();
  }, [newMessage, selectedConversationId, scrollToBottom]);

  /* Select conversation */
  const handleSelectConversation = useCallback(
    (conv) => {
      setSelectedConversationId(conv.id);
      setConversations((prev) =>
        prev.map((c) => (c.id === conv.id ? { ...c, unread: false } : c))
      );
      navigate(`/chats/${conv.username}`);
    },
    [navigate]
  );

  /* Memoized messages for performance */
  const memoizedMessages = useMemo(
    () => conversationMessages[selectedConversationId] || [],
    [conversationMessages, selectedConversationId]
  );

  /* Get avatar for messages */
  const getAvatar = useCallback(
    (sender) =>
      sender === "You"
        ? Avatar1Icon
        : conversations.find((conv) => conv.name === sender)?.avatar ||
          Avatar2Icon,
    [conversations]
  );

  /* Memoized selected conversation */
  const selectedConversation = useMemo(
    () => conversations.find((c) => c.id === selectedConversationId),
    [conversations, selectedConversationId]
  );

  const value = useMemo(
    () => ({
      conversations,
      memoizedMessages,
      selectedConversation,
      handleSendMessage,
      newMessage,
      setNewMessage,
      handleSelectConversation,
      getAvatar,
      chatEndRef,
      setConversationMessages,
      selectedConversationId,
    }),
    [
      conversations,
      memoizedMessages,
      selectedConversation,
      handleSendMessage,
      newMessage,
      setNewMessage,
      handleSelectConversation,
      getAvatar,
      chatEndRef,
      setConversationMessages,
      selectedConversationId,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ChatContentWrapper = () => {
  const {
    conversations,
    memoizedMessages,
    selectedConversation,
    handleSendMessage,
    newMessage,
    setNewMessage,
    getAvatar,
    chatEndRef,
    setConversationMessages,
    selectedConversationId,
  } = useChat();
  const { username } = useParams();
  const navigate = useNavigate();

  /* Redirect if conversation doesn't exist */
  useEffect(() => {
    const conv = conversations.find((c) => c.username === username);
    if (!conv && username) {
      navigate("/chats");
    }
  }, [username, conversations, navigate]);

  if (!selectedConversation) return null;

  return (
    <ChatContent
      messages={memoizedMessages}
      selectedConversation={selectedConversation}
      onSendMessage={handleSendMessage}
      newMessage={newMessage}
      onNewMessageChange={(e) => setNewMessage(e.target.value)}
      onDeleteChat={() =>
        setConversationMessages((prev) => ({
          ...prev,
          [selectedConversationId]: [],
        }))
      }
      getAvatarSrc={getAvatar}
      chatEndRef={chatEndRef}
    />
  );
};

ChatContentWrapper.propTypes = {
  // No props required
};

export default ChatProvider;
