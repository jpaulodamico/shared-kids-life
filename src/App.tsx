
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AppLayout } from "./components/layout/AppLayout";
import IndexPage from "./pages/Index";
import ChildrenPage from "./pages/Children";
import MessagesPage from "./pages/Messages";
import ExpensesPage from "./pages/Expenses";
import DocumentsPage from "./pages/Documents";
import CalendarPage from "./pages/Calendar";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Routes>
                <Route index element={<IndexPage />} />
                <Route path="children" element={<ChildrenPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="expenses" element={<ExpensesPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          } />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
