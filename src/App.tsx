
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AppLayout } from "./components/layout/AppLayout";
import { AuthProvider } from "./contexts/AuthContext";
import IndexPage from "./pages/Index";
import ChildrenPage from "./pages/Children";
import MessagesPage from "./pages/Messages";
import ExpensesPage from "./pages/Expenses";
import DocumentsPage from "./pages/Documents";
import CalendarPage from "./pages/Calendar";
import ProfilePage from "./pages/Profile";
import WelcomePage from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/welcome" element={<WelcomePage />} />
            
            {/* Páginas protegidas (requerem autenticação) */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<IndexPage />} />
              <Route path="children" element={<ChildrenPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="documents" element={<DocumentsPage />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* Redirecionar para a landing page caso a URL não seja reconhecida */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
