import React from "react";
import Script from "next/script.js";

export const Umami = ({
  id,
  src = "https://analytics.umami.is/script.js",
}: {
  id: string;
  src?: string;
}) => {
  return (
    <Script
      async
      defer
      data-website-id={id}
      src={src} // Replace with your umami instance
    />
  );
};

export const GoogleAnalytics = ({ id }: { id: string }) => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />

      <Script strategy="afterInteractive" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');
        `}
      </Script>
    </>
  );
};
