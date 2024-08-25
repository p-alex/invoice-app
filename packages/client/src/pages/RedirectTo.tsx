import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  path: string;
}

function RedirectTo({ path }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return <></>;
}

export default RedirectTo;
