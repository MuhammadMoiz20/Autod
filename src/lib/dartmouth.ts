import { openai } from "@inngest/agent-kit";

const DEFAULT_MODEL = "openai_responses.gpt-5-mini-2025-08-07";
const DEFAULT_BASE_URL = "https://chat.dartmouth.edu/api";

type OpenAiOptions = Parameters<typeof openai>[0];

interface DartmouthModelOptions extends Partial<OpenAiOptions> {}

const resolveApiKey = () =>
	process.env.DARTMOUTH_API_KEY ?? process.env.OPENAI_API_KEY ?? "";

const resolveBaseUrl = () =>
	process.env.DARTMOUTH_API_BASE_URL ?? DEFAULT_BASE_URL;

export const dartmouthModel = (options: DartmouthModelOptions = {}) => {
	const apiKey = options?.apiKey ?? resolveApiKey();

	if (!apiKey) {
		throw new Error(
			"Missing Dartmouth chat API key. Set DARTMOUTH_API_KEY or OPENAI_API_KEY.",
		);
	}

	return openai({
		model: DEFAULT_MODEL,
		baseUrl: resolveBaseUrl(),
		...options,
		apiKey,
	});
};

export const DARTMOUTH_DEFAULT_MODEL = DEFAULT_MODEL;
