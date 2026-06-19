import { useEffect } from "react";
import { Providers } from "@/app/providers";
import { AppRouter } from "@/app/router";
import { useAuthStore } from "@/stores/authStore";

function App() {
  const restoreSession = useAuthStore((s) => s.restoreSession);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
