import Link from "next/link";
import styles from "./navbar.module.css";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { FC, ReactNode, useContext, useState } from "react";
import LangContext from "./langcontext";
import Translated from "./translated";
import SiteLogo from "./sitelogo";
import localFont from "next/font/local";

const pixelFont = localFont({ src: "../fonts/fusion-pixel.woff2" });

export default function Navbar() {
  const NavEntry: FC<{ href: string; children: ReactNode }> = ({
    href,
    children,
  }) => {
    const router = useRouter();
    const active = router.pathname == href;
    const [hover, setHover] = useState(false);
    return (
      <div
        className={clsx({
          [styles.nav_button]: true,
          [styles.nav_button_active]: active,
          "crt-colorsep": hover && !active,
          "crt-flicker": hover && !active,
        })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link href={href}>{children}</Link>
      </div>
    );
  };

  const LangButton: FC<{ lang: string; children: ReactNode }> = ({
    lang,
    children,
  }) => {
    const { current, setCurrent } = useContext(LangContext);

    return (
      <div
        className={clsx({
          [styles.lang_button_active]: lang == current,
          [styles.lang_button]: true,
        })}
        onClick={() => setCurrent(lang as any)}
      >
        {children}
      </div>
    );
  };

  return (
    <div className={styles.navbar_wrapper}>
      <div className={clsx(styles.navbar, pixelFont.className)}>
        <div className={styles.navbar_group}>
          <div className={styles.lang_switch}>
            <div className={styles.lang_switch_label}>
              <Translated en="LANG:" cn="语言：" />
            </div>
            <LangButton lang="cn">中文</LangButton>
            <LangButton lang="en">EN</LangButton>
          </div>
        </div>

        <div className={clsx(styles.sitelogo_wrapper, "crt")}>
          <SiteLogo />
        </div>

        <div className={styles.navbar_group}>
          <div className={styles.nav_buttons}>
            <NavEntry href="/">
              <Translated en="Home" cn="首页" />
            </NavEntry>
            <NavEntry href="/about">
              <Translated en="About" cn="关于" />
            </NavEntry>
          </div>
        </div>
      </div>
    </div>
  );
}
