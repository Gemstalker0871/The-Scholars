import { useSorobanReact } from "@soroban-react/core";
import React from "react";
import * as StellarSdk from "@stellar/stellar-sdk";
import "./assets/styles.css";
import { useRegisteredContract } from "@soroban-react/contracts";

const ProfilePage = () => {
    const sorobanContext = useSorobanReact();
    const { address } =
        sorobanContext;
    const contract = useRegisteredContract("The_Scholars")

    // Button actions
    document.getElementById('make-group-btn')?.addEventListener('click', function () {
        // Remove the alert statement
        // alert('making group...');
        // Add your join group logic here
        const contribution = {
            "address": new StellarSdk.Address(address ?? "").toScVal(),
            "amount": StellarSdk.nativeToScVal(0, { type: "i128" })
        }
        contract?.invoke({
            method: "create_group", args: [new StellarSdk.Address(address ?? "").toScVal(), new StellarSdk.Address(address ?? "").toScVal(), StellarSdk.nativeToScVal("title", { type: "String" }), StellarSdk.nativeToScVal("description", { type: "String" }), StellarSdk.nativeToScVal([contribution], { "type": "Vec" })],
            signAndSend: true
        });
    });

    // Button actions
    document.getElementById('join-group-btn')?.addEventListener('click', function () {
        alert('Joining group...');
        // Add your join group logic here
        contract?.invoke({
            method: "join_group", args: [new StellarSdk.Address(address ?? "").toScVal()],
            signAndSend: true
        })
    });

    document.getElementById('check-members-btn')?.addEventListener('click', function () {
        const users: String[] = JSON.parse(localStorage.getItem('users') ?? "[]") || [];
        const membersList = users.map(user => `<p><strong>Email:</strong> ${user}</p>`).join('');

        // Open a new window with the members list
        const popupWindow = window.open('', '_blank', 'width=600,height=400');
        popupWindow?.document.write(`
            <html>
            <head>
                <title>Members List</title>
                <style>
                    /* Add your CSS styles for the popup window here */
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    .member-item {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <h2>Members List</h2>
                <div id="members-list">
                    ${membersList}
                </div>
            </body>
            </html>
        `);
    });


    document.getElementById('contribute-btn')?.addEventListener('click', function () {
        // Open a new window with the contribution form
        const popupWindow = window.open('', '_blank', 'width=400,height=200');
        popupWindow?.document.write(`
            <html>
            <head>
                <title>Contribute</title>
                <style>
                    /* Add your CSS styles for the popup window here */
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    input[type="number"] {
                        width: 100%;
                        padding: 8px;
                        margin-top: 10px;
                    }
                    button {
                        margin-top: 10px;
                        padding: 8px 16px;
                        background-color: #007bff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    button:hover {
                        background-color: #0056b3;
                    }
                </style>
            </head>
            <body>
                <h2>Contribute</h2>
                <form id="contribution-form">
                    <label for="contribution">Enter your contribution:</label><br>
                    <input type="number" id="contribution" name="contribution" required><br>
                    <button type="submit">Submit</button>
                </form>
            </body>
            </html>
        `);

        // Handle form submission
        popupWindow?.document.getElementById('contribution-form')?.addEventListener('submit', function (event) {
            event.preventDefault();
            const contributionInput = popupWindow?.document.getElementById('contribution') as HTMLInputElement;
            const contribution = parseFloat(contributionInput.value);
            if (!isNaN(contribution)) {
                // Here you can perform the logic to handle the contribution
                alert(`Thank you for contributing: ${contribution}`);
            } else {
                alert('Please enter a valid number.');
            }
        });
    });



    document.getElementById('leave-group-btn')?.addEventListener('click', function () {
        alert('You have left the group.');
        // Perform any additional actions needed when leaving the group
    });


    // View Other Students Page
    const studentsList = document.getElementById('students-list');

    if (studentsList) {
        const users: String[] = JSON.parse(localStorage.getItem('users') ?? "[]") || [];
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.className = 'user-item';
            userItem.innerHTML = `<p><strong>Email:</strong> ${user}</p>`;
            studentsList.appendChild(userItem);
        });
    }

    return (
        <div className="container">
            <div className="center">
                <h1>Profile</h1>
                <div className="profile-details">
                    <div className="profile-item">

                    </div>
                </div>
                <div className="buttons">
                    <div className="">
                        <button className="profile-button" id="make-group-btn">Make Group</button>
                        <button className="profile-button" id="join-group-btn">Join Group</button>
                        <button className="profile-button" id="check-members-btn">Check Members</button>
                        <button className="profile-button" id="contribute-btn">Contribute</button>
                        <button className="profile-button" id="leave-group-btn">Leave Group</button>
                    </div>

                </div>

            </div>
        </div>

    )
};

export default ProfilePage;