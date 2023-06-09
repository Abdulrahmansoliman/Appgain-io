import React, { useEffect, useState } from "react";
const styles = {
  card: {
  backgroundColor: "#007bff !important",
  borderRadius: "10px",
  boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "30px",
  padding: "20px",
  maxWidth: "400px",
  margin: "auto",
  position: "relative",
  overflow: "hidden",
  }as React.CSSProperties,
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  }as React.CSSProperties,
  label: {
    fontWeight: "bold",
    color: "#777",
  },
  value: {
    marginLeft: "5px",
    color: "#333",
  },
  row: {
    display: "flex",
    marginBottom: "10px",
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    color: "#88cff0"
  },
};
interface CardProps {
  slug: string;
  android: {
    primary: string;
    fallback: string;
  };
  ios: {
    primary: string;
    fallback: string;
  };
  web: string;
}

export const Card: React.FC<CardProps> = ({ slug, android, ios, web }) => {
  return (
    <div style={styles.card}>
      <p style={styles.title}>{slug}</p>
      <div style={styles.row}>
        <span style={styles.label}>Android Primary:</span>
        <a href={android.primary} style={styles.link}>
              {android.primary}
          </a>      </div>
      <div style={styles.row}>
        <span style={styles.label}>Android Fallback:</span>
        <a href={android.fallback} style={styles.link}>
              {android.fallback}
          </a>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>iOS Primary:</span>
        <a href={ios.primary} style={styles.link}>
              {ios.primary}
          </a>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>iOS Fallback:</span>
          <a href={ios.fallback} style={styles.link}>
              {ios.fallback}
          </a>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Web:</span>
        <span style={styles.value}>
          <a href={web} style={styles.link}>
            {web}
          </a>
        </span>
      </div>
    </div>
  );
};
type shortenLinkProps = {
  slug: string;
  android: {
    primary: string;
    fallback: string;
  };
  ios: {
    primary: string;
    fallback: string;
  };
  web: string;
};

export const CardList = () => {
  //test
  const [shortenLink, setShortenLink] = useState<shortenLinkProps[]>([]);
  useEffect(() => {
    fetch("https://shortlinker.onrender.com/shortlinks/", { method: "GET"})
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        setShortenLink(data.data);
      })
      .catch((error) => console.error("get failed", error.message));
  }, []);

  return (
    <div>
      {shortenLink.map((shortenLink, index) => (
        <Card
          key={index}
          slug={shortenLink.slug}
          android={shortenLink.android}
          ios={shortenLink.ios}
          web={shortenLink.web}
        />
      ))}
    </div>
  );
};
