"use client";
import { Breadcrumb, IBreadcrumbItem } from "@fluentui/react";
import styles from "./page.module.css";
import Link from "next/link";

const Dashboard = () => {
  const items: IBreadcrumbItem[] = [
    {
      text: "Dashboard",
      key: "Dashboard",
      isCurrentItem: true,
    },
    { text: "Files", key: "Files" },
    { text: "Permissions", key: "Permissions" },
  ];
  return (
    <main className={styles.main}>
      <Breadcrumb
        items={items}
        maxDisplayedItems={10}
        ariaLabel="Breadcrumb with items rendered as buttons"
        overflowAriaLabel="More links"
      />
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "row",
          padding: "20px",
          width: "100%",
        }}
      >
        <nav
          style={{
            width: "200px",
            backgroundColor: "#f4f4f4",
            padding: "20px",
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link href="/files">Files</Link>
            </li>
            <li>
              <Link href="/permissions">Permissions</Link>
            </li>
          </ul>
        </nav>
        <div style={{ flex: 1, padding: "20px", width: "100%" }}>
          {/* Content will go here */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
