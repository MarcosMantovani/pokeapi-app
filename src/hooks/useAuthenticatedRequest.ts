import { useCallback, useState } from "react";
import { useNotification } from "../contexts";
import { useAuth } from "../contexts/AuthContext";

interface UseAuthenticatedRequestState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseAuthenticatedRequestReturn<T>
  extends UseAuthenticatedRequestState<T> {
  execute: (url: string, options?: RequestInit) => Promise<T>;
  reset: () => void;
}

export const useAuthenticatedRequest = <
  T = any,
>(): UseAuthenticatedRequestReturn<T> => {
  const { makeAuthenticatedRequest } = useAuth();
  const { handleError } = useNotification();
  const [state, setState] = useState<UseAuthenticatedRequestState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (
      endpoint: string,
      options?: RequestInit,
      shouldHandleError = true,
    ): Promise<T> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const baseUrl = process.env.REACT_APP_API_URL || "";
        const data = await makeAuthenticatedRequest<T>(
          `${baseUrl}${endpoint}`,
          options,
        );
        setState((prev) => ({ ...prev, data, loading: false }));
        return data;
      } catch (error: any) {
        if (!shouldHandleError) {
          throw error;
        }

        let errorMessage = "Ocorreu um erro";

        // Tenta extrair mensagem do padrão DRF
        console.debug(error);
        if (error?.response) {
          const contentType = error.response.headers?.get("content-type");
          if (contentType?.includes("application/json")) {
            try {
              const errorData = await error.response.json();

              if (typeof errorData === "string") {
                errorMessage = errorData;
              } else if (errorData?.detail) {
                errorMessage = errorData.detail;
              } else if (typeof errorData === "object") {
                const messages: string[] = [];

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const [field, value] of Object.entries(errorData)) {
                  if (Array.isArray(value)) {
                    messages.push(...value.map((msg) => `• ${msg}`));
                  } else if (typeof value === "string") {
                    messages.push(`• ${value}`);
                  }
                }

                if (messages.length > 0) {
                  errorMessage = messages.join("\n");
                }
              }
            } catch {
              errorMessage = "Erro ao processar resposta do servidor.";
            }
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        setState((prev) => ({ ...prev, error: errorMessage, loading: false }));
        console.debug(errorMessage);
        handleError(errorMessage);
        throw error;
      }
    },
    [makeAuthenticatedRequest, handleError],
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
