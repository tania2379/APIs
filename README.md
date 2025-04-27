# APIs
Proyect
Pasos para Ejecutar los Archivos Starships.tsx y StarshipCard.tsx
1. Crea un Proyecto de React con TypeScript (Si No lo Has Hecho)
Si aún no tienes un proyecto de React configurado, sigue estos pasos:

Abre la terminal o línea de comandos en el directorio donde deseas crear el proyecto.

Ejecuta el siguiente comando para crear un proyecto de React con soporte de TypeScript:


npx create-react-app star-wars-ships --template typescript
Esto crea un nuevo proyecto con la configuración básica de React y TypeScript.

Accede al directorio del proyecto:

cd star-wars-ships
2. Instalar Dependencias (si es necesario)
Si estás utilizando TailwindCSS para los estilos, sigue estos pasos. De lo contrario, puedes omitir este paso.

Instalar Tailwind CSS:

npm install -D tailwindcss postcss autoprefixer
Inicializar Tailwind:


npx tailwindcss init
Configurar tailwind.config.js:

Asegúrate de que el archivo tailwind.config.js se vea así:


module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Configura el archivo CSS de Tailwind:

Asegúrate de tener un archivo CSS en src/index.css con el siguiente contenido:

css

@tailwind base;
@tailwind components;
@tailwind utilities;
Y no olvides importar este archivo en src/index.tsx:

tsx

import './index.css';
3. Crear los Archivos de Componentes
Crea Starships.tsx:

En la carpeta src, crea un archivo llamado Starships.tsx. Pega el código correspondiente a la funcionalidad principal que obtiene y muestra las naves.

tsx

import { useState, useEffect } from "react";
import StarshipCard from "./StarshipCard"; // Importa el nuevo componente

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
        Naves de Star Wars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ship) => (
          <StarshipCard key={ship.model} ship={ship} />
        ))}
      </div>
    </div>
  );
}
Crea StarshipCard.tsx:

En la misma carpeta src, crea un archivo llamado StarshipCard.tsx. Este archivo se encargará de mostrar la tarjeta de cada nave.

tsx

import React from "react";

type StarshipCardProps = {
  ship: {
    name: string;
    model: string;
    manufacturer: string;
    starship_class: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    hyperdrive_rating: string;
  };
};

const StarshipCard: React.FC<StarshipCardProps> = ({ ship }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-400 transition-colors">
      <h2 className="text-xl font-bold mb-2 text-yellow-400">{ship.name}</h2>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-semibold text-gray-400">Modelo:</span>{" "}
          {ship.model}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Fabricante:</span>{" "}
          {ship.manufacturer}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Clase:</span>{" "}
          {ship.starship_class}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Velocidad:</span>{" "}
          {ship.max_atmosphering_speed}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Tripulación:</span>{" "}
          {ship.crew}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Pasajeros:</span>{" "}
          {ship.passengers}
        </p>
        <p>
          <span className="font-semibold text-gray-400">Capacidad de carga:</span>{" "}
          {ship.cargo_capacity}
        </p>
        <p>
          <span className="font-semibold text-gray-400">
            Clasificación del hiperimpulsor:
          </span>{" "}
          {ship.hyperdrive_rating}
        </p>
      </div>
    </div>
  );
};

export default StarshipCard;
4. Modificar App.tsx para Usar los Componentes
Ahora que tienes los dos componentes (Starships.tsx y StarshipCard.tsx), abre App.tsx y modifica el contenido para usar el componente Starships.

tsx

import React from 'react';
import './App.css';
import Starships from './Starships'; // Importa el componente Starships

function App() {
  return (
    <div className="App">
      <Starships />  {/* Muestra el componente Starships */}
    </div>
  );
}

export default App;
5. Ejecutar el Proyecto
Finalmente, ejecuta el siguiente comando para iniciar el servidor de desarrollo y ver la aplicación en acción:


npm start
Esto abrirá automáticamente tu aplicación en el navegador (generalmente en http://localhost:3000), donde podrás ver las naves de Star Wars siendo cargadas desde la API y mostradas como tarjetas.

