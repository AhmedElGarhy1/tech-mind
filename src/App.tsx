import { Routes, Route } from "react-router-dom";

import { Home, Contact, Posts, SinglePost } from "./pages";
import Layout from "./components/Layout";
import "./css/App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route
            path="/"
            loader={(args) => {
              console.log(args);
            }}
            element={<Home />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/postes">
            <Route index element={<Posts />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
