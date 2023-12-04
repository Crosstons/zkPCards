const provider = window.ethereum;

export const onConnectZk = async (connected) => {
    const _chainId = await provider.request({ method : "eth_chainId"});
    if (_chainId.toString() !== "0x5a2" ){
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5a2' }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x5a2',
                  chainName: 'Polygon zkEVM Testnet',
                  rpcUrls: ['https://rpc.public.zkevm-test.net']
                },
              ],
            });
          } catch (addError) {
            console.log(addError)
          }
        }
      }
    }
    if(!connected) {
      const res = await provider.request({method:'eth_requestAccounts'})
      if(res){
          return ({res : res[0], conn : true});
      }
      else {
        return ({res : "", conn : false});
      }
    }
  }

  export const onConnectSep = async (connected) => {
    const _chainId = await provider.request({ method : "eth_chainId"});
    if (_chainId.toString() !== "0xaa36a7" ){
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xaa36a7' }],
        });
      } catch (switchError) {
        console.log(switchError);
      }
    }
    if(!connected) {
      const res = await provider.request({method:'eth_requestAccounts'})
      if(res){
          return ({res : res[0], conn : true});
      }
      else {
        return ({res : "", conn : false});
      }
    }
  }