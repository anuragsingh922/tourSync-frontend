import { useEffect, useMemo } from "react";
import { useAppSelector } from "./useAppSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";


function Authorized({ children }) {
  const navigate = useNavigate();

  const { user, status } = useAppSelector((state) => state.user);

  const userError = useMemo(() => status?.user?.error, [status]);
  const loading = useMemo(() => status?.user?.loading, [status]);

  useEffect(() => {
    if (userError) {
      toast({
        title : "Login",
        description : "Please login first",
        variant : "destructive"
      })
      navigate("/", { replace: true });
    }
  }, [userError, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }

  return null;
}

export default Authorized;
