import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Index from "./pages/Index";
import VirtualTour from "./pages/VirtualTour";
import Exhibits from "./pages/Exhibits";
import Timeline from "./pages/Timeline";
import Auth from "./pages/Auth";
import Donors from "./pages/Donors";
import NotFound from "./pages/NotFound";
import FloorBasedTour from "./components/tour/FloorBasedTour";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/virtual-tour" element={<Layout><VirtualTour /></Layout>} />
          <Route path="/floor-tour" element={<Layout><FloorBasedTour /></Layout>} />
          <Route path="/exhibits" element={<Layout><Exhibits /></Layout>} />
          <Route path="/timeline" element={<Layout><Timeline /></Layout>} />
          <Route path="/donors" element={<Layout><Donors /></Layout>} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
