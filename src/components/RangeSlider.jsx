import { setMaxPrice, setMinPrice } from '@/store/slices/filterSlice';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

export default function DoubleSlider() {
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const dispatch =useDispatch()

    let step = 100,min=0,max=10000;

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(10000);

    const rangeRef = useRef(null);

    const getPercent = useCallback((value) => ((value - min) / (max - min)) * 100, [min, max]);

    useEffect(() => {
        if (rangeRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(maxVal);

            rangeRef.current.style.left = `${minPercent}%`;
            rangeRef.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, maxVal, getPercent, getPercent]);

    useEffect(() => {
        setPriceRange([minVal, maxVal]);
        dispatch(setMinPrice(minVal));
        dispatch(setMaxPrice(maxVal));
    }, [minVal, maxVal, setPriceRange]);

    return (
        <div className="w-full max-w-md text-white">
            <h2 className="text-xl font-bold">Price Range</h2>
            <div className="flex justify-between text-lg font-semibold">
                {/* ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)} */}
                <span>{priceRange[0]}</span>
                <span>{priceRange[1]}</span>
            </div>

            <div className="relative h-10 flex items-center w-full">
                <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>

                <div
                    ref={rangeRef}
                    className="absolute h-2 bg-blue-500 rounded-full"
                    style={{
                        zIndex: 1,
                    }}></div>

                <div className="z-10">
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={minVal}
                        onChange={(event) => {
                            const value = Math.min(Number(event.target.value), maxVal - step);
                            setMinVal(value);
                        }}
                        className="absolute sliderThumb w-full h-0"
                        aria-label="Minimum value slider"
                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={maxVal}
                        onChange={(event) => {
                            const value = Math.max(Number(event.target.value), minVal + step);
                            setMaxVal(value);
                        }}
                        className="absolute sliderThumb w-full h-0"
                        aria-label="Maximum value slider"
                    />
                </div>
            </div>
        </div>
    );
}
