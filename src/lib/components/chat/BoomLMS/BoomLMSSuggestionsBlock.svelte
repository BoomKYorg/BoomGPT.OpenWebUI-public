<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { marked } from 'marked';

	import Suggestions from '$lib/components/chat/Suggestions.svelte';

	import { onMount, getContext, tick, createEventDispatcher } from 'svelte';
	import { blur, fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	import { config, user, models as _models, temporaryChatEnabled } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

    export let prompt = '';

    let suggestionPrompts: Array<Object> = [];

    const selectSuggestionPrompt = async (p: string) => {
        let text = p;

        if (p.includes('{{CLIPBOARD}}')) {
            const clipboardText = await navigator.clipboard.readText().catch((err) => {
                toast.error('Failed to read clipboard contents');
                return '{{CLIPBOARD}}';
            });

            text = p.replaceAll('{{CLIPBOARD}}', clipboardText);
        }

        prompt = text;

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

    export let lms_suggestions_data;

    let message = "<h2>Suggestions</h2>";

    onMount(async () => {
	});

</script>

<div class="m-auto mt-2 w-full max-w-6xl px-2 xl:px-20 translate-y-2 text-center pt-8">
    <!--
        display the dashboard
    -->
        {@html message}
</div>

<div class="mx-auto max-w-2xl font-primary" in:fade={{ duration: 200, delay: 200 }}>
    <div class="mx-5">
        
        <Suggestions
            suggestionPrompts={suggestionPrompts ??
                []}
            on:select={(e) => {
                selectSuggestionPrompt(e.detail);
            }}
        />
    </div>
</div>