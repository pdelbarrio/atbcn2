import React from "react";

const Page = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <h1 className="text-xl font-bold text-black">Política de Privacitat</h1>
        <h2 className="text-base font-medium text-black">
          Informació que recopilem
        </h2>
        <p className="text-sm text-gray-500">
          Recopilem l&apos;adreça de correu electrònic dels usuaris per
          permetre&apos;ls registrar-se i introduir esdeveniments a la nostra
          base de dades.
        </p>
        <h2 className="text-base font-medium text-black">
          Com utilitzem la informació
        </h2>
        <p className="text-gray-500 text-sm">
          Utilitzem l&apos;adreça de correu electrònic per vincular-la als
          esdeveniments que els usuaris introdueixen a la nostra base de dades.
          No utilitzem l&apos;adreça de correu electrònic per cap altre
          propòsit.
        </p>
        <h2 className="text-base font-medium text-black">
          Com compartim la informació
        </h2>
        <p className="text-gray-500 text-sm">
          No compartim l&apos;adreça de correu electrònic dels usuaris amb
          tercers.
        </p>
        <h2 className="text-base font-medium text-black">Contacte</h2>
        <p className="text-gray-500 text-sm">
          Si teniu preguntes sobre aquesta política de privacitat o voleu
          exercir els vostres drets, podeu posar-vos en contacte amb nosaltres a
          <span className="font-bold"> atbcnapp@gmail.com</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
