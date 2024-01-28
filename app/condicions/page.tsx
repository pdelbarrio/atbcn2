import React from "react";

const Page = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <h1 className="text-xl font-bold text-black">Condicions del Servei</h1>
        <h2 className="text-base font-medium text-black">Registre</h2>
        <p className="text-gray-500 text-sm">
          Els usuaris han de registrar-se proporcionant una adreça de correu
          electrònic vàlida per poder introduir esdeveniments a la nostra base
          de dades.
        </p>
        <h2 className="text-base font-medium text-black">
          Ús de la base de dades
        </h2>
        <p className="text-gray-500 text-sm">
          Els usuaris poden utilitzar la nostra base de dades per introduir i
          consultar esdeveniments. No es permet l&apos;ús inadequat de la nostra
          base de dades.
        </p>
        <h2 className="text-base font-medium text-black">Terminació</h2>
        <p className="text-gray-500 text-sm">
          Ens reservem el dret de terminar l&apos;accés de qualsevol usuari a la
          nostra base de dades si considerem que el seu comportament és
          inadequat o perjudicial per a la nostra comunitat.
        </p>
      </div>
    </div>
  );
};

export default Page;
