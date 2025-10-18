import React from "react";
import atualizandoImg from "../assets/GIF nuvem.gif";

export default function Modal() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center space-y-4">
        <img src={atualizandoImg} alt="Atualizando" className="w-32 h-32" />
        <p className="text-lg font-semibold text-purple-800">Atualizando página</p>
      </div>
    </div>
  );
}

