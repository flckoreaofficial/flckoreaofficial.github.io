import { useEffect, useRef, useState } from "react";
import type { SitePage } from "../navigation";
import { navigation } from "../navigation";
import { arrow, chevron, diagonal } from "./icons";

export function Header({
  page,
  assetBase,
}: {
  page: SitePage;
  assetBase: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const summaryRefs = useRef(new Map<string, HTMLElement>());

  function closeMenu() {
    setMobileOpen(false);
    setActiveGroup(null);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (activeGroup) {
        summaryRefs.current.get(activeGroup)?.focus();
        setActiveGroup(null);
      } else if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onOutsideClick(event: MouseEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        closeMenu();
    }
    const mobile = window.matchMedia("(max-width: 1023px)");
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onOutsideClick);
    mobile.addEventListener("change", closeMenu);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onOutsideClick);
      mobile.removeEventListener("change", closeMenu);
    };
  }, [activeGroup, mobileOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        본문으로 바로가기
      </a>
      <header
        className="site-header"
        ref={headerRef}
        onBlur={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            closeMenu();
        }}
      >
        <div className="shell header-inner">
          <a href="./index.html" className="brand" aria-label="FLC 에프엘씨 홈">
            <img
              src={`${assetBase}flc-logo.png`}
              width="200"
              height="100"
              alt="FLC Four Leaf Clover 에프엘씨 공식 로고"
            />
          </a>
          <button
            type="button"
            className="menu-toggle"
            ref={toggleRef}
            aria-expanded={mobileOpen}
            aria-controls="main-nav"
            aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => {
              setMobileOpen((open) => !open);
              setActiveGroup(null);
            }}
          >
            <span />
            <span />
          </button>
          <nav
            id="main-nav"
            className={mobileOpen ? "is-open" : undefined}
            aria-label="주요 메뉴"
          >
            <a
              className="nav-home"
              href="./index.html"
              aria-current={page.id === "home" ? "page" : undefined}
            >
              홈
            </a>
            {navigation.map((group) => (
              <details
                key={group.id}
                className={`nav-group${group.pages.some((item) => item.id === page.id) ? " current-group" : ""}`}
                open={activeGroup === group.id}
              >
                <summary
                  ref={(element) => {
                    if (element) summaryRefs.current.set(group.id, element);
                    else summaryRefs.current.delete(group.id);
                  }}
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveGroup((active) =>
                      active === group.id ? null : group.id,
                    );
                  }}
                >
                  {group.label}
                  {chevron}
                </summary>
                <div className="nav-dropdown">
                  <span className="dropdown-label">{group.english}</span>
                  {group.pages.map((item) => (
                    <a
                      key={item.id}
                      href={`./${item.file}`}
                      aria-current={item.id === page.id ? "page" : undefined}
                    >
                      {item.label}
                      {arrow}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </nav>
          <a className="header-contact" href="./support-contact.html">
            문의하기 {diagonal}
          </a>
        </div>
      </header>
    </>
  );
}
