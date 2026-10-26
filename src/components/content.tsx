import type { ReactNode } from "react";
import { useLocale } from "../LocaleContext";
import { arrow, diagonal } from "./icons";
function Text({ children }: { children: ReactNode }) {
  const { t } = useLocale();
  return <>{t(children)}</>;
}
export function marker(label: string): ReactNode {
  return (
    <>
      <span className="edit-marker">
        <Text>@@수정필요@@</Text>
      </span>
      <span className="edit-label">
        <Text>{label}</Text>
      </span>
    </>
  );
}
export function link(
  file: string,
  label: string,
  kind = "btn-primary",
): ReactNode {
  return (
    <a className={`btn ${kind}`} href={`./${file}`}>
      <Text>{label}</Text>
      {arrow}
    </a>
  );
}
export function external(
  url: string,
  label: string,
  className = "text-link",
): ReactNode {
  return (
    <a
      className={className}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Text>{label}</Text>
      {diagonal}
      <span className="sr-only">
        <Text> (새 창)</Text>
      </span>
    </a>
  );
}
export function sectionTitle(
  eyebrow: string,
  title: ReactNode,
  description: ReactNode = "",
): ReactNode {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">
          <Text>{title}</Text>
        </h2>
      </div>
      {description && (
        <p className="section-description">
          <Text>{description}</Text>
        </p>
      )}
    </div>
  );
}
export function contactBand(): ReactNode {
  return (
    <section className="contact-band">
      <div className="shell flex flex-col justify-between gap-7 md:flex-row md:items-center">
        <div>
          <p className="eyebrow text-brand">CONNECT WITH FLC</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
            <Text>더 나은 반도체 공정, 함께 만드는 가능성.</Text>
          </h2>
        </div>
        {link("support-contact.html", "문의 안내")}
      </div>
    </section>
  );
}
export function field(label: string, value: ReactNode): ReactNode {
  return (
    <div className="info-row">
      <dt>
        <Text>{label}</Text>
      </dt>
      <dd>
        <Text>{value}</Text>
      </dd>
    </div>
  );
}
function Telephone() {
  const { company } = useLocale();
  return (
    <a href={`tel:${company.telephone.replace(/[^+\d]/g, "")}`}>
      {company.telephone}
    </a>
  );
}
function Email() {
  const { company } = useLocale();
  return <a href={`mailto:${company.email}`}>{company.email}</a>;
}
export function telephone(): ReactNode {
  return <Telephone />;
}
export function email(): ReactNode {
  return <Email />;
}
