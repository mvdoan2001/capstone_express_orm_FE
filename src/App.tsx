import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeTemplate from "./template/Hometempate/HomeTemplate";
import { EditPassword, EditProfile, Home, ImageDetail, InfoUser, Login, Navbar, SignUp, Upload } from "./pages";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <HomeTemplate>
            <Navbar />
            <Home />
          </HomeTemplate>
        }
        />
        <Route path="/info/:id" element={
          <HomeTemplate>
            <Navbar />
            <InfoUser />
          </HomeTemplate>
        }
        />
        <Route path='/image/:id' element={
          <HomeTemplate>
            <Navbar />
            <ImageDetail />
          </HomeTemplate>
        }
        />
        <Route path='/upload' element={
          <HomeTemplate>
            <Navbar />
            <Upload />
          </HomeTemplate>
        }
        />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/info/edit" element={<EditProfile />} />
        <Route path="/info/edit-pass" element={<EditPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
