export const workType = [
  { value: "contract", label: "Contract" },
  { value: "part-time", label: "Part time" },
  { value: "full-time", label: "Full time" },
];

// export const searchStatus = [
//   { value: "actively-looking", label: "Contract" },
//   { value: "visible", label: "Part time" },
//   { value: "invisible", label: "Invisible" },
// ];

export const roleLevel = [
  { value: "junior", label: "Junior" },
  { value: "mid-level", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "c-level", label: "C-level" },
];

export const roles = [
  { value: "frontend", label: "Frontend dev" },
  { value: "backend", label: "Backend dev" },
  { value: "fullstack", label: "Fullstack dev" },
  { value: "mobile", label: "Mobile dev" },
  { value: "game", label: "Game dev" },
];

export const technologies = [
  { value: "react", label: "React" },
  { value: "react-native", label: "React Native" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "ember", label: "Ember" },
  { value: "nextjs", label: "NextJS" },
  { value: "svelte", label: "Svetle" },
  { value: "gatsby", label: "Gatsby" },
  { value: "nuxtjs", label: "NuxtJS" },
  { value: "node", label: "Node" },
  { value: "fastify", label: "Fastify" },
  { value: "nestjs", label: "NestJS" },
  { value: "graphql", label: "GraphQl" },
  { value: "typescript", label: "Typescript" },
  { value: "aws", label: "AWS" },
  { value: "javascript", label: "Javascript" },
  { value: "css", label: "CSS" },
  { value: "html", label: "Html" },
  { value: "chrome-extension", label: "Chrome extensions" },
  { value: "meteor", label: "Meteor" },
  { value: "git", label: "Git" },
  { value: "saas", label: "Saas" },
  { value: "Amazon S3", label: "Amazon S3" },
  { value: "Solidity", label: "Solidity" },
  { value: "Web3", label: "Web3" },
];

export const yearsOfExp = [
  { value: "0-1", label: "0-1  years experience" },
  { value: "1-2", label: "1-2  years experience" },
  { value: "3-5", label: "3-5  years experience" },
  { value: "5-10", label: "5+ years experience" },
  { value: "10-20", label: "10+ years experience" },
];

export const searchStatus = [
  { value: "visible", label: "Visible" },
  { value: "invisible", label: "Invisible" },
];

export const getLabelByValue = (value: any, options: any) => {
  const option = options.find((item: any) => item.value === value);

  return option?.label || "";
};
