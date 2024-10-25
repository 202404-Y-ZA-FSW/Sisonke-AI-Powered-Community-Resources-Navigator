// REQUIRED PACKAGES & MODULES
const { GoogleGenerativeAI } = require("@google/generative-ai");
const mongoose = require("mongoose");

// GEMINI API KEY
const genAI = new GoogleGenerativeAI("AIzaSyC9v1_1GY_ldbxS_ic1Ymnp5FHSFPJ8VnA");

// GET GENERATIVE MODEL
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// IMPORTING DATA MODELS
const BlogModel = mongoose.model("BlogModel");
const Forum = mongoose.model("Forum");
const Event = mongoose.model("Event");
const JobListings = mongoose.model("JobListings");
const BusinessListing = mongoose.model("BusinessListing");

// FUNCTIONS FOR GEMINI TO CALL
const Functions = [
  {
    name: "get_blogs",
    description: "Get information about blog posts",
    parameters: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of blog posts to retrieve (default: 5, max: 20)",
        },
      },
    },
  },
  {
    name: "get_forum_topics",
    description: "Get information about available forums",
    parameters: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "Optional keyword to filter forum topics",
        },
      },
    },
  },
  {
    name: "get_events",
    description: "Get information about upcoming events",
    parameters: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "Optional date to retrieve events for (YYYY-MM-DD)",
        },
      },
    },
  },
  {
    name: "get_jobs",
    description: "Get information about job listings",
    parameters: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "Optional keyword to search for in job listings",
        },
      },
    },
  },
  {
    name: "get_business_listings",
    description: "Get information about business listings",
    parameters: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description: "Optional category of businesses to retrieve",
        },
      },
    },
  },
];

// IMPLEMENTING THE FUNCTIONS
async function get_blogs({ limit = 5 }) {
  try {
    return await BlogModel.find()
      .sort({ createdAt: -1 })
      .limit(Math.max(1, Math.min(20, limit)))
      .lean();
  } catch (error) {
    console.error("Error in get_blogs:", error);
    throw new Error("Failed to retrieve blogs");
  }
}

async function get_forum_topics({ keyword = "" }) {
  try {
    const query = keyword ? { title: { $regex: keyword, $options: "i" } } : {};
    return await Forum.find(query).sort({ createdAt: -1 }).limit(5).lean();
  } catch (error) {
    console.error("Error in get_forum_topics:", error);
    throw new Error("Failed to retrieve forum topics");
  }
}

async function get_events({ date = "" }) {
  try {
    const query = date
      ? { date: new Date(date) }
      : { date: { $gte: new Date() } };
    return await Event.find(query).sort({ date: 1 }).limit(5).lean();
  } catch (error) {
    console.error("Error in get_events:", error);
    throw new Error("Failed to retrieve events");
  }
}

async function get_jobs({ keyword = "" }) {
  try {
    const query = keyword ? { title: { $regex: keyword, $options: "i" } } : {};
    return await JobListings.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
  } catch (error) {
    console.error("Error in get_jobs:", error);
    throw new Error("Failed to retrieve jobs");
  }
}

async function get_business_listings({ category = "" }) {
  try {
    const query = category ? { category } : {};
    return await BusinessListing.find(query)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
  } catch (error) {
    console.error("Error in get_business_listings:", error);
    throw new Error("Failed to retrieve business listings");
  }
}

exports.sisonkeAI = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: message }] }],
      tools: [{ functionDeclarations: Functions }],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    let response = result.response.text();
    const functionCalls =
      result.response.candidates[0]?.content?.parts?.filter(
        (part) => part.functionCall
      ) || [];

    // PROCESSING FUNCTION CALLS
    for (const part of functionCalls) {
      const { name, args } = part.functionCall;
      let functionResult;

      try {
        switch (name) {
          case "get_blogs":
            functionResult = await get_blogs(args);
            break;
          case "get_forum_topics":
            functionResult = await get_forum_topics(args);
            break;
          case "get_events":
            functionResult = await get_events(args);
            break;
          case "get_jobs":
            functionResult = await get_jobs(args);
            break;
          case "get_business_listings":
            functionResult = await get_business_listings(args);
            break;
          default:
            throw new Error(`Unknown function: ${name}`);
        }

        // SENDING FUNCTION RESPONSES TO GEMINI
        const functionResponse = await model.generateContent({
          contents: [
            { role: "user", parts: [{ text: message }] },
            { role: "model", parts: [{ text: response }] },
            {
              role: "model",
              parts: [
                {
                  text: `Function ${name} returned: ${JSON.stringify(
                    functionResult
                  )}`,
                },
              ],
            },
          ],
          tools: [{ functionDeclarations: Functions }],
        });
        response += functionResponse.response.text();
      } catch (error) {
        console.error(`Error in function ${name}:`, error);
        response += `Error occurred while processing ${name}: ${error.message}`;
      }
    }

    res.status(200).json({ response });
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while processing your request.");
  }
}
