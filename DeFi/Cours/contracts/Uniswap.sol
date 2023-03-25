// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
 
interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
}

interface ISwapRouter {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    /// @notice Swaps `amountIn` of one token for as much as possible of another token
    /// @param params The parameters necessary for the swap, encoded as `ExactInputSingleParams` in calldata
    /// @return amountOut The amount of the received token
    function exactInputSingle(ExactInputSingleParams calldata params) external payable returns (uint256 amountOut);
}



contract Uniswap {
    ISwapRouter public immutable swapRouter;

    address public constant WETH9 = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;

    // Pour cet exemple, on va prendre des frais de pool à 0.3%
    uint24 public constant poolFee = 3000;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }

    function swapExactInputSingle(uint256 amountIn, address _token) external {

        // Transfert des tokens en question au smart contract ! Il faut penser à approve ce transfert avant l’utilisation de cette fonction 
        IERC20(_token).transferFrom(msg.sender, address(this), amountIn);

        // autoriser uniswap à utiliser nos tokens
        IERC20(_token).approve(address(swapRouter), amountIn);
        
        //Creation des paramètres pour l'appel du swap
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: _token,
                tokenOut: WETH9,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // effectuer le swap, ETH sera transférer directement au msg.sender
        swapRouter.exactInputSingle(params);
    }
}

