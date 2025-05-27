/**
 * chatRoutes.jsx
 *
 * Routes for chat-related pages.
 * Uses ChatProvider and ProtectedRoute for secure chat access.
 *
 * Author: Mahmoud Ramadan
 * Created: June 2025
 */

import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ChatProvider, ChatContentWrapper } from "@/context/ChatContext";
import ChatLayout from "@/layouts/ChatLayout/ChatLayout";
import LoadingFallback from "@/components/common/LoadingFallback/LoadingFallback";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const ChatContent = lazy(() =>
  import("@/components/features/ChatContent/ChatContent")
);

const chatRoutes = [
  <Route
    key="chats"
    path="/chats"
    element={
      <ProtectedRoute>
        <ChatProvider>
          <ChatLayout />
        </ChatProvider>
      </ProtectedRoute>
    }
  >
    <Route
      index
      element={
        <Suspense fallback={<LoadingFallback />}>
          <div
            role="region"
            aria-label="Chat placeholder"
            className="chat-placeholder"
          >
            Select a conversation to start chatting
          </div>
        </Suspense>
      }
    />
    <Route
      path=":username"
      element={
        <Suspense fallback={<LoadingFallback />}>
          <ChatContentWrapper />
        </Suspense>
      }
    />
  </Route>,
];

export default chatRoutes;
