"use client";

import React, { createContext, useContext } from "react";
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; 

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <I18nContext.Provider value={{ language: i18n.language }}>
        {children}
      </I18nContext.Provider>
    </I18nextProvider>
  );
};

export const useI18n = () => useContext(I18nContext);
