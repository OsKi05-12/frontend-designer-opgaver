import employees from "@data/employees.json";
import services from "@data/services.json";
import faq from "@data/faq.json";
import experience from "@data/experience.json";
import coreValues from "@data/coreValues.json";
import financialProjections from "@data/financialProjections.json";
import caseStudy from "@data/caseStudy.json";

const images = import.meta.glob("/src/data/images/*.webp", {
  eager: true,
  import: "default",
});

function localImage(path, alt) {
  const image = images[path];
  if (!image) throw new Error(`Lokalt billede mangler: ${path}`);
  return { src: image, alt, width: image.width, height: image.height };
}

async function apiFetch(endpoint, backup, isValid) {
  const url = `https://ftk-api.pages.dev/${endpoint}`;

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!isValid(data)) {
      throw new Error("Uventet datastruktur");
    }

    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[${url}] Bruger lokal JSON-backup: ${message}`);
    return backup();
  }
}

// Lokal backup: brug de importerede billeder, så Astro kan optimere dem.
function localTeam() {
  return employees.map((employee) => ({
    ...employee,
    image: localImage(employee.img, employee.name),
  }));
}

function localCaseStudies() {
  const details = caseStudy.caseDetails;
  const sections = caseStudy.sections.map((section) => {
    if (!section.image) return { ...section };

    return {
      ...section,
      image: {
        ...section.image,
        ...localImage(section.image.src, section.image.alt),
      },
    };
  });

  return [
    {
      ...caseStudy,
      slug: "taxes-and-efficiency",
      caseDetails: {
        ...details,
        image: localImage(details.image, details.caseName),
      },
      sections,
    },
  ];
}

export function getTeamMembers() {
  return apiFetch(
    "team",
    localTeam,
    (data) =>
      Array.isArray(data) &&
      data.length > 0 &&
      data.every(
        (employee) =>
          employee.slug &&
          employee.image?.src &&
          Array.isArray(employee.social_links),
      ),
  );
}

export function getCaseStudies() {
  return apiFetch(
    "case-studies",
    localCaseStudies,
    (data) =>
      Array.isArray(data) &&
      data.length > 0 &&
      data.every(
        (item) =>
          item.slug &&
          item.caseDetails?.image?.src &&
          Array.isArray(item.sections),
      ),
  );
}

export function getServices() {
  return apiFetch(
    "services",
    () => services.services,
    (data) =>
      Array.isArray(data) &&
      data.length > 0 &&
      data.every((item) => item.title && item.description && item.buttonText),
  );
}

export function getFAQ() {
  return apiFetch(
    "faq",
    () => faq.faq,
    (data) =>
      Array.isArray(data) &&
      data.length > 0 &&
      data.every(
        (item) =>
          typeof item.question === "string" && typeof item.answer === "string",
      ),
  );
}

export function getExperience() {
  return apiFetch(
    "experience",
    () => experience,
    (data) => data?.title && Array.isArray(data.stats),
  );
}

export function getCoreValues() {
  return apiFetch(
    "core-values",
    () => coreValues,
    (data) => data?.title && data.button?.text && Array.isArray(data.values),
  );
}

export function getFinancialProjections() {
  return apiFetch(
    "financial-projections",
    () => financialProjections,
    (data) => data?.title && Array.isArray(data.values),
  );
}
