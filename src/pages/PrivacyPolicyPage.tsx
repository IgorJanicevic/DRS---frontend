import React from "react";

export const PrivacyPolicyPage = () => {
    const styles = {
        body: {
            fontFamily: "Arial, sans-serif",
            lineHeight: 1.6,
            margin: 0,
            padding: 0,
            backgroundColor: "#f9f9f9",
            color: "#333",
        },
        
        main: {
            maxWidth: "800px",
            margin: "2rem auto",
            padding: "1rem",
            backgroundColor: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
        },
        heading: {
            color: "orange",
        },
        paragraph: {
            marginBottom: "1rem",
        },
        list: {
            margin: "1rem 0",
            paddingLeft: "1.5rem",
        },
        footer: {
            textAlign: "center",
            marginTop: "2rem",
            padding: "1rem 0",
            backgroundColor: "#4CAF50",
            color: "white",
        },
    };

    return (
        <div style={styles.body}>
            <header style={{backgroundColor: "orange",
                            color: "#fff",
                            padding: "1rem 0",
                            textAlign: "center"}}>
                <h1>Privacy Policy</h1>
            </header>
            <main style={styles.main}>
                <h2 style={styles.heading}>Effective Date: [Insert Date]</h2>
                <p style={styles.paragraph}>
                    Welcome to EuroHoop! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website or services.
                </p>

                <h2 style={styles.heading}>1. Information We Collect</h2>
                <p style={styles.paragraph}>We may collect the following types of information:</p>
                <ul style={styles.list}>
                    <li>
                        <strong>Personal Information:</strong> When you register or interact with our website, we may collect information such as your name, email address, and contact details.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about how you use our site, including IP address, browser type, and device information.
                    </li>
                </ul>

                <h2 style={styles.heading}>2. How We Use Your Information</h2>
                <p style={styles.paragraph}>Your information may be used for the following purposes:</p>
                <ul style={styles.list}>
                    <li>To provide and improve our services.</li>
                    <li>To communicate with you regarding updates or support.</li>
                    <li>To analyze user behavior and enhance user experience.</li>
                </ul>

                <h2 style={styles.heading}>3. Sharing Your Information</h2>
                <p style={styles.paragraph}>
                    We will not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted partners for purposes like analytics or technical support, under strict confidentiality agreements.
                </p>

                <h2 style={styles.heading}>4. Data Security</h2>
                <p style={styles.paragraph}>
                    We take appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.
                </p>

                <h2 style={styles.heading}>5. Your Rights</h2>
                <p style={styles.paragraph}>
                    You have the right to access, correct, or delete your personal information. Please contact us at [Insert Contact Email] for any such requests.
                </p>

                <h2 style={styles.heading}>6. Changes to This Policy</h2>
                <p style={styles.paragraph}>
                    We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.
                </p>

                <h2 style={styles.heading}>7. Contact Us</h2>
                <p style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p style={styles.paragraph}>Email: [Insert Email Address]</p>
            </main>
            <footer>
                <p>© 2024 EuroHoop. All rights reserved.</p>
            </footer>
            </div>);
}
