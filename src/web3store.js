import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { watchAccount, watchNetwork, disconnect, switchNetwork, getPublicClient, getWalletClient } from '@wagmi/core'
import { getContract } from 'viem';
import { mainnet } from 'viem/chains'
import { get, writable } from "svelte/store";

/******* ETHERS STORES (GLOBALLY ACCESSIBLE) ******/

// Wallet connection status (true/false)
export const connected = writable(undefined);
// Current wallet address
export const walletAddress = writable(undefined);
// Current public client
export const publicClient = writable(undefined);
// Current wallet client
export const walletClient = writable(undefined);
// Current network ID
export const networkID = writable(undefined);

// 1. Define constants
const projectId = '26c55b957ac0a0c597c25ac0614797f4'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
const web3modal = createWeb3Modal({ wagmiConfig, projectId, chains })

watchAccount(async (account) => {
    if (account?.isConnected) {
      connected.set(account.isConnected);
      const _publicClient = getPublicClient({chainId: mainnet.id})
      publicClient.set(_publicClient);
      const _walletClient = await getWalletClient({chainId: mainnet.id});
      walletClient.set(_walletClient);
      walletAddress.set(account.address);
    }
    else {
      connected.set(false);
      await disconnect();
    }
});
  
watchNetwork(async (network) => {
    networkID.set(network?.chain?.id);
    const _publicClient = getPublicClient({chainId: mainnet.id})
    publicClient.set(_publicClient);
    const _walletClient = await getWalletClient({chainId: mainnet.id});
    walletClient.set(_walletClient);
});
  
export const handleConnectWallet = async () => {
    web3modal.open();
};
  
export const handleSwitchNetwork = async (network) => {
    await switchNetwork({ chainId: network });
};