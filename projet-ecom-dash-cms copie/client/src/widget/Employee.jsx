import { Box } from "@mui/material";
import axios from "axios";
import EmployeeCard from "components/EmployeeCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [admins, setAdmins] = useState([]);
  const token = useSelector((state) => state.token);
  const role = useSelector((state) => state.user?.roleId);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/management/admins", {
        headers: { Authorization: `Bearer ${token}` },
        roleId: role,
      })
      .then((result) => {
        setAdmins(result.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/home");
      });
  }, [role, token]);

  return (
    <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {admins &&
        admins.map((admin) => (
          <EmployeeCard
            key={admin.id}
            userName={admin.name}
            userRole={admin.roleId}
            userEmail={admin.email}
            userNumb={admin.phoneNumber}
            userOccupation={admin.occupation}
            userImage={admin.url}
          />
        ))}
    </Box>
  );
};

export default Employee;
