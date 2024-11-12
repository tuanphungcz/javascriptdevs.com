import "./globals.css";

import { ReactNode } from "react";

import { getGlobalSettings } from "@/_features/globals/actions";
import { AppLayout } from "@/app/(app)/AppLayout";
import { GoogleAnalytics, Umami } from "@/components/Analytics";
import { Toaster } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

const isProduction = process.env.NODE_ENV === "production";

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout = async ({ children }: LayoutProps) => {
  const { analytics } = await getGlobalSettings();

  return (
    <html>
      {analytics?.googleAnalyticsId && isProduction && (
        <GoogleAnalytics id={analytics.googleAnalyticsId} />
      )}
      {analytics?.umami?.umamiWebsiteId &&
        analytics?.umami?.umamiSrc &&
        isProduction && (
          <Umami
            id={analytics.umami.umamiWebsiteId}
            src={analytics.umami.umamiSrc}
          />
        )}

      <script async src="https://tally.so/widgets/embed.js"></script>

      <body>
        <Toaster />

        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
};

export default Layout;
