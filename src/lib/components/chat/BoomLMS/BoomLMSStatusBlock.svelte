<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { marked } from 'marked';
	import { onMount, getContext, tick, createEventDispatcher } from 'svelte';
	import { blur, fade } from 'svelte/transition';
    export let lms_status_data;
    
	const dispatch = createEventDispatcher();

	import { config, user, models as _models, temporaryChatEnabled } from '$lib/stores';
    import { getLMSSession, getLMSLearningPathProgress, getLMSTrainings} from '$lib/apis/boomlms';

    let message = "<h3>Learning Path Status</h3>";

    onMount(async () => {
        
        if(lms_status_data.output != "" && lms_status_data.data.length == 0){
            // show the default output message, no data
            message = lms_status_data.output;
        }

        if(lms_status_data.data.length > 0){
            // format the message from the data into html output
            message = "<p>Default</p>";
        }

	});

</script>

<div class="flex flex-row justify-center gap-3 sm:gap-3.5 w-fit px-5">
    <div class="m-auto mt-2 w-full max-w-6xl px-2 xl:px-20 translate-y-2 text-center pt-8">
        
        <div>{@html message}</div>
    </div>
</div>