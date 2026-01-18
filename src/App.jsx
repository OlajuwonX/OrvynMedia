import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Components/Pages/Home/Home.jsx";
import Service from "./Components/Pages/Services/Service.jsx";
import About from "./Components/Pages/AboutUs/About.jsx";
import Nav from "./Components/Nav/Nav.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Contact from "./Components/Pages/Contact/Contact.jsx";
import Terms from "./Components/Pages/Terms/Terms.jsx";
import Privacy from "./Components/Pages/Privacy/Privacy.jsx";

import "./App.css";
import TopBtn from "./Components/BackToTopBtn/Top.jsx";
import ThankYou from "./Components/Pages/ThankYouPage/ThankYou.jsx";
import NotFound from "./Components/Pages/404/NotFound.jsx";

// Admin imports
import Login from "./Components/Admin/Login/Login.jsx";
import Dashboard from "./Components/Admin/Dashboard/Dashboard.jsx";
import TabsPage from "./Components/Admin/Tabs/TabsPage.jsx";
import CardsPage from "./Components/Admin/Cards/CardsPage.jsx";
import FAQsPage from "./Components/Admin/FAQs/FAQsPage.jsx";
import SeedPage from "./Components/Admin/Seed/SeedPage.jsx";
import ProtectedRoute from "./Components/Admin/ProtectedRoute/ProtectedRoute.jsx";
import "./Components/Admin/ProtectedRoute/ProtectedRoute.css";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App" style={{ flex: 1 }}>
      {!isAdminRoute && <Nav />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tabs"
          element={
            <ProtectedRoute>
              <TabsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cards"
          element={
            <ProtectedRoute>
              <CardsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/faqs"
          element={
            <ProtectedRoute>
              <FAQsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/seed"
          element={
            <ProtectedRoute>
              <SeedPage />
            </ProtectedRoute>
          }
        />

        {/* Catch All 404 errors */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <TopBtn />}
    </div>
  );
}

export default App;
