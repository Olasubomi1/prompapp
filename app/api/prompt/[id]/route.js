const { connectToDB } = require("@utils/database");
import Prompt from "@models/PromptSchema";

//Get prompt by Id
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

//Patch(update) prompt
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const patchingPrompt = await Prompt.findById(params.id);
    if (!patchingPrompt)
      return new Response("Prompt not found", { status: 404 });
    patchingPrompt.prompt = prompt;
    patchingPrompt.tag = tag;
    await patchingPrompt.save();
    return new Response(JSON.stringify(patchingPrompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to patch prompts", { status: 500 });
  }
};

//Delete
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", {
      status: 500,
    });
  }
};
