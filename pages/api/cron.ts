// This is a cron job that runs every 24 hours to update the stargazers count of all sites
// Inspired by https://vercel.com/guides/how-to-setup-cron-jobs-on-vercel

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const DELAY = 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_CRON_KEY}`) {
        const sites = await prisma.site.findMany({
          where: {
            githubUrl: {
              not: null,
            },
          },
        });

        console.log("Fetched site number: ", sites.length);
        sites.forEach((siteElement: any, i: number) => {
          setTimeout(async () => {
            console.log(i, "/", sites.length, "--", siteElement.githubUrl);

            const githubPath = siteElement.githubUrl
              .split("/")
              .slice(3)
              .join("/");
            const url = `https://api.github.com/repos/${githubPath}`;

            console.log("fetching url: ", githubPath);
            const res = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_AUTH}`,
              },
            });

            console.log("Start count: ", res.data.stargazers_count);

            if (res?.data?.stargazers_count) {
              console.log("Updating site: ", siteElement.githubUrl);
              await prisma.site.update({
                where: {
                  id: siteElement.id,
                },
                data: {
                  stargazersCount: res.data.stargazers_count,
                },
              });
            }
          }, i * DELAY); // one sec interval
        });

        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
