<script>
    import { handleConnectWallet, connected, walletAddress } from '../web3store';

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={handleConnectWallet}>
    {#if $connected}
        {$walletAddress}
    {:else}
        Connect Wallet
    {/if}
</button>
