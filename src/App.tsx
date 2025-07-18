import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; // Adjust path as needed
import Home from "./Pages/Home_Page";
import Expense from "./Pages/Expense";
import Index from "./Pages/index";
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp";
import Verify from "./Pages/verify";
import Lend from "./Pages/Lend";
import Wallet from "./Pages/Wallet";
import Report from "./Pages/Report"
import Footer from "./components/footer"
import Navbar from "./components/navbar"
import PageNotFound from "./Pages/Page_404";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/" element={<Index />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/expense" element={<Expense />} />
            <Route path="/home" element={<Home />} />
            <Route path="/lend" element={<Lend />} />
            <Route path="/header" element={<Navbar />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/report" element={<Report />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
