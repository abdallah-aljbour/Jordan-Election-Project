import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import HeaderM from "./components/HeaderM";
import Footer from "./components/Footer";
import "@stream-io/video-react-sdk/dist/css/styles.css";
// import SignUp from './components/signup';
import Login from "./components/login";
import ChatPopup from "./components/chatpopup";
import NationalIdForm from "./components/nationalidform";
import StreamView from "./pages/debatePages/debateView";
import OTPForm from "./components/otpform";
import UserDataForm from "./components/userdataform";
import UserMessages from "./pages/usermessages";
import AdvertisementPopup from "./sharedComponants/AdvertisementPopup";
import ChatBot from "./components/chatbot";
import Privacy from "./pages/Privacy";
import AdminDashboard from "./pages/AdminDashboard";
import Overview from "./pages/Overview";
import UserManagement from "./pages/UserManagement";
import ElectionManagement from "./pages/ElectionManagement";
import SpecifyRequest from "./pages/SpecifyRequest";
import CheckOutCandidate from "./pages/CheckOutCandidate";
import CandidatePayment from "./pages/CandidatePayment";
import AddLocalList from "./pages/AddLocalList";
import LocalOrParty from "./pages/LocalOrParty";
import AddPartyList from "./pages/AddPartyList";
import SupportPage from "./pages/SupportPage";
import CategoriesListing from "./components/votingPages/categories";
import GovernorateAndDistrict from "./components/votingPages/GovernorateAndDistrict";
import GovernorateAndDistrict1 from "./components/votingPages/GovernorateAndDistrict1";
import GovernorateAndDistrict2 from "./components/votingPages/GovernorateAndDistrict2";
import LocalListing from "./components/votingPages/LocalListing";
import LocalListing1 from "./components/votingPages/LocalListing1";
import LocalListing2 from "./components/votingPages/LocalListing2";
import PartyVoting from "./components/votingPages/partyListing";
import ResultPage from "./components/votingPages/ResultPage";
//
import AdminLoginForm from "./pages/adminlogin";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
import Debates from "./pages/Debates";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nationalidform" element={<NationalIdForm />} />
            {/* <Route path="/NationalIdForm" element={<NationalIdForm />} /> */}
            <Route path="/otp" element={<OTPForm />} />
            <Route path="/user-data" element={<UserDataForm />} />
            <Route path="/Debates" element={<Debates />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/login" element={<Login />} />
            <Route path="/debate-view" element={<StreamView />} />
            <Route
              path="/election-management"
              element={<ElectionManagement />}
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPopup />
                </ProtectedRoute>
              }
            />
            <Route path="/SpecifyRequest" element={<SpecifyRequest />} />
            <Route path="/CheckOutCandidate" element={<CheckOutCandidate />} />
            <Route path="/CandidatePayment" element={<CandidatePayment />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/SupportPage" element={<SupportPage />} />
            <Route
              path="/usermessages"
              element={
                <ProtectedRoute>
                  <UserMessages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/election-management"
              element={
                <ProtectedRoute>
                  <ElectionManagement />
                </ProtectedRoute>
              }
            />
            <Route path="/Privacy" element={<Privacy />} />
            <Route
              path="/AdvertisementPopup"
              element={<AdvertisementPopup />}
            />
            <Route path="/AddLocalList" element={<AddLocalList />} />
            <Route path="/PartyLocalOr" element={<LocalOrParty />} />
            <Route path="/AddPartyList" element={<AddPartyList />} />
            <Route
              path="/components/votingPages/categories"
              element={<CategoriesListing />}
            />
            <Route
              path="/GovernorateAndDistrict"
              element={<GovernorateAndDistrict />}
            />
            <Route
              path="/GovernorateAndDistrict1"
              element={<GovernorateAndDistrict1 />}
            />
            <Route
              path="/GovernorateAndDistrict2"
              element={<GovernorateAndDistrict2 />}
            />
            <Route
              path="/components/votingPages/LocalListing"
              element={<LocalListing />}
            />
            <Route
              path="/components/votingPages/LocalListing1"
              element={<LocalListing1 />}
            />
            <Route
              path="/components/votingPages/LocalListing2"
              element={<LocalListing2 />}
            />
            <Route
              path="/components/votingPages/partyListing"
              element={<PartyVoting />}
            />
            <Route
              path="/components/votingPages/ResultPage"
              element={<ResultPage />}
            />

            <Route path="/adminlogin" element={<AdminLoginForm />} />
            <Route path="/LocalOrParty" element={<LocalOrParty />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
