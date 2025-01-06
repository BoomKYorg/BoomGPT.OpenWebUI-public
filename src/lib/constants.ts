import { browser, dev } from '$app/environment';
// import { version } from '../../package.json';

export const APP_NAME = 'Open WebUI';

export const WEBUI_HOSTNAME = browser ? (dev ? `${location.hostname}:8080` : ``) : '';
export const WEBUI_BASE_URL = browser ? (dev ? `http://${WEBUI_HOSTNAME}` : ``) : ``;
export const WEBUI_API_BASE_URL = `${WEBUI_BASE_URL}/api/v1`;

export const OLLAMA_API_BASE_URL = `${WEBUI_BASE_URL}/ollama`;
export const OPENAI_API_BASE_URL = `${WEBUI_BASE_URL}/openai`;
export const AUDIO_API_BASE_URL = `${WEBUI_BASE_URL}/audio/api/v1`;
export const IMAGES_API_BASE_URL = `${WEBUI_BASE_URL}/images/api/v1`;
export const RETRIEVAL_API_BASE_URL = `${WEBUI_BASE_URL}/retrieval/api/v1`;

export const WEBUI_VERSION = APP_VERSION;
export const WEBUI_BUILD_HASH = APP_BUILD_HASH;
export const REQUIRED_OLLAMA_VERSION = '0.1.16';

export const SUPPORTED_FILE_TYPE = [
	'application/epub+zip',
	'application/pdf',
	'text/plain',
	'text/csv',
	'text/xml',
	'text/html',
	'text/x-python',
	'text/css',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/octet-stream',
	'application/x-javascript',
	'text/markdown',
	'audio/mpeg',
	'audio/wav',
	'audio/ogg',
	'audio/x-m4a'
];

export const SUPPORTED_FILE_EXTENSIONS = [
	'md',
	'rst',
	'go',
	'py',
	'java',
	'sh',
	'bat',
	'ps1',
	'cmd',
	'js',
	'ts',
	'css',
	'cpp',
	'hpp',
	'h',
	'c',
	'cs',
	'htm',
	'html',
	'sql',
	'log',
	'ini',
	'pl',
	'pm',
	'r',
	'dart',
	'dockerfile',
	'env',
	'php',
	'hs',
	'hsc',
	'lua',
	'nginxconf',
	'conf',
	'm',
	'mm',
	'plsql',
	'perl',
	'rb',
	'rs',
	'db2',
	'scala',
	'bash',
	'swift',
	'vue',
	'svelte',
	'doc',
	'docx',
	'pdf',
	'csv',
	'txt',
	'xls',
	'xlsx',
	'pptx',
	'ppt',
	'msg'
];

export const PASTED_TEXT_CHARACTER_LIMIT = 1000;

// Source: https://kit.svelte.dev/docs/modules#$env-static-public
// This feature, akin to $env/static/private, exclusively incorporates environment variables
// that are prefixed with config.kit.env.publicPrefix (usually set to PUBLIC_).
// Consequently, these variables can be securely exposed to client-side code.

export const LMS_BASE_URL = 'https://boomgpt-opignolms.lndo.site'
export const LMS_API_BASE_PATH = '/';
export const CLIENT_ID = `vPpc1TA-m_kUXXXTL_rsRlsf-FSnKKI9ryOw7MYZm4Y`;
export const CLIENT_UUID = `vPpc1TA-m_kUXXXTL_rsRlsf-FSnKKI9ryOw7MYZm4Y`;
export const CLIENT_SECRET = `boomboomboom`;
export const BEARER_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ4MWM1MWE3MmJhZWVhMzExOWVlMDE0YzNlODhmZDZhMzkwNWFiNDU1NjBjNTg5ZGQ1MzdjOTcwYTFkZDc5NDhlZmNhNDE5MjEzMjFmMGI2In0.eyJhdWQiOiJ2UHBjMVRBLW1fa1VYWFhUTF9yc1Jsc2YtRlNuS0tJOXJ5T3c3TVlabTRZIiwianRpIjoiNDgxYzUxYTcyYmFlZWEzMTE5ZWUwMTRjM2U4OGZkNmEzOTA1YWI0NTU2MGM1ODlkZDUzN2M5NzBhMWRkNzk0OGVmY2E0MTkyMTMyMWYwYjYiLCJpYXQiOjE3MzYxMzQ1MjEsIm5iZiI6MTczNjEzNDUyMSwiZXhwIjoxNzY3NjcwNTIxLjI3MzM3Mywic3ViIjoiMiIsInNjb3BlIjpbImF1dGhlbnRpY2F0ZWQiLCJsZWFybmVyIl19.WqtOUFAdt7CH3p5S0sJzS-zLZMelVhJif_xxl-oi1U0A_ov0ogLIDcmyKcvECxszkiGi2DcZ9YxY2Pf7VUMScSR7DnElCZ9erYRceEqUEd5hgsVJCMmMkC1sYzW17ISuaUfeHnkqIJnKxCqGY1lvubPSMm_ezQ9FxAiB5VMzxdbqP2Nbiees3TYPTqVoOS0l03XZMIrWaxgZTQbnw2apMtQAP_ZZYAWWQKoqg5qbH8ztW_BeL1GcTf5pqPT6ALt2Q1kvssKybbYICQHsIdpIL21FFTs8V_QzFSgbmNxwTYVfg278PfUCWi769QwOYUAl6lShsdriQY54g-wd7sRW7zEBEsvVcnC9njyvh_Oj1dZ3g-TgnEYmZloLFJxzj5fcGnWq6xv0AIFLDgR4Ixy8fGGCPH4NYk3-DHQdPKkqKFxVMuQeJS7SOQj4otiZb0QsJP_A-8yK0cJaZvN6SKZTAXt4pEVwklVAd1LGMgfp2Fe2sR-kaJMiXA_LHXlrrnrtNG5QmrYq59hM_4t9bYh77lw8nzxFqHuv34GPTjE1WOMhRNkbDQfGW3AiLWlGSK8RFvAOp8cZQfMJOk_-AcNovc5RzTfbfm6BGRvCCT_2_z0QO8FgukStAErCMUnrqMRrtotSk1tp1h-OU138H8MFgfYWjx0DjjRF0RUiqo219JQ';
export const DEFAULT_GROUP_ID = 4;