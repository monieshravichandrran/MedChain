// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.17;

contract Record {
  address public administrator;
  uint256 public hospital_count;
  uint256 public patient_count;
  mapping(address => bool) public hospital;
  mapping(address => bool) public patients;
  mapping(address => mapping(uint => uint256[])) public patient_records;
  mapping(address => uint) public patient_records_count;
  mapping(address => mapping(address=>uint)) public ad_count;

  constructor () public {
      administrator = msg.sender;
  }

  function addHospitals(address hosp) public payable {
    require(administrator == msg.sender);
    require(hospital[hosp] == false);
    hospital[hosp] = true;
    hospital_count++;
  }

  function addPatients(address pat) public payable {
    require(administrator == msg.sender);
    require(patients[pat] == false);
    patients[pat] = true;
    patient_count++;
  }


  function addPatientRecords(address patient, uint256[] memory patientRecords) public payable {
    require(hospital[msg.sender]);
    require(patients[patient]);
    
    for (uint256 i = 0; i < patientRecords.length; ++i) {
      patient_records[patient][patient_records_count[patient]].push(patientRecords[i]);
    }
    patient_records_count[patient]++;
  }

  function getPatientRecords(address patient) public payable returns (int256[500] memory) {
    require(hospital[msg.sender]);
    require(patients[patient]);
    
    int256[500] storage ipfsAsciis;
    uint256 cnt = 0;
    for (uint i=0; i<patient_records_count[patient]; ++i) {
        for(uint j=0; j<patient_records[patient][i].length; ++j) {
            ipfsAsciis[cnt] = int256(patient_records[patient][i][j]);
            cnt++;
        }
        ipfsAsciis[cnt] = -1;
        cnt++;
    }

    return ipfsAsciis;
  }

}