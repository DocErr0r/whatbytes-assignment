'use client'
import FilteredProductList from "@/components/FilterProducts";
import Filters from "@/components/Filters";
import { Suspense, useState } from "react";

export default function Home() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mx-3 flex gap-4">
      <Filters setShowMobileFilters={setShowMobileFilters} showMobileFilters={showMobileFilters} />
      <div className="container mx-auto flex flex-1 flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-blue-950">Product Listing</h3>
          <button className="md:hidden bg-blue-700 text-white px-4 py-2 rounded shadow-lg" onClick={() => setShowMobileFilters(true)}>
            Filter
          </button>
        </div>

        <Suspense fallback={<div className="p-4">Loading products...</div>}>
          <FilteredProductList />
        </Suspense>
      </div>
    </div>
  );
}
