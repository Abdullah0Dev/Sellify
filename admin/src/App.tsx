import { BrowserRouter, Route, Routes } from "react-router";
import { HomeScreen } from "./components/HomeScreen";
import CreateProduct from "./components/CreateProduct";
import { UpdatePreviewProvider } from "./context/UpdateContext";
import { APIActionContextProvider } from "./context/APIActionContext";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-white">
        <UpdatePreviewProvider>
          <APIActionContextProvider>
            <Routes >
              <Route path="/" element={<HomeScreen />} />
              <Route path="new" element={<CreateProduct />} />
              <Route path="edit/:id" element={<CreateProduct />} />
            </Routes>
          </APIActionContextProvider>
        </UpdatePreviewProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
