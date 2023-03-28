using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Numerics;
using Nethereum.Hex.HexTypes;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Web3;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Contracts.CQS;
using Nethereum.Contracts;
using System.Threading;

namespace Celotokenbridge.Contracts.TokenBridgeCelo.ContractDefinition
{


    public partial class TokenBridgeCeloDeployment : TokenBridgeCeloDeploymentBase
    {
        public TokenBridgeCeloDeployment() : base(BYTECODE) { }
        public TokenBridgeCeloDeployment(string byteCode) : base(byteCode) { }
    }

    public class TokenBridgeCeloDeploymentBase : ContractDeploymentMessage
    {
        public static string BYTECODE = "608060405234801561001057600080fd5b5060405161033038038061033083398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61029d806100936000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312065fe014610046578063412664ae146100615780639d76ea5814610076575b600080fd5b61004e6100a1565b6040519081526020015b60405180910390f35b61007461006f3660046101ed565b610113565b005b600054610089906001600160a01b031681565b6040516001600160a01b039091168152602001610058565b600080546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa1580156100ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061010e9190610225565b905090565b3330146101715760405162461bcd60e51b815260206004820152602260248201527f4f6e6c79206272696467652063616e2063616c6c20746869732066756e63746960448201526137b760f11b606482015260840160405180910390fd5b60005460405163a9059cbb60e01b81526001600160a01b038481166004830152602482018490529091169063a9059cbb906044016020604051808303816000875af11580156101c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e8919061023e565b505050565b6000806040838503121561020057600080fd5b82356001600160a01b038116811461021757600080fd5b946020939093013593505050565b60006020828403121561023757600080fd5b5051919050565b60006020828403121561025057600080fd5b8151801515811461026057600080fd5b939250505056fea264697066735822122040eaaf7af6bb3d9fdb7a8f42b25b50b1700d51d0becbb5876308742c35784cf164736f6c63430008130033";
        public TokenBridgeCeloDeploymentBase() : base(BYTECODE) { }
        public TokenBridgeCeloDeploymentBase(string byteCode) : base(byteCode) { }
        [Parameter("address", "_tokenAddress", 1)]
        public virtual string TokenAddress { get; set; }
    }

    public partial class GetBalanceFunction : GetBalanceFunctionBase { }

    [Function("getBalance", "uint256")]
    public class GetBalanceFunctionBase : FunctionMessage
    {

    }

    public partial class SendTokenFunction : SendTokenFunctionBase { }

    [Function("sendToken")]
    public class SendTokenFunctionBase : FunctionMessage
    {
        [Parameter("address", "recipient", 1)]
        public virtual string Recipient { get; set; }
        [Parameter("uint256", "amount", 2)]
        public virtual BigInteger Amount { get; set; }
    }

    public partial class TokenAddressFunction : TokenAddressFunctionBase { }

    [Function("tokenAddress", "address")]
    public class TokenAddressFunctionBase : FunctionMessage
    {

    }

    public partial class GetBalanceOutputDTO : GetBalanceOutputDTOBase { }

    [FunctionOutput]
    public class GetBalanceOutputDTOBase : IFunctionOutputDTO 
    {
        [Parameter("uint256", "", 1)]
        public virtual BigInteger ReturnValue1 { get; set; }
    }



    public partial class TokenAddressOutputDTO : TokenAddressOutputDTOBase { }

    [FunctionOutput]
    public class TokenAddressOutputDTOBase : IFunctionOutputDTO 
    {
        [Parameter("address", "", 1)]
        public virtual string ReturnValue1 { get; set; }
    }
}
