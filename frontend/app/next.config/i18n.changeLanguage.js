import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language = null) => {
    setAnchorEl(null);
    if (language) {
      console.log(`Changing language to: ${language}`);
      i18n.changeLanguage(language);
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'ns', name: 'Sepedi' },
    { code: 'ts', name: 'Tsonga' },
    { code: 've', name: 'Venda' },
    { code: 'zn', name: 'Zulu' },
  ];

  
  const currentLanguage = i18n.language;

  return (
    <div>
      <Button onClick={handleClick} variant="outlined" sx={{ display: 'flex', alignItems: 'center',padding: '2px 6px',fontSize: '0.87rem' }}>
        <Box
          sx={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: '#6c63ff',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '10px',
          }}
        >
          {currentLanguage} 
        </Box>
        {languages.find(lang => lang.code === currentLanguage)?.name} 
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {languages.map((lang) => (
          <MenuItem key={lang.code} onClick={() => handleClose(lang.code)}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#6c63ff',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '10px',
                }}
              >
                {lang.code}
              </Box>
              <Typography>{lang.name}</Typography> 
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
