import { faker } from "@faker-js/faker";
import { LEVEL, PrismaClient, User } from "@prisma/client";
import { degreeTypes, skills, tools } from "./constants";
import moment, { MomentInput } from "moment";
const prisma = new PrismaClient();

// function that receives an array of strings and returns a random subset from the original array of x size so it returns string[]. Don't use sort
function randomSubsetFromArray(array: string[], size: number) {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(array[Math.floor(Math.random() * array.length)]);
  }
  return result;
}

// function that receives an array of string and returns one random item
function randomItemFromArray(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

// function that returns a random boolean
function randomBoolean() {
  return Math.random() < 0.5;
}

// randomDuration function that returns a random duration like "1 year" "2 months" "3 days" "4 hours"
function randomDuration() {
  const duration = Math.floor(Math.random() * 100);
  const unit = randomItemFromArray(["years", "months", "days", "hours"]);
  return `${duration} ${unit}`;
}

// randomNumberFromTo
function randomNumberFromTo(from: number, to: number) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

// date abbreviation
function dateAbbreviation(date: MomentInput) {
  return moment(date).format("MMM YYYY");
}

async function upsertSpotlight() {
  console.log("Adding spotlight");
  try {
    const spotlight = await prisma.spotlight.findFirst();
    if (!spotlight) {
      const startsAt = new Date();
      // finshes one week from startsAt
      const finishesAt = new Date(startsAt.getTime() + 7 * 24 * 60 * 60 * 1000);
      await prisma.spotlight.create({
        data: {
          startsAt,
          finishesAt,
        },
      });
    }
  } catch (err) {
    console.log("Error adding spotlight");
  }
}

async function upsertTools() {
  for (const tool of tools) {
    console.log("Adding tool: ", tool);
    try {
      await prisma.tool.upsert({
        where: { name: tool },
        update: {},
        create: { name: tool },
      });
    } catch (err) {
      console.log("Error adding tool: ", tool);
    }
  }
}

async function upsertSkills() {
  for (const skill of skills) {
    console.log("Adding skill: ", skill);
    try {
      await prisma.skill.upsert({
        where: { name: skill },
        update: {},
        create: { name: skill },
      });
    } catch (err) {
      console.log("Error adding skill: ", skill);
    }
  }
}

async function upsertUsers(amount: number) {
  const dbSkills = (await prisma.skill.findMany()).map((item) => item.name);
  const dbTools = (await prisma.tool.findMany()).map((item) => item.name);

  const now = new Date();
  for (let i = 0; i < amount; i++) {
    console.log("Adding user: ", i);
    try {
      const jobSeeking = randomBoolean();
      const educationPastDate = faker.date.past();
      const experiencePastDate = faker.date.between({
        from: educationPastDate,
        to: now,
      });
      const experienceItemPastDate = faker.date.between({
        from: experiencePastDate,
        to: now,
      });
      const username = faker.internet.userName();
      const skillsSelected = randomSubsetFromArray(
        dbSkills,
        randomNumberFromTo(1, 3)
      ).map((item) => ({ name: item }));
      const toolsSelected = randomSubsetFromArray(
        dbTools,
        randomNumberFromTo(3, 10)
      ).map((item) => ({ name: item }));

      await prisma.user.create({
        data: {
          id: faker.string.uuid(),
          createdAt: faker.date.recent(),
          fullName: faker.person.fullName(),
          username: username,
          role: jobSeeking
            ? "Looking for new opportunities"
            : faker.person.jobTitle(),
          email: faker.internet.email(),
          avatarUrl: faker.image.avatar(),
          company: jobSeeking ? null : faker.company.name(),
          displayActiveOpenSource: randomBoolean(),
          displayEmail: randomBoolean(),
          displayGithubActivity: randomBoolean(),
          displayJobSeeking: jobSeeking ? randomBoolean() : false,
          githubUsername: username,
          linkedinUsername: username,
          jobSeeking,
          isSpotlightParticipant: jobSeeking ? randomBoolean() : false,
          leetcodeUsername: username,
          location: faker.location.street(),
          portfolioUrl: faker.internet.url(),
          startedCoding: educationPastDate,
          startedProfessionalExperience: experiencePastDate,
          summary: faker.lorem.paragraph(),
          skills: {
            connect: skillsSelected,
          },
          tools: {
            connect: toolsSelected,
          },
          career: {
            experience: [
              {
                company: faker.company.name(),
                role: faker.person.jobTitle(),
                startDate: dateAbbreviation(experienceItemPastDate),
                endDate: dateAbbreviation(
                  faker.date.between({
                    from: experienceItemPastDate,
                    to: now,
                  })
                ),
                description: faker.person.jobDescriptor(),
              },
            ],
            education: [
              {
                school: faker.company.name(),
                degree: randomItemFromArray(degreeTypes),
                fieldOfStudy: faker.company.catchPhrase(),
                startDate: dateAbbreviation(
                  faker.date.past({ refDate: educationPastDate })
                ),
                endDate: dateAbbreviation(
                  faker.date.between({
                    from: educationPastDate,
                    to: experiencePastDate,
                  })
                ),
                description: faker.lorem.paragraph(),
              },
            ],
            achievements: [
              faker.lorem.sentence(),
              faker.lorem.sentence(),
              faker.lorem.sentence(),
            ],
          },
        },
      });
    } catch (err) {
      console.log("Error adding user: ", i);
    }
  }
}

async function upsertProjects() {
  const userIds = await prisma.user.findMany({ select: { id: true } });
  const dbSkills = (await prisma.skill.findMany()).map((item) => item.name);
  const dbTools = (await prisma.tool.findMany()).map((item) => item.name);

  const now = new Date();
  for (let i = 0; i < userIds.length; i++) {
    console.log("Adding project: ", i);
    const user = userIds[i];
    const publishDate = faker.date.past();
    const createdAt = faker.date.between({ from: publishDate, to: now });
    try {
      await prisma.project.create({
        data: {
          label: faker.lorem.words(),
          level: randomItemFromArray(Object.keys(LEVEL)) as LEVEL,
          summary: faker.lorem.sentences(),
          publishDate,
          createdAt,
          timeSpent: randomDuration(),
          challengeExample: faker.lorem.paragraphs(),
          codeRepository: faker.internet.url(),
          isUsedByPeople: randomBoolean(),
          isVerified: randomBoolean(),
          problem: faker.lorem.paragraphs(),
          solution: faker.lorem.paragraphs(),
          url: faker.internet.url(),
          isPublic: randomBoolean(),
          developer: {
            connect: {
              id: user.id,
            },
          },
          skills: {
            connect: randomSubsetFromArray(
              dbSkills,
              randomNumberFromTo(1, 3)
            ).map((item) => ({ name: item })),
          },
          tools: {
            connect: randomSubsetFromArray(
              dbTools,
              randomNumberFromTo(3, 10)
            ).map((item) => ({ name: item })),
          },
        },
      });
    } catch (err) {
      console.log("Error adding project: ", i);
    }
  }
}

async function main() {
  await upsertTools();
  await upsertSkills();
  await upsertSpotlight();
  await upsertUsers(100);
  await upsertProjects();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
