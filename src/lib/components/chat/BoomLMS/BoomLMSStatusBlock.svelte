<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { marked } from 'marked';

	import Suggestions from '$lib/components/chat/Suggestions.svelte';

	import { onMount, getContext, tick, createEventDispatcher } from 'svelte';
	import { blur, fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	import { config, user, models as _models, temporaryChatEnabled } from '$lib/stores';
    import { getSessionUser } from '$lib/apis/auths';
    import { getLMSSession, getLMSTrainings } from '$lib/apis/boomlms';
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

    onMount(async () => {
        if (localStorage.token) {
            // Get Session User Info
            const sessionUser = await getSessionUser(localStorage.token).catch((error) => {
                return null;
            });

            if (sessionUser) {
                // get user info to pass to drupal auth
                console.log(sessionUser);
                const user = sessionUser["email"];
                const pass = "changeme";
                const localLMS = localStorage.getItem("lmsAuthToken");
                let lmsAuthToken = "";
                if(!localLMS){
                    lmsAuthToken = await getLMSSession(user, pass).catch((error) => {
                        return null;
                    });
                }
                lmsAuthToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImExODNlZTk0MThmZWYzMWNhZjVhYzA3YWEwZGU2MDM5ZmY2ZjE1ZmIyMmNiZTkwYjI2YWZhMGE5NjM0YjRjNGIxMDczODAwYzk3NGE2NWM4In0.eyJhdWQiOiJ2UHBjMVRBLW1fa1VYWFhUTF9yc1Jsc2YtRlNuS0tJOXJ5T3c3TVlabTRZIiwianRpIjoiYTE4M2VlOTQxOGZlZjMxY2FmNWFjMDdhYTBkZTYwMzlmZjZmMTVmYjIyY2JlOTBiMjZhZmEwYTk2MzRiNGM0YjEwNzM4MDBjOTc0YTY1YzgiLCJpYXQiOjE3MzQwNjE1NzYsIm5iZiI6MTczNDA2MTU3NiwiZXhwIjoxNzM0MDYxODc2LjI5MzY3Niwic3ViIjoiMiIsInNjb3BlIjpbImF1dGhlbnRpY2F0ZWQiXX0.Jg4if5MEv8Y_HS1jBrqlDlibaTvdJuOqW6NZkh7ZDE17KZmNUxYDkCXCs-hF--mtR00Iov30of-W_xuTxWbQaTJW7O69fkmYaNnXv7f19V4fhLIi-Nmqngi4fgBzhBn5TnLpTd0GndbUyPoRhuYnH3QVbeea6i0yh5FXXTgnDWzI1LA04gxoZtNTcp8CVAxKtOB4zHhzSlb99YtQtU0HGSqdieh_CdA5TtLfDxmTCqjiZt_yZhONucJflM-98QAiK_JmLET5lTsv1yivxjqjnI8eAXKMV_NSWIDQSCgZ_cdCBsq1I6xrHE7mrj5GAs2iyXCFC9n4wsA_yTIvy9OtdcRzxeAKJ-DobykgXJ6sroEC8Ca1eH4Q7J2xMIemN4tvydEQeSi42Hm_u4Q65wAA6mD7KN_ja6UImsX1qa4PDD0Ae2MrZQcM_AuPQks7SZqZAwqz3sPirDQ1tq3o9dYaJQQKP85CQOuL-BTZXc8HePFk1-n4YXspYvo8tqXWGUvy1qvodj8WQEfTHUPIQ1VIr1ub-9gU3uD8IHzU_va066HaiEtkxPDcGZfLMQP-fwY8Db-jcO-BQtpapT9tCbxS6D4osLokxgwpSPnKolfCrOjFArB9AQKInaBCpJd83QRdiVMMn0DGvVh_TQ9ixs0E-QbHcn7pL1YqzG9xykzpeyk";
                
                if(lmsAuthToken){
                    //console.log(lmsAuthToken);
                    // we have a drupal session, 
                    // get dashboard items to render
                    // get current current Trainings, current module, last task, current task, next task
                    const currentTrainings = await getLMSTrainings(lmsAuthToken).catch((error) => {
                        return null;
                    });
                    console.log(currentTrainings);
                    // display module and task prompt suggestions
					// Save Session User to Store
					
                }
            }           
        }
	});
</script>

<div class="m-auto mt-2 w-full max-w-6xl px-2 xl:px-20 translate-y-2 text-center pt-8">
    <!--
        display the dashboard
    --><h3>Dashboard</h3>
    
</div>

<div class="mx-auto max-w-2xl font-primary" in:fade={{ duration: 200, delay: 200 }}>
    <div class="mx-5">
        <!-- <Suggestions
            suggestionPrompts={suggestion_prompts ??
                $config?.default_prompt_suggestions ??
                []}
            on:select={(e) => {
                selectSuggestionPrompt(e.detail);
            }}
        /> -->
        <Suggestions
				suggestionPrompts={suggestionPrompts ??
					[]}
				on:select={(e) => {
					selectSuggestionPrompt(e.detail);
				}}
			/>
    </div>
</div>