import { useRef, useState } from "react";
import { useLocale } from "../LocaleContext";
import { arrow } from "./icons";
import { field, telephone } from "./content";
export function AddressCopy() {
  const { t, company } = useLocale();
  const addressRef = useRef<HTMLSpanElement>(null);
  const [status, setStatus] = useState("");
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(company.address);
      setStatus(t("주소를 복사했습니다."));
    } catch {
      if (addressRef.current) {
        const range = document.createRange();
        range.selectNodeContents(addressRef.current);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      setStatus(t("주소를 선택했습니다. 복사 기능을 이용해 주세요."));
    }
  }
  return (
    <>
      <dl className="info-list mt-7">
        {field(
          "주소",
          <span data-location-address="" ref={addressRef}>
            {company.address}
          </span>,
        )}
        {field("대표전화", telephone())}
      </dl>
      <button
        type="button"
        className="btn btn-outline mt-6 copy-address"
        data-copy-address=""
        onClick={copyAddress}
      >
        {t("주소 복사")}
        {arrow}
      </button>
      <p
        id="copy-status"
        role="status"
        aria-live="polite"
        className="mt-3 min-h-6 text-xs text-brand"
      >
        {status}
      </p>
    </>
  );
}
