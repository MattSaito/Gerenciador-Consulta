import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { IconButton, Typography } from "@mui/material";
import Link from "next/link";

interface DashboardButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  link: string;
}

const DashboardButton: React.FC<DashboardButtonProps> = ({
  icon,
  title,
  subtitle,
  link,
}) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link href={link}>
          <IconButton
            size="large"
            style={{
              backgroundColor: "#478DF7",
              color: "white",
              borderRadius: 8,
            }}
          >
            {icon}
          </IconButton>
        </Link>
        <Typography
          variant="subtitle1"
          style={{ marginTop: theme.spacing(1) }}
          className="font-helvetica"
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          color="primary"
          style={{ marginTop: theme.spacing(1) }}
        >
          <Link href={link}>{`${subtitle}`}</Link>
        </Typography>
      </div>
    </React.Fragment>
  );
};

export default DashboardButton;