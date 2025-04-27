import { useState, useEffect } from "react";
import StarshipCard from "./StarshipCard"; // Importamos el nuevo componente

export default function Starships() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://swapi.dev/api/starships/");
        const data = await response.json();
        setData(data.results);
      } catch (error) {
        console.error(error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Si loading es true, se muestra un spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  // Si loading es false, se muestra la lista de naves
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
        Naves de Star Wars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ship) => (
          <StarshipCard key={ship.model} ship={ship} /> // Usamos el componente StarshipCard
        ))}
      </div>
    </div>
  );
}



