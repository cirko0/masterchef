import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ImagesResponseDataInner,
} from "openai";

interface AI {
  gpt(
    instruction: {
      role: string;
      content: string;
    }[]
  ): Promise<GPTResponse>;
  dalle(prompt: string): Promise<ImagesResponseDataInner>;
}

interface GPTResponse {
  ingredients: any;
  diet: string;
  name: string;
  author: string;
  cooking_time: number | undefined;
  steps: string[];
  userId: string | undefined;
  img_url: string | undefined;
  allergies: any;
  health_reason: any;
  health_score: any;
  prompt?: string;
  spam_score: number;
  score_reason: string;
}

interface Prompts {
  base: {
    role: string;
    content: string;
  };
  recipeContext(recipeData: string): { role: string; content: string };
  recipeObject: {
    role: string;
    content: string;
  };
  recipeIngredientsArray: {
    role: string;
    content: string;
  };
  allRecipeMetadata: {
    role: string;
    content: string;
  };
  recipeIngredients: {
    role: string;
    content: string;
  };
  recipeInsightsOnly: {
    role: string;
    content: string;
  };
  recipeSpamCheck: {
    role: string;
    content: string;
  };
}

export { Prompts, AI, GPTResponse };
