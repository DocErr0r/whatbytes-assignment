import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import products from "@/data/products.json";


export default function Home() {
  return (
    <div className="mx-3 flex gap-4">
      <Filters />
      <div className="conatiner mx-auto flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-blue-950 ">Product Listing</h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </div>
  );
}
