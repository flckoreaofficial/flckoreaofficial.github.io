import type { ReactNode } from "react";
import { company } from "../company";
import { arrow, diagonal } from "./icons";

export function marker(label: string): ReactNode {
  return (
    <>
      <span className="edit-marker">@@수정필요@@</span>
      <span className="edit-label">{label}</span>
    </>
  );
}

export function link(
  file: string,
  label: string,
  kind = "btn-primary",
): ReactNode {
  return (
    <>
      <a className={`btn ${kind}`} href={`./${file}`}>
        {label}
        {arrow}
      </a>
    </>
  );
}

export function external(
  url: string,
  label: string,
  className = "text-link",
): ReactNode {
  return (
    <>
      <a
        className={className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
        {diagonal}
        <span className="sr-only"> (새 창)</span>
      </a>
    </>
  );
}

export function sectionTitle(
  eyebrow: string,
  title: ReactNode,
  description: ReactNode = "",
): ReactNode {
  return (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        {description ? (
          <>
            <p className="section-description">{description}</p>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export function contactBand(): ReactNode {
  return (
    <>
      <section className="contact-band">
        <div className="shell flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-brand">CONNECT WITH FLC</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
              더 나은 반도체 공정, 함께 만드는 가능성.
            </h2>
          </div>
          {link("support-contact.html", "문의 안내")}
        </div>
      </section>
    </>
  );
}

export function field(label: string, value: ReactNode): ReactNode {
  return (
    <>
      <div className="info-row">
        <dt>{label}</dt>
        <dd>{value}</dd>
      </div>
    </>
  );
}

export function telephone(): ReactNode {
  return company.telephone ? (
    <>
      <a href={`tel:${company.telephone.replace(/[^+\d]/g, "")}`}>
        {company.telephone}
      </a>
    </>
  ) : (
    marker("대표 전화번호")
  );
}

export function email(): ReactNode {
  return company.email ? (
    <>
      <a
        href={`mailto:${encodeURIComponent(company.email).replace("%40", "@")}`}
      >
        {company.email}
      </a>
    </>
  ) : (
    marker("문의 이메일")
  );
}
