// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Agency from "./pages/Agency";
import Work from "./pages/Work";
import NavigationProvider from "./components/navigation/NavigationProvider";
import LayoutWrapper from "./components/navigation/LayoutWrapper";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="bg-white overflow-x-hidden">
      <NavigationProvider>
        <LayoutWrapper>
          <AnimatedRoutes />
        </LayoutWrapper>
      </NavigationProvider>
    </div>
  );
}

export default App;
