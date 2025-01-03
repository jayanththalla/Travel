import { useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/layout/Layout';

// Dynamically import the map component
const IndiaMap = dynamic(() => import('../components/map/IndiaMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-gray-100 animate-pulse rounded-lg"></div>
  ),
});

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Discover India
        </h1>
        <div className="h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <IndiaMap onPlaceSelect={setSelectedPlace} />
        </div>
        {selectedPlace && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">{selectedPlace.name}</h2>
            <p>{selectedPlace.description}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}