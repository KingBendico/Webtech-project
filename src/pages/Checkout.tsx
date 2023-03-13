import { useState } from 'react';
import React from "react";




export default function Checkout() {
    const [country, setCountry] = useState("denmark")
    const [zipCode, setZipCode] = useState("")
    const [city, setCity] = useState("")
    const [adress, setAdress] = useState("")
    const [phoneNr, setPhoneNr] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [vatNumber, setVatNumber] = useState("")

    const handleCountryChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        const value = e.target.value
        setCountry(value)
    }

    const handleZipCodeChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setZipCode(value)
        if(value.length === 4 && country=="denmark") {
            await fetch('https://api.dataforsyningen.dk/postnumre?nr='+value)
                .then((response) => response.json())
                .then((body) => {
                    setCity(body[0].navn)

                }).catch((err)=>{console.log(err)})
        }
    }

    const handleCityChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setCity(value)
    }
    const handleAdressChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setAdress(value)
    }
    const handlePhoneNrChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPhoneNr(value)
    }
    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setName(value)
    }
    const handleEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }
    const handleCompanyNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setCompanyName(value)
    }
    const handleVatNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setVatNumber(value)
    }
    return (
        <>
            <form>
                <label>Land</label>
                <select name="country" onChange={handleCountryChange} value={country}>
                    <option value="denmark">Danmark</option>
                </select>
                <label>Post nummer</label>
                <input name="zip-code" value={zipCode} type="number" onChange={handleZipCodeChange}></input>
                <label>By</label>
                <input name="city" value={city} onChange={handleCityChange}></input>
                <label>Adresse</label>
                <input name="address" value={adress} onChange={handleAdressChange}></input>
                <label>Telefon Nummer</label>
                <input name="phone-number" type="number" value={phoneNr} onChange={handlePhoneNrChange}></input>
                <label>Navn</label>
                <input name="name" value={name} onChange={handleNameChange}></input>
                <label>Email</label>
                <input name="email" type="email" value={email} onChange={handleEmailChange}></input>
                <label>Firma navn</label>
                <input name="company-name" value={companyName} onChange={handleCompanyNameChange}></input>
                <label>CVR nummer</label>
                <input name="vat-number" value={vatNumber} onChange={handleVatNumberChange}></input>
            </form>

        </>
    )
  }