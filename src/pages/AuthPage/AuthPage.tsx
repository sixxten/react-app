import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
import { AuthWidget } from "../../widgets/AuthWidget/AuthWidget";

export const AuthPage: React.FC = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isAuth) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return <AuthWidget />;
});