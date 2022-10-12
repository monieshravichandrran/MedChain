// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.4.18;

contract Record {
  address public administrator;
  uint256 public hospital_count;
  uint256 public patient_count;
  mapping(address => bool) public hospital;
  mapping(address => bool) public patients;
  mapping(address => mapping(uint => uint256[])) public patient_records;
  mapping(address => uint) public patient_records_count;
  mapping(address => mapping(address=>uint)) public ad_count;
  uint256[] public temparr;


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

  function getPatientRecords(address patient) public payable returns (uint256[] memory) {
    require(hospital[msg.sender]);
    require(patients[patient]);
    temparr.length=0;
    for(uint i=0;i<patient_records_count[patient];++i)
    {
      for(uint j=0;j<patient_records[patient][i].length;++j)
      {
        temparr.push(uint256(patient_records[patient][i][j]));
      }
      temparr.push(uint256(1000));
    }
    return temparr;
  }

  function getPatientRecordsCount(address patient) public payable returns (uint256) {
    require(hospital[msg.sender]);
    require(patients[patient]);
    
    return patient_records_count[patient];
  }

}