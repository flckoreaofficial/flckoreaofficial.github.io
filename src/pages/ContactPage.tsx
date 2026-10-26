import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useLocale } from "../LocaleContext";
import { email, telephone } from "../components/content";
export function ContactPage() {
  const { t, products, company, locale } = useLocale();
  const [product, setProduct] = useState("");
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(
    null,
  );
  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get("product");
    if (selected && products.some((p) => p.id === selected))
      setProduct(selected);
  }, [products]);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const interest =
      products.find((p) => p.id === product)?.name ||
      data.get("otherProduct") ||
      t("미정");
    const subject = `[FLC ${data.get("type")}] ${data.get("company")} / ${interest}`;
    const text = `${t("문의 유형:")} ${data.get("type")}\n${t("관심 제품:")} ${interest}\n${t("회사명:")} ${data.get("company")}\n${t("담당자:")} ${data.get("name")}\n${t("회신 이메일:")} ${data.get("email")}\n${t("연락처:")} ${data.get("phone") || t("미입력")}\n\n${data.get("message")}`;
    setDraft({
      href: `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`,
      text,
    });
  }
  return (
    <div className="contact-layout">
      <div>
        <h2 className="content-title">{t("제품·기술 문의")}</h2>
        <p className="intro-copy">
          {t(
            "적용 장비와 공정 조건, 필요한 제품 또는 개선하려는 문제를 알려주세요.",
          )}
        </p>
        <p className="spec-note">
          {t(
            "문의 내용을 정리한 후 이메일 앱에서 직접 발송하는 방식입니다. 도면·사양서·사진은 이메일 작성 창에서 첨부해 주세요.",
          )}
        </p>
        <form
          className="inquiry-form interactive-only"
          onSubmit={prepare}
          onChange={() => setDraft(null)}
        >
          <div className="form-grid">
            <label>
              {t("문의 유형")} <span>{t("(필수)")}</span>
              <select name="type" required>
                {["제품·견적", "기술 상담", "맞춤형 개발", "기타"].map(
                  (type) => (
                    <option key={type}>{t(type)}</option>
                  ),
                )}
              </select>
            </label>
            <label>
              {t("관심 제품")}
              <select
                name="product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value="">{t("미정 / 직접 입력")}</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                    {p.id === "zsd-1" || p.id === "mcpd-1"
                      ? ` (${p.model})`
                      : ""}
                  </option>
                ))}
              </select>
            </label>
            {!product && (
              <label className="full-width">
                {t("관심 제품 직접 입력")}
                <input
                  name="otherProduct"
                  maxLength={100}
                  placeholder={t("제품명 또는 필요한 부품")}
                />
              </label>
            )}
            <label>
              {t("회사명")} <span>{t("(필수)")}</span>
              <input
                name="company"
                autoComplete="organization"
                required
                maxLength={80}
              />
            </label>
            <label>
              {t("담당자")} <span>{t("(필수)")}</span>
              <input name="name" autoComplete="name" required maxLength={50} />
            </label>
            <label>
              {t("이메일")} <span>{t("(필수)")}</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={150}
              />
            </label>
            <label>
              {t("연락처")} <span>{t("(선택)")}</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
            <label className="full-width">
              {t("문의 내용")} <span>{t("(필수)")}</span>
              <textarea
                name="message"
                required
                rows={7}
                maxLength={1500}
                aria-describedby="inquiry-help"
                placeholder={t(
                  "적용 장비 모델, 칩 또는 패키지 규격, 현재 문제, 필요한 수량과 희망 일정을 작성해 주세요.",
                )}
              />
            </label>
          </div>
          <p id="inquiry-help" className="form-help">
            {t(
              "최대 1,500자. 상세 사양이나 긴 내용은 이메일 본문 또는 첨부파일로 전달해 주세요.",
            )}
          </p>
          <details className="privacy-note">
            <summary>{t("문의 정보 안내")}</summary>
            <p>
              {t(
                "입력 내용은 이 화면에서 이메일 초안을 만드는 데 사용하며, 웹사이트 서버에 저장하거나 전송하지 않습니다. 이메일을 직접 발송하면 회사명, 담당자, 이메일, 선택 연락처와 문의 내용이 FLC에 전달됩니다. 문의 검토와 회신에 필요한 정보만 작성해 주세요.",
              )}
            </p>
          </details>
          <label className="consent">
            <input type="checkbox" name="consent" required />
            <span>
              {t(
                "문의 정보 안내를 확인했으며, 작성 내용을 이메일로 전달하는 데 동의합니다. (필수)",
              )}
            </span>
          </label>
          <button type="submit" className="btn btn-primary">
            {t("문의 이메일 준비하기 ↗")}
          </button>
        </form>
        <noscript>
          <p className="spec-note">
            {locale === "en"
              ? `Email ${company.email} with your company, contact name, product of interest and message.`
              : `이메일 ${company.email}로 회사명, 담당자, 관심 제품과 문의 내용을 보내주세요.`}
          </p>
        </noscript>
        {draft && (
          <div className="email-draft" role="status">
            <h3>{t("이메일 초안이 준비되었습니다.")}</h3>
            <p>
              {t(
                "아직 발송되지 않았습니다. 이메일 앱에서 내용을 확인하고 직접 전송해 주세요.",
              )}
            </p>
            <a className="btn btn-primary" href={draft.href}>
              {t("이메일 앱에서 열기 ↗")}
            </a>
            <details>
              <summary>{t("이메일 앱이 열리지 않나요?")}</summary>
              <p>
                {locale === "en"
                  ? `Copy the text below and email it to ${company.email}.`
                  : `${company.email}로 아래 내용을 복사해 보내주세요.`}
              </p>
              <textarea
                readOnly
                aria-label={t("문의 이메일 복사할 내용")}
                value={draft.text}
                rows={10}
                onFocus={(e) => e.currentTarget.select()}
              />
            </details>
          </div>
        )}
      </div>
      <aside className="contact-info-card">
        <p className="eyebrow">CONTACT FLC</p>
        <h2 className="mt-5 text-2xl font-semibold">
          {t("함께 검토하겠습니다.")}
        </h2>
        <dl className="contact-details">
          <dt>{t("대표 전화")}</dt>
          <dd>{telephone()}</dd>
          <dt>{t("이메일")}</dt>
          <dd>{email()}</dd>
          <dt>{t("회사")}</dt>
          <dd>{company.name}</dd>
          <dt>{t("사업장 주소")}</dt>
          <dd data-company-address="">{company.address}</dd>
        </dl>
        <a className="text-link" href="./company-location.html">
          {t("오시는길 확인 ↗")}
        </a>
        <div className="contact-checklist">
          <h3>{t("상담 전 준비해 주세요")}</h3>
          <ul>
            {[
              "적용 장비 모델",
              "칩·패키지 규격과 공정 조건",
              "개선하려는 문제",
              "필요 수량과 희망 일정",
            ].map((item) => (
              <li key={item}>{t(item)}</li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
