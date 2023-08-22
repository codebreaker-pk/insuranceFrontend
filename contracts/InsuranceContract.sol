//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsuranceContract {
    uint256 public premium;
    uint256 public coverageAmount;
    address payable public insurer;
    address payable public policyHolder;
    bool public isPolicyActive;

    constructor(uint256 _premium, uint256 _coverageAmount) {
        premium = _premium;
        coverageAmount = _coverageAmount;
        insurer = payable(msg.sender);
    }

    function purchasePolicy() public payable {
        require(!isPolicyActive, "Policy is already active");
        require(msg.value == premium, "Incorrect premium amount");
        policyHolder = payable(msg.sender);
        isPolicyActive = true;
    }

    function makeClaim() public restrictedToInsurer {
        require(isPolicyActive, "Policy must be active");
        policyHolder.transfer(coverageAmount);
        isPolicyActive = false;
    }

    modifier restrictedToInsurer() {
        require(msg.sender == insurer, "Only the insurer can call this function");
     _;
    }
}
