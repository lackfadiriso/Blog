"use client";

import { Suspense, useEffect } from "react";
import Image from "next/image";

import MainContent from "./components/MainContent";
import LanguageSelect from "./components/LanguageSelect";

import { useDispatch } from "react-redux";
import { getAboutItems, getCertificateItems, getMenuItems } from "./redux/WebprojectsSlice";
import type { AppDispatch, RootState } from "./redux/store";
import { useSelector } from "react-redux";


export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { language } = useSelector((store: RootState) => store.WebProjects)

  useEffect(() => {
    const lang = localStorage.getItem("lang") || "eng";
    localStorage.setItem("lang", lang);

    // Redux aksiyonlarını başlat
    dispatch(getMenuItems(lang));
    dispatch(getCertificateItems(lang));
    dispatch(getAboutItems(lang));
  }, [dispatch, language]);

  return (
    <div className="flex w-screen h-screen lg:py-[40px] lg:px-[160px] justify-center text-white overflow-x-hidden">
      <div className="container">
        <div className="fixed top-1/3 left-3 z-20">
          <Suspense fallback={<div>Loading...</div>}>
            <LanguageSelect />
          </Suspense>
        </div>
        <MainContent />
      </div>
    </div>
  );
}