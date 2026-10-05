declare module "@lib/api" {
  import type { ImageMetadata } from "astro";
  import employees from "@data/employees.json";
  import services from "@data/services.json";
  import faq from "@data/faq.json";
  import experience from "@data/experience.json";
  import coreValues from "@data/coreValues.json";
  import financialProjections from "@data/financialProjections.json";
  import caseStudy from "@data/caseStudy.json";

  type Image = {
    alt: string;
    width: number;
    height: number;
  } & ({ src: string } | { src: ImageMetadata });

  type Employee = (typeof employees)[number] & { image: Image };
  type CaseStudy = Omit<typeof caseStudy, "caseDetails" | "sections"> & {
    slug: string;
    caseDetails: Omit<typeof caseStudy.caseDetails, "image"> & { image: Image };
    sections: Array<
      Omit<(typeof caseStudy.sections)[number], "image"> & {
        image?: Image & { caption?: string };
      }
    >;
  };

  export function getTeamMembers(): Promise<Employee[]>;
  export function getCaseStudies(): Promise<CaseStudy[]>;
  export function getServices(): Promise<typeof services.services>;
  export function getFAQ(): Promise<typeof faq.faq>;
  export function getExperience(): Promise<typeof experience>;
  export function getCoreValues(): Promise<typeof coreValues>;
  export function getFinancialProjections(): Promise<typeof financialProjections>;
}
