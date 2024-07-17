import { LogoutOutlined } from "@mui/icons-material";

interface Props {
  handleLogout: () => void;
}

const Logout: React.FC<Props> = ({ handleLogout }) => {
  return (
    <LogoutOutlined onClick={handleLogout} style={{ cursor: "pointer" }} />
  );
};

export default Logout;
