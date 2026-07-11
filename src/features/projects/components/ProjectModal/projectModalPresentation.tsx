import type { ReactNode } from "react";
import { Award, Shield, Star, BookOpen } from "lucide-react";
import swacchBharathLogo from "@/assets/icons/Swacch Bharath.png";
import supremeCourtLogo from "@/assets/icons/Supreme Court.png";
import worldBankLogo from "@/assets/icons/World-bank.png";
import allIndiaInstituteLogo from "@/assets/icons/All India Institute of Local Self Government, Mumbai.webp";
import cseLogo from "@/assets/icons/header-cse-logo.png";
import annaUniversityLogo from "@/assets/icons/Center For Environmental Studies, Anna University, Chennai.webp";
import facileMavenLogo from "@/assets/icons/FM-Logo-2010-ORIGINAL-1-300x167.png";
import firstProjectLogo from "@/assets/icons/First-project.webp";
import haryanaGovtLogo from "@/assets/icons/haryana govt.webp";
import assamGovtLogo from "@/assets/icons/Ministry of Urban Development, Govt. of Assam.webp";
import avpnLogo from "@/assets/icons/AVPN-Logo.webp";
import apurbanLogo from "@/assets/icons/apurban_logo.webp";
import iitgLogo from "@/assets/icons/iitg_logo.webp";
import itcLimitedLogo from "@/assets/icons/ITC_Limited_Logo.webp";
import isacLogo from "@/assets/icons/isac-100pxlogo.webp";
import jagtapLogo from "@/assets/icons/jagtap logo.jpg";
import jnnurmLogo from "@/assets/icons/JnNURM_logo.png";
import kpmgLogo from "@/assets/icons/KPMG.png";
import kswmpLogo from "@/assets/icons/KSWMP.png";
import keralaStatePollutionControlBoardLogo from "@/assets/icons/Kerala State Pollution Control Board.png";
import mohuaLogo from "@/assets/icons/mohua-logo.webp";
import nitcLogo from "@/assets/icons/nitc_logo_icon.svg";
import nittLogo from "@/assets/icons/NITT_logo.webp";
import ngtLogo from "@/assets/icons/ngt_logo_transparent.webp";
import pondicherryUniversityLogo from "@/assets/icons/PU_Logo-BG-White.webp";
import ashtamudiRamsarLogo from "@/assets/icons/ramsar-logo-png_seeklogo-115726.webp";
import swachhaAndhraAwardLogo from "@/assets/icons/Swachha Andhra-award.png";
import skochLogo from "@/assets/icons/SKOCH-Group-Logo.png";
import ramsarLogo from "@/assets/icons/Ramsar.webp";
import sembakkamIcon from "@/assets/icons/Sembakkam_icon.webp";
import suchitwaMissionLogo from "@/assets/icons/sm-mal-logo1.png";
import smartCityLogo from "@/assets/icons/Smart-City--768x795.webp";
import smartCitiesMissionLogo from "@/assets/icons/Smart City Logo.webp";
import tamilnaduPollutionControlBoardLogo from "@/assets/icons/Tamilnadu Pollution Control Board.webp";
import tnLogo from "@/assets/icons/TN-logo.webp";
import vaxConsultantsLogo from "@/assets/icons/vax-consultants-logo-120x120.png";
import tambaramUlbLogo from "@/assets/ULB Logos/Tambaram.webp";
import cuddaloreLogo from "@/assets/ULB Logos/Cuddlore.webp";
import dindigulLogo from "@/assets/ULB Logos/Dindugal.png";
import erodeCityMunicipalCorporationLogo from "@/assets/ULB Logos/erode-city-municipal-corporation.webp";
import guwahatiLogo from "@/assets/ULB Logos/Guwahati_Municipal_Corporation_logo.webp";
import gurugramLogo from "@/assets/ULB Logos/Gurugram.png";
import karaikudiLogo from "@/assets/ULB Logos/Karaikudi.png";
import greaterChennaiLogo from "@/assets/ULB Logos/perungudi(chennai corporation).png";
import kollamLogo from "@/assets/ULB Logos/kollam.webp";
import nagpurLogo from "@/assets/ULB Logos/Nagpur_logo.webp";
import noidaLogo from "@/assets/ULB Logos/noida.webp";
import puducherryLogo from "@/assets/ULB Logos/Puduchery.png";
import uttarPradeshLogo from "@/assets/ULB Logos/Govt. of Uttar Pradesh.webp";
import tiruchirappalliUlbLogo from "@/assets/ULB Logos/Tiruchirappalli.png";
import tirumalaTirupatiDevasthanamsLogo from "@/assets/ULB Logos/Tirumala Tirupati Devasthanams.webp";
import vadodaraLogo from "@/assets/ULB Logos/vadodara_logo.webp";
import vijayawadaLogo from "@/assets/ULB Logos/Vijayawada.webp";
import andhraPradeshLogo from "@/assets/ULB Logos/Andhra pradesh.png";
import vizagLogo from "@/assets/ULB Logos/Vizag.webp";
import type { Project } from "../../types";

export interface ProjectModalLogo {
  src: string;
  alt: string;
  className?: string;
}

export interface ProjectModalMarker {
  text: string;
  icon: ReactNode;
}

const DEFAULT_MARKER_ICONS: ReactNode[] = [
  <Award className="h-12 w-12" />,
  <Shield className="h-12 w-12" />,
  <Star className="h-12 w-12" />,
  <BookOpen className="h-12 w-12" />,
];

const normalizeText = (value?: string | null) => value?.trim().toLowerCase() ?? "";

const includesAll = (value: string, snippets: string[]) =>
  snippets.every((snippet) => value.includes(snippet));

const renderMarkerLogo = (src: string, className: string) => (
  <img
    src={src}
    alt=""
    loading="lazy"
    className={className}
  />
);

export const normalizeProjectModalValue = (value?: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not available";
};

export const getAuthorityLogo = (executingAuthority?: string | null): ProjectModalLogo | null => {
  const normalizedAuthority = normalizeText(executingAuthority);

  if (
    normalizedAuthority.includes("chidambaram municipality")
  ) {
    return { src: tnLogo, alt: "Tamil Nadu logo" };
  }

  if (
    normalizedAuthority.includes("tiruchirappalli smart city limited") ||
    normalizedAuthority.includes("tiruchirappalli city municipal corporation")
  ) {
    return { src: tiruchirappalliUlbLogo, alt: "Tiruchirappalli ULB logo" };
  }

  if (normalizedAuthority.includes("erode smart city limited")) {
    return { src: smartCityLogo, alt: "Smart City logo" };
  }

  if (normalizedAuthority.includes("erode city municipal corporation")) {
    return {
      src: erodeCityMunicipalCorporationLogo,
      alt: "Erode City Municipal Corporation logo",
    };
  }

  if (normalizedAuthority.includes("karaikudi municipality")) {
    return { src: karaikudiLogo, alt: "Karaikudi Municipality logo" };
  }

  if (normalizedAuthority.includes("cuddalore municipality")) {
    return { src: cuddaloreLogo, alt: "Cuddalore Municipality logo" };
  }

  if (normalizedAuthority.includes("greater chennai corporation")) {
    return { src: greaterChennaiLogo, alt: "Greater Chennai Corporation logo" };
  }

  if (normalizedAuthority.includes("municipal corporation- gurugram")) {
    return { src: gurugramLogo, alt: "Municipal Corporation Gurugram logo" };
  }

  if (normalizedAuthority.includes("guwahati municipal corporation")) {
    return { src: guwahatiLogo, alt: "Guwahati Municipal Corporation logo" };
  }

  if (normalizedAuthority.includes("dindigul city municipal corporation")) {
    return { src: dindigulLogo, alt: "Dindigul City Municipal Corporation logo" };
  }

  if (normalizedAuthority.includes("vijayawada municipal corporation")) {
    return { src: vijayawadaLogo, alt: "Vijayawada Municipal Corporation logo" };
  }

  if (normalizedAuthority.includes("new okhla industrial development authority")) {
    return { src: noidaLogo, alt: "New Okhla Industrial Development Authority logo" };
  }

  if (normalizedAuthority.includes("nagpur municipal corporation")) {
    return { src: nagpurLogo, alt: "Nagpur Municipal Corporation logo" };
  }

  if (normalizedAuthority.includes("puducherry urban development authority")) {
    return { src: puducherryLogo, alt: "Puducherry Urban Development Authority logo" };
  }

  if (normalizedAuthority.includes("kollam municipal corporation")) {
    return { src: kollamLogo, alt: "Kollam Municipal Corporation logo" };
  }

  if (normalizedAuthority.includes("itc limited")) {
    return {
      src: itcLimitedLogo,
      alt: "ITC Limited logo",
      className: "relative h-14 w-14 object-contain mb-10",
    };
  }

  if (normalizedAuthority.includes("kerala state waste management projects (kswmp)")) {
    return { src: kswmpLogo, alt: "Kerala State Waste Management Projects logo" };
  }

  if (normalizedAuthority.includes("tirumala tirupati devasthanams")) {
    return {
      src: tirumalaTirupatiDevasthanamsLogo,
      alt: "Tirumala Tirupati Devasthanams logo",
    };
  }

  if (normalizedAuthority.includes("vadodara municipal corporation")) {
    return {
      src: vadodaraLogo,
      alt: "Vadodara Municipal Corporation logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  if (normalizedAuthority.includes("greater visakhapatnam municipal corporation")) {
    return { src: vizagLogo, alt: "Greater Visakhapatnam Municipal Corporation logo" };
  }

  if (normalizedAuthority.includes("swachh andhra corporation")) {
    return { src: andhraPradeshLogo, alt: "Andhra Pradesh logo" };
  }

  if (
    normalizedAuthority.includes("sembakkam municipality") ||
    normalizedAuthority.includes("pammal municipality") ||
    normalizedAuthority.includes("tambaram municipal corporation")
  ) {
    return { src: tambaramUlbLogo, alt: "Tambaram ULB logo" };
  }

  return null;
};

export const getSupportedByLogo = (supportedBy?: string | null): ProjectModalLogo | null => {
  const normalizedSupportedBy = normalizeText(supportedBy);

  if (normalizedSupportedBy.includes("ministry of urban development, govt. of assam")) {
    return { src: assamGovtLogo, alt: "Government of Assam logo" };
  }

  if (normalizedSupportedBy.includes("ministry of urban development, govt. of haryana")) {
    return { src: haryanaGovtLogo, alt: "Government of Haryana logo" };
  }

  if (normalizedSupportedBy.includes("ministry of urban development, govt. of andhra pradesh")) {
    return { src: andhraPradeshLogo, alt: "Andhra Pradesh logo" };
  }

  if (normalizedSupportedBy.includes("world bank")) {
    return { src: worldBankLogo, alt: "World Bank logo" };
  }

  if (normalizedSupportedBy.includes("suchitwa mission, govt of kerala")) {
    return { src: suchitwaMissionLogo, alt: "Suchitwa Mission logo" };
  }

  if (normalizedSupportedBy.includes("industries department, govt. of uttar pradesh")) {
    return { src: uttarPradeshLogo, alt: "Government of Uttar Pradesh logo" };
  }

  if (normalizedSupportedBy.includes("smart cities mission, govt of india")) {
    return { src: smartCitiesMissionLogo, alt: "Smart Cities Mission logo" };
  }

  if (normalizedSupportedBy.includes("swacch bharath mission, govt of india")) {
    return { src: swacchBharathLogo, alt: "Swacch Bharath Mission logo" };
  }

  if (normalizedSupportedBy.includes("commissionerate of municipal administration, govt. of tamilnadu")) {
    return { src: tnLogo,   alt: "Tamil Nadu logo" };
  }

  return null;
};

export const getProjectManagementConsultantLogo = (
  projectManagementConsultant?: string | null,
): ProjectModalLogo | null => {
  const normalizedConsultant = normalizeText(projectManagementConsultant);

  if (
    normalizedConsultant.includes("center for environmental studies, anna university, chennai")
  ) {
    return {
      src: annaUniversityLogo,
      alt: "Center For Environmental Studies, Anna University, Chennai logo",
      className: "relative h-12 w-12 object-contain mb-8",
    };
  }

  if (
    normalizedConsultant.includes("national institute of technology, tiruchirappalli")
  ) {
    return { src: nittLogo, alt: "National Institute of Technology, Tiruchirappalli logo" };
  }

  if (normalizedConsultant.includes("kpmg india")) {
    return {
      src: kpmgLogo,
      alt: "KPMG India logo",
      className: "relative h-10 w-10 object-contain mb-4",
    };
  }

  if (normalizedConsultant.includes("facile maven private limited, surat")) {
    return { src: facileMavenLogo, alt: "Facile Maven Private Limited logo" };
  }

  if (normalizedConsultant.includes("all india institute of local self government, mumbai")) {
    return { src: allIndiaInstituteLogo, alt: "All India Institute of Local Self Government, Mumbai logo" };
  }

  if (
    normalizedConsultant.includes("andhra pradesh urban infrastructure asset management limited, vijayawada")
  ) {
    return {
      src: apurbanLogo,
      alt: "Andhra Pradesh Urban Infrastructure Asset Management Limited, Vijayawada logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  if (normalizedConsultant.includes("pondicherry university, puducherry")) {
    return {
      src: pondicherryUniversityLogo,
      alt: "Pondicherry University, Puducherry logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  if (normalizedConsultant.includes("national institute of technology, calicut")) {
    return {
      src: nitcLogo,
      alt: "National Institute of Technology, Calicut logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  if (normalizedConsultant.includes("indian institute of technology, guwahati")) {
    return {
      src: iitgLogo,
      alt: "Indian Institute of Technology, Guwahati logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  if (normalizedConsultant.includes("jagtap and associates, nagpur")) {
    return {
      src: jagtapLogo,
      alt: "Jagtap and Associates, Nagpur logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  if (
    normalizedConsultant.includes("vax consultants, seethamdhara, visakhapatnam") ||
    normalizedConsultant.includes("vax consultants")
  ) {
    return {
      src: vaxConsultantsLogo,
      alt: "VAX Consultants logo",
      className: "relative h-12 w-12 object-contain mb-4",
    };
  }

  return null;
};

const getMarkerIcon = (project: Project, text: string, index: number): ReactNode => {
  const normalized = normalizeText(text);
  const projectTitle = normalizeText(project.title);

  if (
    projectTitle.includes("kumbakonam") &&
    normalized.includes("featured in the swacch bharath mission best practises 2016")
  ) {
    return renderMarkerLogo(swacchBharathLogo, "h-16 w-16 object-contain ml-1.5");
  }

  if (
    includesAll(normalized, ["towards lakshya zero dumpsite", "giz"]) &&
    (normalized.includes("swacch bharath mission") || normalized.includes("swachh bharat mission"))
  ) {
    return renderMarkerLogo(swacchBharathLogo, "h-16 w-16 object-contain ml-1.5");
  }

  if (normalized.includes("revamping of dumped garbage in muthusamy colony dumped yard by bio-mining process")) {
    return renderMarkerLogo(swacchBharathLogo, "h-16 w-16 object-contain ml-1.5");
  }

  if (
    includesAll(normalized, [
      "largest dumpsite recovering project executed in the state of andhra pradesh",
      "terms of land reclaimed",
    ])
  ) {
    return renderMarkerLogo(swacchBharathLogo, "h-16 w-16 object-contain ml-1.5");
  }

  if (
    includesAll(normalized, [
      "india smart cities awards contest",
      "(isac) 2020",
      "first place in the sanitation category",
    ])
  ) {
    return renderMarkerLogo(isacLogo, "h-14 w-14 object-contain pb-4");
  }

  if (
    includesAll(normalized, [
      "landfill mining advisory",
      "indian ministry for housing and urban affairs",
      "2020",
    ])
  ) {
    return renderMarkerLogo(mohuaLogo, "h-16 w-16 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "national green tribunal",
      "river cauvery",
      "drinking water to millions",
    ])
  ) {
    return renderMarkerLogo(ngtLogo, "h-16 w-16 object-contain mb-4");
  }

  if (normalized.includes("the project is monitored by the hon. national green tribunal")) {
    return renderMarkerLogo(ngtLogo, "h-16 w-16 object-contain mb-4");
  }

  if (normalized.includes("the project was monitored by the tamilnadu pollution control board")) {
    return renderMarkerLogo(tamilnaduPollutionControlBoardLogo, "h-12 w-12 object-contain mb-4");
  }

  if (
    normalized.includes(
      "the project featured in the best practises case studies identified by the kerala state pollution control board",
    )
  ) {
    return renderMarkerLogo(keralaStatePollutionControlBoardLogo, "h-16 w-16 object-contain mb-4");
  }

  if (normalized.includes("supreme court")) {
    return renderMarkerLogo(supremeCourtLogo, "h-14 w-14 object-contain mb-4");
  }

  if (normalized.includes("first project in india executed in an integrated model with zero residues")) {
    return renderMarkerLogo(firstProjectLogo, "h-16 w-16 object-contain mb-4");
  }

  if (
    projectTitle.includes("sembakkam") &&
    includesAll(normalized, [
      "project executed on the banks of sembakkam lake",
      "pallikaranai marshland- a ramsar site",
    ])
  ) {
    return renderMarkerLogo(sembakkamIcon, "h-16 w-16 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "fragile ramsar pallikaranai marshland",
      "92 acres in south india",
    ])
  ) {
    return renderMarkerLogo(ramsarLogo, "h-14 w-14 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "the project was executed on the banks of ramsar denoted ashtamudi lake",
      "first integrated landfill mining project executed in the state of kerala",
    ])
  ) {
    return renderMarkerLogo(ashtamudiRamsarLogo, "h-14 w-14 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "the project was executed on the banks of deepor beel which is a ramsar identified site",
      "largest landfill mining project executed in the state till date",
    ])
  ) {
    return renderMarkerLogo(ashtamudiRamsarLogo, "h-14 w-14 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "avpn summit 2025 workshop",
      "delegates from 25 countries",
      "reclaimed dumpsite",
    ])
  ) {
    return renderMarkerLogo(avpnLogo, "h-16 w-16 object-contain mb-4");
  }

  if (includesAll(normalized, ["skoch silver award", "waste management"])) {
    return renderMarkerLogo(skochLogo, "h-16 w-16 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "bpl families under the jnnurm project",
      "construction and demolition waste facility",
      "children's park",
    ])
  ) {
    return renderMarkerLogo(jnnurmLogo, "h-14 w-14 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "chief minister's award",
      "best performing bio-mining company in the state",
    ])
  ) {
    return renderMarkerLogo(swachhaAndhraAwardLogo, "h-10 w-10 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "centre for science and environment's toolkit on legacy waste management and dumpsite remediation",
      "support sbm 2.0",
    ])
  ) {
    return renderMarkerLogo(cseLogo, "h-10 w-10 object-contain mb-4");
  }

  if (
    includesAll(normalized, [
      "centre for science and environment",
      "clean it right- dumpsite management in india",
    ])
  ) {
    return renderMarkerLogo(cseLogo, "h-10 w-10 object-contain mb-4");
  }

  return DEFAULT_MARKER_ICONS[index % DEFAULT_MARKER_ICONS.length];
};

export const buildCredibilityMarkers = (project: Project): ProjectModalMarker[] =>
  project.metrics.map((text, index) => ({
    text,
    icon: getMarkerIcon(project, text, index),
  }));
