"use client";
import styles from "./page.module.css";
import Link from "next/link";

const Dashboard = () => {
  return (
    <main className={styles.main}>
      <div style={{ display: "flex", height: "100vh" }}>
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
        <div style={{ flex: 1, padding: "20px" }}>
          {/* Content will go here */}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
