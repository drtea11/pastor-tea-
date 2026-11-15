import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Homepage 2 | Dr. TEA",
  description: "Alternate homepage shell for Dr. TEA."
};

export default function HomepageTwo() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <Footer />
    </div>
  );
}
