import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
    </Routes>
  );
}
export default App;
