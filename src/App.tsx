
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Index";
import CalendarPage from "./pages/Calendar";
import MessagesPage from "./pages/Messages";
import ExpensesPage from "./pages/Expenses";
import DocumentsPage from "./pages/Documents";
import ChildrenPage from "./pages/Children";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            } />
            <Route path="/calendar" element={
              <AppLayout>
                <CalendarPage />
              </AppLayout>
            } />
            <Route path="/messages" element={
              <AppLayout>
                <MessagesPage />
              </AppLayout>
            } />
            <Route path="/expenses" element={
              <AppLayout>
                <ExpensesPage />
              </AppLayout>
            } />
            <Route path="/documents" element={
              <AppLayout>
                <DocumentsPage />
              </AppLayout>
            } />
            <Route path="/children" element={
              <AppLayout>
                <ChildrenPage />
              </AppLayout>
            } />
            <Route path="/profile" element={
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
