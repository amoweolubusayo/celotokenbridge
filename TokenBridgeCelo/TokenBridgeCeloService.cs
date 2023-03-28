using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts.ContractHandlers;
using Nethereum.Contracts;
using System.Threading;
using Celotokenbridge.Contracts.TokenBridgeCelo.ContractDefinition;

namespace Celotokenbridge.Contracts.TokenBridgeCelo
{
    public partial class TokenBridgeCeloService
    {
        public static Task<TransactionReceipt> DeployContractAndWaitForReceiptAsync(Nethereum.Web3.Web3 web3, TokenBridgeCeloDeployment tokenBridgeCeloDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            return web3.Eth.GetContractDeploymentHandler<TokenBridgeCeloDeployment>().SendRequestAndWaitForReceiptAsync(tokenBridgeCeloDeployment, cancellationTokenSource);
        }

        public static Task<string> DeployContractAsync(Nethereum.Web3.Web3 web3, TokenBridgeCeloDeployment tokenBridgeCeloDeployment)
        {
            return web3.Eth.GetContractDeploymentHandler<TokenBridgeCeloDeployment>().SendRequestAsync(tokenBridgeCeloDeployment);
        }

        public static async Task<TokenBridgeCeloService> DeployContractAndGetServiceAsync(Nethereum.Web3.Web3 web3, TokenBridgeCeloDeployment tokenBridgeCeloDeployment, CancellationTokenSource cancellationTokenSource = null)
        {
            var receipt = await DeployContractAndWaitForReceiptAsync(web3, tokenBridgeCeloDeployment, cancellationTokenSource);
            return new TokenBridgeCeloService(web3, receipt.ContractAddress);
        }

        protected Nethereum.Web3.Web3 Web3{ get; }

        public ContractHandler ContractHandler { get; }

        public TokenBridgeCeloService(Nethereum.Web3.Web3 web3, string contractAddress)
        {
            Web3 = web3;
            ContractHandler = web3.Eth.GetContractHandler(contractAddress);
        }

        public Task<BigInteger> GetBalanceQueryAsync(GetBalanceFunction getBalanceFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetBalanceFunction, BigInteger>(getBalanceFunction, blockParameter);
        }

        
        public Task<BigInteger> GetBalanceQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<GetBalanceFunction, BigInteger>(null, blockParameter);
        }

        public Task<string> SendTokenRequestAsync(SendTokenFunction sendTokenFunction)
        {
             return ContractHandler.SendRequestAsync(sendTokenFunction);
        }

        public Task<TransactionReceipt> SendTokenRequestAndWaitForReceiptAsync(SendTokenFunction sendTokenFunction, CancellationTokenSource cancellationToken = null)
        {
             return ContractHandler.SendRequestAndWaitForReceiptAsync(sendTokenFunction, cancellationToken);
        }

        public Task<string> SendTokenRequestAsync(string recipient, BigInteger amount)
        {
            var sendTokenFunction = new SendTokenFunction();
                sendTokenFunction.Recipient = recipient;
                sendTokenFunction.Amount = amount;
            
             return ContractHandler.SendRequestAsync(sendTokenFunction);
        }

        public Task<TransactionReceipt> SendTokenRequestAndWaitForReceiptAsync(string recipient, BigInteger amount, CancellationTokenSource cancellationToken = null)
        {
            var sendTokenFunction = new SendTokenFunction();
                sendTokenFunction.Recipient = recipient;
                sendTokenFunction.Amount = amount;
            
             return ContractHandler.SendRequestAndWaitForReceiptAsync(sendTokenFunction, cancellationToken);
        }

        public Task<string> TokenAddressQueryAsync(TokenAddressFunction tokenAddressFunction, BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TokenAddressFunction, string>(tokenAddressFunction, blockParameter);
        }

        
        public Task<string> TokenAddressQueryAsync(BlockParameter blockParameter = null)
        {
            return ContractHandler.QueryAsync<TokenAddressFunction, string>(null, blockParameter);
        }
    }
}
