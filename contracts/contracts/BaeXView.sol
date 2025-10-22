// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseXOracle is Ownable {
    // Events
    event AnalysisRequested(string videoId, uint256 timestamp);
    event AnalysisReceived(string videoId, string metadata, uint256 score);

    // Structs
    struct Analysis {
        string metadata;
        uint256 score;
        bool exists;
    }

    // State variables
    mapping(string => Analysis) public analyses;
    address public oracleAddress;

    // Constructor
    constructor() Ownable(msg.sender) {
        oracleAddress = msg.sender;
    }

    // Modifiers
    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Only oracle can call this");
        _;
    }

    // Functions
    function setOracleAddress(address _oracle) external onlyOwner {
        oracleAddress = _oracle;
    }

    function requestAnalysis(string calldata videoId) external {
        require(bytes(videoId).length > 0, "Video ID cannot be empty");
        emit AnalysisRequested(videoId, block.timestamp);
    }

    function submitAnalysis(
        string calldata videoId,
        string calldata metadata,
        uint256 score
    ) external onlyOracle {
        require(bytes(videoId).length > 0, "Video ID cannot be empty");
        require(score <= 100, "Score must be between 0 and 100");

        analyses[videoId] = Analysis({
            metadata: metadata,
            score: score,
            exists: true
        });

        emit AnalysisReceived(videoId, metadata, score);
    }

    function getAnalysis(string calldata videoId) 
        external 
        view 
        returns (string memory metadata, uint256 score, bool exists) 
    {
        Analysis memory analysis = analyses[videoId];
        return (analysis.metadata, analysis.score, analysis.exists);
    }
} 
 