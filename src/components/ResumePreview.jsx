import React from "react";
import ClassicPreview from "./templates/ClassicPreview";
import MinimalPreview from "./templates/MinimalPreview";
import BoldPreview from "./templates/BoldPreview";
import CleanPreview from "./templates/CleanPreview";
import ModernPreview from "./templates/ModernPreview";
import ProfessionalPreview from "./templates/ProfessionalPreview";
import ExecutivePreview from "./templates/ExecutivePreview";
import TechPreview from "./templates/TechPreview";
import ElegantPreview from "./templates/ElegantPreview";
import AcademicPreview from "./templates/AcademicPreview";
import CreativePreview from "./templates/CreativePreview";
import PortfolioPreview from "./templates/PortfolioPreview";
import AuroraPreview from "./templates/AuroraPreview";
import MonarchPreview from "./templates/MonarchPreview";
import NexusPreview from "./templates/NexusPreview";
import SagePreview from "./templates/SagePreview";
import VertexPreview from "./templates/VertexPreview";
import MusePreview from "./templates/MusePreview";
import OrbitPreview from "./templates/OrbitPreview";
import NoirPreview from "./templates/NoirPreview";
import CoralPreview from "./templates/CoralPreview";
import OceanPreview from "./templates/OceanPreview";
import StellarPreview from "./templates/StellarPreview";
import AtelierPreview from "./templates/AtelierPreview";

// =====================================================
// BUILDCV — TEMPLATE COMPONENTS MAP
// =====================================================
const templateComponents = {
  modern: ModernPreview,
  professional: ProfessionalPreview,
  minimal: MinimalPreview,
  executive: ExecutivePreview,
  creative: CreativePreview,
  elegant: ElegantPreview,
  classic: ClassicPreview,
  academic: AcademicPreview,

  bold: BoldPreview,
  clean: CleanPreview,
  tech: TechPreview,
  portfolio: PortfolioPreview,

  aurora: AuroraPreview,
  monarch: MonarchPreview,
  nexus: NexusPreview,
  sage: SagePreview,
  vertex: VertexPreview,
  muse: MusePreview,
  orbit: OrbitPreview,
  noir: NoirPreview,
  coral: CoralPreview,
  ocean: OceanPreview,
  stellar: StellarPreview,
  atelier: AtelierPreview,
};

// =====================================================
// BUILDCV — DEFAULT OPTIONAL SECTIONS
// =====================================================
const DEFAULT_CERTIFICATIONS = {
  enabled: false,
  items: [],
};

const DEFAULT_LANGUAGES = {
  enabled: false,
  items: [],
};

const DEFAULT_ACHIEVEMENTS = {
  enabled: false,
  items: [],
};

const DEFAULT_INTERESTS = {
  enabled: false,
  value: "",
};

const DEFAULT_REFERENCES = {
  enabled: false,
  items: [],
};

// =====================================================
// BUILDCV — SAFE ARRAY HELPER
// =====================================================
function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

// =====================================================
// BUILDCV — SAFE OPTIONAL ARRAY SECTION
// =====================================================
function normalizeArraySection(value, fallback) {
  if (Array.isArray(value)) {
    return {
      ...fallback,
      enabled: value.length > 0,
      items: value,
    };
  }

  if (value && typeof value === "object" && value !== null) {
    return {
      ...fallback,
      ...value,
      enabled:
        typeof value.enabled === "boolean"
          ? value.enabled
          : safeArray(value.items).length > 0,
      items: safeArray(value.items),
    };
  }

  return {
    ...fallback,
    items: [],
  };
}

// =====================================================
// BUILDCV — SAFE INTERESTS HELPER
// =====================================================
function normalizeInterests(value) {
  if (Array.isArray(value)) {
    return {
      enabled: value.length > 0,
      value: value.join(", "),
      items: value,
    };
  }

  if (typeof value === "string") {
    return {
      enabled: value.trim().length > 0,
      value,
      items: value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };
  }

  if (value && typeof value === "object" && value !== null) {
    const items = safeArray(value.items);

    const stringValue =
      typeof value.value === "string"
        ? value.value
        : items
            .map((item) => {
              if (typeof item === "string") return item;

              if (item && typeof item === "object" && item !== null) {
                return (
                  item.name ||
                  item.title ||
                  item.value ||
                  ""
                );
              }

              return "";
            })
            .filter(Boolean)
            .join(", ");

    return {
      ...DEFAULT_INTERESTS,
      ...value,
      enabled:
        typeof value.enabled === "boolean"
          ? value.enabled
          : stringValue.trim().length > 0,
      value: stringValue,
      items,
    };
  }

  return {
    ...DEFAULT_INTERESTS,
    items: [],
  };
}

// =====================================================
// BUILDCV — RESUME PREVIEW COMPONENT
// =====================================================
function ResumePreview({
  selectedTemplate = "modern",
  formData = {},
  previewId = "cv-preview-container", // Default set to match ATS print stylesheet selector (#cv-preview-container)
  fitToContainer = false,
}) {
  // Safe source data extraction
  const sourceData =
    formData && typeof formData === "object" && formData !== null
      ? formData
      : {};

  // Extract template ID safely
  const templateId =
    typeof selectedTemplate === "string"
      ? selectedTemplate.trim().toLowerCase()
      : selectedTemplate?.id ||
        selectedTemplate?.slug ||
        selectedTemplate?.preview ||
        "modern";

  // Safely extract personal information
  const personal = {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
    profileImage: "",
    ...(sourceData.personal && typeof sourceData.personal === "object" && sourceData.personal !== null
      ? sourceData.personal
      : {}),
  };

  // Normalize full dataset
  const normalizedData = {
    ...sourceData,
    personal,

    education: safeArray(sourceData.education),
    experience: safeArray(sourceData.experience),
    skills: safeArray(sourceData.skills),
    projects: safeArray(sourceData.projects),

    certifications: normalizeArraySection(
      sourceData.certifications,
      DEFAULT_CERTIFICATIONS
    ),

    languages: normalizeArraySection(
      sourceData.languages,
      DEFAULT_LANGUAGES
    ),

    achievements: normalizeArraySection(
      sourceData.achievements,
      DEFAULT_ACHIEVEMENTS
    ),

    references: normalizeArraySection(
      sourceData.references,
      DEFAULT_REFERENCES
    ),

    interests: normalizeInterests(sourceData.interests),

    // Flat personal values for legacy template compatibility
    fullName: personal.fullName,
    jobTitle: personal.jobTitle,
    email: personal.email,
    phone: personal.phone,
    location: personal.location,
    linkedin: personal.linkedin,
    github: personal.github,
    summary: personal.summary,
    profileImage: personal.profileImage,
  };

  const templateProps = {
    formData: normalizedData,
    data: normalizedData,
  };

  // Select the appropriate template component or fall back to ModernPreview
  const TemplateComponent =
    templateComponents[templateId] || ModernPreview;

  // Fallback UI if template component fails to resolve
  if (!TemplateComponent) {
    return (
      <div
        id={previewId}
        style={{
          padding: "20px",
          color: "#dc2626",
          backgroundColor: "#fef2f2",
          borderRadius: "8px",
          border: "1px solid #fca5a5",
        }}
      >
        <p style={{ fontWeight: "bold" }}>Error Loading Template</p>
        <p style={{ fontSize: "14px" }}>
          Selected template "{templateId}" could not be rendered.
        </p>
      </div>
    );
  }

  return (
    <div
      id={previewId}
      className={`resume-preview${
        fitToContainer ? " resume-preview--fit" : ""
      }`}
      data-template={templateId}
      style={{
        width: "210mm",
        minWidth: "210mm",
        minHeight: "297mm",
        height: "auto",
        margin: 0,
        padding: 0,
        backgroundColor: "#FFFFFF",
        color: "#111827",
        boxSizing: "border-box",
        overflow: "visible",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <TemplateComponent {...templateProps} />
    </div>
  );
}

export default ResumePreview;