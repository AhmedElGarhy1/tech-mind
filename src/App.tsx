import { Routes, Route } from "react-router-dom";

import {
  Home,
  Contact,
  Postes,
  SinglePost,
  Articles,
  SingleArticle,
  Deplomas,
  SingleDeploma,
  Courses,
  SingleCourse,
  About,
} from "./pages";

import Layout from "./components/Layout";
import "./css/App.css";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/postes">
            <Route index element={<Postes />} />
            <Route path=":id" element={<SinglePost />} />
          </Route>
          <Route path="/articles">
            <Route index element={<Articles />} />
            <Route path=":id" element={<SingleArticle />} />
          </Route>
          <Route path="/deplomas">
            <Route index element={<Deplomas />} />
            <Route path=":id" element={<SingleDeploma />} />
          </Route>
          <Route path="/courses">
            <Route index element={<Courses />} />
            <Route path=":id" element={<SingleCourse />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
