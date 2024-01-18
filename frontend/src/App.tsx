import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { ClerkProvider } from "@clerk/clerk-react";
import DefaultLayout from "./layouts/DefaultLayout";
import { DialogProvider } from "./providers/dialogContext";
import AuthSignIn from "./pages/auth/AuthSignIn";
import AuthSignUp from "./pages/auth/AuthSignUp";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <DialogProvider>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />
            <Route
              path="/auth/signin"
              element={
                <DefaultLayout>
                  <AuthSignIn />
                </DefaultLayout>
              }
            />

            <Route
              path="/auth/signup"
              element={
                <DefaultLayout>
                  <AuthSignUp />
                </DefaultLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </DialogProvider>
    </ClerkProvider>
  );
}
export default App;
