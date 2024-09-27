import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StyledCard = styled(Card)({
  background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)',
  maxWidth: 400,
  margin: 'auto',
  borderRadius: 16,
  boxShadow: "none"
});

const HeaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 16,
});

const Logo = styled('div')({
  width: 48,
  height: 48,
  borderRadius: 8,
  backgroundColor: '#6c63ff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: 24,
  marginRight: 16,
});

const ChipContainer = styled(Box)({
  display: 'flex',
  gap: 8,
  marginTop: 16,
  marginBottom: 16,
});

const FooterContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 16,
});

const InfoItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export default function JobCard({ title, company, salaryRange, timeAgo, employmentType, remote, description }) {
  return (
    <StyledCard>
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
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <ChipContainer>
          <Chip label={employmentType} variant="outlined" />
          <Chip label={remote} variant="outlined" />
        </ChipContainer>
        <FooterContainer>
          <InfoItem>
            <AccessTimeIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {timeAgo}
            </Typography>
          </InfoItem>
          <InfoItem>
            <AttachMoneyIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {salaryRange}
            </Typography>
          </InfoItem>
        </FooterContainer>
      </CardContent>
    </StyledCard>
  );
}