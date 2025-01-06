<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { marked } from 'marked';
	import { LMS_BASE_URL, BEARER_TOKEN, DEFAULT_GROUP_ID,  } from '$lib/constants';

	import { onMount, getContext, tick, createEventDispatcher } from 'svelte';
	import { blur, fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	import { config, user, models as _models, temporaryChatEnabled } from '$lib/stores';
	import { sanitizeResponseContent, findWordIndices } from '$lib/utils';
	import { WEBUI_BASE_URL } from '$lib/constants';

	import Suggestions from './Suggestions.svelte';
	import Tooltip from '$lib/components/common/Tooltip.svelte';
	import EyeSlash from '$lib/components/icons/EyeSlash.svelte';
	import MessageInput from './MessageInput.svelte';
	import BoomLMSStatusBlock from './BoomLMS/BoomLMSStatusBlock.svelte';
	import BoomLMSSlideoutPanel from './BoomLMS/BoomLMSSlideoutPanel.svelte';
	import BoomLMSSuggestionsBlock from './BoomLMS/BoomLMSSuggestionsBlock.svelte';

	import { getLMSSession, getLMSLearningPathProgress, getLMSTrainings} from '$lib/apis/boomlms';
	import { getSessionUser } from '$lib/apis/auths';

	const i18n = getContext('i18n');

	export let transparentBackground = false;

	export let createMessagePair: Function;
	export let stopResponse: Function;

	export let autoScroll = false;

	export let atSelectedModel: Model | undefined;
	export let selectedModels: [''];

	export let history;

	export let prompt = '';
	export let files = [];

	export let selectedToolIds = [];
	export let webSearchEnabled = false;

	let lms_status_data = {
		data: [],
		output: ""
	};
	let lms_user_data = {
		data: [],
		output: ""
	};
	let lms_suggestions_data = {
		data: [],
		output: ""
	};

	let models = [];

	const selectSuggestionPrompt = async (p) => {
		let text = p;

		if (p.includes('{{CLIPBOARD}}')) {
			const clipboardText = await navigator.clipboard.readText().catch((err) => {
				toast.error($i18n.t('Failed to read clipboard contents'));
				return '{{CLIPBOARD}}';
			});

			text = p.replaceAll('{{CLIPBOARD}}', clipboardText);

			console.log('Clipboard text:', clipboardText, text);
		}

		prompt = text;

		console.log(prompt);
		await tick();

		const chatInputContainerElement = document.getElementById('chat-input-container');
		const chatInputElement = document.getElementById('chat-input');

		if (chatInputContainerElement) {
			chatInputContainerElement.style.height = '';
			chatInputContainerElement.style.height =
				Math.min(chatInputContainerElement.scrollHeight, 200) + 'px';
		}

		await tick();
		if (chatInputElement) {
			chatInputElement.focus();
			chatInputElement.dispatchEvent(new Event('input'));
		}

		await tick();
	};

	let selectedModelIdx = 0;

	$: if (selectedModels.length > 0) {
		selectedModelIdx = models.length - 1;
	}

	$: models = selectedModels.map((id) => $_models.find((m) => m.id === id));

	onMount(async () => {
		let lms_token = localStorage.getItem("lmsAuthToken");
		let gpt_token = localStorage.getItem("token");

		if(lms_token && gpt_token){

			try {
				const trainings = await getLMSTrainings(lms_token);
				console.log("User Trainings:", trainings);
			} catch (error) {
				console.error("Error fetching User Trainings:", error.message);
			}

			try {
				const lp = await getLMSLearningPathProgress(lms_token, 4);
				console.log("Learning Path:", lp);
				lms_user_data.data = lp;
			} catch (error) {
				console.error("Error fetching Learning Path:", error.message);
			} 

        } else {
			// show login message
			lms_user_data.output = `<p><a href="${LMS_BASE_URL}/group/${DEFAULT_GROUP_ID}">Please login and authenticate your credentials</a></p>`;
		}
	});
</script>

<div class="m-auto mt-2 w-full max-w-6xl px-2 xl:px-20 translate-y-2 py-24 text-center pt-8">
	{#if $temporaryChatEnabled}
		<Tooltip
			content="This chat won't appear in history and your messages will not be saved."
			className="w-full flex justify-center mb-0.5"
			placement="top"
		>
			<div class="flex items-center gap-2 text-gray-500 font-medium text-lg my-2 w-fit">
				<EyeSlash strokeWidth="2.5" className="size-5" /> Temporary Chat
			</div>
		</Tooltip>
	{/if}

	<div
		class="w-full text-3xl text-gray-800 dark:text-gray-100 font-medium text-center flex items-center gap-4 font-primary"
	>
		<div class="w-full flex flex-col justify-center items-center">
			<div class="flex flex-row justify-center gap-3 sm:gap-3.5 w-fit px-5" style="align-items:center">
				<div class="flex flex-shrink-0 justify-center">
					<div class=" self-center mr-3">
						<img src="/boom-ky-homepage.png" width="80" height="80" alt="logo" />
					</div>
				</div>

				<div class=" text-3xl sm:text-4xl line-clamp-1 items-center" in:fade={{ duration: 100 }}>
					
					{$i18n.t('Hello, {{name}}', { name: $user.name })}

				</div>

			</div>

			<BoomLMSStatusBlock
				{lms_status_data}>
			</BoomLMSStatusBlock>

			<BoomLMSSlideoutPanel
				{lms_user_data}>
			</BoomLMSSlideoutPanel>

			<div class="flex mt-1 mb-2">
				<div in:fade={{ duration: 100, delay: 50 }}>
					{#if models[selectedModelIdx]?.info?.meta?.description ?? null}
						<Tooltip
							className=" w-fit"
							content={marked.parse(
								sanitizeResponseContent(models[selectedModelIdx]?.info?.meta?.description ?? '')
							)}
							placement="top"
						>
							<div
								class="mt-0.5 px-2 text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2 max-w-xl markdown"
							>
								{@html marked.parse(
									sanitizeResponseContent(models[selectedModelIdx]?.info?.meta?.description)
								)}
							</div>
						</Tooltip>

						{#if models[selectedModelIdx]?.info?.meta?.user}
							<div class="mt-0.5 text-sm font-normal text-gray-400 dark:text-gray-500">
								By
								{#if models[selectedModelIdx]?.info?.meta?.user.community}
									<a
										href="https://openwebui.com/m/{models[selectedModelIdx]?.info?.meta?.user
											.username}"
										>{models[selectedModelIdx]?.info?.meta?.user.name
											? models[selectedModelIdx]?.info?.meta?.user.name
											: `@${models[selectedModelIdx]?.info?.meta?.user.username}`}</a
									>
								{:else}
									{models[selectedModelIdx]?.info?.meta?.user.name}
								{/if}
							</div>
						{/if}
					{/if}
				</div>
			</div>

			<div
				class="text-base font-normal xl:translate-x-6 md:max-w-3xl w-full py-3 {atSelectedModel
					? 'mt-2'
					: ''}"
			>
				<MessageInput
					{history}
					{selectedModels}
					bind:files
					bind:prompt
					bind:autoScroll
					bind:selectedToolIds
					bind:webSearchEnabled
					bind:atSelectedModel
					{transparentBackground}
					{stopResponse}
					{createMessagePair}
					placeholder={$i18n.t('Want to get started on your current assignment?')}
					on:upload={(e) => {
						dispatch('upload', e.detail);
					}}
					on:submit={(e) => {
						dispatch('submit', e.detail);
					}}
				/>
			</div>
		</div>
	</div>
	<div class="mx-auto max-w-2xl font-primary" in:fade={{ duration: 200, delay: 200 }}>
		<div class="mx-5">
			<!-- <Suggestions
				suggestionPrompts={models[selectedModelIdx]?.info?.meta?.suggestion_prompts ??
					$config?.default_prompt_suggestions ??
					[]}
				on:select={(e) => {
					selectSuggestionPrompt(e.detail);
				}}
			/> -->
			<BoomLMSSuggestionsBlock
				{lms_suggestions_data}>
			</BoomLMSSuggestionsBlock>
		</div>
	</div>
</div>
