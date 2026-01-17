"use client";

import { useState, useEffect } from "react";

interface Coupon {
  id: string;
  code: string;
  name: string;
  section: string;
  date?: string;
}

export default function Home() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetch("/data/coupon.json")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);
        setFilteredCoupons(data);
      })
      .catch((error) => console.error("Error loading coupon data:", error));
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCoupons(coupons);
    } else {
      const filtered = coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoupons(filtered);
    }
  }, [searchTerm, coupons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 md:p-12 order-1">
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 md:mb-3 tracking-tight font-space-grotesk">
                  Coupon Code Search
                </h1>
                <p className="text-slate-300 font-poppins text-sm sm:text-base">
                  Discover and manage your exclusive discount codes
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="search"
                    className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 md:mb-2"
                  >
                    Search by Coupon Code
                  </label>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter coupon code..."
                    className="w-full px-4 md:px-5 py-3 md:py-4 text-sm md:text-base border-2 border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 text-white placeholder-slate-400 bg-slate-700/50 backdrop-blur-sm"
                  />
                </div>

                <div className="bg-slate-700/30 rounded-xl p-4 md:p-6 border border-slate-600">
                  <h3 className="text-base md:text-lg font-semibold text-white mb-2">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-emerald-400">{filteredCoupons.length}</p>
                      <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide mt-1">Results</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-blue-400">{coupons.length}</p>
                      <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide mt-1">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-white order-2">
              <div className="mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-1 md:mb-2">Search Results</h2>
                <p className="text-xs md:text-sm text-slate-600">
                  {searchTerm ? `Found ${filteredCoupons.length} coupon(s) matching "${searchTerm}"` : "Showing all coupon codes"}
                </p>
              </div>

              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg border border-slate-200">
                    <div className="overflow-x-auto max-h-[400px] md:max-h-[500px] overflow-y-auto">
                      <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0">
                          <tr>
                            <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              ID
                            </th>
                            <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              Code
                            </th>
                            <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-3 md:px-4 py-2 md:py-3 text-left text-[10px] md:text-xs font-semibold text-slate-600 uppercase tracking-wider">
                              Section
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                          {filteredCoupons.length > 0 ? (
                            filteredCoupons.map((coupon) => (
                              <tr
                                key={coupon.id}
                                className="hover:bg-slate-50 transition-colors"
                              >
                                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-slate-900 font-semibold">
                                  {coupon.id}
                                </td>
                                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-slate-600">
                                  {coupon.date || "N/A"}
                                </td>
                                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-slate-700 font-mono font-medium bg-emerald-50">
                                  {coupon.code}
                                </td>
                                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap text-xs md:text-sm text-slate-700">
                                  {coupon.name}
                                </td>
                                <td className="px-3 md:px-4 py-2 md:py-3 whitespace-nowrap">
                                  <span className="inline-flex items-center px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-blue-100 text-blue-800">
                                    {coupon.section}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-3 md:px-4 py-8 md:py-12 text-center text-xs md:text-sm text-slate-500"
                              >
                                <div className="flex flex-col items-center">
                                  <svg className="w-10 h-10 md:w-12 md:h-12 text-slate-300 mb-2 md:mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <p>No coupon codes found. Try a different search term.</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
