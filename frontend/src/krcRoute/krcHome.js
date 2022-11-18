import React, { Component, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import BloodContract from '../components/BloodContract'
import caver from '../klaytn/caver';
import './krcHome.scss'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import MainHeader from '../components/layout/mainHeader';

//const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]

//여기서 리셋이됨
/*
if (walletFromSession) {
  try {
    caver.klay.accounts.wallet.add(JSON.parse(walletFromSession))
  } catch (e) { // error 발생시
    // If value in sessionStorage is invalid wallet instance,
    // remove it from sessionStorage.
    sessionStorage.removeItem('walletInstance')
  }
}
*/

console.log("klaytn wallet is :", caver.klay.accounts.wallet)
function NFTminting (){
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [bloodType, setBloodType] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [certificateNum, setCertificateNum] = useState('')
  const [donateType, setDonateType] = useState('전혈')
  const [date, setDate] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const handleName = (e) => {
      setName(e.target.value)
  }

  const handleId = (e) => {
    setId(e.target.value)
  }

  const handleBloodType = (e) => {
    setBloodType(e.target.value)
  }

  const handleHomeAddress = (e) => {
    setHomeAddress(e.target.value)
  }

  const handleCertificateNum = (e) => {
    setCertificateNum(e.target.value)
  }

  const handleDonateType = (e) => {
    setDonateType(e.target.value)
  }

  const handleDate = (e) => {
    setDate(e.target.value)
  }

  const handleWalletAddress = (e) => {
    setWalletAddress(e.target.value)
  }

  const handleSubmit = async (e) => {
      await mintCertificate(name, id, bloodType, homeAddress, certificateNum,donateType,date,walletAddress)
      await window.location.reload();
  }


      return (
        <body>
          <MainHeader/>
          <div className="space"></div>
          <div className="Board_css">
            <BootstrapTable>
                <TableHeaderColumn width='350' dataField='mint_transaction' dataAlign='center'>발행 기록</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='time_stamp' dataAlign='center'>발행일</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='mint_address' dataAlign='center' isKey={true}>발행 주소</TableHeaderColumn>
            </BootstrapTable>
          </div>
          <div className="mint">
            <form className="NFTminting" onSubmit={handleSubmit}>
            <label>헌혈증명서 발행</label>
            <br/>
            <input
              className="NFTminting_css"
              name="name"
              label="헌혈자 이름"
              value={name}
              onChange={handleName}
              placeholder="헌혈자 이름을 입력하시오."
              required
            />
            
            <input
              className="NFTminting_css"
              name="id"
              label="주민등록번호"
              value={id}
              onChange={handleId}
              placeholder="헌혈자의 주민등록번호를 입력하시오."
              required
            />
            
            <input
              className="NFTminting_css"
              name="bloodType"
              label="혈액형"
              value={bloodType}
              onChange={handleBloodType}
              placeholder="헌혈자의 혈액형을 입력하시오."
              required
            />

            <input
              className="NFTminting_css"
              name="home_address"
              label="주소"
              value={homeAddress}
              onChange={handleHomeAddress}
              placeholder="헌혈자의 주소를 입력하시오."
              required
            />

            <input
              className="NFTminting_css"
              name="certificateNum"
              label="증명서 번호"
              value={certificateNum}
              onChange={handleCertificateNum}
              placeholder="증명서 번호를 입력하시오."
              required
            />

            <div className="typeCheck">
              <p>헌혈 종류를 선택하세요.</p>
              <label>
              <input 
              name="donateType"
              value="전혈"
              type="radio"
              checked={donateType === "전혈"}
              onChange={handleDonateType}/>
              <br/>
              전혈
              </label>

              <label>
              <input 
              name="donateType"
              value="혈장"
              type="radio"
              checked={donateType === "혈장"}
              onChange={handleDonateType}/>
              <br/>
              혈장
              </label>

              <label>
              <input 
              name="donateType"
              value="혈소판"
              type="radio"
              checked={donateType === "혈소판"}
              onChange={handleDonateType}/>
              <br/>
              혈소판
              </label>

              <label>
              <input 
              name="donateType"
              value="혈장+혈소판"
              type="radio"
              checked={donateType === "혈장+혈소판"}
              onChange={handleDonateType}/>
              <br/>
              혈장 + 혈소판
              </label>
            </div>


            <input
              className="NFTminting_css"
              name="date"
              label="날짜"
              value={date}
              onChange={handleDate}
              placeholder="오늘 날짜를 입력하시오."
              required
            />
            <br/>
            <input
              className="NFTminting_css"
              name="wallet_address"
              label="지갑 주소"
              value={walletAddress}
              onChange={handleWalletAddress}
              placeholder="지갑 주소를 입력하시오."
              required
            />
            <br/>
            <Button
              className="Certificate__upload"
              type="submit"
              title="헌혈증명서 업로드"
            />
          </form>
          </div>
        </body>
      )
}

export const wallet_session = () => {
  const data = JSON.parse(sessionStorage.getItem("walletInstance"));
  console.log(data.address);
  return data // 세션 스토리지 address값반환
}


export const mintCertificate = async (
  name,
  id,
  bloodType,
  home_address,
  certificateNum,
  donateType,
  date,
  //추가 mintCert시 필요
  wallet_address,
) => {
  
  const jsonWallet = wallet_session();
  const wallet = caver.klay.accounts.privateKeyToAccount(jsonWallet.privateKey);
  caver.klay.accounts.wallet.add(wallet)
  
  /*
  const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]
  const wallet = walletInstance;
  */
  
    const before_cert_length = await BloodContract.methods.getCertificateCount(wallet_address).call()
    console.log("before cert length: ", before_cert_length);
    await BloodContract.methods.createCertificate(
      name,
      id,
      bloodType,
      home_address,
      certificateNum,
      donateType).send({
        from: wallet.address,// 보내는 사람 주소
        gas: '200000000',
      })
    console.log("dummy");
    console.log("Certficate Created. Now Minting Through Smart Contract");
    
    await BloodContract.methods.mintCert(wallet_address, certificateNum).send({
      from: wallet.address,// 보내는 사람 주소
      gas: '200000000',
    })
    console.log("mint");
    
    const after_cert_length = await BloodContract.methods.getCertificateCount(wallet_address).call()
    console.log("after cert length: ", after_cert_length);

    await caver.klay.accounts.wallet.clear()

    
    // const keyringInstance = caver.wallet[0]

  //   const setResult = await BloodContract.send({
  //     from: deployerKeyring.address,
  //     feeDelegation: true,
  //     feePayer: feePayerKeyring.address,
  //     feeRatio: 50, // Without feeRatio, `send` will use FeeDelegatedSmartContractExecution
  //     gas: 1000000,
  //  }, 'set', keyString, 'anotherValue')

    console.log("cycle done");
}

export default NFTminting