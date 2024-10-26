import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { styled } from "@mui/system";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useRouter } from 'next/router'; 
import { useTranslation } from 'react-i18next';

const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  maxWidth: 400,
  margin: "auto",
  borderRadius: 16,
  boxShadow: "none",
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  "&:hover": {
    transform: "scale(1.02)",
    transition: "all 0.3s",
  },
});

const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 16,
});

const Logo = styled("div")({
  width: 48,
  height: 48,
  borderRadius: 8,
  backgroundColor: "#6c63ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "bold",
  fontSize: 24,
  marginRight: 16,
});

const ChipContainer = styled(Box)({
  display: "flex",
  gap: 8,
  marginTop: 16,
  marginBottom: 16,
});

const FooterContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 16,
});

const InfoItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 4,
});

const formatSalary = (salary, t) => {
  return salary ? `R${Number(salary).toLocaleString()}` : t('JobCard.NoSalary');
};

export default function JobCard({
  title,
  company,
  salary,
  type,
  location,
  experience,
  description,
  link, 
}) {
  const { t } = useTranslation(); 

  const handleCardClick = () => {
    window.location.href = link;
  };

  return (
    <StyledCard onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <CardContent>
        <HeaderContainer>
          <Logo>{company[0]}</Logo>
          <Box>
            <Typography variant="h6" component="div">
              {title} 
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {company} 
            </Typography>
          </Box>
        </HeaderContainer>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
        <ChipContainer>
          <Chip label={location} variant="outlined" />
          <Chip label={experience} variant="outlined" />
        </ChipContainer>
        <FooterContainer>
          <InfoItem>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {type} 
            </Typography>
          </InfoItem>
          <InfoItem>
            <AttachMoneyIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {formatSalary(salary, t)} 
            </Typography>
          </InfoItem>
        </FooterContainer>
      </CardContent>
    </StyledCard>
  );
}
