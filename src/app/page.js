'use client'
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";

import { useSelector } from "react-redux";


export default function Home() {
  const products = useSelector((state) => state.products.products);
  const search = useSelector((state) => state.filters.search);
  const categories = useSelector((state) => state.filters.categories);
  const brands = useSelector((state) => state.filters.brands);
  const minPrice = useSelector((state) => state.filters.minPrice);
  const maxPrice = useSelector((state) => state.filters.maxPrice);

  const filteredProducts = products.filter(product => {
    const matchesSearch = search === '' || product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categories.includes('All') || categories.includes(product.category);
    const matchesBrand = brands.includes('All') || brands.includes(product.brand);
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
  });

  return (
    <div className="mx-3 flex gap-4">
      <Filters />
      <div className="flex-1 conatiner mx-auto flex flex-col gap-4">
        <h3 className="text-2xl text-start font-bold text-blue-950 ">Product Listing</h3>
        {filteredProducts.length ? (<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-lg font-bold text-blue-950">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
