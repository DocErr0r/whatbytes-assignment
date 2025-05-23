'use client';

import ProductCard from '@/components/ProductCard';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FilteredProductList() {
    const products = useSelector((state) => state.products.products);
    const search = useSelector((state) => state.filters.search);
    const categories = useSelector((state) => state.filters.categories);
    const brands = useSelector((state) => state.filters.brands);
    const minPrice = useSelector((state) => state.filters.minPrice);
    const maxPrice = useSelector((state) => state.filters.maxPrice);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams();
        if (categories && categories.length > 0 && !categories.includes('All')) {
            params.set('category', categories.join(','));
        }
        if (brands && brands.length > 0 && !brands.includes('All')) {
            params.set('brand', brands.join(','));
        }
        if (minPrice !== 0 || maxPrice !== 10000) {
            params.set('price', `${minPrice}-${maxPrice}`);
        }
        if (search && search.trim() !== '') {
            params.set('search', search);
        }
        const paramString = params.toString();
        router.replace(paramString ? `/?${paramString}` : '/', { scroll: false });
    }, [categories, brands, minPrice, maxPrice, search, router]);

    const urlCategory = searchParams.get('category');
    const urlBrand = searchParams.get('brand');
    const urlPrice = searchParams.get('price');
    let urlMin = minPrice,
        urlMax = maxPrice;
    if (urlPrice && urlPrice.includes('-')) {
        const [min, max] = urlPrice.split('-').map(Number);
        if (!isNaN(min)) urlMin = min;
        if (!isNaN(max)) urlMax = max;
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearch = search === '' || product.title.toLowerCase().includes(search.toLowerCase());
        const urlCategories = urlCategory ? urlCategory.split(',').map((c) => c.trim().toLowerCase()) : [];
        const urlBrands = urlBrand ? urlBrand.split(',').map((b) => b.trim().toLowerCase()) : [];
        const matchesCategory = urlCategories.length > 0 && !urlCategories.includes('all') ? urlCategories.includes(product.category.toLowerCase()) : categories.includes('All') || categories.includes(product.category);
        const matchesBrand = urlBrands.length > 0 && !urlBrands.includes('all') ? urlBrands.includes((product.brand || '').toLowerCase()) : brands.includes('All') || brands.includes(product.brand);
        const matchesPrice = product.price >= urlMin && product.price <= urlMax;
        return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });

    return <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">{filteredProducts.length === 0 ? <div className="col-span-full text-center text-gray-500 py-10">No products found.</div> : filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</section>;
}
