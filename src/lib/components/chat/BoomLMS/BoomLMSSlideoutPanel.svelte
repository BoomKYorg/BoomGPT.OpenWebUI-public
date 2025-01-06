<script>
    import { onMount } from 'svelte';
    import { LMS_BASE_URL, BEARER_TOKEN, DEFAULT_GROUP_ID,  } from '$lib/constants';

    let isSlideoutOpen = false;
    let iframeSrc = '';
    let bearerToken = BEARER_TOKEN;
    let current_module = 1;
    let current_activity = 1;
    let current_answer = 1;
                
    /**
       * @param {string} href
       */
    function handleLinkClick(href) {
      iframeSrc = href;
      isSlideoutOpen = true;
    }
  
    function closeSlideout() {
      isSlideoutOpen = false;
      iframeSrc = '';
    }

    export let lms_user_data;

    let message = "<p>Slideout</p>";

    onMount(async () => {
        
        if(lms_user_data.output != "" && lms_user_data.data.length == 0){
            // show the default output message, no data
            message = lms_user_data.output;
        }

        if(lms_user_data.data.length > 0){
            // format the message from the data into html output
            message = "<p>Slideout</p>";
        }

	});

  </script>
  
  <style>
    .slideout-panel {
      position: fixed;
      top: 20%;
      right: -130%;
      width: 50%;
      height: 100%;
      background: #fff;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
      transition: right 0.3s ease;
      z-index: 1000;
    }
  
    .slideout-panel.open {
      right: 10%;
      width: 90%;
    }
  
    .slideout-header {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
  
    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }
  
    .slideout-content {
      height: calc(100% - 40px);
      overflow-y: auto;
    }
  
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
  
  <div>
    <!-- <a
      href="#"
      on:click|preventDefault={() => handleLinkClick(`${LMS_BASE_URL}/group/${DEFAULT_GROUP_ID}/module/${current_module}/answer/${current_answer}`)}
    >
      {@html message}
    </a> -->

    <a
      href="#"
      on:click|preventDefault={() => handleLinkClick(`${LMS_BASE_URL}/node`)}
    >
      {@html message}
    </a>
  
    <div class="slideout-panel {isSlideoutOpen ? 'open' : ''}">
      <div class="slideout-header">
        <button class="close-btn" on:click={closeSlideout}>&times;</button>
      </div>
      <div class="slideout-content">
        {#if iframeSrc}
        <iframe
            class="p-5"
            src={`${iframeSrc}?access_token=${encodeURIComponent(bearerToken)}`} 
            title="BoomLMS" 
            on:load={() => console.log('Iframe loaded')} 
            sandbox="allow-same-origin allow-scripts allow-forms"
            allowfullscreen
            >
        </iframe>
        {/if}
      </div>
    </div>
  </div>
  
  