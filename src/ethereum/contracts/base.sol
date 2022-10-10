// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract Record {
  address public administrator;
  uint256 public hospital_count;
  uint256 public patient_count;
  mapping(address => bool) public hospital;
  mapping(address => bool) public patient;
  mapping(address => mapping(address => mapping(uint => uint256[]))) public patient_records;
  mapping(address => mapping(address=>uint)) public patient_records_count;
  mapping(address => mapping(address=>uint)) public ad_count;

  function addHospitals(address hosp) public payable {
    require(administrator == msg.sender);
    hospital[hosp] = true;
    hospital_count++;
  }

  function addPatients(address pat) public payable {
    require(administrator == msg.sender);
    patient[pat] = true;
    patient_count++;
  }


  function addPatientRecords(address patients, uint256[] memory patientRecords) public payable {
    require(hospital[msg.sender]);
    require(patient[patients]);
    
    for (uint256 i = 0; i < patient_records.length; ++i) {
      patient_records[patients][msg.sender][patient_records_count[cust][msg.sender]].push(patient_records[i]);
    }
    patient_records_count[patients][msg.sender]++;
  }

  function getPatientRecords(address patients, address hosp) public view returns (uint256[] memory) {
    require(patient[patients]);
    require(hospital[hosp]);
    
    return patient_records_count[patients][hosp][patient_records_count[patients][hosp]-1];
  }

}