import React, {createContext, Suspense, useCallback, useContext, useMemo} from "react";
import { I18nextProvider } from "react-i18next";
import { CookiesProvider } from "react-cookie";
import useI18nInstance from "../lib/i18n";
import useAuthenticated from "../lib/hooks/useAuthenticated";

interface SessionContextValue {
  username: string,
  isAuthenticated: boolean,
  login: (username: string, password: string) => Promise<boolean>,
}

const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);
export const useSessionContext:() => SessionContextValue = () => useContext(SessionContext);

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, login, username } = useAuthenticated();

  const contextValue = useMemo(() => ({
    isAuthenticated,
    login,
    username
  }), [isAuthenticated, login, username]);

  return (
    <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>
  );
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const i18n = useI18nInstance();

  return (
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <I18nextProvider i18n={i18n}>
          <SessionProvider>{children}</SessionProvider>
        </I18nextProvider>
      </CookiesProvider>
  );
};

export function withProvider<
  P extends Record<string, unknown> = Record<string, unknown>,
>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithProvider: React.FC<P> = (props) => {
    return (
      <Provider>
        <Suspense fallback={null}>
          <WrappedComponent {...props} />
        </Suspense>
      </Provider>
    );
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name;
  ComponentWithProvider.displayName = `withProvider(${displayName})`;

  return ComponentWithProvider;
}

export default Provider;
