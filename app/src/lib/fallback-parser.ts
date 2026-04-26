import { MatrixSchema } from "./schema";

export const fallbackParser = (text: string): MatrixSchema => {
  const result: MatrixSchema = {
    title: "Software Engineer",
    seniority: "unknown",
    skills: {
      frontend: [],
      backend: [],
      devops: [],
      web3: [],
      other: [],
    },
    mustHave: [],
    niceToHave: [],
    salary: { min: null, max: null, currency: "USD" },
    summary: "",
  };

  const lowerText = text.toLowerCase();

  const backendBackground = [
    "node",
    "express",
    "python",
    "go",
    "java",
    "sql",
    "c#",
    ".net",
    "mongodb",
  ];
  const frontendBackground = [
    "react",
    "tailwind",
    "css",
    "redux",
    "nextjs",
    "next.js",
    "html",
    "vite",
  ];
  const devopsBackground = [
    "docker",
    "kubernetes",
    "aws",
    "ci/cd",
    "jenkins",
    "terraform",
  ];
  const web3Background = [
    "solidity",
    "ethers",
    "web3.js",
    "smart contract",
    "blockchain",
    "ethereum",
  ];
  const otherSkills = ["git", "postman", "github", "jira", "agile", "figma"];

  const currencyMap: Record<string, "USD" | "EUR" | "PLN" | "GBP"> = {
    $: "USD",
    usd: "USD",
    "€": "EUR",
    eur: "EUR",
    zł: "PLN",
    pln: "PLN",
    "£": "GBP",
    gbp: "GBP",
  };

  const isFullStack = ["fullstack", "full-stack", "full stack"].some((flstck) =>
    lowerText.includes(flstck),
  );

  if (isFullStack) result.title = "FullStack Developer";

  const isFrontend = ["frontend", "front-end", "front end"].some((front) => {
    lowerText.includes(front);
  });

  if (isFrontend) result.title = "Frontend Developer";

  const isBackend = ["backend", "back-end", "back end"].some((back) =>
    lowerText.includes(back),
  );

  if (isBackend) result.title = "Backend Developer";

  const isDevOPS = ["devops", "dev ops"].some((dev) => lowerText.includes(dev));

  if (isDevOPS) {
    result.title = "DevOPS";
  }

  const isWeb3 = [
    "web3",
    "solidity",
    "evm",
    "blockchain",
    "smart contract",
  ].some((web) => lowerText.includes(web));

  if (isWeb3) {
    result.title = "Web3 developer";
  }

  if (lowerText.includes("lead") || lowerText.includes("principal")) {
    result.seniority = "lead";
  } else if (lowerText.includes("senior")) {
    result.seniority = "senior";
  } else if (lowerText.includes("mid") || lowerText.includes("middle")) {
    result.seniority = "mid";
  } else if (lowerText.includes("junior") || lowerText.includes("trainee")) {
    result.seniority = "junior";
  } else {
    result.seniority = "unknown";
  }

  const mapSkills = (list: string[], target: string[]) => {
    list.forEach((skill) => {
      if (lowerText.includes(skill)) target.push(skill);
    });
  };

  mapSkills(frontendBackground, result.skills.frontend);
  mapSkills(backendBackground, result.skills.backend);
  mapSkills(devopsBackground, result.skills.devops);
  mapSkills(web3Background, result.skills.web3);
  mapSkills(otherSkills, result.skills.other);

  const getTopSkills = (
    skills: Record<string, string[]>,
    limit: number = 3,
  ) => {
    return Object.values(skills).flat().slice(0, limit);
  };

  result.mustHave = getTopSkills(result.skills, 4);

  result.niceToHave = result.skills.other.slice(0, 3);

  const salaryCounter = () => {
    if (!result.salary) return;

    for (const [key, value] of Object.entries(currencyMap)) {
      if (lowerText.includes(key.toLowerCase())) {
        result.salary.currency = value;
        break;
      }
    }

    const numbers = text.match(/\d+/g)?.map(Number) || [];
    const potentialSalary = numbers.filter((num) => num > 200);

    if (potentialSalary.length >= 2) {
      const sorted = potentialSalary.slice(0, 2).sort((a, b) => a - b);
      result.salary.min = sorted[0];
      result.salary.max = sorted[1];
    } else if (potentialSalary.length === 1) {
      result.salary.min = potentialSalary[0];
    }
  };

  salaryCounter();

  result.summary = text.slice(0, 150) + "...";

  return result;
};
